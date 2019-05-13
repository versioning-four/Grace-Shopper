import React from 'react'
import { connect } from 'react-redux'
import {
  makePriceCurrencyFormat,
  findProductInformationById
} from '../HelperFunctions'

const Orders = ({ orders, firstOrderId }) => {
  return (
    <div className="accordion" id="orders">
      {orders.map(order => {
        let total = order.lineitems.reduce((acc, value) => acc + value.price, 0)
        return (
          <div key={order.id} className="card">
            <div className="card-header">
              <h4>
                <button
                  className={`btn btn-link ${
                    order.id === firstOrderId ? '' : 'collapsed'
                  }`}
                  type="button"
                  data-toggle="collapse"
                  data-target={`#collapse-${order.id}`}
                  aria-expanded={order.id === firstOrderId}
                  aria-controls={`collapse-${order.id}`}
                >
                  Order Number: {order.id}
                </button>
              </h4>
              <div className="bigger-font">
                <i>Status:</i> {order.status}
              </div>
              <div className="bigger-font">
                <i>Price of Order:</i> {makePriceCurrencyFormat(total)}
              </div>
            </div>
            <div
              id={`collapse-${order.id}`}
              className={`collapse ${order.id === firstOrderId ? 'show' : ''}`}
              data-parent="#orders"
            >
              {order.lineitems.map(item => {
                return (
                  <div key={item.id} className="card card-within-card-padding">
                    <div className="row row-for-order">
                      <div className="col-sm-6 text-center">
                        <img
                          src={item.image}
                          className="account-lineitem-image"
                          alt="image can not be displayed"
                        />
                      </div>
                      <div className="col-sm-6 card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="card-text">{`Quantity: ${
                          item.quantity
                        }`}</div>
                        <div className="card-text">{`Total Price: ${makePriceCurrencyFormat(
                          item.price
                        )}`}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ userLineitems, userOrders, products }) => {
  const orders = userOrders
    .filter(order => order.status !== 'cart')
    .map(order => {
      order.lineitems = userLineitems.filter(
        lineitem => lineitem.orderId === order.id
      )
      order.lineitems = order.lineitems.map(item => {
        const product = findProductInformationById(item.id, products)
        item.price = item.quantity * product.price
        return { ...item, image: product.image, name: product.name }
      })
      return order
    })
  return { orders, firstOrderId: orders[0] ? orders[0].id : 0 }
}

export default connect(mapStateToProps)(Orders)
