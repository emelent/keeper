import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import configureStore from '../redux/store/configureStore'
import {syncWithExternalDb} from '../redux/actions/sync'
// import {fetchProducts} from '../redux/actions/product'

import App from './app'


const store = configureStore()
//sync every 5 min
const syncTime = 5 * 60 * 1000

//perform initial sync
console.log('performing initial sync')
syncWithExternalDb()(store.dispatch)
setInterval(() => {
	console.log('scheduled sync')
	syncWithExternalDb()(store.dispatch)
}, syncTime)

const Root = () => (
	<Provider store={store}>

		<Router>
			<App/>
		</Router>
	</Provider>
)

export default Root
