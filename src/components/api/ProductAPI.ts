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
// ProductAPI.ts

const BASE_URL = 'http://localhost:8080/products';

export async function createProduct(product: any): Promise<any> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...product,
      category: `/categories/${product.category}`, // Spring Data REST yêu cầu path
    }),
  });

  if (!response.ok) {
    throw new Error('Không thể thêm sản phẩm');
  }

  const createdProduct = await response.json();
  return { ...product, id: extractIdFromUrl(createdProduct._links.self.href) };
}

export async function updateProduct(id: number, product: any): Promise<any> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...product,
      category: `/categories/${product.category}`,
    }),
  });

  if (!response.ok) {
    throw new Error('Không thể cập nhật sản phẩm');
  }

  return { id, ...product };
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Không thể xóa sản phẩm');
  }
}

// Tiện ích tách ID từ URL trả về (vd: http://localhost:8080/products/123)
function extractIdFromUrl(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 1]);
}


export async function getAllProduct(currentPage:number): Promise<ResultInterface> {
    
    const url: string = `http://localhost:8080/products?sort=id,desc&size=8&page=${currentPage}`;
    

    return getProduct(url);
}

//tim kiem http://localhost:8080/products/search/findByNameContaining?nameProduct=Canon
export async function searchProducts(keyWord: string, categoryId: number): Promise<ResultInterface> {
  let url: string = `http://localhost:8080/products?sort=id,desc&size=8&page=0`;

  if (keyWord !== '' && categoryId === 0) {
    url = `http://localhost:8080/products/search/findByNameContaining?sort=id,desc&size=8&page=0&nameProduct=${keyWord}`;
  } else if (keyWord !== '' && categoryId > 0) {
    url = `http://localhost:8080/products/search/findByCategoryId?sort=id,desc&size=8&page=0&categoryId=${categoryId}`;
  } else if (keyWord === '' && categoryId > 0) {
    url = `http://localhost:8080/products/search/findByCategoryId?sort=id,desc&size=8&page=0&categoryId=${categoryId}`;
  }

  return getProduct(url);
}

export async function searchByBrand(brand: string,currentPage: number): Promise<ResultInterface> {
 
  
    const url = `http://localhost:8080/products/search/findByBrand?sort=id,desc&size=8&page=${currentPage}&brand=${brand}`;
  
  return getProduct(url);
}

