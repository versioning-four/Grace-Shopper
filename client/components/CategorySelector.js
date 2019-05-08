import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategorySelector extends Component {
  constructor() {
    super()
    this.state = {
      categorySelected: ''
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () =>
      this.goToCategoryRoute()
    )
  }

  goToCategoryRoute = () => {
    const { categorySelected } = this.state
    const routeToGoTo = `/products${
      categorySelected === '' ? '' : `/category/${categorySelected}`
    }`
    this.props.history.push(routeToGoTo)
  }

  render() {
    return (
      <div>
        <select
          value={this.state.categorySelected}
          onChange={this.handleChange}
          name="categorySelected"
        >
          {this.props.categories.map(category => {
            const { id, name } = category
            return (
              <option key={id} value={id}>
                {name}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: [{ id: '', name: 'All' }, ...categories]
})

export default connect(mapStateToProps)(CategorySelector)
