import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Tile from '../tile'
import './style.css'


export default class InventoryMenu extends Component{

	render(){
		const {style, onTileClick} = this.props
		return (
			<div style={style} className="tile-menu">
				<Tile
					text="Available"
					icon="icon icon-pants"
					onClick={() => onTileClick('available')}
					bgColor="#0287D0"
				/>
				<Tile
					text="Sold Out"
					icon="icon icon-hanger"
					bgColor="#8E44AD"
					onClick={() => onTileClick('sold out')}
				/>
				<Tile
					text="All"
					icon="icon icon-sox"
					bgColor="#DA3C78"
					onClick={() => onTileClick('all')}
				/>
				<Tile
					text="Add"
					icon="icon icon-plus"
					bgColor="#1EBC61"
					onClick={() => onTileClick('add')}
				/>
			</div>
		)
	}
}

InventoryMenu.propTypes = {
	onTileClick: PropTypes.func.isRequired
}