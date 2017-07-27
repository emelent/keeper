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
		left: 0,
		overflow: 'hidden',

		//dimensions
		height: '100%',
		width: '100%',

		//theme
		backgroundColor: '#eee'
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