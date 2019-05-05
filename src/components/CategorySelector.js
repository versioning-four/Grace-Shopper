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
    this.setState({ [target.name]: target.value })
  }

  goToCategoryRoute = () => {
    const { categorySelected } = this.state
    const routeToGoTo = `/products${
      categorySelected === '' ? '' : `/category/${categorySelected}`
    }`
    this.props.history.push(routeToGoTo)
  }

  render() {
    const { handleChange, goToCategoryRoute } = this
    const { categorySelected } = this.state
    return (
      <div>
        <select
          value={categorySelected}
          onChange={handleChange}
          name="categorySelected"
          onClick={goToCategoryRoute}
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
