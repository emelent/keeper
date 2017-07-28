import React,{Component} from 'react'
import {
	connect
} from 'react-redux'
import {bindActionCreators} from 'redux'

import {
	Route
} from 'react-router'

import Page from '../components/page'

import InventoryMenu from '../components/inventoryMenu'
import ProductList from '../components/productList'

import {fetchProducts, clearError} from '../redux/actions/inventory'


class Inventory extends Component{

	render(){
		const products = this.props.inventory.get('products').toArray()
		const {history} = this.props
		const Menu = () => (
			<InventoryMenu history={history} />
		)
		const AvailableProducts = () => (
			<ProductList products={products.filter(p => p.quantity > 0)} />
		)
		const SoldOutProducts = () => (
			<ProductList products={products.filter(p => p.quantity < 1)} />
		)
		const AllProducts = () => (
			<ProductList products={products} />
		)
		const content = (
			<div style={styles.container}>
				<Route exact path="/inventory" component={Menu} />
				<Route exact path="/inventory/available" component={AvailableProducts} />
				<Route exact path="/inventory/soldOut" component={SoldOutProducts} />
				<Route exact path="/inventory/all" component={AllProducts} />
			</div>
		)
		return (
			<Page pageTitle="Inventory"
				pageIcon=""
				content={content}
			/>
		)
	}
}

const styles = {
	container:{
		width: '100%',
		height: '100%'
	}
}


const mapStateToProps = (state) => ({
	inventory: state.inventory
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
	fetchProducts,
	clearError
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Inventory)