import React from "react";
import Product from "../../model/Product";

interface ProductCartProps {
    product: Product;
}

const ProductProps: React.FC<ProductCartProps>=({product})=>{
    return(
        <div className="col-md-3 mt-2">
            <div className="card">
                <img src={product.imgUrl} className="card-img-top"
                style={{height: '300px'}} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="price">
                        <span className="discounted-price">
                            {product.price}
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-primary btn-block">
                                <span>Mua Ngay</span>
                                
                            </a>
                        </div>
                        <div className="col-6">
                            <a href="#" className="btn btn-danger btn-block">
                               
                                <i className="fas fa-shopping-cart"></i>
                                <span>Thêm</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductProps;