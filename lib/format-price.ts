export function getFormattedPrice(price: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
    price
  );
}
