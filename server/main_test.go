package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	db "./database"
	mware "./middleware"
	models "./models"
	routing "./routing"
)

var middleware = []mware.Middleware{}

var crud *db.CRUD

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
	handler = mware.ApplyMiddleware(handler, middleware)

	prod := models.NewProduct{
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

	contentType := "application/json"
	if resp.Header.Get("Content-Type") != contentType {
		t.Errorf("Invalid Content-Type, expected '%s' got '%s'", contentType, resp.Header.Get("Content-Type"))
	}
	if respProd.Name != prod.Name {
		t.Error("Response does not match request data")
	}

	if resp.StatusCode != http.StatusCreated {
		t.Errorf("Invalid status code, expected '%d' got '%d'", http.StatusCreated, resp.StatusCode)
	}

}
