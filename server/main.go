package main

import (
	"log"
	"math/rand"
	"net/http"
	"time"

	config "./config"
	db "./database"
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
	crud := &db.CRUD{}
	crud.Session = dbSession
	defer crud.Close()
	router := routing.NewRouter(crud,
		mware.LoggerMiddleware,
		mware.JSONMiddleware,
		mware.CorsMiddleware,
	)
	port := ":8999"
	log.Printf("Serving on 0.0.0.0 %s\n\n", port)
	log.Fatal(http.ListenAndServe(port, router))

}
