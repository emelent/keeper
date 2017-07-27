import React, {Component} from 'react'
import cx from 'classnames'

import Tile from '../tile'
import './style.css'


export default class InventoryMenu extends Component{

	render(){
		const {style} = this.props
		const cn = cx('tile-menu')
		return (
			<div style={style} className={cn}>
				<Tile
					text="Available"
					icon="icon icon-pants"
				/>
				<Tile
					text="Sold Out"
					icon="icon icon-hanger"
					bgColor="#8E44AD"
				/>
				<Tile
					text="All"
					icon="icon icon-sox"
					bgColor="#DA3C78"
				/>
				<Tile
					text="Add"
					icon="icon icon-tshirt"
					bgColor="#1EBC61"
				/>
			</div>
		)
	}
}