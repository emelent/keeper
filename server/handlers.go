package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func jsonEncode(w http.ResponseWriter, v interface{}) {
	if err := json.NewEncoder(w).Encode(v); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func jsonDecode(r *http.Request, v Validator) error {
	if err := json.NewDecoder(r.Body).Decode(v); err != nil {
		return nil
	}
	return v.OK()
}

//MakeCreateProductHandler endpoint
func MakeCreateProductHandler(dbSession interface{}) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		db := dbSession.(*mgo.Session).Copy()
		defer db.Close()

		var p Product
		var np NewProduct
		if err := jsonDecode(r, np); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		p.ID = bson.NewObjectId()

		if err := db.DB(dbName).C(collectionNameProducts).Insert(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		jsonEncode(w, p)
	}
}

//MakeGetProductsHandler endpoint
func MakeGetProductsHandler(dbSession interface{}) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		db := dbSession.(*mgo.Session).Copy()
		defer db.Close()
		var products []*Product
		if err := db.DB(dbName).C(collectionNameProducts).
			Find(nil).Sort("-name").All(&products); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		jsonEncode(w, products)
	}
}

//MakeUpdateProductHandler endpoint
func MakeUpdateProductHandler(dbSession interface{}) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		db := dbSession.(*mgo.Session).Copy()
		defer db.Close()

		params := mux.Vars(r)
		productID := bson.ObjectIdHex(params["productID"])
		var p Product
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		p.ID = productID
		if err := db.DB(dbName).C(collectionNameProducts).UpdateId(productID, p); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jsonEncode(w, p)
	}
}
