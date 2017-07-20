package models

import (
	"time"

	e "../errors"
	"gopkg.in/mgo.v2/bson"
)

//IDLength length of id
const IDLength = 10

//Validator is an interface that's used to validate a model struct
//before it is stored(in the database)
type Validator interface {
	OK() error
}

//Product is a model for a typical store product
type Product struct {
	ID       bson.ObjectId `json:"id" bson:"_id"`
	Name     string        `json:"name" bson:"name"`
	Brand    string        `json:"brand"  bson:"brand"`
	Category string        `json:"category" bson:"category"`

	Quantity int `json:"quantity" bson:"quantity"`

	Sell float32 `json:"sell" bson:"sell"`
	Buy  float32 `json:"buy" bson:"buy"`
}

//NewProduct is used as a model for validating product creation
type NewProduct struct {
	Name     string `json:"name" bson:"name"`
	Brand    string `json:"brand"  bson:"brand"`
	Category string `json:"category" bson:"category"`

	Quantity int `json:"quantity" bson:"quantity"`

	Sell float32 `json:"sell" bson:"sell"`
	Buy  float32 `json:"buy" bson:"buy"`
}

//OK validates NewProduct
func (p NewProduct) OK() error {
	if p.Name == "" {
		return e.MissingFieldError{"name"}
	}
	if p.Brand == "" {
		return e.MissingFieldError{"brand"}
	}
	if p.Category == "" {
		return e.MissingFieldError{"category"}
	}
	if p.Sell == 0 {
		return e.MissingFieldError{"sell"}
	}
	if p.Buy == 0 {
		return e.MissingFieldError{"buy"}
	}
	return nil
}

//ReceiptItem models either the purchasing of a stock item
//or the selling of a stock item
type ReceiptItem struct {
	ProductID bson.ObjectId `json:"productID" bson:"_id"`
	Quantity  int           `json:"quantity" bson:"quantity"`
	Sale      bool          `json:"sale" bson:"sale"`
}

//Receipt models the a list of items bought or sold
type Receipt struct {
	ID   bson.ObjectId `json:"id" bson:"_id"`
	Date time.Time     `json:"date" bson:"date"`

	Sale  bool          `json:"sale" bson:"sale"`
	Items []ReceiptItem `json:"items" bson:"items"`
}
