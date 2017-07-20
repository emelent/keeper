package main

import "net/http"

//HandlerMaker makes a handler function
type HandlerMaker func(interface{}) func(http.ResponseWriter, *http.Request)

//Route route struct
type Route struct {
	Method     string
	Path       string
	Handler    http.HandlerFunc
	Maker      HandlerMaker
	Middleware []Middleware
}

var routes = map[string]Route{
	"NewProduct": Route{
		Method: "POST",
		Path:   "/products/new",
		Maker:  NewProductHandler,
	},
	"AllProducts": Route{
		Method: "GET",
		Path:   "/products/all",
		Maker:  AllProductsHandler,
	},
	"UpdateProduct": Route{
		Method: "PUT",
		Path:   "/products/{productID}",
		Maker:  UpdateProductHandler,
	},
}
