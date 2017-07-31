import {
	dbName,
	dbVersion,
	snProducts,
	snReceipts
} from './config'


let db


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
	}
	
}

export const clearObjectStore = (name) => {
	const store = getObjectStore(name, 'readwrite')
	const req = store.clear()

	req.onsuccess = () => {
		console.log(`Cleared ${name} store`)
	}

	req.onerror = (evt) => {
		console.error('clearObjectStore:', evt.target.errorCode)
	}
}

export const insert = (name, data) => {
	const store = getObjectStore(name, 'readwrite')

	data.forEach(entry => {
		const req = store.add(entry)
		req.onerror = (evt) => {
			console.log('insertionError:', evt)
		}
		req.onsuccess = () => {}
	})
}

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
export const fetchByIndex = (name, index, val, onsuccess, onerror) => {
	const store = getObjectStore(name, 'readonly')
	const req = store.index(index).getAll(val)
	req.onsuccess = (evt) => {
		if (onsuccess) onsuccess(evt.target.result)
	}
	req.onerror = onerror
}


const getObjectStore = (name, mode) => {
	const tx = db.transaction(name, mode)
	return tx.objectStore(name)
}
