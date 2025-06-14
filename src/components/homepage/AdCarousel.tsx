import React from "react";

function AdCarousel() {
  return (
    <div className="d-flex justify-content-center" style={{ padding: "0 20px" }}>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" style={{ maxWidth: "1200px", width: "100%" }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://nguyencongpc.vn/media/banner/23_Maye2a8f86ab726d7530efb2ff71335b32d.webp"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://nguyencongpc.vn/media/banner/23_May970ab868bec215213d39b1fc95113d7b.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
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
  );
}

export default AdCarousel;