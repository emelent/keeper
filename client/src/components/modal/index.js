import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import TitleBar from '../titleBar'

import './style.css'

export default class Modal extends Component{

	render(){
		const {content, title, bgColor, isOpen, onClose, style} = this.props
		const s = Object.assign({}, style, {backgroundColor: bgColor})
		const cn = cx('modal', {
			'modal--open': isOpen
		})
		return (
			<div className={cn} style={s}>
				<TitleBar title={title || ""}
					icon="fa fa-angle-left"
					onIconClick={onClose}
				/>
				{content}
			</div>
		)
	}
}

Modal.propTypes = {
	content: PropTypes.element,
	title: PropTypes.string,
	onClose: PropTypes.func,
	bgColor: PropTypes.string,
	isOpen: PropTypes.bool
}

Modal.defaultProps = {
	isOpen: false
}