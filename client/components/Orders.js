import React from 'react'
import { connect } from 'react-redux'

const Orders = ({ userOrders, userLineitems }) => {
  const mappedLineitems = userOrders.map(order => {
    order.lineitems = userLineitems.filter(
      lineitem => lineitem.orderId === order.id
    )
    return order
  })
  return (
    <div>
      {mappedLineitems.map(order => {
        return (
          <div key={order.id}>
            <div>{order.status}</div>
            {/* <div>{order.quantity}</div> */}
            <ul>
              {order.lineitems.map(item => (
                <li key={item.id}>
                  {item.id} - {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ userLineitems, userOrders }) => ({
  userOrders,
  userLineitems
})

export default connect(mapStateToProps)(Orders)
