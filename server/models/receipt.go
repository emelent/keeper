package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

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
