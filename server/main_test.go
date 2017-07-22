package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"gopkg.in/mgo.v2/bson"

	"github.com/stretchr/testify/assert"

	db "./database"
	mware "./middleware"
	models "./models"
	routing "./routing"
)

var crud *db.CRUD

//Fail messages
const (
	invalidContentType = "Invalid Content-Type header."
	unexpectedResponse = "Unexpected response data."
	invalidStatusCode  = "Invalid status code."
	jsonContentType    = "application/json"
)

func TestMain(m *testing.M) {
	crud = db.NewCRUD(nil)
	retCode := m.Run()
	crud.Close()

	os.Exit(retCode)
}

//==================================
// HELPER FUNCTIONS
//==================================

func generateProductFixture(n int) []models.Product {
	products := make([]models.Product, n)
	for i := 0; i < n; i++ {
		products[i] = models.Product{
			ID:       bson.NewObjectId(),
			Name:     "Item " + string(i),
			Brand:    "Brand",
			Category: "Stuff",
			Quantity: 20,
			Sell:     55.5,
			Buy:      35,
		}
	}

	return products
}

//prepareHandler prepares a handler which matches the same name
//from the Routes map
func prepareHandler(name string) http.Handler {
	route := routing.Routes[name]
	handler := mware.ApplyMiddleware(http.HandlerFunc(route.Maker(crud)), route.Middleware)
	return handler
}

//==================================
// TEST HANDLERS
//==================================
func Test_NewProductHandler(t *testing.T) {
	handler := prepareHandler("NewProduct")
	prod := models.Product{
		Name:     "Yuka Socks",
		Brand:    "Magic Feet",
		Category: "Footwear",
		Quantity: 20,
		Sell:     55.5,
		Buy:      35,
	}
	prodJSON, _ := json.Marshal(prod)

	req := httptest.NewRequest("POST", "/", bytes.NewBuffer(prodJSON))
	req.Header.Add("Content-Type", "application/json")
	w := httptest.NewRecorder()
	handler.ServeHTTP(w, req)
	res := w.Result()
	body, _ := ioutil.ReadAll(res.Body)

	var respProd models.Product
	_ = json.Unmarshal(body, &respProd)

	assert := assert.New(t)
	assert.Equal(http.StatusCreated, res.StatusCode, invalidStatusCode)
	assert.Equal(jsonContentType, res.Header.Get("Content-Type"), invalidContentType)
	assert.True(prod.Equals(respProd), unexpectedResponse)
}

func Test_AllProductsHandler(t *testing.T) {
	handler := prepareHandler("AllProducts")
	req := httptest.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()
	handler.ServeHTTP(w, req)
	res := w.Result()

	assert := assert.New(t)
	assert.Equal(http.StatusOK, res.StatusCode, invalidStatusCode)
	assert.Equal(jsonContentType, res.Header.Get("Content-Type"), invalidContentType)
}

func Test_UpdateProductsHandler(t *testing.T) {
	products := generateProductFixture(10)
	crud.Insert("products", products)
	ts := httptest.NewServer(routing.NewRouter(crud))
	defer ts.Close()

	id := products[0].ID
	url := ts.URL + "/products/" + id.Hex()
	updateProd := models.Product{
		ID:       id,
		Name:     "Yuka Socks",
		Brand:    "Magic Feet",
		Category: "Footwear",
		Quantity: 20,
		Sell:     55.5,
		Buy:      35,
	}
	payload, _ := json.Marshal(updateProd)

	req, _ := http.NewRequest("PUT", url, bytes.NewBuffer(payload))
	req.Header.Add("content-type", "application/json")

	res, _ := http.DefaultClient.Do(req)
	assert := assert.New(t)

	body, _ := ioutil.ReadAll(res.Body)

	var respProd models.Product
	_ = json.Unmarshal(body, &respProd)

	assert.Equal(http.StatusOK, res.StatusCode, invalidStatusCode)
	assert.Equal(jsonContentType, res.Header.Get("Content-Type"), invalidContentType)
	assert.True(updateProd.Equals(respProd), unexpectedResponse)
}
