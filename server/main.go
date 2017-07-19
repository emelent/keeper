package main

import (
	"log"
	"math/rand"
	"net/http"
	"time"

	mgo "gopkg.in/mgo.v2"
)

func main() {
	rand.Seed(time.Now().UnixNano())

	dbSession, err := mgo.Dial(dbServer)
	if err != nil {
		log.Fatal("Cannot  dial mgo")
	}
	defer dbSession.Close()
	router := NewRouter(dbSession, LoggerMiddleware, JSONMiddleware, CorsMiddleware)
	port := ":8999"
	log.Printf("Serving on 0.0.0.0 %s\n\n", port)
	log.Fatal(http.ListenAndServe(port, router))

}
