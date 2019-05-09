import React from 'react'
import { connect } from 'react-redux'
import {
  makePriceCurrencyFormat,
  findProductInformationById
} from '../HelperFunctions'

const Orders = ({ userOrders, userLineitems, products }) => {
  const mappedLineitems = userOrders.map(order => {
    order.lineitems = userLineitems.filter(
      lineitem => lineitem.orderId === order.id
    )
    return order
  })
  return (
    <div>
      {mappedLineitems.map(order => {
        let total = 0
        return (
          order.status === 'completed' && (
            <div key={order.id}>
              <ul>
                Order Number: {order.id}
                {order.lineitems.map(item => {
                  const product = findProductInformationById(item.id, products)
                  total += item.quantity * product.price
                  return (
                    <div key={item.id}>
                      <img src={product.image} />
                      <li>{product.name}</li>
                      <li>
                        {item.quantity} units,{' '}
                        {makePriceCurrencyFormat(item.quantity * product.price)}
                      </li>
                    </div>
                  )
                })}
              </ul>
              Order Total: {makePriceCurrencyFormat(total)}
            </div>
          )
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ userLineitems, userOrders, products }) => ({
  userOrders,
  userLineitems,
  products
})

export default connect(mapStateToProps)(Orders)
