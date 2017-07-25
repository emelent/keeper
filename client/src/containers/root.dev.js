import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import configureStore from '../redux/store/configureStore'
import {fetchProducts} from '../redux/actions/inventory'
import DevTools from './devTools'
import App from './app'


const store = configureStore()

store.dispatch(fetchProducts())

const Root = () => (
	<Provider store={store}>

		<Router>
			<div>
				<App/>
				<DevTools />
			</div>
		</Router>
	</Provider>
)

export default Root
