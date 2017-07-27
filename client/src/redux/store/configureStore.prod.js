import {
	createStore,
	applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
'react-router-redux'

import rootReducer from '../reducers'


const configureStore = preloadedState => createStore(
	rootReducer,
	preloadedState,
	applyMiddleware(thunk)
)

export default configureStore
