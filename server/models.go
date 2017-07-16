package main

//IDLength length of id
const IDLength = 10

//Product is a model for a typical store product
type Product struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Brand    string `json:"brand"`
	Category string `json:"category"`

	Quantity int `json:"quantity"`

	Sell float32 `json:"sell"`
	Buy  float32 `json:"buy"`
}

//ReceiptItem models either the purchasing of a stock item
//or the selling of a stock item
type ReceiptItem struct {
	ProductID string `json:"productID"`
	Quantity  int    `json:"quantity"`
	Sale      bool   `json:"sale"`
}

//Receipt models the a list of items bought or sold
type Receipt struct {
	ID   string `json:"id"`
	Date string `json:"date"`

	Sale  bool          `json:"sale"`
	Items []ReceiptItem `json:"items"`
}

//mock database with products array
var products []Product
