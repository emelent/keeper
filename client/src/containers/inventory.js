import React,{Component} from 'react'
import {
	connect
} from 'react-redux'
import {bindActionCreators} from 'redux'

import Page from '../components/page'

import InventoryMenu from '../components/inventoryMenu'
import ProductList from '../components/productList'
import Modal from '../components/modal'
import {fetchProducts, clearError} from '../redux/actions/inventory'


const fields = ['name', 'brand', 'quantity', 'sell']
const createProductList = (products, fields) => (
	<ProductList products={products}
		fields={fields}
		 />
)

class Inventory extends Component{

	constructor(props){
		super(props)

		this.state = {
			modal: null
		}
		this.handleTileClick = this.handleTileClick.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
	}

	handleTileClick(name){
		this.setState({modal: name})
	}

	handleModalClose(){
		this.setState({modal: null})
	}

	getModalContent(){
		const products = this.props.inventory.get('products').toArray()
		switch (this.state.modal){
			case 'available':
				return createProductList(
					products.filter(p => p.quantity > 0),
					fields
				)
			case 'sold out':
				return createProductList(
					products.filter(p => p.quantity < 5),
					fields
				)
			case 'all':
				return createProductList(products, fields)
		}
		return null
	}

	getModalBgColor(){
		switch (this.state.modal){
			case 'available':
				return '#0287D0'
			case 'sold out':
				return '#8E44AD'
			case 'all':
				return '#DA3C78'
			case 'add':
				return '#1EBC61'
		}
	}

	render(){
		const {history} = this.props
		const {modal} = this.state
		const content = (
			<div style={styles.container}>
				<InventoryMenu history={history} onTileClick={this.handleTileClick}/>
				<Modal title={modal}
					content={this.getModalContent()}
					isOpen={modal !== null}
					onClose={this.handleModalClose}
					bgColor={this.getModalBgColor()}
				/>
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