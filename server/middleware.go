package main

import (
	"log"
	"net/http"
	"time"
)

//Middleware func
type Middleware func(http.Handler) http.Handler

//JSONMiddleware adds json header to responses
func JSONMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		h.ServeHTTP(w, r)
	})
}

//Logger logs each request
func Logger(inner http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		inner.ServeHTTP(w, r)

		log.Printf(
			"%s %s %s",
			r.Method,
			r.RequestURI,
			time.Since(start),
		)
	})
}

//ApplyMiddleware   applies given middleware to router
func ApplyMiddleware(router http.Handler, middleware []Middleware) http.Handler {
	newRouter := router
	for _, m := range middleware {
		newRouter = m(newRouter)
	}
	return newRouter
}
