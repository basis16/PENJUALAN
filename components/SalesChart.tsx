import React from 'react';
import { Sale } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ChartDataPoint {
  date: string;
  pemasukan: number;
  modal: number;
}

interface SalesChartProps {
  data: ChartDataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-gray-800 bg-opacity-90 text-white rounded-lg shadow-lg border border-gray-700">
        <p className="font-bold text-lg mb-2">{label}</p>
        <p className="text-green-400">{`Pemasukan: ${formatCurrency(payload[0].value)}`}</p>
        <p className="text-yellow-400">{`Modal: ${formatCurrency(payload[1].value)}`}</p>
      </div>
    );
  }
  return null;
};

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const Recharts = (window as any).Recharts;

  // Jika pustaka belum dimuat, jangan render apa-apa.
  // Ini lebih baik daripada menampilkan teks pemuatan atau menyebabkan error.
  if (!Recharts) {
    return null;
  }
  
  const {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
  } = Recharts;

  if (data.length === 0) {
    return (
        <div className="bg-white p-4 rounded-lg shadow h-80 flex items-center justify-center">
            <p className="text-gray-500">Tidak ada data untuk ditampilkan pada rentang waktu ini.</p>
        </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={(value: number) =>
              new Intl.NumberFormat('id-ID', {
                notation: 'compact',
                compactDisplay: 'short',
              }).format(value)
            }
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="pemasukan"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Pemasukan"
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="modal"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Modal"
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
