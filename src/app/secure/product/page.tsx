import ProductDetailClient from "./(client)";
import { productsUrl } from "@/contants/urls";
import { redirect } from "next/navigation";

export default function ProductDetailPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  // NOTE: This page was created to check whether an ID exists before rendering the page and to perform a server-side redirect.
  // NOTE: While this could have been done on the client side, it was added to demonstrate that it can be done server-side.

  if (!searchParams.id) {
    redirect(productsUrl);
  }

  return <ProductDetailClient productId={searchParams.id} />;
}
