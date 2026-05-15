import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getCategories,
  type WPProduct,
} from "./woocommerce";

export type { WPProduct };

export interface ProductWithCategory extends WPProduct {
  categoryName?: string;
  colors?: string[];
  sizes?: string[];
  material?: string;
}

/**
 * Transform raw WooCommerce attributes into a friendly product object.
 */
export function normalizeProduct(product: WPProduct): ProductWithCategory {
  const colors =
    product.attributes
      ?.find((a) => a.slug === "pa_color" || a.name.toLowerCase() === "color")
      ?.options.map((o) => o.toLowerCase()) || [];

  const sizes =
    product.attributes
      ?.find(
        (a) =>
          a.slug === "pa_size" ||
          a.name.toLowerCase() === "size" ||
          a.name.toLowerCase() === "sizes"
      )
      ?.options.map((s) => s.toUpperCase()) || [];

  const material = product.attributes
    ?.find(
      (a) =>
        a.slug === "pa_material" || a.name.toLowerCase() === "material"
    )
    ?.options[0];

  return {
    ...product,
    categoryName: product.categories?.[0]?.name,
    colors,
    sizes,
    material,
  };
}

export async function fetchProducts(
  params: {
    page?: number;
    per_page?: number;
    category?: number;
    search?: string;
  } = {}
) {
  const { products, totalCount } = await getProducts(params);
  return {
    products: products.map(normalizeProduct),
    totalCount,
  };
}

export async function fetchProduct(slug: string) {
  const product = await getProductBySlug(slug);
  return product ? normalizeProduct(product) : null;
}

export async function fetchFeaturedProducts() {
  const products = await getFeaturedProducts();
  return (products as WPProduct[]).map(normalizeProduct);
}

export async function fetchCategories() {
  return getCategories();
}

/**
 * Extract a clean price range or single price string.
 */
export function formatPrice(price: string) {
  const num = parseFloat(price);
  return `$${num.toFixed(2)}`;
}

export function formatPriceRange(prices: string[]) {
  const nums = prices.map((p) => parseFloat(p)).filter((n) => !isNaN(n));
  if (nums.length === 0) return "";
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  return min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} – $${max.toFixed(2)}`;
}
