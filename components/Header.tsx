// Fix: Replaced placeholder content with a functional React component.
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">Dasbor Penjualan</h1>
    </header>
  );
};

export default Header;