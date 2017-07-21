package middleware

import (
	"log"
	"net/http"
	"time"
)

//Middleware func
type Middleware func(http.Handler) http.Handler

//LoggerMiddleware logs each request
func LoggerMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		h.ServeHTTP(w, r)

		log.Printf(
			"%s %s %s",
			r.Method,
			r.RequestURI,
			time.Since(start),
		)
	})
}

//CorsMiddleware allows cross origin access
func CorsMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Allow-Cross-Origin", "*")
		h.ServeHTTP(w, r)
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
