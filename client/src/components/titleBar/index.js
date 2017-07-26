import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class TitleBar extends Component{
	render(){
		const {title, icon, style} = this.props
		const iconName = "fa " + icon
		const s = Object.assign({}, styles.container, style)
		return (
			<div style={s}>
				<div>
					<span style={styles.icon} className={iconName}/>
					<span>{title}</span>
				</div>
			</div>
		)
	}
}

TitleBar.propTypes = {
	title : PropTypes.string.isRequired,
	icon: PropTypes.string
}

const styles = {
	container:{
		//layout
		position: 'absolute',
		top: 0,
		left: 0,

		//dimensions
		width: '100%',
		height: 80,

		//theme
		backgroundColor: '#fff',
		color: '#222'
	}
}