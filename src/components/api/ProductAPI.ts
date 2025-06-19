import React from "react";
import ProductModel from "../model/ProductModel";
import { my_request } from "./Request";

interface ResultInterface{
  resultProduct: ProductModel[];
  totalPages: number;
  totalElements: number;
}

export async function getProduct(url: string): Promise<ResultInterface> {
    const result: ProductModel[] = [];
    
    const response = await my_request(url);
    //const responseData = response._embedded.products;
    const responseData = response._embedded?.products || [];
  //lay thong tin trang
  const totalPages: number = response.page.totalPages;
  const totalElements:number = response.page.totalElements;

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

    return {resultProduct: result, totalPages: totalPages,totalElements: totalElements};
}

export async function getAllProduct(currentPage:number): Promise<ResultInterface> {
    
    const url: string = `http://localhost:8080/products?sort=id,asc&size=8&page=${currentPage}`;
    

    return getProduct(url);
}

//tim kiem http://localhost:8080/products/search/findByNameContaining?nameProduct=Canon
export async function searchProducts(keyWord:string): Promise<ResultInterface> {

  // endpoint
  let url: string = `http://localhost:8080/products?sort=id,asc&size=8&page=0`;
  if(keyWord !== ''){
    url = `http://localhost:8080/products/search/findByNameContaining?sort=id,asc&size=8&page=0&nameProduct=${keyWord}`;
  }

  return getProduct(url);
}


