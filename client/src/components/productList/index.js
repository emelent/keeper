import React, {Component}  from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class ProductList extends Component{

	createProductList(products, fields){
		return products.map((product) => (
			<tr className="product-table__item" key={product.id}>
				{fields.map(field => (
					<td>{product[field]}</td>
				))}
			</tr>
		))
	}
	render(){
		const {products, fields} = this.props

		return (
			<div className="product-container">
				<table className="product-table">
					<tr>
						{fields.map(field => (
							<th>{field}</th>
						))}
					</tr>
					{this.createProductList(products, fields)}
				</table>
			</div>
		)
	}
}

ProductList.propTypes = {
	products: PropTypes.array.isRequired,
	fields: PropTypes.array.isRequired
}

