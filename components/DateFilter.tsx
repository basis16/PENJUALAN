import React, { useState } from 'react';
import { FilterPreset } from '../types';

interface DateFilterProps {
  activeFilter: FilterPreset;
  onFilterChange: (filter: FilterPreset) => void;
  onCustomFilterApply: (range: { start: string, end: string }) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ activeFilter, onFilterChange, onCustomFilterApply }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const filters: { key: FilterPreset; label: string }[] = [
    { key: 'today', label: 'Hari Ini' },
    { key: 'last7', label: '7 Hari Terakhir' },
    { key: 'last30', label: '30 Hari Terakhir' },
    { key: 'custom', label: 'Custom' },
  ];
  
  const handleApplyCustom = () => {
    if (startDate && endDate) {
      onCustomFilterApply({ start: startDate, end: endDate });
    } else {
      alert('Silakan pilih tanggal mulai dan selesai.');
    }
  };

  return (
    <div>
        <div className="flex items-center gap-2 bg-gray-200 p-1 rounded-lg">
        {filters.map(({ key, label }) => (
            <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeFilter === key
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:bg-gray-300'
            }`}
            >
            {label}
            </button>
        ))}
        </div>
        {activeFilter === 'custom' && (
            <div className="mt-4 flex flex-wrap items-end gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                    <input 
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                    <input 
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <button
                    onClick={handleApplyCustom}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors h-[42px]"
                >
                    Terapkan
                </button>
            </div>
        )}
    </div>
  );
};

export default DateFilter;
