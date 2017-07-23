package routing

import (
	"net/http"

	db "../database"
	handler "../handlers"
	mware "../middleware"
)

//HandlerMaker makes a handler function
type HandlerMaker func(*db.CRUD) func(http.ResponseWriter, *http.Request)

//Route route struct
type Route struct {
	Method     string
	Path       string
	Handler    http.HandlerFunc
	Maker      HandlerMaker
	Middleware []mware.Middleware
}

//Routes map of API routes
var Routes = map[string]Route{
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
	"DeleteProduct": Route{
		Method: "DELETE",
		Path:   "/products/{productID}",
		Maker:  handler.DeleteProductHandler,
	},
}
