import React from "react";
import AdCarousel from "./AdCarousel";
import ListProduct from "../product/ListProduct";
import { useParams } from "react-router-dom";

interface HomePageProps{
    searchQuery: string;
}
function HomePage({searchQuery}: HomePageProps){

    const {categoryId, brandName} = useParams();
    const categoryIdNumber = categoryId ? parseInt(categoryId) : 0;
    return(
        <div>
        <AdCarousel />
        <ListProduct
        searchQuery={searchQuery}
        categoryId={categoryIdNumber}
        brandName={brandName || ""}
      />
        </div>
    );
}
export default HomePage;