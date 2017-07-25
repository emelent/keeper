import {
	createStore,
	applyMiddleware,
	combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import {
	routerMiddleware,
	routerReducer
} from 'react-router-redux'

import {history} from '../../config'
import rootReducer from '../reducers'


const middleware = routerMiddleware(history)

const configureStore = preloadedState => createStore(
	combineReducers({
		...rootReducer,
		router: routerReducer
	}),
	preloadedState,
	applyMiddleware(middleware, thunk)
)

export default configureStore
