import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Page from '../components/page'

import TileMenu from '../components/tileMenu'
import ProductList from '../components/productList'
import Modal from '../components/modal'
import {fetchProducts, clearError} from '../redux/actions/inventory'


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
const tiles = [
	{
		name: 'available',
		icon: 'icon icon-pants',
		bgColor: '#0287D0'
	},
	{
		name:'sold out',
		icon:'icon icon-hanger',
		bgColor:'#8E44AD'
	},
	{
		name:'all',
		icon:'icon icon-sox',
		bgColor:'#DA3C78'
	},
	{
		name:'add',
		icon:'icon icon-plus',
		bgColor:'#1EBC61'
	}
]
const fields = ['name', 'brand', 'quantity', 'sell']
const createProductList = (products, fields) => (
	<ProductList products={products}
		fields={fields}
		 />
)


const mapStateToProps = (state) => ({
	inventory: state.inventory
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
	fetchProducts,
	clearError
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Inventory)