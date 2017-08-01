import React, { Component } from 'react'
import {
	withRouter,
	Switch,
	Route
} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {openDb} from '../db'
import {syncWithExternalDb, clearError} from '../redux/actions/sync'

import TabBar from '../components/tabBar'
import Purchase from './purchase'
import Inventory from './inventory'
import Analysis from './analysis'
import Settings from './settings'
import Page from '../components/page'

openDb()

const UnknownRoute = () => {
	const content = (
		<div className="page-not-found">
			<h2>404 Page Not Found</h2>
		</div>
	)
	return (
		<Page pageTitle="" content={content} />
	)
}
class App extends Component{
	render(){
		return (
			<div style={styles.container}>
				<div style={styles.content}>
					<Switch>
						<Route exact path="/" component={Purchase} />
						<Route exact path="/inventory" component={Inventory} />
						<Route exact path="/analysis" component={Analysis} />
						<Route exact path="/settings" component={Settings} />
						<Route component={UnknownRoute} />
					</Switch>
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
		backgroundColor: '#1C2A39',
		color: '#eee',
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
const mapStateToProps = (state) => ({
	sync: state.sync
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
	syncWithExternalDb,
	clearError
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))