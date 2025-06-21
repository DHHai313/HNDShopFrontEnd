import React, { useState, useEffect } from 'react';
import { getAllProduct } from '../api/ProductAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from '../product/Pagination';
import ImageModel from '../model/ImageModel';
import { getImageUrl } from '../api/ImageAPI';
import {
  createProduct,
  updateProduct ,
  deleteProduct ,
} from "../api/ProductAPI";
import { createImage } from '../api/ImageAPI';
import { updateImage } from '../api/ImageAPI';
// Định nghĩa kiểu Product
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  stock: number;
  category: string;
}

// Mapping thể loại theo ID
const CATEGORY_MAPPING = {
  '1': 'Camera',
  '2': 'Computer',
  '3': 'ElectronicComponent',
  '4': 'Laptop',
};

// Hàm chuyển đổi category ID thành tên thể loại
const getCategoryName = (categoryId: string): string => {
  return CATEGORY_MAPPING[categoryId as keyof typeof CATEGORY_MAPPING] || 'Không xác định';
};

// Hàm tìm category ID từ tên thể loại
const getCategoryId = (categoryName: string): string => {
  const entry = Object.entries(CATEGORY_MAPPING).find(([id, name]) => name === categoryName);
  return entry ? entry[0] : categoryName;
};


const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    image: '',
    brand: '',
    stock: 0,
    category: '1',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // Thêm state cho trang hiện tại
  const [totalPages, setTotalPages] = useState<number>(1); // Thêm state cho tổng số trang
  const itemsPerPage = 10; // Số sản phẩm mỗi trang
  const [listImage, setListImage] = useState<ImageModel[]>([]);
   
  // Effect để load danh sách sản phẩm
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await getAllProduct(currentPage - 1);
      const productsWithImages = await Promise.all(
        result.resultProduct.map(async (p: any) => {
          const images = await getImageUrl(p.id);
          return {
            id: p.id,
            name: p.name || '',
            price: p.price || 0,
            description: p.description || '',
            image: images.length > 0 ? images[0].icon_url : 'https://via.placeholder.com/60x45?text=No+Image',
            brand: p.brand || '',
            stock: p.stock || 0,
            category: p.category || '1',
          };
        })
      );
      setProducts(productsWithImages);
      setTotalPages(result.totalPages); // Sử dụng totalPages từ API
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };
  //UseEffect
  useEffect(() => {
  fetchProducts();
}, [currentPage]);
 
  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  // Xử lý thay đổi input trong form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (editId !== null) {
      const updatedProduct = await updateProduct(editId, formData);
      setProducts(products.map((p) => (p.id === editId ? updatedProduct : p)));
       const images = await getImageUrl(editId);
      if (images.length > 0) {
      // Nếu có ảnh, cập nhật ảnh đầu tiên
      await updateImage(images[0].id, formData.image, formData.name, editId);
      } else {
      // Nếu chưa có ảnh, tạo ảnh mới
      await createImage(editId, formData.image, formData.name);
      }
      setEditId(null);
    } else {
      const newProduct = await createProduct(formData);

      // 👇 Thêm ảnh sau khi tạo sản phẩm
      await createImage(newProduct.id, formData.image, formData.name);

      setProducts([newProduct, ...products]);
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchProducts();
      }
    }
    resetForm();
  } catch (err) {
    setError('Lỗi khi lưu sản phẩm: ' + (err as Error).message);
  }
};


  // Xử lý xóa sản phẩm
  const handleDelete = async (id: number) => {
  if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      if (products.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      setError('Lỗi khi xóa sản phẩm: ' + (err as Error).message);
    }
  }
};


  // Xử lý chỉnh sửa sản phẩm
  const handleEdit = (product: Product) => {
    const { id, ...rest } = product;
    setFormData(rest);
    setEditId(id);
    setShowForm(true);
  };

  // Xử lý thêm sản phẩm mới
  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  // Hàm reset form
  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      description: '',
      image: '',
      brand: '',
      stock: 0,
      category: '1',
    });
    setEditId(null);
    setShowForm(false);
  };

  // Hàm rút gọn text
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="container-fluid px-3 py-4">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .table-container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .table th {
            background-color: #f8f9fa;
            font-weight: 600;
            border-bottom: 2px solid #dee2e6;
            padding: 12px 8px;
            font-size: 14px;
          }
          .table td {
            padding: 12px 8px;
            vertical-align: middle;
            font-size: 13px;
          }
          .col-id { width: 40px; min-width: 40px; }
          .col-image { width: 80px; min-width: 80px; }
          .col-name { width: 200px; min-width: 200px; }
          .col-price { width: 110px; min-width: 110px; }
          .col-brand { width: 100px; min-width: 100px; }
          .col-stock { width: 60px; min-width: 60px; }
          .col-category { width: 90px; min-width: 90px; }
          .col-description { width: 250px; min-width: 250px; }
          .col-actions { width: 120px; min-width: 120px; }
          .text-truncate-custom {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
          }
          .form-container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          @media (max-width: 768px) {
            .table-responsive {
              border: none;
            }
            .table th, .table td {
              padding: 8px 4px;
              font-size: 12px;
            }
            .col-description { width: 150px; min-width: 150px; }
            .col-name { width: 120px; min-width: 120px; }
          }
        `}
      </style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary fw-bold">
          <i className="bi bi-box-seam me-2"></i>
          Quản lý sản phẩm
        </h1>
        {!showForm && (
          <button className="btn btn-success btn-lg shadow" onClick={handleAddNew}>
            <i className="bi bi-plus-circle me-2"></i>
            Thêm sản phẩm
          </button>
        )}
      </div>

      {/* Form thêm/sửa sản phẩm */}
      {showForm && (
        <div className="form-container p-4 mb-4" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
          <h2 className="text-secondary mb-4">
            <i className={`bi ${editId !== null ? 'bi-pencil-square' : 'bi-plus-square'} me-2`}></i>
            {editId !== null ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    <i className="bi bi-tag me-1"></i>Tên sản phẩm *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label fw-semibold">
                    <i className="bi bi-currency-dollar me-1"></i>Giá (VNĐ) *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label fw-semibold">
                    <i className="bi bi-image me-1"></i>Link ảnh *
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="brand" className="form-label fw-semibold">
                    <i className="bi bi-building me-1"></i>Thương hiệu *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập thương hiệu"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label fw-semibold">
                    <i className="bi bi-box me-1"></i>Số lượng trong kho *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label fw-semibold">
                    <i className="bi bi-grid-3x3-gap me-1"></i>Thể loại *
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">Camera</option>
                    <option value="2">Computer</option>
                    <option value="3">ElectronicComponent</option>
                    <option value="4">Laptop</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="form-label fw-semibold">
                <i className="bi bi-card-text me-1"></i>Mô tả
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Nhập mô tả sản phẩm (tùy chọn)"
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary px-4">
                <i className={`bi ${editId !== null ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
                {editId !== null ? 'Cập nhật' : 'Thêm mới'}
              </button>
              <button type="button" className="btn btn-outline-secondary px-4" onClick={resetForm}>
                <i className="bi bi-x-circle me-2"></i>
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Hiển thị lỗi */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Danh sách sản phẩm */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" aria-label="Đang tải">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-2 text-muted">Đang tải danh sách sản phẩm...</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="p-3 border-bottom">
            <h2 className="mb-0 text-secondary">
              <i className="bi bi-list-ul me-2"></i>
              Danh sách sản phẩm ({products.length})
            </h2>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th className="col-id text-center">ID</th>
                  <th className="col-image text-center">Ảnh</th>
                  <th className="col-name">Tên sản phẩm</th>
                  <th className="col-price text-end">Giá</th>
                  <th className="col-brand">Thương hiệu</th>
                  <th className="col-stock text-center">Kho</th>
                  <th className="col-category">Thể loại</th>
                  <th className="col-description">Mô tả</th>
                  <th className="col-actions text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="col-id text-center fw-semibold">{product.id}</td>
                    <td className="col-image text-center">
                      <img
                        src={product.image} // Sửa: dùng product.image thay vì URL cứng
                        alt={product.name}
                        width={60}
                        height={45}
                        style={{
                          objectFit: 'cover',
                          borderRadius: '6px',
                          border: '1px solid #dee2e6',
                        }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/60x45?text=No+Image';
                        }}
                      />
                    </td>
                    <td className="col-name">
                      <span className="text-truncate-custom fw-medium" title={product.name}>
                        {truncateText(product.name, 60)}
                      </span>
                    </td>
                    <td className="col-price text-end fw-semibold text-success">
                      {product.price.toLocaleString()} ₫
                    </td>
                    <td className="col-brand">
                      <span className="text-truncate-custom" title={product.brand}>
                        {truncateText(product.brand, 12)}
                      </span>
                    </td>
                    <td className="col-stock text-center">
                      <span
                        className={`badge ${
                          product.stock > 10
                            ? 'bg-success'
                            : product.stock > 0
                            ? 'bg-warning'
                            : 'bg-danger'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="col-category">
                      <span
                        className="badge bg-info text-dark px-2 py-1"
                        title={getCategoryName(product.category)}
                      >
                        {truncateText(getCategoryName(product.category), 8)}
                      </span>
                    </td>
                    <td className="col-description">
                      <span className="text-truncate-custom text-muted" title={product.description}>
                        {product.description ? truncateText(product.description, 45) : 'Không có mô tả'}
                      </span>
                    </td>
                    <td className="col-actions text-center">
                      <div className="d-flex gap-1 justify-content-center">
                        <button
                          className="btn btn-outline-warning btn-sm px-2"
                          onClick={() => handleEdit(product)}
                          title="Chỉnh sửa sản phẩm"
                        >
                          <i className="bi bi-pencil-square">Sửa</i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm px-2"
                          onClick={() => handleDelete(product.id)}
                          title="Xóa sản phẩm"
                        >
                          <i className="bi bi-trash3">Xóa</i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-inbox display-1 text-muted"></i>
              <p className="text-muted mt-3 mb-0">Chưa có sản phẩm nào được thêm.</p>
              <button className="btn btn-primary mt-3" onClick={handleAddNew}>
                <i className="bi bi-plus-circle me-2"></i>
                Thêm sản phẩm đầu tiên
              </button>
            </div>
          )}
          {/* Thêm Pagination */}
          {products.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pagination={handlePagination}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;