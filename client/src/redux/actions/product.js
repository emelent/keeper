import {actionType} from '../reducers/product'
import {fetchAll} from '../../db'
import {snProducts} from '../../config'

export const fetchProducts = () => (dispatch) => {
	dispatch({type: actionType.FETCH_PRODUCTS_PENDING})
	const onsuccess = (products) => dispatch({
		type: actionType.FETCH_PRODUCTS_FULFILLED,
		payload: products
	})
	const onerror = (err) => dispatch({
		type: actionType.FETCH_PRODUCTS_REJECTED,
		payload: err
	})
	fetchAll(snProducts, onsuccess, onerror)
}

export const clearError = () => (dispatch) => dispatch({
	type: actionType.CLEAR_ERROR
})