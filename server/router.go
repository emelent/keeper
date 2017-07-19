package main

import (
	"net/http"

	mgo "gopkg.in/mgo.v2"

	"github.com/gorilla/mux"
)

//NewRouter creates a new router
func NewRouter(dbSession *mgo.Session, middleware ...Middleware) http.Handler {
	router := mux.NewRouter()

	for _, route := range routes {
		h := route.Handler
		if h == nil && route.Maker != nil {
			h = route.Maker(dbSession)
		}
		handler := ApplyMiddleware(h, route.Middleware)
		router.
			Methods(route.Method).
			Path(route.Path).
			Name(route.Name).
			Handler(handler)
	}
	return ApplyMiddleware(router, middleware)
}
