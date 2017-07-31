import {
	dbName,
	dbVersion,
	snProducts,
	snReceipts,
	snUpdateTimes
} from './config'


let db


/**
 * Opens indexedDb records connection.
 * 
 * @param {function} onsuccess On success callback
 */
export const openDb = (onsuccess) => {
	const req = indexedDB.open(dbName, dbVersion)
	req.onsuccess = (evt) => {
		db = evt.target.result
		console.log('db opened.')
		if (onsuccess) onsuccess(db)
	}

	//create schema
	req.onupgradeneeded = (evt) =>{
		const result = evt.target.result
		const keyPathId = {keyPath: 'id'}
		//create product store
		const productStore = result.createObjectStore(snProducts, keyPathId)

		const notUniq = {unique: false}

		productStore.createIndex('name', 'name', notUniq)
		productStore.createIndex('brand', 'brand', notUniq)
		productStore.createIndex('category', 'category', notUniq)

		//create receipt store
		const receiptStore = result.createObjectStore(snReceipts, keyPathId)
		receiptStore.createIndex('date', 'date', notUniq)
		receiptStore.createIndex('sale', 'sale', notUniq)

		//create time store
		const timeStore = result.createObjectStore(snUpdateTimes, {keyPath: 'id', autoIncrement: true})
		timeStore.createIndex('time', 'time', notUniq)
	}
	
}

/**
 * Clears all records in a database store.
 * 
 * @param {string} name Database store name.
 * @param {function} onsuccess On success callback.
 * @param {function} onerror On error callback.
 */
export const clearObjectStore = (name, onsuccess, onerror) => {
	const store = getObjectStore(name, 'readwrite')
	const req = store.clear()

	req.onsuccess = () => {
		if (onsuccess) onsuccess()
	}

	req.onerror = (evt) => {
		console.error('clearObjectStore:', evt.target.errorCode)
		if (onerror) onerror()
	}
}

/**
 * Inserts records into the database store.
 * 
 * @param {string} name Database store name.
 * @param {array} records Array of records to insert into the store.
 * @param {function} onsuccess On success callback.
 * @param {function} onerror On error callback.
 */
export const insert = (name, records, onsuccess, onerror) => {
	const store = getObjectStore(name, 'readwrite')

	records.forEach(entry => {
		const req = store.add(entry)
		req.onerror = (evt) => {
			console.log('insertionError:', evt)
			if (onerror) onerror()
		}
		req.onsuccess = () => {
			if (onsuccess) onsuccess()
		}
	})
}

/**
 * Fetch a single record by id.
 * 
 * @param {string} name Database store name.
 * @param {*} id Id of record.
 * @param {function} onsuccess On success callback.
 * @param {function} onerror On error callback.
 */
export const fetchById = (name, id, onsuccess, onerror) => {
	const store = getObjectStore(name, 'readonly')
	const req = store.get(id)
	req.onsuccess = (evt) => {
		if (onsuccess) onsuccess(evt.target.result)
	}
	req.onerror = onerror
}

/**
 * Asynchronously fetches all records within indexedDb 
 * store.
 * 
 * @param {string} name Name of the database store.
 * @param {function} onsuccess Callback when successful.
 * @param {function} onerror Callback when unsuccessful.
 */
export const fetchAll = (name, onsuccess, onerror, newDb) => {
	if (!db && !newDb) {
		openDb((nDb) => fetchAll(name, onsuccess, onerror, nDb))
		return
	}
	db = (db)? db:newDb
	const store = getObjectStore(name, 'readonly')
	const req = store.getAll()
	req.onsuccess = (evt) => {
		if (onsuccess) onsuccess(evt.target.result)
	}
	req.onerror = onerror
}

/**
 * Fetches all results that match a given index value.
 * 
 * @param {string} name Database store name.
 * @param {string} index Index to search.
 * @param {*} val Value to search for in index.
 * @param {function} onsuccess On success callback.
 * @param {function} onerror On error callback
 */
export const fetchByIndex = (name, index, val, onsuccess, onerror) => {
	const store = getObjectStore(name, 'readonly')
	const req = store.index(index).getAll(val)
	req.onsuccess = (evt) => {
		if (onsuccess) onsuccess(evt.target.result)
	}
	req.onerror = onerror
}

/**
 * Creates a new transaction and returns object store from of that
 * transaction.
 * 
 * @param {string} name Database store name.
 * @param {string} mode Database transaction mode.
 * 
 * @return {object}
 */
const getObjectStore = (name, mode) => {
	const tx = db.transaction(name, mode)
	return tx.objectStore(name)
}
