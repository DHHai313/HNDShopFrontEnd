import React from "react";
import AdCarousel from "./AdCarousel";
import ListProduct from "../product/ListProduct";

interface HomePageProps{
    searchQuery: string;
}
function HomePage({searchQuery}: HomePageProps){
    return(
        <div>
        <AdCarousel />
        <ListProduct searchQuery={searchQuery} />
        </div>
    );
}
export default HomePage;