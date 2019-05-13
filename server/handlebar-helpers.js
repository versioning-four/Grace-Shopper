module.exports = {
  each: (context, options) => {
    let ret = ''
    context.forEach(item => {
      ret = `${ret}${options.fn(item)}`
    })
    return ret
  }
}
