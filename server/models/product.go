package models

import (
	e "../errors"
	"gopkg.in/mgo.v2/bson"
)

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

//Equals compares two Product structs
func (p Product) Equals(q Product) bool {
	if p.Name != q.Name {
		return false
	}
	if p.Brand != q.Brand {
		return false
	}
	if p.Category != q.Category {
		return false
	}
	if p.Quantity != q.Quantity {
		return false
	}
	if p.Sell != q.Sell {
		return false
	}
	if p.Buy != q.Buy {
		return false
	}

	return true
}

//OK validates Product fields
func (p Product) OK() error {
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
