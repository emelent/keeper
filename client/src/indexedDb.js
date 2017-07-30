
export const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
export const open = indexedDB.open('MyDb', 1)
export const storeName = 'ShopKeeperStore'
export const productFields =  [
	'id',
	'name',
	'brand',
	'category',
	'quantity',
	'sell',
	'buy'
]

//create schema
open.onupgradeneeded = () =>{
	const db = open.result
	const store = db.createObjectStore(storeName, {keyPath: "id"})
	store.createIndex('products', productFields)
}

export const createTransactionStore = (store, mode) => {
	const tx = open.result.transaction(store, mode)
	return tx.objectStore(store)
}

window.idbOpen = open
window.createTx = createTransactionStore