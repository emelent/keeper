import {Map, Set} from 'immutable'

//intial state
export const initialState = Map({
	//stores newly added products yet to be sent to api
	products: Set(),
	pending: false,
	error: null
})

//sync action types
export const actionType = {
	SYNC_PENDING: 'SYNC_PENDING',
	SYNC_FULFILLED: 'SYNC_FULFILLED',
	SYNC_REJECTED: 'SYNC_REJECTED',

	ADD_NEW_PRODUCT_PENDING: 'ADD_NEW_PRODUCT',
	ADD_NEW_PRODUCT_FULFILLED: 'ADD_NEW_PRODUCT_FULFILLED',
	ADD_NEW_PRODUCT_REJECTED: 'ADD_NEW_PRODUCT_REJECTED',

	CLEAR_ERROR: 'CLEAR_SYNC_ERROR'
}

//sync reducer
export default (state=initialState, action) => {
	switch (action.type){
		case actionType.SYNC_PENDING:
			return state.set('pending', true)

		case actionType.SYNC_FULFILLED:
			//don't do anything if there was an error, i.e. don't clear
			//the stored data
			if (state.get('error'))
				return state
			return state.merge({
				pending: false,
				products: Set()
			})

		case actionType.SYNC_REJECTED:
			return state.merge({
				pending: false,
				error: action.payload
			})


		//Adding product
		case actionType.ADD_NEW_PRODUCT_PENDING:
			return state.set('pending', true)

		case actionType.ADD_NEW_PRODUCT_FULFILLED:
			return state.merge({
				pending: false,
				products: state.get('products').add(action.payload)
			})

		case actionType.ADD_NEW_PRODUCT_REJECTED:
			return state.merge({
				pending: false,
				error: action.payload
			})
		
		case actionType.CLEAR_ERROR:
			return state.set('error', null)
	}

	return state
}