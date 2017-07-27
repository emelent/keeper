import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './style.css'


export default class TabBar extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const {style} = this.props
		const s = Object.assign({}, styles.container, style)
		return (
			<div style={s}>
				<Link to="/" style={styles.icon}><span className="icon icon-cart" /></Link>
				<Link to="/inventory" style={styles.icon}><span className="icon icon-edit" /></Link>
				<Link to="/analysis" style={styles.icon}><span className="icon icon-rating" /></Link>
				<Link to="/settings" style={styles.icon}><span className="icon icon-settings" /></Link>
			</div>
		)
	}
}

const styles = {
	container:{
		//layout
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		left: 0,

		//dim
		width: '100%',
		height: 80,

		//thm
		backgroundColor: '#fff'
	},
	icon:{
		flex: 1,
		textAlign: 'center',
		color: '#222',
		fontSize:'1.3em'
	}
}