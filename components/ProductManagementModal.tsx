// Fix: Implemented a functional ProductManagementModal component to resolve module errors.
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import CloseIcon from './icons/CloseIcon';
import TrashIcon from './icons/TrashIcon';
import { formatCurrency } from '../utils/formatters';

interface ProductManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (newProduct: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductManagementModal: React.FC<ProductManagementModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [name, setName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPurchasePrice('');
      setSellingPrice('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !purchasePrice || !sellingPrice) {
      alert('Semua kolom harus diisi.');
      return;
    }
    onAddProduct({
      name,
      purchasePrice: parseFloat(purchasePrice),
      sellingPrice: parseFloat(sellingPrice),
    });
    setName('');
    setPurchasePrice('');
    setSellingPrice('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manajemen Produk</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 flex-grow min-h-0">
          {/* Add Product Form */}
          <div className="md:w-1/3 flex-shrink-0">
            <h3 className="font-semibold mb-2">Tambah Produk Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Produk</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Harga Beli</label>
                <input
                  type="number"
                  id="purchasePrice"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                  min="0"
                  required
                />
              </div>
              <div>
                <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Harga Jual</label>
                <input
                  type="number"
                  id="sellingPrice"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                  min="0"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
                Tambah
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="md:w-2/3 flex flex-col min-h-0">
            <h3 className="font-semibold mb-2">Daftar Produk</h3>
            <div className="overflow-y-auto flex-grow">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="py-2 px-4">Nama</th>
                    <th className="py-2 px-4">Harga Beli</th>
                    <th className="py-2 px-4">Harga Jual</th>
                    <th className="py-2 px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map(product => (
                      <tr key={product.id} className="border-b">
                        <td className="py-2 px-4">{product.name}</td>
                        <td className="py-2 px-4">{formatCurrency(product.purchasePrice)}</td>
                        <td className="py-2 px-4">{formatCurrency(product.sellingPrice)}</td>
                        <td className="py-2 px-4">
                          <button onClick={() => onDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4">Tidak ada produk.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementModal;
