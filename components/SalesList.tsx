// Fix: Replaced placeholder content with a functional React component.
import React from 'react';
import { Sale } from '../types';
import SalesListItem from './SalesListItem';

interface SalesListProps {
  sales: Sale[];
  onDeleteSale: (id: string) => void;
}

const SalesList: React.FC<SalesListProps> = ({ sales, onDeleteSale }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 font-semibold text-gray-600">Nama Akun</th>
            <th className="py-2 px-4 font-semibold text-gray-600">Harga Beli</th>
            <th className="py-2 px-4 font-semibold text-gray-600">Harga Jual</th>
            <th className="py-2 px-4 font-semibold text-gray-600">Jumlah</th>
            <th className="py-2 px-4 font-semibold text-gray-600">Keuntungan</th>
            <th className="py-2 px-4 font-semibold text-gray-600">Tanggal</th>
            <th className="py-2 px-4 font-semibold text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map(sale => (
              <SalesListItem key={sale.id} sale={sale} onDelete={onDeleteSale} />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">Tidak ada data penjualan.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;