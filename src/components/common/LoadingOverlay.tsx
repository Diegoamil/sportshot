import React from 'react';

interface LoadingOverlayProps {
  message: string;
  isVisible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-8">
        {/* Círculo animado externo */}
        <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        {/* Círculo animado do meio */}
        <div className="absolute inset-2 border-4 border-r-primary border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
        
        {/* Círculo animado interno */}
        <div className="absolute inset-4 border-4 border-b-primary border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-reverse"></div>
        
        {/* Ícone central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-medium text-gray-800 mb-2">{message}</h3>
      <p className="text-gray-600 text-center max-w-md px-4">
        Estamos analisando sua imagem e buscando correspondências em nosso banco de dados.
      </p>
      
      {/* Barra de progresso animada */}
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-progress"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
