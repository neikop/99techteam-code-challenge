export const shortenAddress = (address: Address | string = "", length: number = 4) => {
  return `${address.slice(0, 2 + length)}...${address.slice(-length)}`
}

export const formatPrice = (price: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 4,
    minimumFractionDigits: 2,
    style: "currency",
    ...options,
  }).format(price)
}

export const formatAmount = (price: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 18,
    useGrouping: false,
    ...options,
  }).format(price)
}
