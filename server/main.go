package main

import (
	"log"
	"math/rand"
	"net/http"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	SeedProducts()
	router := NewRouter()
	port := ":8999"
	log.Println("Serving on 0.0.0.0", port)
	log.Fatal(http.ListenAndServe(port, router))

}
