import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './style.css'


export default class AddInventoryItem extends Component{

	constructor(props){
		super(props)

		this.addItem = this.addItem.bind(this)
	}

	addItem(){
		const newProduct = {
			name: this.txtName.value,
			brand: this.txtBrand.value,
			category: this.selBrand.value,
			quantity: this.txtQty.valueAsNumber,
			sell: this.txtSell.valueAsNumber,
			buy: this.txtBuy.valueAsNumber
		}
		this.props.onAddClick(newProduct)
	}

	render(){
		const {style} = this.props

		return (
			<div className="add-inventory-item" style={style}>
				<input className="input"
					ref={(el) => this.txtName = el}
					type="text" placeholder="Name"
				/>
				<input className="input"
					ref={(el) => this.txtBrand = el}
					type="text" placeholder="Brand"
				/>
				<select className="input"
					ref={(el) => this.selBrand = el}
				>
					<option disabled selected value>Category</option>
					{
						categories.map(c => (
							<option value={c} key={c}>{c}</option>
						))
					}
				</select>
				<input className="input"
					ref={(el) => this.txtQty = el}
					placeholder="Quantity"
					type="number" min="1"
				/>
				<input className="input"
					ref={(el) => this.txtSell = el}
					placeholder="Selling Price(R)"
					type="number" min="1" step="0.1"
				/>
				<input className="input"
					ref={(el) => this.txtBuy = el}
					placeholder="Buying Price(R)"
					type="number" min="1" step="0.1"
				/>

				<button className="button"
					onClick={this.addItem}
				>Add</button>
			</div>
		)
	}
}

AddInventoryItem.propTypes = {
	onAddClick: PropTypes.func.isRequired
}

const categories = [
	'Food',
	'Drinks',
	'Snacks',
	'Toiletries',
	'Cleaning',
	'Cooking',
	'Utility'
].sort()