import React from "react";

function AdCarousel() {
  return (
    //left
    <div className="row ">
        {/* Cột trái
        <div className="col-md-1 d-none d-md-block px-0">
          <div style={{ position: "sticky", top: "100px" }}>
            <img
              src="https://nguyencongpc.vn/media/banner/15_May2a4c611b470a828df395809a313f3397.webp"
              alt=""
              className="w-100"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div> */}

        
    <div className="d-flex justify-content-center mt-4" style={{ padding: "0 20px" }}>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" style={{ maxWidth: "1200px", width: "100%" }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100" style={{ height: "300px", objectFit: "cover" }}
              src="https://nguyencongpc.vn/media/banner/23_Mayb008ed36a307cebda4cef6aee71559ac.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100" style={{ height: "300px", objectFit: "cover" }}
              src="https://nguyencongpc.vn/media/banner/23_May970ab868bec215213d39b1fc95113d7b.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100" style={{ height: "300px", objectFit: "cover" }}
              src="https://nguyencongpc.vn/media/banner/27_Mayb52e55a7a35c77463bd3266b1420b60f.jpg"
              alt="Third slide"
            />
          </div>
        </div>

        {/* Nút Previous */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        {/* Nút Next */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>

        {/* Cột phải
        <div className="col-md-1 d-none d-md-block px-0">
          <div style={{ position: "sticky", top: "100px" }}>
            <img
              src="https://nguyencongpc.vn/media/banner/27_Mayfa89a7eb5cdc9b7551f1b3a79831db91.webp"
              alt=""
              className="w-100"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div> */}
      </div>
    
  );
}

export default AdCarousel;