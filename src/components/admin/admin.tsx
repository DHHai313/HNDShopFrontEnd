import React, { useState, useEffect } from 'react';
import { getAllProduct } from '../api/ProductAPI';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  stock_quantity: number;
  category: string;
}

const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  return { id: Math.random(), ...product };
};

const updateProduct = async (id: number, product: Omit<Product, 'id'>): Promise<Product> => {
  return { id, ...product };
};

const deleteProduct = async (id: number): Promise<void> => {
  console.log(`Deleted product with id ${id}`);
};

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    image: '',
    brand: '',
    stock_quantity: 0,
    category: '',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false); // State để điều khiển hiển thị form

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getAllProduct(0);
        setProducts(
          result.resultProduct.map((p: any) => ({
            id: p.id!,
            name: p.name || '',
            price: p.price || 0,
            description: p.description || '',
            image: p.image || '',
            brand: p.brand || '',
            stock_quantity: p.stock_quantity || 0,
            category: p.category || '',
          }))
        );
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock_quantity' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        const updatedProduct = await updateProduct(editId, formData);
        setProducts(products.map((p) => (p.id === editId ? updatedProduct : p)));
        setEditId(null);
      } else {
        const newProduct = await addProduct(formData);
        setProducts([...products, newProduct]);
      }
      // Reset form và ẩn form sau khi submit
      setFormData({
        name: '',
        price: 0,
        description: '',
        image: '',
        brand: '',
        stock_quantity: 0,
        category: '',
      });
      setShowForm(false);
    } catch (err) {
      setError('Lỗi khi lưu sản phẩm');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        setError('Lỗi khi xóa sản phẩm');
      }
    }
  };

  const handleEdit = (product: Product) => {
    const { id, ...rest } = product;
    setFormData(rest);
    setEditId(id);
    setShowForm(true); // Hiển thị form khi sửa
  };

  const handleAddNew = () => {
    // Reset form data và hiển thị form thêm mới
    setFormData({
      name: '',
      price: 0,
      description: '',
      image: '',
      brand: '',
      stock_quantity: 0,
      category: '',
    });
    setEditId(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    // Ẩn form và reset dữ liệu
    setShowForm(false);
    setEditId(null);
    setFormData({
      name: '',
      price: 0,
      description: '',
      image: '',
      brand: '',
      stock_quantity: 0,
      category: '',
    });
  };

  return (
    <div className="container mt-4">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .table th, .table td {
            white-space: nowrap;
            vertical-align: middle;
          }
          
          .text-truncate-custom {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        `}
      </style>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Quản lý sản phẩm</h1>
        {!showForm && (
          <button 
            className="btn btn-success"
            onClick={handleAddNew}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Thêm sản phẩm
          </button>
        )}
      </div>

      {/* Form - chỉ hiển thị khi showForm = true */}
      {showForm && (
        <div className="card mb-4" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
          <div className="card-body">
            <h2 className="card-title">{editId !== null ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Giá</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Link ảnh</label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Thương hiệu</label>
                    <input
                      type="text"
                      className="form-control"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stock_quantity" className="form-label">Số lượng trong kho</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock_quantity"
                      name="stock_quantity"
                      value={formData.stock_quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Thể loại</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Mô tả</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editId !== null ? 'Cập nhật' : 'Thêm'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelForm}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Danh sách sản phẩm */}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center">Đang tải...</div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Danh sách sản phẩm</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '60px' }}>ID</th>
                    <th style={{ width: '100px' }}>Ảnh</th>
                    <th style={{ width: '150px' }}>Tên</th>
                    <th style={{ width: '120px' }}>Giá</th>
                    <th style={{ width: '120px' }}>Thương hiệu</th>
                    <th style={{ width: '80px' }}>Kho</th>
                    <th style={{ width: '120px' }}>Thể loại</th>
                    <th style={{ width: '200px' }}>Mô tả</th>
                    <th style={{ width: '120px' }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td style={{ width: '60px' }}>{p.id}</td>
                      <td style={{ width: '100px' }}>
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          width={60} 
                          height={45}
                          style={{ objectFit: 'cover', borderRadius: '4px' }}
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/60x45?text=No+Image';
                          }}
                        />
                      </td>
                      <td style={{ 
                        width: '150px',
                        maxWidth: '150px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        <span title={p.name}>{p.name}</span>
                      </td>
                      <td style={{ width: '120px' }}>{p.price.toLocaleString()} VNĐ</td>
                      <td style={{ 
                        width: '120px',
                        maxWidth: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        <span title={p.brand}>{p.brand}</span>
                      </td>
                      <td style={{ width: '80px' }}>{p.stock_quantity}</td>
                      <td style={{ 
                        width: '120px',
                        maxWidth: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        <span title={p.category}>{p.category}</span>
                      </td>
                      <td style={{ 
                        width: '200px',
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        <span title={p.description}>
                          {p.description && p.description.length > 50 
                            ? `${p.description.substring(0, 50)}...` 
                            : p.description
                          }
                        </span>
                      </td>
                      <td style={{ width: '120px' }}>
                        <div className="d-flex gap-1 justify-content-center">
                          <button 
                            className="btn btn-warning btn-sm" 
                            onClick={() => handleEdit(p)}
                            title="Sửa sản phẩm"
                          >
                            ✏️
                          </button>
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDelete(p.id)}
                            title="Xóa sản phẩm"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {products.length === 0 && (
              <div className="text-center py-4">
                <p className="text-muted">Không có sản phẩm nào.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;