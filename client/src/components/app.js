import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'

import TabBar from './tabBar'
import Home from './home'
import Inventory from './inventory'


export default class App extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<Router>
				<div style={styles.container}>
					<div style={styles.content}>
						<Route exact path="/" component={Home} />
						<Route path="/inventory" component={Inventory} />
					</div>
					<TabBar />
				</div>
			</Router>
		)
	}
}

const styles = {
	container:{
		//layout
		position: 'absolute',
		top: 0,
		left: 0,

		//dimensions
		height: '100%',
		width: '100%',

		//theme
		backgroundColor: 'red'
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