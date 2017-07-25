import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import configureStore from '../redux/store/configureStore'
import {fetchProducts} from '../redux/actions/inventory'
import App from './app'


const store = configureStore()

store.dispatch(fetchProducts())

const Root = () => (
	<Provider store={store}>

		<Router>
			<App/>
		</Router>
	</Provider>
)

export default Root
