import React, { useEffect, useState, useRef } from "react";
import ProductProps from "./components/ProductProps";
import ProductModel from "../model/ProductModel";
import { getAllProduct, searchProducts, searchByBrand } from "../api/ProductAPI";
import { Pagination } from "./Pagination";

interface ListProductProps {
    searchQuery: string;
    categoryId: number;
    brandName?: string;
}

function ListProduct({ searchQuery, categoryId, brandName }: ListProductProps) {
    const [listProduct, setListProduct] = useState<ProductModel[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const productListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, categoryId, brandName]);

    useEffect(() => {
        console.log({ searchQuery, categoryId, brandName, currentPage });
        setLoadingData(true);

        if (brandName && brandName !== "") {
            searchByBrand(brandName, currentPage - 1)
                .then(rs => {
                    setListProduct(rs.resultProduct);
                    setTotalPages(rs.totalPages);
                    setTotalElements(rs.totalElements);
                    setLoadingData(false);
                })
                .catch(err => setIsError(err.message));
        } else {
            searchProducts(searchQuery, categoryId, currentPage - 1)
                .then(rs => {
                    setListProduct(rs.resultProduct);
                    setTotalPages(rs.totalPages);
                    setTotalElements(rs.totalElements);
                    setLoadingData(false);
                })
                .catch(err => setIsError(err.message));
        }
    }, [searchQuery, categoryId, brandName, currentPage]);

    if (loadingData) {
        return (
            <div>
                <h2>Loading Data...</h2>
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <h2>Error...{isError}</h2>
            </div>
        );
    }

    const pagi = (page: number) => setCurrentPage(page);

    if (listProduct.length === 0) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Không tìm thấy sản phẩm</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row no-gutters">
                <div className="col-md-1 d-none d-md-block px-0">
                    <div style={{ position: "sticky", top: "100px" }}>
                        <img
                            src="https://nguyencongpc.vn/media/banner/15_May2a4c611b470a828df395809a313f3397.webp"
                            alt=""
                            className="w-100"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </div>

                <div ref={productListRef} className="col-md-10 px-2">
                    <h2 className="my-4">Danh Sách Sản Phẩm</h2>
                    <div className="row mt-4">
                        {listProduct.map((product) => (
                            <ProductProps key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                <div className="col-md-1 d-none d-md-block px-0">
                    <div style={{ position: "sticky", top: "100px" }}>
                        <img
                            src="https://nguyencongpc.vn/media/banner/27_Mayfa89a7eb5cdc9b7551f1b3a79831db91.webp"
                            alt=""
                            className="w-100"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </div>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} pagination={pagi} />
        </div>
    );
}

export default ListProduct;