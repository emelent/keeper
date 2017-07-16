package main

import (
  "net/http"
  "github.com/gorilla/mux"
)

//NewRouter creates a new router
func NewRouter() http.Handler {
	router := mux.NewRouter()

	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Path).
			Name(route.Name).
			Handler(route.Handler)
	}
	return ApplyMiddleware(router, []Middleware{JSONMiddleware, Logger})
}
