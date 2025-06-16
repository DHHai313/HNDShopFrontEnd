import React from "react";
import ProductModel from "../model/ProductModel";
import { my_request } from "./Request";

export async function getAllProduct(): Promise<ProductModel[]> {
    const result: ProductModel[] = [];
    const url: string = 'http://localhost:8080/products';
    const response = await my_request(url);
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


