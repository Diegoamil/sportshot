import React, { useState } from 'react';
import { X, ShoppingCart, Download, Share2, Heart } from 'lucide-react';
import { PhotoType } from '../../types';

interface PhotoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: PhotoType | null;
  onAddToCart: (photo: PhotoType, quality: string) => void;
}

type QualityOption = {
  id: string;
  name: string;
  resolution: string;
  price: number;
  description: string;
};

const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  photo, 
  onAddToCart 
}) => {
  const [selectedQuality, setSelectedQuality] = useState<string>('standard');

  if (!isOpen || !photo) return null;

  // Opções de qualidade disponíveis
  const qualityOptions: QualityOption[] = [
    {
      id: 'web',
      name: 'Web',
      resolution: '1024 x 768px',
      price: 9.99,
      description: 'Ideal para uso em redes sociais e websites'
    },
    {
      id: 'standard',
      name: 'Padrão',
      resolution: '2048 x 1536px',
      price: 14.99,
      description: 'Perfeito para impressões pequenas e médias'
    },
    {
      id: 'premium',
      name: 'Premium',
      resolution: '4096 x 3072px',
      price: 24.99,
      description: 'Alta resolução para impressões grandes'
    },
    {
      id: 'original',
      name: 'Original',
      resolution: 'Resolução máxima',
      price: 34.99,
      description: 'Arquivo original sem compressão'
    }
  ];

  // Encontrar o fotógrafo do evento relacionado à foto
  const eventId = photo.eventId;
  const photographer = {
    id: `photographer-${eventId}`,
    name: eventId === '1' ? 'Carlos Silva' : 
          eventId === '2' ? 'Ana Oliveira' : 
          eventId === '3' ? 'Pedro Santos' : 'Mariana Costa',
    avatar: eventId === '1' ? 'https://randomuser.me/api/portraits/men/32.jpg' : 
           eventId === '2' ? 'https://randomuser.me/api/portraits/women/44.jpg' : 
           eventId === '3' ? 'https://randomuser.me/api/portraits/men/46.jpg' : 
           'https://randomuser.me/api/portraits/women/65.jpg'
  };

  const selectedOption = qualityOptions.find(option => option.id === selectedQuality) || qualityOptions[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {photo.caption}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Imagem */}
          <div className="md:w-2/3 bg-black flex items-center justify-center p-4 overflow-auto">
            <div className="relative max-w-full max-h-full">
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="max-w-full max-h-[70vh] object-contain"
              />
              
              {/* Marca d'água - Estilo grade com linhas tracejadas diagonais */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Linhas tracejadas diagonais */}
                <div className="absolute inset-0 opacity-40">
                  {/* Linhas diagonais da esquerda para a direita */}
                  <div className="absolute inset-0 border-t-2 border-l-2 border-white border-dashed transform rotate-45 scale-150"></div>
                  <div className="absolute inset-0 border-b-2 border-r-2 border-white border-dashed transform rotate-45 scale-150"></div>
                  
                  {/* Linhas diagonais da direita para a esquerda */}
                  <div className="absolute inset-0 border-t-2 border-r-2 border-white border-dashed transform -rotate-45 scale-150"></div>
                  <div className="absolute inset-0 border-b-2 border-l-2 border-white border-dashed transform -rotate-45 scale-150"></div>
                </div>
                
                {/* Texto da marca d'água */}
                <div className="absolute inset-0 flex flex-wrap items-center justify-center">
                  {/* Grade de 4x4 com o texto da marca d'água */}
                  <div className="grid grid-cols-4 gap-x-16 gap-y-16 w-full h-full p-8">
                    {Array.from({ length: 16 }).map((_, index) => (
                      <div key={index} className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center">
                          <span className="text-white text-xl font-bold tracking-wider">
                            SPORTSHOT
                          </span>
                          <span className="text-primary text-xs font-bold">
                            #NOCOPY
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detalhes e opções */}
          <div className="md:w-1/3 p-6 flex flex-col overflow-y-auto">
            {/* Informações do fotógrafo */}
            <div className="flex items-center mb-6">
              <img 
                src={photographer.avatar} 
                alt={photographer.name} 
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">{photographer.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fotógrafo</p>
              </div>
            </div>
            
            {/* Detalhes da foto */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                Detalhes da foto
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-medium">Evento:</span> {eventId === '1' ? 'Maratona de Boston 2025' : 
                                                             eventId === '2' ? 'Triatlo de Nova York' : 
                                                             eventId === '3' ? 'Meia Maratona de Chicago' : 
                                                             'Torneio de Futebol de Seattle'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-medium">Data:</span> {new Date(photo.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            {/* Opções de qualidade */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                Escolha a qualidade
              </h4>
              <div className="space-y-3">
                {qualityOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedQuality === option.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setSelectedQuality(option.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">{option.name}</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{option.resolution}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">R$ {option.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Ações */}
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Preço selecionado</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    R$ {selectedOption.price.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => onAddToCart(photo, selectedQuality)}
                className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailModal;
