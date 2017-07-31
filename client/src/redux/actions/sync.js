import {actionType} from '../reducers/sync'
import {snProducts, snUpdateTimes, apiUrl} from '../../config'
import {clearObjectStore, insert, fetchAll} from '../../db'

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
	const tenMinutes = 10 * 60
	
	//return true if dt is greater than 10 minutes
	return (dt > tenMinutes)
}

export const syncWithExternalDb = () => (dispatch) =>{
	const onsuccess = (times) => {
		const now = {time: new Date().getTime()}
		//determine whether to synchronize
		if (!doSync(now, times.slice(-1)[0])) return
		
		
		dispatch({type: actionType.SYNC_PENDING})
		syncProducts(dispatch)
		insert(snUpdateTimes, [now])
		dispatch({type: actionType.SYNC_FULFILLED})
	}
	fetchAll(snUpdateTimes, onsuccess)
}

export const clearError = () => (dispatch) => dispatch({
	type: actionType.CLEAR_ERROR
})

const syncProducts = (dispatch) => {
	const onerror = (err) => dispatch({
		type: actionType.SYNC_REJECTED,
		payload: err
	})

	fetch(`${apiUrl}/products/all`)
		.then(response => response.json())
		.then(products => {
			console.log('data =>', products)
			const onsuccess = () => {
				console.log('successfully cleared')
				insert(snProducts, products, null, onerror)
			}
			clearObjectStore(snProducts, onsuccess, onerror)
		})
		.catch(onerror)
}

//async version
// const syncProducts = async () => (dispatch) => {
// 	dispatch({type: actionType.SYNC_PENDING})
// 	const onerror = (err) => dispatch({
// 		type: actionType.SYNC_REJECTED,
// 		payload: err
// 	})

// 	try{
// 		const response = await fetch(`${apiUrl}/products/all`)
// 		const products = await response.json()
		
// 		const onInsertSuccess = () => {
// 			insert(snProducts, products, null, onerror)
// 		}
// 		clearObjectStore(snProducts, onInsertSuccess, onerror)
// 	}catch(err){
// 		onerror(err)
// 	}
// }
