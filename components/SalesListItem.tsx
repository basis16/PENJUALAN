// Fix: Replaced placeholder content with a functional React component.
import React from 'react';
import { Sale } from '../types';
import TrashIcon from './icons/TrashIcon';
import { formatCurrency } from '../utils/formatters';

interface SalesListItemProps {
  sale: Sale;
  onDelete: (id: string) => void;
}

const SalesListItem: React.FC<SalesListItemProps> = ({ sale, onDelete }) => {
  const profit = (sale.sellingPrice - sale.purchasePrice) * sale.quantity;

  return (
    <tr className="border-b">
      <td className="py-2 px-4">{sale.accountName}</td>
      <td className="py-2 px-4">{formatCurrency(sale.purchasePrice)}</td>
      <td className="py-2 px-4">{formatCurrency(sale.sellingPrice)}</td>
      <td className="py-2 px-4">{sale.quantity}</td>
      <td className="py-2 px-4">{formatCurrency(profit)}</td>
      <td className="py-2 px-4">{new Date(sale.date).toLocaleDateString('id-ID')}</td>
      <td className="py-2 px-4">
        <button onClick={() => onDelete(sale.id)} className="text-red-500 hover:text-red-700">
          <TrashIcon className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default SalesListItem;