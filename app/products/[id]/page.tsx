import { notFound } from "next/navigation";
import ProductDetailClient from "./detail-client";

export const metadata = {
  title: "Product Details | Euphoria",
  description: "Explore product details, sizes and styling from the Euphoria collection.",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId < 1 || productId > 20) {
    notFound();
  }

  return <ProductDetailClient productId={productId} />;
}
