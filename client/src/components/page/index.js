import React, {Component} from 'react'
import PropTypes from 'prop-types'

import TitleBar from '../titleBar'

export default class Page extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {style, content, pageTitle, pageIcon} = this.props
		const s = Object.assign({}, styles.container, style)
		return (
			<div style={s}>
				<TitleBar title={pageTitle} icon={pageIcon} />
				{content}
			</div>
		)
	}
}

Page.propTypes = {
	content: PropTypes.element,
	pageTitle: PropTypes.string.isRequired,
	pageIcon: PropTypes.string
}

const styles = {
	container:{
		//layout
		position: 'absolute',
		top: 0,
		left: 0,

		//dimension
		width: '100%',
		height: '100%'
		//thm
	}
}