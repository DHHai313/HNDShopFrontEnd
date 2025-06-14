import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Về HNDShop</h3>
          <p className={styles.footerText}>
            HNDShop là đơn vị chuyên cung cấp các sản phẩm máy tính, camera, laptop và linh kiện chính hãng với giá tốt nhất thị trường. Chúng tôi cam kết đem đến cho khách hàng trải nghiệm mua sắm tuyệt vời nhất.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Liên hệ</h3>
          <div className={styles.footerContactItem}>
            <i className="fas fa-map-marker-alt"></i>
            <span>141 Đường Chiến Thắng, Thanh Trì, TP. Hà Nội</span>
          </div>
          <div className={styles.footerContactItem}>
            <i className="fas fa-phone"></i>
            <span>0912.345.678</span>
          </div>
          <div className={styles.footerContactItem}>
            <i className="fas fa-envelope"></i>
            <span>info@HNDShop.vn</span>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Theo dõi chúng tôi</h3>
          <div className={styles.footerSocial}>
            <a href="#" className={styles.socialLink}>
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="#" className={styles.socialLink}>
              <i className="fab fa-youtube"></i> Youtube
            </a>
            <a href="#" className={styles.socialLink}>
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        © 2025 HNDShop. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;