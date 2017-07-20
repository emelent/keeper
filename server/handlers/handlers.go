package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	"gopkg.in/mgo.v2/bson"

	db "../database"
	models "../models"
)

const productsCollection = "products"

func jsonEncode(w http.ResponseWriter, v interface{}) {
	if err := json.NewEncoder(w).Encode(v); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func jsonDecode(r *http.Request, v models.Validator) error {
	if err := json.NewDecoder(r.Body).Decode(v); err != nil {
		return nil
	}
	return v.OK()
}

//NewProductHandler endpoint
func NewProductHandler(crud *db.CRUD) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		defer crud.CloseCopy()

		var np models.NewProduct
		if err := jsonDecode(r, &np); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		p := models.Product{
			Name:     np.Name,
			Brand:    np.Brand,
			Buy:      np.Buy,
			Sell:     np.Sell,
			Category: np.Category,
			Quantity: np.Quantity,
		}
		p.ID = bson.NewObjectId()

		if err := crud.Insert(productsCollection, p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		w.WriteHeader(http.StatusCreated)
		jsonEncode(w, p)
	}
}

//AllProductsHandler endpoint
func AllProductsHandler(crud *db.CRUD) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		defer crud.CloseCopy()

		products, err := crud.FindAll(productsCollection, nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		jsonEncode(w, products)
	}
}

//UpdateProductHandler endpoint
func UpdateProductHandler(crud *db.CRUD) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		defer crud.CloseCopy()

		params := mux.Vars(r)
		productID := bson.ObjectIdHex(params["productID"])
		var p models.Product
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		p.ID = productID
		if err := crud.UpdateID(productsCollection, productID, p); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jsonEncode(w, p)
	}
}
