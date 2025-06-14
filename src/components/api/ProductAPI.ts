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
export async function getAllProduct():Promise<ProductModel[]> {
    const result: ProductModel[] = [];
    //xac dinh endpoint
    const url:string = 'http://localhost:8080/products';
    //goi phuong thuc request
    const respone = request(url);
    console.log(respone);

    return result;
}