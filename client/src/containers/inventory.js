import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Page from '../components/page'
import TileMenu from '../components/tileMenu'
import ProductList from '../components/productList'
import Modal from '../components/modal'
import AddInventoryItem from '../components/addInventoryItem'
import StockUp from '../components/stockUp'
import {fetchProducts, clearError} from '../redux/actions/product'
import {createProduct} from '../redux/actions/sync'


class Inventory extends Component{

	constructor(props){
		super(props)

		this.state = {
			modal: null
		}
		this.handleTileClick = this.handleTileClick.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
		this.addItem = this.addItem.bind(this)
		this.stockItem = this.stockItem.bind(this)
	}

	componentDidMount(){
		this.props.fetchProducts()
	}
	handleTileClick(name){
		this.setState({modal: name})
	}

	handleModalClose(){
		this.setState({modal: null})
	}

	addItem(item){
		console.log('Adding =>', item)
		const {fetchProducts, createProduct} = this.props
		createProduct(item, () => {
			fetchProducts()
			this.handleModalClose()
		})
	}

	stockItem(item, qty){
		console.log('qty =>', qty)
		console.log('item =>', item)
		this.handleModalClose()
	}
	getModalContent(){
		const products = this.props.product.get('products').toArray()
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
			case 'stock up':
				return <StockUp products={products}
					onStockClick={this.stockItem}
				/>
			case 'add new item':
				return <AddInventoryItem
					onAddClick={this.addItem}
				/>
		}
		return null
	}

	getModalBgColor(){
		const {modal} = this.state
		if (!modal) return
		return tiles.filter(t => t.name === modal)[0].bgColor
	}

	render(){
		const {modal} = this.state
		const content = (
			<div style={styles.container}>
				<TileMenu  onTileClick={this.handleTileClick}
					tiles={tiles}
				/>
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
const tiles = [
	{
		name: 'available',
		icon: 'icon icon-pants',
		bgColor: '#0287D0'
	},
	{
		name:'sold out',
		icon:'icon icon-hanger',
		bgColor:'#DA3C78'
	},
	{
		name:'stock up',
		icon:'icon icon-maximize',
		bgColor:'#8E44AD'
	},
	{
		name:'add new item',
		icon:'icon icon-plus',
		bgColor:'#27ae60'
	}
]
const fields = ['name', 'brand', 'quantity', 'sell']


const createProductList = (products, fields) => (
	<ProductList products={products}
		fields={fields}
		 />
)


const mapStateToProps = (state) => ({
	product: state.product
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
	fetchProducts,
	createProduct,
	clearError
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Inventory)