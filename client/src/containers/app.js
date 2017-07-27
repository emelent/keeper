import React, { Component } from 'react'
import {
	Route
} from 'react-router-dom'

import TabBar from '../components/tabBar'
import Home from './home'
import Inventory from './inventory'


export default class App extends Component{
	render(){
		return (
			<div style={styles.container}>
				<div style={styles.content}>
					<Route exact path="/" component={Home} />
					<Route path="/inventory" component={Inventory} />
				</div>
				<TabBar />
			</div>
		)
	}
}

const styles = {
	container:{
		//layout
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: 'auto',
		overflow: 'hidden',

		//dimensions
		height: 900,
		maxHeight: '100%',
		width: 800,
		maxWidth: '100%',

		//theme
		backgroundColor: '#eee',
		boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
	},
	content: {
		//layout
		//dimensions
		height: 'calculate(100% - 80px)',
		width: '100%',

		//theme
		backgroundColor:'orange'
	}
}