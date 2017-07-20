package database

import mgo "gopkg.in/mgo.v2"

//NewCRUD creates a new CRUD type
func NewCRUD(session *mgo.Session) *CRUD {
	crud := &CRUD{}
	crud.Session = session
	return crud
}
