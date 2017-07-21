package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

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

// TestMain wraps all tests with the needed initialized mock DB and fixtures
func TestMain(m *testing.M) {
	// Set up
	crud = db.NewCRUD(nil)

	// Run the test suite
	retCode := m.Run()

	// Clean up
	crud.Close()

	// call with result of m.Run()
	os.Exit(retCode)
}

func Test_NewProductEndpoint(t *testing.T) {
	route := routing.Routes["NewProduct"]
	h := http.HandlerFunc(route.Maker(crud))
	handler := mware.ApplyMiddleware(h, route.Middleware)

	prod := models.Product{
		Name:     "Yuka Socks",
		Brand:    "Magic Feet",
		Category: "Footwear",
		Quantity: 20,
		Sell:     55.5,
		Buy:      35,
	}

	prodJSON, _ := json.Marshal(prod)
	req := httptest.NewRequest("POST", route.Path, bytes.NewBuffer(prodJSON))

	req.Header.Add("Content-Type", "application/json")
	w := httptest.NewRecorder()
	handler.ServeHTTP(w, req)
	resp := w.Result()
	body, _ := ioutil.ReadAll(resp.Body)
	var respProd models.Product

	_ = json.Unmarshal(body, &respProd)
	assert := assert.New(t)
	assert.Equal(http.StatusCreated, resp.StatusCode, invalidStatusCode)
	assert.Equal(jsonContentType, resp.Header.Get("Content-Type"), invalidContentType)
	assert.True(prod.Equals(respProd), unexpectedResponse)
}
