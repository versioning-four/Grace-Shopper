const syncAndSeed = require('../server/db/seed')
const app = require('supertest')(require('../server/index'))
const { Order, LineItem } = require('../server/db/models')

const testIfJSONObjectReturned = (route, done) => {
  return route.expect(200).expect('Content-Type', /application\/json/, done)
}

const testIfNewItemAddedToDatabaseAndReturned = async (
  route,
  model,
  fieldToCheck,
  done
) => {
  try {
    const itemsBeforePost = await model.findAll()
    const { body } = await route
    await route
    const itemsAfterPost = await model.findAll()
    expect(itemsBeforePost.length + 1).toBe(itemsAfterPost.length)
    let itemInDatabase = await model.findByPk(body.id)
    delete body.createdAt
    delete body.updatedAt
    itemInDatabase = itemInDatabase.get()
    delete itemInDatabase.createdAt
    delete itemInDatabase.updatedAt
    expect(body).toEqual(itemInDatabase)
    expect(body[fieldToCheck]).toBeDefined()
    expect(body[fieldToCheck]).not.toBeNull()
    done()
  } catch (err) {
    done(err)
  }
}

const testIfAllModelItemsReturned = (route, model, field, done) => {
  return route
    .then(({ body }) => {
      return Promise.all([body, model.findAll()])
    })
    .then(([apiResult, dbResult]) => {
      expect(apiResult.length).toBe(dbResult.length)
      expect(apiResult[0][field]).toBeDefined()
      done()
    })
    .catch(done)
}

const testIfItemDeleted = (route, model, deletedId, done) => {
  return route
    .then(() => model.findByPk(deletedId))
    .then(item => {
      expect(item).toBeNull()
      done()
    })
    .catch(done)
}

beforeEach(() => {
  return syncAndSeed()
})

describe('Order routes', () => {
  describe('GET /api/orders', () => {
    it('it returns a json object', done => {
      return testIfJSONObjectReturned(app.get('/api/orders'), done)
    })
    it('it returns all orders in the database', done => {
      return testIfAllModelItemsReturned(
        app.get('/api/orders'),
        Order,
        'userId',
        done
      )
    })
  })
  describe('POST /api/orders', () => {
    it('it returns a json object', done => {
      return testIfJSONObjectReturned(
        app.post('/api/orders').send({ userId: 1 }),
        done
      )
    })
    it('it adds a new order to the database', async done => {
      await testIfNewItemAddedToDatabaseAndReturned(
        app.post('/api/orders').send({ userId: 1 }),
        Order,
        'userId',
        done
      )
    })
  })
  describe('DELETE /api/orders/:id', () => {
    it('it returns a 204 status code', done => {
      return app.delete('/api/orders/1').expect(204, done)
    })
    it('it deletes the order in the database', done => {
      return testIfItemDeleted(app.delete('/api/orders/2'), Order, 2, done)
    })
  })
})

describe('LineItem routes', () => {
  describe('GET /api/lineitems', () => {
    it('it returns a json object', done => {
      return testIfJSONObjectReturned(app.get('/api/lineitems'), done)
    })
    it('it returns all lineitems in the database', done => {
      return testIfAllModelItemsReturned(
        app.get('/api/lineitems'),
        LineItem,
        'orderId',
        done
      )
    })
  })
  describe('POST /api/lineitems', () => {
    it('it returns a json object', done => {
      return testIfJSONObjectReturned(
        app.post('/api/lineitems').send({ quantity: 5, orderId: 1 }),
        done
      )
    })
    it('it adds a new order to the database', async done => {
      await testIfNewItemAddedToDatabaseAndReturned(
        app.post('/api/lineitems').send({ quantity: 5, orderId: 1 }),
        LineItem,
        'orderId',
        done
      )
    })
  })

  describe('PUT /api/lineitems/:id', () => {
    it('it returns a json object', done => {
      return testIfJSONObjectReturned(
        app.put('/api/lineitems/3').send({ quantity: 1000, orderId: 1 }),
        done
      )
    })
    it('it changes the lineitem in the database with the given id', async done => {
      try {
        const lineitemBefore = await LineItem.findByPk(3)
        expect(lineitemBefore.quantity).not.toBe(1000)
        await app.put('/api/lineitems/3').send({ quantity: 1000, orderId: 1 })
        const lineitem = await LineItem.findByPk(3)
        expect(lineitem.quantity).toBe(1000)
        done()
      } catch (err) {
        done(err)
      }
    })
    it('it returns the changed lineitem', async done => {
      try {
        const { body } = await app
          .put('/api/lineitems/3')
          .send({ quantity: 1000, orderId: 1 })
        delete body.createdAt
        delete body.updatedAt
        let lineitem = await LineItem.findByPk(3)
        lineitem = lineitem.get()
        delete lineitem.createdAt
        delete lineitem.updatedAt
        expect(body).toEqual(lineitem)
        done()
      } catch (err) {
        done(err)
      }
    })
  })

  describe('DELETE /api/lineitems/:id', () => {
    it('it returns a 204 status code', done => {
      return app.delete('/api/lineitems/3').expect(204, done)
    })
    it('it deletes the order in the database', done => {
      return testIfItemDeleted(
        app.delete('/api/lineitems/3'),
        LineItem,
        3,
        done
      )
    })
  })
})
