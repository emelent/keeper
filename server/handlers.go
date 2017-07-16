package main

import (
  "encoding/json"
  "net/http"
)

//SeedProducts function
func SeedProducts(){

  products = append(products, Product{
    ID: RandomString(IDLength),
    Name: "Socks",
    Brand: "Magic Feet",
    Category: "Footwear",
    Quantity: 20,
    Sell: 15.5,
    Buy: 12})
}


//CreateProduct endpoint
func CreateProduct(w http.ResponseWriter, r *http.Request) {
	var prod Product
	_ = json.NewDecoder(r.Body).Decode(&prod)
  prod.ID = RandomString(IDLength)
	products = append(products, prod)
	json.NewEncoder(w).Encode(products)
}

//GetProducts endpoint
func GetProducts(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(products)
}

//UpdateProduct endpoint
func UpdateProduct(w http.ResponseWriter, r *http.Request){
  //params := mux.Vars(r)
  var newProd Product
  _ = json.NewDecoder(r.Body).Decode(&newProd);
  for index, prod := range products{
    if prod.ID == newProd.ID {
      products[index] = newProd
      break
    }
  }

  json.NewEncoder(w).Encode(newProd)
}
