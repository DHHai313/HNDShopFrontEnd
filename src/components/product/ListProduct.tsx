import React, { useEffect, useState } from "react";
import ProductProps from "./components/ProductProps";
import ProductModel from "../model/ProductModel";
import { getAllProduct } from "../api/ProductAPI";
import { error } from "console";
import { getAllProductx } from "../api/ProductAPIx";

const ListProduct: React.FC=() =>{
  const [listProduct, setListProduct] = useState<ProductModel[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isError, setIsError] = useState(null);
  //useEffect
  useEffect(()=>{
      getAllProductx().then(
        productData => {
          setListProduct(productData);
          setLoadingData(false);
        }
      ).catch(
        error => {
          setIsError(error.message);
        }
      );
  },[]//chi goi 1 lan
  )
    if(loadingData){
      return(
        <div>
          <h2>Loading Data...</h2>
        </div>
      );
    }

    if(isError){
      return(
        <div>
          <h2>Error...{isError}</h2>
        </div>
      );
    }

    return(
        <div className="container">
            <h2 className="my-4">Danh Sách Sản Phẩm</h2>
            <div className="row mt-4">
                {
                    listProduct.map((product)=>(
                            <ProductProps key={product.id} product={product}/>
                        )
                    )
                }
            </div>
        </div>
    );
}
export default ListProduct;