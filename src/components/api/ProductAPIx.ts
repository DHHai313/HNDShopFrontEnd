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
export async function getAllProductx(): Promise<ProductModel[]> {
  const result: ProductModel[] = [];
  const url: string = "http://localhost:8080/products";
  const response = await request(url);
  const embedded = response._embedded;

  // ✅ Hàm phụ tạo id từ URL
  const extractId = (href: string): string => {
    return href.split("/").pop() || href;
  };

  // ✅ Lấy product thường
  if (embedded.products) {
    for (const item of embedded.products) {
      result.push(
        new ProductModel(
          item.id,
          item.brand,
          item.description,
          item.name,
          item.price,
          item.stock
        )
      );
    }
  }

  // ✅ Lấy computer
  if (embedded.computers) {
    for (const item of embedded.computers) {
      result.push(
        new ProductModel(
          item.id,
          item.brand,
          item.description,
          item.name,
          item.price,
          item.stock
        )
      );
    }
  }

  // ✅ Lấy electronic components
  if (embedded.electronicComponents) {
    for (const item of embedded.electronicComponents) {
      result.push(
        new ProductModel(
          item.id,
          item.brand,
          item.description,
          item.name,
          item.price,
          item.stock
        )
      );
    }
  }

  return result;
}


