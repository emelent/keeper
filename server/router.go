package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

var globalMiddleware = []Middleware{
	Logger,
	JSONMiddleware,
}

//NewRouter creates a new router
func NewRouter() http.Handler {
	router := mux.NewRouter()

	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Path).
			Name(route.Name).
			Handler(ApplyMiddleware(route.Handler, route.Middleware))
	}
	return ApplyMiddleware(router, globalMiddleware)
}
