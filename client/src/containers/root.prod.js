import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import configureStore from '../redux/store/configureStore'
import {syncWithExternalDb} from '../redux/actions/sync'
import App from './app'


const store = configureStore()
//sync every 5 min
const syncTime = 5 * 60 * 1000

//perform initial sync
syncWithExternalDb()(store.dispatch)

class Root extends Component{

	componentDidMount(){
		this.syncInterval = setInterval(() => {
			console.log('scheduled sync')
			syncWithExternalDb()(store.dispatch)
		}, syncTime)
	}

	componentWillUnmount(){
		clearInterval(this.syncInterval)
	}

	render(){

		return (
			<Provider store={store}>
				<Router>
					<App/>
				</Router>
			</Provider>
		)
	}
}

export default Root
