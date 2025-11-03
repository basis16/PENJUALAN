// Fix: Implemented a functional SalesForm component to add new sales entries, resolving module errors.
import React, { useState } from 'react';
import { Sale, Product } from '../types';
import PlusIcon from './icons/PlusIcon';

interface SalesFormProps {
  products: Product[];
  onAddSale: (newSale: Omit<Sale, 'id'>) => void;
}

const SalesForm: React.FC<SalesFormProps> = ({ products, onAddSale }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(1);
  
  // Helper to get today's date in YYYY-MM-DD format, respecting local timezone
  const getTodayString = () => {
      const today = new Date();
      // Adjust for timezone offset to get the correct local date string
      return new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
  }
  const [date, setDate] = useState<string>(getTodayString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProduct = products.find(p => p.id === selectedProductId);
    if (!selectedProduct || quantity <= 0) {
      alert('Silakan pilih produk dan masukkan jumlah yang valid.');
      return;
    }

    // The date from input is 'YYYY-MM-DD'. JS `new Date()` parses this as UTC midnight.
    // To store the correct local date regardless of timezone, we adjust for the offset.
    const selectedDate = new Date(date);
    const timezoneOffset = selectedDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(selectedDate.getTime() + timezoneOffset);

    onAddSale({
      accountName: selectedProduct.name,
      purchasePrice: selectedProduct.purchasePrice,
      sellingPrice: selectedProduct.sellingPrice,
      quantity,
      date: adjustedDate.toISOString(),
    });

    // Reset form
    if (products.length > 0) {
      setSelectedProductId(products[0].id);
    }
    setQuantity(1);
    setDate(getTodayString());
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow my-4 flex flex-wrap gap-4 items-end">
      <div className="flex-grow" style={{minWidth: '150px'}}>
        <label htmlFor="sale-date" className="block text-sm font-medium text-gray-700">Tanggal Penjualan</label>
        <input
          type="date"
          id="sale-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="flex-grow" style={{minWidth: '200px'}}>
        <label htmlFor="product" className="block text-sm font-medium text-gray-700">Produk</label>
        <select
          id="product"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
          disabled={products.length === 0}
        >
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-24">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Jumlah</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          className="mt-1 p-2 border rounded w-full"
          min="1"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center gap-2 h-[42px]">
        <PlusIcon className="w-5 h-5" />
        Tambah Penjualan
      </button>
    </form>
  );
};

export default SalesForm;
