import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './style.css'


export default class TitleBar extends Component{
	render(){
		const {title, icon, onIconClick, style} = this.props
		return (
			<div className="title-bar" style={style}>
				{icon !== "" &&
					<span className={icon + " title-bar__icon"}
						onClick={onIconClick}
					/>
				}
				<span className="title-bar__text">{title}</span>
			</div>
		)
	}
}

TitleBar.propTypes = {
	title : PropTypes.string.isRequired,
	icon: PropTypes.string,
	onIconClick: PropTypes.func
}