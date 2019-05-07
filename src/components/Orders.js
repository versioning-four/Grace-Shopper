import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAllUsersLineitemsThunk } from '../redux/actions/userLineitems'

class Orders extends Component {
  componentDidMount() {
    this.props.getUserLineitems(this.props.user.id)
  }

  render() {
    const { userOrders, userLineitems } = this.props
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
}

const mapStateToProps = ({ userLineitems }) => ({
  userLineitems
})

const mapDispatchToProps = dispatch => ({
  getUserLineitems: userId => dispatch(getAllUsersLineitemsThunk(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders)
