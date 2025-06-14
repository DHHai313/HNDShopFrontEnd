import React from "react";
import ProductModel from "../../model/ProductModel";

interface ProductPropsInterface{
    product: ProductModel
}

const ProductProps: React.FC<ProductPropsInterface>=(props)=>{
    return(
        <div className="col-md-3 mt-2">
            <div className="card">
                <img src={"https://nguyencongpc.vn/media/product/250-21616-laptop-hp-zbook-firefly-14-g8-1a2f1av.jpg"} className="card-img-top"
                style={{height: '300px'}} />
                <div className="card-body">
                    <h5 className="card-title">{props.product.name}</h5>
                    <p className="card-text">{props.product.description}</p>
                    <div className="price">
                        <span className="discounted-price">
                            {props.product.price}
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