import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return [
    { slug: "180g-cotton-t-shirt" },
    { slug: "230g-washed-t-shirt" },
    { slug: "260g-heavyweight-t-shirt" },
  ];
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProductDetailClient params={params} />;
}
