import axios from 'axios'
import {actionType} from '../reducers/sync'
import {
	snProducts,
	snUpdateTimes,
	apiUrl
} from '../../config'
import {
	clearObjectStore,
	 insert,
	 fetchAll
} from '../../db'

/**
 * Decide whether or not to synchronize.
 * 
 * @param {object} now Object containing current time.
 * @param {object} lastUpdate Object containing the time latest update.
 * 
 * return {boolean}
 */
const doSync = (now, lastUpdate) => {
	if (!lastUpdate) return true
	
	//get time in seconds
	const dt = (now.time - lastUpdate.time) / 1000
	const tenMinutes = 5//10 * 60
	
	//return true if dt is greater than 10 minutes
	return (dt > tenMinutes)
}

export const createProduct = (product, fn) => (dispatch) => {
	dispatch({type: actionType.ADD_NEW_PRODUCT_PENDING})
	const onsuccess = () => {
		dispatch({
			type: actionType.ADD_NEW_PRODUCT_FULFILLED,
			payload: product
		})
		if (fn) fn()
	}
	const onerror = (err) => dispatch({
		type: actionType.SYNC_REJECTED,
		payload: err
	})

	insert(snProducts, [product], onsuccess, onerror)
}

export const syncWithExternalDb = (createdProducts) => (dispatch) =>{
	const onsuccess = (times) => {
		const now = {time: new Date().getTime()}
		//determine whether to synchronize
		if (!doSync(now, times.slice(-1)[0])) return
		
		console.log('synchronizing')
		dispatch({type: actionType.SYNC_PENDING})
		const onerror = (err) => dispatch({
			type: actionType.SYNC_REJECTED,
			payload: err
		})
		syncHelper(createdProducts, onerror)
		insert(snUpdateTimes, [now])
		dispatch({type: actionType.SYNC_FULFILLED})
	}
	fetchAll(snUpdateTimes, onsuccess)
}

export const clearError = () => (dispatch) => dispatch({
	type: actionType.CLEAR_ERROR
})

const syncHelper = (createdProducts, onerror) => {
	createdProducts = (createdProducts)? createdProducts: []
	axios.post(`${apiUrl}/sync`, createdProducts)
	  .then((products) => {
			const onsuccess = () => {
				insert(snProducts, products.data, null, onerror)
			}
			clearObjectStore(snProducts, onsuccess, onerror)
		})
	  .catch(onerror)

	//   fetch(`${apiUrl}/sync`, {
	// 	method: 'post',
	// 	headers: {
	// 		'Accept': 'application/json',
	// 		'Content-Type': 'text/plain'
	// 	},
	// 	body: JSON.stringify(createdProducts)
	// })
	// 	.then((response) => response.json())
	// 	.then((products) => {
	// 		console.log('products =>', products)
	// 		const onsuccess = () => {
	// 			insert(snProducts, products, null, onerror)
	// 		}
	// 		clearObjectStore(snProducts, onsuccess, onerror)
	// 	})
	// 	.catch(onerror)
}