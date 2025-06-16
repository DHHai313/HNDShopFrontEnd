import React, { useState, useEffect } from "react";

function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://nguyencongpc.vn/media/banner/27_Mayd0bb4ace3413e52c8c9c0f528a7a3159.jpg",
    
    "https://nguyencongpc.vn/media/banner/27_Maydf4e66449b333a029b08038347c6199e.jpg", // Thêm URL ảnh khác
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 4000); // Chuyển ảnh sau mỗi 3 giây (3000ms)

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [images.length]);

  return (
    <div style={{ 
      width: "100%", 
      overflow: "hidden", 
      position: "relative" 
    }}>
      <img 
        src={images[currentImageIndex]} 
        alt="Banner" 
        style={{ 
          width: "100%", 
          height: "60px", 
          display: "block", 
          transition: "opacity 0.5s", // Hiệu ứng chuyển đổi mượt mà
          opacity: 1 
        }} 
      />
    </div>
  );
}

export default Banner;