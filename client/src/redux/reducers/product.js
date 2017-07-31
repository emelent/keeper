import {Map, List} from 'immutable'

//initial state
export const intialState = Map({
	products: List(),
	pending: false,
	error: null
})

//product action types
export const actionType = {
	FETCH_PRODUCTS_PENDING: 'FETCH_PRODUCTS',
	FETCH_PRODUCTS_FULFILLED: 'FETCH_PRODUCTS_FULFILLED',
	FETCH_PRODUCTS_REJECTED: 'FETCH_PRODUCTS_REJECTED',

	CLEAR_ERROR: 'CLEAR_PRODUCTS_ERROR'
}

//product reducer
export default (state=intialState, action) => {
	switch (action.type){
		case actionType.FETCH_PRODUCTS_PENDING:
			return state.set('pending', true)

		case actionType.FETCH_PRODUCTS_FULFILLED:
			return state.merge({
				pending: false,
				products: List(action.payload)
			})

		case actionType.FETCH_PRODUCTS_REJECTED:
			return state.merge({
				pending: false,
				error: action.payload
			})
		
		case actionType.CLEAR_ERROR:
			return state.set('error', null)
	}
	
	return state
}