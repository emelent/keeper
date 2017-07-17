package main

import "net/http"

//HandlerMaker makes a handler function
type HandlerMaker func(interface{}) func(http.ResponseWriter, *http.Request)

//Route route struct
type Route struct {
	Name       string
	Method     string
	Path       string
	Handler    http.HandlerFunc
	Maker      HandlerMaker
	Middleware []Middleware
}

var routes = []Route{
	Route{
		Name:   "New Product",
		Method: "POST",
		Path:   "/products/new",
		Maker:  MakeCreateProductHandler,
	},
	Route{
		Name:   "Get Products",
		Method: "GET",
		Path:   "/products/all",
		Maker:  MakeGetProductsHandler,
	},
	Route{
		Name:   "Update Product",
		Method: "PUT",
		Path:   "/products/{productID}",
		Maker:  MakeUpdateProductHandler,
	},
}
