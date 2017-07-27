import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './style.css'


export default class TitleBar extends Component{
	render(){
		const {title, icon, style} = this.props
		return (
			<div className="title-bar" style={style}>
				<span className={icon + " title-bar__icon"}/>
				<span className="title-bar__text">{title}</span>
			</div>
		)
	}
}

TitleBar.propTypes = {
	title : PropTypes.string.isRequired,
	icon: PropTypes.string
}