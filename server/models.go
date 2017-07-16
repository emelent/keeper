package main

//Product is a model for a typical store product
type Product struct {
	ID       int
	Quantity int

	Sell float32
	Buy  float32

	Name     string
	Brand    string
	Category string
}

//ReceiptItem models either the purchasing of a stock item
//or the selling of a stock item
type ReceiptItem struct {
	ReceiptID int
	ProductID int
	Quantity  int
	Sale      bool
}

//Receipt models the a list of items bought or sold
type Receipt struct {
	ID    int
	Date  string
	Items []ReceiptItem
}
