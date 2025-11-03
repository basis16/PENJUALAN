import React, { useState, useMemo } from 'react';
import { Sale, Product, FilterPreset } from '../types';
import Summary from './Summary';
import SalesList from './SalesList';
import SalesForm from './SalesForm';
import DateFilter from './DateFilter';
import ProductManagementModal from './ProductManagementModal';
import SalesChart from './SalesChart';
import useLocalStorage from '../hooks/useLocalStorage'; // New import
import SaveStatusIndicator from './SaveStatusIndicator'; // New import

const DailyDashboard: React.FC = () => {
  const initialProducts: Product[] = [
    { id: '1', name: 'Netflix Premium', purchasePrice: 150000, sellingPrice: 165000 },
    { id: '2', name: 'Spotify Family', purchasePrice: 70000, sellingPrice: 85000 },
  ];

  const [products, setProducts, productsSaveStatus] = useLocalStorage<Product[]>('products', initialProducts);
  const [sales, setSales, salesSaveStatus] = useLocalStorage<Sale[]>('sales', []);
  
  const [activeFilter, setActiveFilter] = useState<FilterPreset>('today');
  const [customDateRange, setCustomDateRange] = useState<{ start: string, end: string }>({ start: '', end: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSale = (newSale: Omit<Sale, 'id'>) => {
    setSales(prevSales => [...prevSales, { ...newSale, id: Date.now().toString() }]);
  };

  const handleDeleteSale = (id: string) => {
    setSales(prevSales => prevSales.filter(sale => sale.id !== id));
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...newProduct, id: Date.now().toString() }]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };
  
  const handleCustomFilterApply = (range: { start: string, end: string }) => {
    setCustomDateRange(range);
    setActiveFilter('custom');
  };
  
  const combinedSaveStatus = productsSaveStatus === 'saving' || salesSaveStatus === 'saving' ? 'saving' : (productsSaveStatus === 'saved' || salesSaveStatus === 'saved' ? 'saved' : 'idle');

  const { filteredSales, summaryTitle } = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let startDate = new Date(today);
    let endDate = new Date(now);
    let title = 'Ringkasan Hari Ini';

    switch (activeFilter) {
      case 'today':
        startDate = today;
        endDate.setHours(23, 59, 59, 999);
        title = 'Ringkasan Hari Ini';
        break;
      case 'last7':
        startDate.setDate(today.getDate() - 6);
        endDate.setHours(23, 59, 59, 999);
        title = 'Ringkasan 7 Hari Terakhir';
        break;
      case 'last30':
        startDate.setDate(today.getDate() - 29);
        endDate.setHours(23, 59, 59, 999);
        title = 'Ringkasan 30 Hari Terakhir';
        break;
      case 'custom':
        if (customDateRange.start && customDateRange.end) {
          const start = new Date(customDateRange.start);
          const end = new Date(customDateRange.end);
          
          const tzOffsetStart = start.getTimezoneOffset() * 60000;
          const tzOffsetEnd = end.getTimezoneOffset() * 60000;
          
          startDate = new Date(start.getTime() + tzOffsetStart);
          endDate = new Date(end.getTime() + tzOffsetEnd);
          endDate.setHours(23, 59, 59, 999);

          const startLocale = startDate.toLocaleDateString('id-ID');
          const endLocale = endDate.toLocaleDateString('id-ID');
          title = `Ringkasan (${startLocale} - ${endLocale})`;
        } else {
            return { filteredSales: [], summaryTitle: 'Ringkasan (Pilih Rentang)' };
        }
        break;
    }

    const salesInFilter = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= startDate && saleDate <= endDate;
    });
    return { filteredSales: salesInFilter, summaryTitle: title };
  }, [sales, activeFilter, customDateRange]);
  
  const chartData = useMemo(() => {
    const groupedSales: { [key: string]: { pemasukan: number; modal: number } } = {};

    filteredSales.forEach(sale => {
      const dateKey = new Date(sale.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
      if (!groupedSales[dateKey]) {
        groupedSales[dateKey] = { pemasukan: 0, modal: 0 };
      }
      groupedSales[dateKey].pemasukan += sale.sellingPrice * sale.quantity;
      groupedSales[dateKey].modal += sale.purchasePrice * sale.quantity;
    });

    return Object.entries(groupedSales).map(([date, values]) => ({
      date,
      ...values,
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredSales]);


  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <DateFilter 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
          onCustomFilterApply={handleCustomFilterApply}
        />
        <div className="flex items-center gap-4">
            <SaveStatusIndicator status={combinedSaveStatus} />
            <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
            Manajemen Produk
            </button>
        </div>
      </div>
      
      <SalesChart data={chartData} />
      
      <Summary sales={filteredSales} title={summaryTitle} />
      
      {products.length > 0 ? (
        <SalesForm products={products} onAddSale={handleAddSale} />
      ) : (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow my-4 text-center">
          Silakan tambahkan produk terlebih dahulu melalui tombol 'Manajemen Produk'.
        </div>
      )}
      
      <SalesList sales={filteredSales} onDeleteSale={handleDeleteSale} />

      <ProductManagementModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default DailyDashboard;
