module.exports = {
  makePriceCurrencyFormat: number => {
    const string = `$${String(number)}`
    if (!string.includes('.')) {
      return `${string}.00`
    }
    if (/\.[0-9]{1}$/.test(string)) {
      return `${string}0`
    }
    return string
  }
}
