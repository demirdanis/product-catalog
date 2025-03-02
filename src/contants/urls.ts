export const loginUrl = "/";
export const productsUrl = "/secure/products";
export const productUrl = "/secure/product";

export const prepareProductUrl = (productId: string) => {
  return `${productUrl}?id=${productId}`;
};
