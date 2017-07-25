import axios from 'axios'

import {apiUrl} from '../../config'
import {actionType} from '../reducers/inventory'


export const fetchProducts = () => (dispatch) => {
	dispatch({type: actionType.FETCH_PRODUCTS_PENDING})

	axios.get(`${apiUrl}/products/all`)
		.then((res) => {
			dispatch({
				type: actionType.FETCH_PRODUCTS_FULFILLED,
				payload: res.data
			})
		})
		.catch((err) => {
			dispatch({
				type: actionType.FETCH_PRODUCTS_REJECTED,
				payload: err.response || 'Failed to connect to server.'
			})
		})
}

export const clearError = () => (dispatch) => dispatch({
	type: actionType.CLEAR_ERROR
})