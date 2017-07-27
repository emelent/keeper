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

import {fetchProducts, clearError} from '../redux/actions/inventory'


class Inventory extends Component{

	render(){
		// const products = this.props.inventory.get('products')
		const {history} = this.props
		const Menu = () => (
			<InventoryMenu history={history} />
		)

		const content = (
			<div style={styles.container}>
				<Route exact path="/inventory" component={Menu} />
			</div>
		)
		return (
			<Page pageTitle="Inventory"
				pageIcon="fa fa-angle-left"
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