import React from "react";
import ProductModel from "../model/ProductModel";

async function request(url:string) {
    //truy van den duong dan
    const respone = await fetch(url);
    //neu tra ve loi
    if(!respone.ok){
        throw new Error(`Cannot access ${url}`)
    }
    //neu tra ve ok
    return respone.json();
}
export async function getAllProduct(): Promise<ProductModel[]> {
    const result: ProductModel[] = [];
    const url: string = 'http://localhost:8080/products';
    const response = await request(url);
    const responseData = response._embedded.products;

   for (const item of responseData) {
    const product = new ProductModel(
      item.id,              // ✅ không có dấu _
      item.brand,
      item.description,
      item.name,
      item.price,
      item.stock
    );
    result.push(product);
  }

    return result;
}


