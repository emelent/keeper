package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	models "../models"

	config "../config"
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
func NewProductHandler(dbSession interface{}) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		db := dbSession.(*mgo.Session).Copy()
		defer db.Close()

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

		if err := db.DB(config.DbName).C(productsCollection).Insert(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		jsonEncode(w, p)
	}
}

//AllProductsHandler endpoint
func AllProductsHandler(dbSession interface{}) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		db := dbSession.(*mgo.Session).Copy()
		defer db.Close()
		var products []*models.Product
		if err := db.DB(config.DbName).C(productsCollection).
			Find(nil).Sort("-name").All(&products); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		jsonEncode(w, products)
	}
}

//UpdateProductHandler endpoint
func UpdateProductHandler(dbSession interface{}) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		db := dbSession.(*mgo.Session).Copy()
		defer db.Close()

		params := mux.Vars(r)
		productID := bson.ObjectIdHex(params["productID"])
		var p models.Product
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		p.ID = productID
		if err := db.DB(config.DbName).C(productsCollection).UpdateId(productID, p); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jsonEncode(w, p)
	}
}
