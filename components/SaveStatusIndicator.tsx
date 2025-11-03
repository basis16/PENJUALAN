// components/SaveStatusIndicator.tsx
import React from 'react';

type SaveStatus = 'idle' | 'saving' | 'saved';

interface SaveStatusIndicatorProps {
  status: SaveStatus;
}

const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>
);

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);


const SaveStatusIndicator: React.FC<SaveStatusIndicatorProps> = ({ status }) => {
  if (status === 'idle') {
    return null; // Don't show anything when idle
  }

  const content = {
    saving: {
      text: 'Menyimpan...',
      icon: <CloudIcon className="w-4 h-4 animate-pulse" />,
      color: 'text-gray-500',
    },
    saved: {
      text: 'Semua perubahan disimpan',
      icon: <CheckIcon className="w-4 h-4" />,
      color: 'text-green-600',
    },
  };

  const current = content[status];

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-opacity duration-300 ${current.color}`}>
      {current.icon}
      <span className="font-medium">{current.text}</span>
    </div>
  );
};

export default SaveStatusIndicator;
