package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/dbtest"
)

var Server dbtest.DBServer
var Session *mgo.Session

var middleware = []Middleware{
	JSONMiddleware,
}

// TestMain wraps all tests with the needed initialized mock DB and fixtures
func TestMain(m *testing.M) {
	// The tempdir is created so MongoDB has a location to store its files.
	// Contents are wiped once the server stops
	fmt.Println("we do main now")
	tempDir, _ := ioutil.TempDir(".", "testing")
	fmt.Println(tempDir)
	Server.SetPath(tempDir)

	// My main session var is now set to the temporary MongoDB instance
	Session = Server.Session()

	// Make sure to insert my fixtures
	// insertFixtures()

	// Run the test suite
	retCode := m.Run()

	// Make sure we DropDatabase so we make absolutely sure nothing is left or locked while wiping the data and
	// close session
	Session.DB(dbName).DropDatabase()
	Session.Close()

	// Stop shuts down the temporary server and removes data on disk.
	Server.Stop()
	fmt.Println("We R done")
	// call with result of m.Run()
	os.Exit(retCode)
}

func TestNewProductEndpoint(t *testing.T) {
	route := routes["NewProduct"]
	h := http.HandlerFunc(route.Maker(Session))
	handler := ApplyMiddleware(h, route.Middleware)
	handler = ApplyMiddleware(handler, middleware)

	req := httptest.NewRequest("POST", route.Path, nil)
	w := httptest.NewRecorder()
	handler.ServeHTTP(w, req)

	resp := w.Result()
	body, _ := ioutil.ReadAll(resp.Body)

	fmt.Println(resp.StatusCode)
	fmt.Println(resp.Header.Get("Content-Type"))
	fmt.Println(string(body))
}
