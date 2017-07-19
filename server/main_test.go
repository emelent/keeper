package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	mgo "gopkg.in/mgo.v2"
)

const (
	testDbHost = "localhost"
	testDbName = "testMule"
)

var dbSession *mgo.Session

func prepareDbSession(t *testing.T) {
	var err error
	dbSession, err = mgo.Dial(testDbHost)
	if err != nil {
		t.Fatal("Failed to dial database")
	}
}

func createApp() http.Handler {
	router := NewRouter(dbSession)
	return router
}

func failIfError(t *testing.T, err error) {
	if err != nil {
		t.Error(err)
	}
}

func get(t *testing.T, s *httptest.Server, path string) string {
	resp, err := http.Get(s.URL + path)
	failIfError(t, err)

	body, err := ioutil.ReadAll(resp.Body)
	failIfError(t, err)

	return string(body)
}
func TestMain(t *testing.T) {
	prepareDbSession(t)
	defer dbSession.Close()

	s := httptest.NewServer(createApp())
	defer s.Close()

	result := get(t, s, "/products/all")
	fmt.Println(result)
}
