const { Order, LineItem } = require('../server/db/models')
const syncAndSeed = require('../server/db/seed')
const sequelizeValidationError = require('sequelize').ValidationError

beforeEach(() => {
  return syncAndSeed()
})

describe('Order model tests', () => {
  it('it has userId foreign key', () => {
    return Order.findByPk(1).then(order => {
      expect(order.userId).toBeDefined()
    })
  })
})

describe('LineItem', () => {
  it('it has quantity field and productId and orderId foreign keys', () => {
    return LineItem.findByPk(1).then(lineitem => {
      expect(lineitem.quantity).toBeDefined()
      expect(lineitem.orderId).toBeDefined()
      expect(lineitem.productId).toBeDefined()
    })
  })

  it('quantity field has default value of 1', () => {
    return LineItem.create({ orderId: 1 }).then(lineitem => {
      expect(lineitem.quantity).toBe(1)
    })
  })
  it('quantity field has to be zero or greater', () => {
    let error
    return LineItem.create({ quantity: -1, orderId: 2 })
      .then(() => {
        error = 'Noooo'
      })
      .catch(err => {
        error = err
      })
      .then(() => {
        expect(error.message).toBe(
          'Validation error: quantity of item in order must be zero or greater'
        )
        expect(error).toBeInstanceOf(sequelizeValidationError)
      })
  })
})
