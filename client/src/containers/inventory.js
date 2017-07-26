import React,{Component} from 'react'
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux'
// import {
// 	Route
// } from 'react-router'

import Page from '../components/page'

import {fetchProducts, clearError} from '../redux/actions/inventory'

class Inventory extends Component{

	render(){
		// const products = this.props.inventory.get('products')
		const content = (
			<div style={styles.container}>
				{
					//<Route path="available" component={} />
				}
			</div>
		)
		return (
			<Page pageTitle="Inventory"
				pageIcon="fa-angle-left"
				content={content}
			/>
		)
	}
}

const styles = {
	container:{

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