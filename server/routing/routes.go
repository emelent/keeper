package routing

import (
	"net/http"

	handler "../handlers"
	mware "../middleware"
)

//HandlerMaker makes a handler function
type HandlerMaker func(interface{}) func(http.ResponseWriter, *http.Request)

//Route route struct
type Route struct {
	Method     string
	Path       string
	Handler    http.HandlerFunc
	Maker      HandlerMaker
	Middleware []mware.Middleware
}

var routes = map[string]Route{
	"NewProduct": Route{
		Method: "POST",
		Path:   "/products/new",
		Maker:  handler.NewProductHandler,
	},
	"AllProducts": Route{
		Method: "GET",
		Path:   "/products/all",
		Maker:  handler.AllProductsHandler,
	},
	"UpdateProduct": Route{
		Method: "PUT",
		Path:   "/products/{productID}",
		Maker:  handler.UpdateProductHandler,
	},
}
