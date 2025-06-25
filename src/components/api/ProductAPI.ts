import React from "react";
import ProductModel from "../model/ProductModel";
import { my_request } from "./Request";

interface ResultInterface {
  resultProduct: ProductModel[];
  totalPages: number;
  totalElements: number;
}

export async function getProduct(url: string): Promise<ResultInterface> {
    const result: ProductModel[] = [];
    
    const response = await my_request(url);
    const responseData = response._embedded?.products || [];
    
    
    const totalPages: number = response.page.totalPages;
    const totalElements: number = response.page.totalElements;

    for (const item of responseData) {
        const product = new ProductModel(
            item.id,
            item.brand,
            item.description,
            item.name,
            item.price,
            item.stock
        );
        result.push(product);
    }

    return { resultProduct: result, totalPages: totalPages, totalElements: totalElements };
}

const BASE_URL = 'http://localhost:8080/products';

export async function createProduct(product: any): Promise<any> {
    const token = localStorage.getItem("token"); // hoặc nơi bạn đang lưu token
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
            ...product,
            category: `/categories/${product.category}`,
        }),
    });

    if (!response.ok) {
        throw new Error('Không thể thêm sản phẩm');
    }

    const createdProduct = await response.json();
    return { ...product, id: extractIdFromUrl(createdProduct._links.self.href) };
}


export async function updateProduct(id: number, product: any): Promise<any> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
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
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error('Không thể xóa sản phẩm');
    }
}


function extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1]);
}

export async function getAllProduct(currentPage: number): Promise<ResultInterface> {
    const url: string = `http://localhost:8080/products?sort=id,desc&size=8&page=${currentPage}`;
    return getProduct(url);
}

export async function searchProducts(keyWord: string, categoryId: number, currentPage: number = 0): Promise<ResultInterface> {
    let url: string = `http://localhost:8080/products?sort=id,desc&size=8&page=${currentPage}`;

    if (keyWord !== '' && categoryId > 0) {
        url = `http://localhost:8080/products/search/findByNameContainingAndCategoryId?sort=id,desc&size=8&page=${currentPage}&nameProduct=${encodeURIComponent(keyWord)}&categoryId=${categoryId}`;
    } else if (keyWord !== '') {
        url = `http://localhost:8080/products/search/findByNameContaining?sort=id,desc&size=8&page=${currentPage}&nameProduct=${encodeURIComponent(keyWord)}`;
    } else if (categoryId > 0) {
        url = `http://localhost:8080/products/search/findByCategoryId?sort=id,desc&size=8&page=${currentPage}&categoryId=${categoryId}`;
    }

    return getProduct(url);
}

export async function searchByBrand(brand: string, currentPage: number): Promise<ResultInterface> {
    const url = `http://localhost:8080/products/search/findByBrand?sort=id,desc&size=8&page=${currentPage}&brand=${encodeURIComponent(brand)}`;
    return getProduct(url);
}