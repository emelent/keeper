import React, {Component} from 'react'
import cx from 'classnames'

import Tile from '../tile'
import './style.css'


export default class InventoryMenu extends Component{

	render(){
		const {style, history} = this.props
		const cn = cx('tile-menu')
		return (
			<div style={style} className={cn}>
				<Tile
					text="Available"
					icon="icon icon-pants"
					onClick={() => history.push('/inventory/available')}
				/>
				<Tile
					text="Sold Out"
					icon="icon icon-hanger"
					bgColor="#8E44AD"
					onClick={() => history.push('/inventory/soldOut')}
				/>
				<Tile
					text="All"
					icon="icon icon-sox"
					bgColor="#DA3C78"
					onClick={() => history.push('/inventory/all')}
				/>
				<Tile
					text="Add"
					icon="icon icon-plus"
					bgColor="#1EBC61"
					onClick={() => history.push('/inventory/add')}
				/>
			</div>
		)
	}
}

