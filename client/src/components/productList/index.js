import React, {Component}  from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class ProductList extends Component{

	createProductList(products){
		console.log('products =>', products)
		return products.map((product) => (
			<tr className="product-list__item" key={product.id}>
				<td>{product.name}</td>
				<td>{product.brand}</td>
				<td>{product.category}</td>
				<td>{product.quantity}</td>
				<td>{product.buy}</td>
				<td>{product.sell}</td>
			</tr>
		))
	}
	render(){
		const {products} = this.props
		return (
			<div className="product-container">
				<table className="product-table">
					<tr>
						<th>Name</th>
						<th>Brand</th>
						<th>Category</th>
						<th>Buy</th>
						<th>Quantity</th>
						<th>Sell</th>
					</tr>
					{this.createProductList(products)}
				</table>
			</div>
		)
	}
}

ProductList.propTypes = {
	products: PropTypes.array.isRequired
}

