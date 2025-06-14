import React from "react";
import Product from "../model/Product";
import ProductProps from "./components/ProductProps";

const ListProduct: React.FC=() =>{
    const products: Product[] = [
    {
      id: 1,
      name: "Laptop Dell XPS 15",
      price: 38990000,
      description: "Laptop cao cấp với màn hình 4K, chip Intel i7, RAM 16GB.",
      imgUrl: "https://nguyencongpc.vn/media/product/250-27751-bo-pc-gaming-intel-core-ultra-7-265k-ram-64g-vga-rtx-5070-12gb-001.jpg",
    },
    {
      id: 2,
      name: "MacBook Pro M2",
      price: 45990000,
      description: "MacBook Pro M2 mới nhất, hiệu năng cao, màn hình Retina.",
      imgUrl: "https://nguyencongpc.vn/media/product/250-27600-pc-gaming-i5-14600kf-ram-32g-rgb-vga-rtx-5070-12g.jpg",
    },
    {
      id: 3,
      name: "ASUS ROG Strix G17",
      price: 32990000,
      description: "Laptop gaming với GPU RTX 4060, màn hình 17 inch 144Hz.",
      imgUrl: "https://nguyencongpc.vn/media/product/250-27676-pc-gaming-i5-13400f-ram-32g-vga-rtx-5070-ultra-white.jpg",
    },
    {
      id: 4,
      name: "HP Spectre x360",
      price: 28990000,
      description: "Laptop mỏng nhẹ, cảm ứng, xoay gập 360 độ, màn OLED.",
      imgUrl: "https://nguyencongpc.vn/media/product/250-27715-pc-gaming-intel-core-i7-14700k-ram-64gb-vga-rtx-5070-ti-16gb-gddr7-0.jpg",
    },
    {
      id: 5,
      name: "Lenovo ThinkPad X1 Carbon",
      price: 34990000,
      description: "Dòng máy doanh nhân bền bỉ, hiệu suất cao, thiết kế mỏng nhẹ.",
      imgUrl: "https://nguyencongpc.vn/media/product/250-27094-man-hinh-gaming-msi-mag-275qf-1.jpg",
    },
  ];
    return(
        <div className="container">
            <h2 className="my-4">Danh Sách Sản Phẩm</h2>
            <div className="row mt-4">
                {
                    products.map(
                        (product)=>(
                            <ProductProps key={product.id} product={product}/>
                        )
                    )
                }
            </div>
        </div>
    );
}
export default ListProduct;