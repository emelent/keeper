package main

import (
	"log"
	"math/rand"
	"net/http"
	"time"

	config "./config"
	mware "./middleware"
	routing "./routing"
	mgo "gopkg.in/mgo.v2"
)

func main() {
	rand.Seed(time.Now().UnixNano())

	dbSession, err := mgo.Dial(config.DbHost)
	if err != nil {
		log.Fatal("Cannot  dial mgo")
	}
	defer dbSession.Close()
	router := routing.NewRouter(dbSession,
		mware.LoggerMiddleware,
		mware.JSONMiddleware,
		mware.CorsMiddleware,
	)
	port := ":8999"
	log.Printf("Serving on 0.0.0.0 %s\n\n", port)
	log.Fatal(http.ListenAndServe(port, router))

}
