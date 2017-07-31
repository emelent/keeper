import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './style.css'


export default class StockUp extends Component{
	
	constructor(props){
		super(props)

		this.stockItem = this.stockItem.bind(this)
	}

	stockItem(){
		const item = this.selItem.value
		const qty = this.txtQty.value
		console.log('item =>', item)
		console.log(`Stocking ${qty} ${item.name}`)

		this.props.onStockClick(item, qty)
	}

	render(){
		const {style, products} = this.props

		return (
			<div className="stock-up"
				style={style}
			>
				<select className="input"
					style={{width:'65%'}}
					ref={(el) => this.selItem = el}
				>
					<option disabled selected value>Select Item</option>
					{
						products.map(p => {
							const name = p.name + ' | ' + p.brand
							return (
								<option value={p}
									key={p.id}
								>{name}</option>
							)
						})
					}
				</select>
				<input type="number" min="1"
					style={{width:'30%'}}
					className="input"
					placeholder="Quantity"
					ref={(el) => this.txtQty = el}
				/>
				<button className="button"
					onClick={this.stockItem}
				>Stock</button>
			</div>
		)
	}
}

StockUp.propTypes = {
	products: PropTypes.array.isRequired,
	onStockClick: PropTypes.func.isRequired
}