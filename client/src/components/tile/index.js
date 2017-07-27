import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './style.css'

export default class Tile extends Component{

	constructor(props){
		super(props)
		this.state = {
			pressed: false
		}
		this.handleOnPress = this.handleOnPress.bind(this)
		this.handleOnRelease = this.handleOnRelease.bind(this)
	}

	getTileContainerClassname(){
		return cx({
			'tile--pressed': this.state.pressed
		})
	}

	handleOnPress(){
		this.setState({pressed: true})
	}

	handleOnRelease(){
		this.setState({pressed: false})
	}

	render(){
		const {
			bgColor,
			fgColor,
			icon,
			text,
			style,
			onClick
		} = this.props
		const s = Object.assign(
			{},
			{backgroundColor: bgColor},
			{color: fgColor},
			style
		)
		const iconName = 'icon icon-camera' + icon
		
		return (
			<div style={s}
				onClick={onClick}
				onMouseDown={this.handleOnPress}
				onMouseUp={this.handleOnRelease}
			>
				<div className="">
					<span  className={iconName} />
					<span >{text}</span>
				</div>
			</div>
		)
	}
}

Tile.propTypes = {
	text: PropTypes.string.isRequired,
	icon: PropTypes.string,
	bgColor: PropTypes.string,
	fgColor: PropTypes.string,
	onClick: PropTypes.func
}

Tile.defaultProps = {
	bgColor: '#0287D0',
	fgColor: '#fff',
	icon: ''
}