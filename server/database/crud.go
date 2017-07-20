package database

import (
	config "../config"
	mgo "gopkg.in/mgo.v2"
)

//CRUD is a db abstraction layer used to perforom testing
//as well as interact with the mgo
type CRUD struct {
	Session     *mgo.Session
	CopySession *mgo.Session
	TempStorage map[string][]interface{}
}

//InitCopy initialises a copy session if one is not ready
func (db *CRUD) InitCopy() {
	if db.Session != nil && db.CopySession == nil {
		db.CopySession = db.Session.Copy()
	}
}

//Insert inserts into db
func (db *CRUD) Insert(collection string, value interface{}) error {
	//mock
	if db.Session == nil {
		db.TempStorage[collection] = append(db.TempStorage[collection], value)
		return nil
	}

	db.InitCopy()
	err := db.CopySession.DB(config.DbName).C(collection).Insert(value)
	return err
}

//FindAll  finds all matching db entries
func (db *CRUD) FindAll(collection string, query interface{}) ([]interface{}, error) {
	//mock
	if db.Session == nil {
		return db.TempStorage[collection], nil
	}

	db.InitCopy()
	var results []interface{}
	err := db.CopySession.DB(config.DbName).C(collection).Find(query).All(&results)
	return results, err
}

//FindOne finds a db entry
func (db *CRUD) FindOne(collection string, query interface{}) (interface{}, error) {
	//mock
	if db.Session == nil {
		return db.TempStorage[collection], nil
	}

	db.InitCopy()
	var result interface{}
	err := db.CopySession.DB(config.DbName).C(collection).Find(query).One(&result)
	return result, err
}

//Update a db entry
func (db *CRUD) Update(collection string, values *[]interface{}) {
	//mock
	if db.Session == nil {

	}
}

//UpdateID updates entry by id
func (db *CRUD) UpdateID(collection string, id, value interface{}) error {
	//mock
	if db.Session == nil {
		//TODO implement mock
		return nil
	}

	db.InitCopy()
	return db.CopySession.DB(config.DbName).C(collection).UpdateId(id, value)
}

//Delete a db entry
func (db *CRUD) Delete(collection string, value interface{}) {
	//mock
	if db.Session == nil {

	}
}

//Close closes both the copy and the original db session
func (db *CRUD) Close() {
	if db.Session != nil {
		db.CloseCopy()
		db.Close()
		db.Session = nil
	}
}

//CloseCopy closes copy db session
func (db *CRUD) CloseCopy() {
	if db.CopySession != nil {
		db.CopySession.Close()
		db.CopySession = nil
	}
}