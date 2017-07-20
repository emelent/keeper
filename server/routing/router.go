package routing

import (
	"net/http"

	"github.com/gorilla/mux"

	db "../database"
	mware "../middleware"
)

//NewRouter creates a new router
func NewRouter(crud *db.CRUD, middleware ...mware.Middleware) http.Handler {
	router := mux.NewRouter()

	for name, route := range Routes {
		h := route.Handler
		if h == nil && route.Maker != nil {
			h = route.Maker(crud)
		}
		handler := mware.ApplyMiddleware(h, route.Middleware)
		router.
			Methods(route.Method).
			Path(route.Path).
			Name(name).
			Handler(handler)
	}
	return mware.ApplyMiddleware(router, middleware)
}
