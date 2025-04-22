import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Trash2 } from 'lucide-react';
import { PhotoType } from '../types';

// Mock de fotos selecionadas para demonstração
const SELECTED_PHOTOS: PhotoType[] = Array.from({ length: 3 }, (_, i) => ({
  id: `photo-${i + 1}`,
  url: `https://images.pexels.com/photos/${2000000 + i * 11}/pexels-photo-${2000000 + i * 11}.jpeg`,
  caption: `Foto esportiva ${i + 1}`,
  price: 9.99,
  date: new Date().toISOString(),
  eventId: i % 4 === 0 ? '1' : i % 4 === 1 ? '2' : i % 4 === 2 ? '3' : '4',
}));

const CheckoutPage: React.FC = () => {
  const [photos] = useState<PhotoType[]>(SELECTED_PHOTOS);
  const [resolution, setResolution] = useState<'standard' | 'high' | 'ultra'>('high');

  const resolutionOptions = {
    standard: { label: 'Padrão', description: 'Qualidade web (1200px)', price: 0 },
    high: { label: 'Alta Resolução', description: 'Qualidade para impressão (2400px)', price: 5 },
    ultra: { label: 'Ultra HD', description: 'Qualidade profissional (4800px)', price: 10 },
  };
  
  const baseTotal = photos.reduce((sum, photo) => sum + photo.price, 0);
  const resolutionFee = resolutionOptions[resolution].price;
  const subtotal = baseTotal + resolutionFee;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/search" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Voltar para busca</span>
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
        <p className="text-lg text-gray-600 mb-8">
          Complete sua compra para baixar fotos em alta qualidade
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Selected Photos */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Fotos Selecionadas ({photos.length})</h2>
              </div>
              
              <ul className="divide-y divide-gray-200">
                {photos.map((photo) => (
                  <li key={photo.id} className="px-6 py-4 flex items-center">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <img 
                        src={photo.url} 
                        alt={photo.caption || 'Selected photo'} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {photo.caption || `Foto #${photo.id}`}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ID do Evento: {photo.eventId}
                      </p>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">R$ {photo.price.toFixed(2)}</p>
                    </div>
                    <div className="ml-4">
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resolution Options */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Escolha a Resolução</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {Object.entries(resolutionOptions).map(([key, option]) => (
                  <div key={key} className="flex items-center">
                    <input
                      id={`resolution-${key}`}
                      name="resolution"
                      type="radio"
                      checked={resolution === key}
                      onChange={() => setResolution(key as any)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={`resolution-${key}`} className="ml-3 flex-1">
                      <span className="block text-sm font-medium text-gray-900">{option.label}</span>
                      <span className="block text-sm text-gray-500">{option.description}</span>
                    </label>
                    <span className="text-sm font-medium text-gray-900">
                      {option.price === 0 ? 'Incluído' : `+R$ ${option.price.toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Resumo do Pedido</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fotos ({photos.length})</span>
                    <span className="text-gray-900 font-medium">R$ {baseTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de resolução</span>
                    <span className="text-gray-900 font-medium">R$ {resolutionFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Imposto (8%)</span>
                    <span className="text-gray-900 font-medium">R$ {tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-gray-900 font-semibold">Total</span>
                    <span className="text-gray-900 font-bold">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="mt-8 w-full px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span>Prosseguir para Pagamento</span>
                </button>
                
                <p className="mt-4 text-xs text-gray-500 text-center">
                  Ao prosseguir, você concorda com nossos Termos de Serviço e Política de Privacidade.
                  Todas as compras são definitivas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;