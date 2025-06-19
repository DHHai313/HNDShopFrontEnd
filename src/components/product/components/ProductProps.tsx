import React, { useEffect, useState } from "react";
import ProductModel from "../../model/ProductModel";
import ImageModel from "../../model/ImageModel";
import { getImageUrl } from "../../api/ImageAPI";
import { error } from "console";
import '../../../styles/custom.css';
interface ProductPropsInterface{
    product: ProductModel
}

const ProductProps: React.FC<ProductPropsInterface>=(props)=>{



    const ProductId = props.product.id;
    const [loadingData, setLoadingData] = useState(true);
    const [isError, setIsError] = useState(null);
    const [listImage, setListImage] = useState<ImageModel[]>([]);
    
    //useEffect
    useEffect(()=>{
        if (!ProductId) return;

        getImageUrl(ProductId).then(
            imageData => {
           
            setListImage(imageData);
            setLoadingData(false);
            }
        ).catch(
            
        );
    },[]//chi goi 1 lan
    )
    
   // Lấy icon_url từ phần tử đầu tiên trong listImage (nếu có)
  const imageUrl = listImage.length > 0 ? listImage[0].icon_url : "";
  
    return(
        <div className="col-md-3 mt-2">
            <div className="card h-100">
                <img src={imageUrl || "https://via.placeholder.com/300"} className="card-img-top"
                style={{height: '250px'}} />
               <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="card-title text-truncate">{props.product.name}</h5>
                    <p className="card-text text-truncate-multiline">{props.product.description}</p>
                </div>

                <div>
                    <div className="price mb-2">
                    <span
                        className="discounted-price"
                        style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'red' }}
                    >
                        {props.product.price === 0
                        ? 'Liên hệ'
                        : props.product.price !== undefined
                        ? `${props.product.price.toLocaleString()} đ`
                        : ''}
                    </span>
                    </div>

                    <div className="row mt-2" role="group">
                    <div className="col-6">
                        <a href="#" className="btn btn-primary w-100">
                        <span>Mua</span>
                        </a>
                    </div>
                    <div className="col-6">
                        <a href="#" className="btn btn-danger w-100">
                        <i className="fas fa-shopping-cart"></i>
                        <span> Thêm</span>
                        </a>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
    );
}
export default ProductProps;