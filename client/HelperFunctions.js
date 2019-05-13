export const makePriceCurrencyFormat = number => {
  const string = `$${String(number)}`
  if (!string.includes('.')) {
    return `${string}.00`
  }
  if (/\.[0-9]{1}$/.test(string)) {
    return `${string}0`
  }
  return string
}

export const findUserNameById = (id, arr) => {
  const user = arr.find(item => item.id === id)
  return `${user.firstName} ${user.lastName}`
}

export const findProductNameById = (id, arr) => {
  const product = arr.find(item => item.id === id)
  if (product) return `${product.name}`
}

export const findProductInformationById = (id, arr) => {
  const product = arr.find(item => item.id === id)
  return product
}
