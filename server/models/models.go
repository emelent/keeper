package models

//IDLength length of id
const IDLength = 10

//Validator is an interface that's used to validate a model struct
//before it is stored(in the database)
type Validator interface {
	OK() error
}
