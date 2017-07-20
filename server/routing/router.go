package routing

import (
	"net/http"

	mgo "gopkg.in/mgo.v2"

	"github.com/gorilla/mux"

	mware "../middleware"
)

//NewRouter creates a new router
func NewRouter(dbSession *mgo.Session, middleware ...mware.Middleware) http.Handler {
	router := mux.NewRouter()

	for name, route := range routes {
		h := route.Handler
		if h == nil && route.Maker != nil {
			h = route.Maker(dbSession)
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
