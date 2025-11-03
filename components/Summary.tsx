// Fix: Replaced placeholder content with a functional Summary component.
import React from 'react';
import { Sale } from '../types';
import { formatCurrency } from '../utils/formatters';

interface SummaryProps {
  sales: Sale[];
  title: string;
}

const Summary: React.FC<SummaryProps> = ({ sales, title }) => {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.sellingPrice * sale.quantity, 0);
  const totalCost = sales.reduce((sum, sale) => sum + sale.purchasePrice * sale.quantity, 0);
  const totalProfit = totalRevenue - totalCost;
  const totalItemsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Penjualan" value={formatCurrency(totalRevenue)} />
        <SummaryCard title="Total Modal" value={formatCurrency(totalCost)} />
        <SummaryCard title="Total Keuntungan" value={formatCurrency(totalProfit)} />
        <SummaryCard title="Item Terjual" value={totalItemsSold.toString()} />
      </div>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);

export default Summary;
