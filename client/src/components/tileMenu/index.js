import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Tile from '../tile'
import './style.css'


export default class TileMenu extends Component{

	createTiles(){
		const {tiles, onTileClick} = this.props

		return tiles.map((tile) => (
			<Tile key={tile.name}
				text={tile.name}
				icon={tile.icon}
				onClick={() => onTileClick(tile.name)}
				bgColor={tile.bgColor}
				fgColor={tile.fgColor}
			/>
		))
	}

	render(){
		const {style, className} = this.props
		const cn = cx('tile-menu', className)
		return (
			<div style={style} className={cn}>
				{this.createTiles()}
			</div>
		)
	}
}

TileMenu.propTypes = {
	onTileClick: PropTypes.func.isRequired,
	tiles: PropTypes.array.isRequired,
	className: PropTypes.string
}