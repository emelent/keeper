package main

import "net/http"

//Route route struct
type Route struct {
	Name    string
	Method  string
	Path    string
	Handler http.HandlerFunc
}

var routes = []Route{
	Route{
		Name:    "New Product",
		Method:  "POST",
		Path:    "/products/new",
		Handler: CreateProduct,
	},
	Route{
		Name:    "Update Product",
		Method:  "POST",
		Path:    "/products/update",
		Handler: UpdateProduct,
	},
	Route{
		Name:    "Get Products",
		Method:  "GET",
		Path:    "/products/all",
		Handler: GetProducts,
	},
}
