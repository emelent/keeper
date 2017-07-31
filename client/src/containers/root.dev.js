import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import configureStore from '../redux/store/configureStore'
import {syncWithExternalDb} from '../redux/actions/sync'
// import {fetchProducts} from '../redux/actions/product'

import App from './app'


const store = configureStore()

// store.dispatch(syncWithExternalDb)
// fetchProducts()(store.dispatch)
syncWithExternalDb()(store.dispatch)
const Root = () => (
	<Provider store={store}>

		<Router>
			<App/>
		</Router>
	</Provider>
)

export default Root
