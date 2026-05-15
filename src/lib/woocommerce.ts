const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://boazclothes.com";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || "";

// Use Application Password for authentication
const WC_USERNAME = process.env.WC_USERNAME || "linyixun3170@gmail.com";
const WC_PASSWORD = process.env.WC_PASSWORD || "llTU ycdh YB0q aiK0 G6s2 YsvY";

const auth = Buffer.from(`${WC_USERNAME}:${WC_PASSWORD}`).toString("base64");

interface WooCommerceParams {
  [key: string]: string | number | undefined;
}

async function fetchWooCommerce<T>(
  endpoint: string,
  params: WooCommerceParams = {}
): Promise<T> {
  const url = new URL(`${WP_URL}/wp-json/wc/v3/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `WooCommerce API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
}

interface WPImage {
  id: number;
  src: string;
  alt: string;
  name: string;
}

interface WPAttribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WPProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  stock_quantity: number | null;
  categories: WPCategory[];
  images: WPImage[];
  attributes: WPAttribute[];
  meta_data: Array<{ key: string; value: unknown }>;
  type: string;
}

interface WPProductsResponse {
  data: WPProduct[];
  headers: Headers;
}

export interface WooCommerceProductsResponse {
  products: WPProduct[];
  totalCount: number;
}

export async function getProducts(
  params: {
    page?: number;
    per_page?: number;
    category?: number;
    search?: string;
    orderby?: string;
    order?: "asc" | "desc";
  } = {}
): Promise<WooCommerceProductsResponse> {
  const response = await fetch(
    `${WP_URL}/wp-json/wc/v3/products?${new URLSearchParams({
      per_page: String(params.per_page || 12),
      page: String(params.page || 1),
      ...(params.category && { category: String(params.category) }),
      ...(params.search && { search: params.search }),
      ...(params.orderby && { orderby: params.orderby }),
      ...(params.order && { order: params.order }),
    })}`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error(`WooCommerce API error: ${response.status}`);
  }

  const totalCount = parseInt(
    response.headers.get("X-WP-Total") || "0",
    10
  );

  const products: WPProduct[] = await response.json();

  // Fetch categories
  const categoriesResponse = await fetch(
    `${WP_URL}/wp-json/wc/v3/products/categories?per_page=100`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      next: { revalidate: 600 },
    }
  );
  const categories = categoriesResponse.ok
    ? await categoriesResponse.json()
    : [];

  return { products, totalCount };
}

export async function getProductBySlug(
  slug: string
): Promise<WPProduct | null> {
  const products = await fetchWooCommerce<WPProduct[]>("products", {
    slug,
    per_page: 1,
  });
  return products.length > 0 ? products[0] : null;
}

export async function getProductById(id: number): Promise<WPProduct | null> {
  try {
    return await fetchWooCommerce<WPProduct>(`products/${id}`);
  } catch {
    return null;
  }
}

export async function getCategories() {
  return fetchWooCommerce<WPCategory[]>("products/categories", {
    per_page: 100,
  });
}

export async function getFeaturedProducts() {
  const response = await fetch(
    `${WP_URL}/wp-json/wc/v3/products?featured=true&per_page=3`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    // Fallback: get latest 3 products
    const fallback = await fetch(
      `${WP_URL}/wp-json/wc/v3/products?per_page=3&orderby=date&order=desc`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate: 300 },
      }
    );
    return fallback.ok ? fallback.json() : [];
  }

  return response.json();
}

export async function getJournalPosts() {
  const response = await fetch(
    `${WP_URL}/wp-json/wp/v2/posts?per_page=10&_embed`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      next: { revalidate: 600 },
    }
  );

  if (!response.ok) return [];
  return response.json();
}
