import React, { useState } from 'react';
import { Check, Download, ShoppingCart, Info } from 'lucide-react';
import { PhotoType } from '../../types';
import PhotoDetailModal from './PhotoDetailModal';

interface PhotoGridProps {
  photos: PhotoType[];
  onSelectPhoto: (photo: PhotoType) => void;
  selectedPhotos?: PhotoType[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onSelectPhoto, selectedPhotos = [] }) => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPhoto = (photo: PhotoType, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectPhoto(photo);
  };

  const handlePhotoClick = (photo: PhotoType) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleAddToCart = (photo: PhotoType, quality: string) => {
    // Adicionar ao carrinho com a qualidade selecionada
    onSelectPhoto(photo);
    setIsModalOpen(false);
    // Aqui você poderia adicionar lógica adicional para armazenar a qualidade selecionada
  };

  // Todas as fotos terão a mesma proporção 1:1

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => {
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
        
        return (
          <div 
            key={photo.id}
            className="group relative cursor-pointer"
            onMouseEnter={() => setHoveredId(photo.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handlePhotoClick(photo)}
          >
            <div className="relative overflow-hidden rounded-lg aspect-square w-full h-full">
              <img 
                src={photo.url} 
                alt={photo.caption || 'Foto de evento'} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Watermark - Estilo grade com linhas tracejadas diagonais */}
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
                  {/* Grade de 3x3 com o texto da marca d'água */}
                  <div className="grid grid-cols-3 gap-x-16 gap-y-16 w-full h-full p-4">
                    {Array.from({ length: 9 }).map((_, index) => (
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
              
              {/* Avatar do fotógrafo */}
              <div className="absolute top-3 left-3 flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full pl-0.5 pr-3 py-0.5">
                <img 
                  src={photographer.avatar} 
                  alt={photographer.name}
                  className="w-6 h-6 rounded-full border border-white/50"
                />
                <span className="text-white text-xs font-medium">{photographer.name}</span>
              </div>
            
            {/* Hover overlay */}
            <div 
              className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-200 ${
                hoveredId === photo.id ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex space-x-2">
                <button 
                  className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={(e) => handleSelectPhoto(photo, e)}
                >
                  {selectedPhotos.some(p => p.id === photo.id) ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <ShoppingCart className="w-5 h-5" />
                  )}
                </button>
                <button className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Selection indicator */}
          {selectedPhotos.some(p => p.id === photo.id) && (
            <div className="absolute top-3 right-3 z-10 bg-primary text-white p-1 rounded-full">
              <Check className="w-4 h-4" />
            </div>
          )}
          
          {/* Informações da foto */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-10 pb-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white text-sm font-medium truncate">{photo.caption}</h3>
            <div className="flex justify-between items-center mt-1">
              <span className="text-white/80 text-xs">R$ {photo.price.toFixed(2)}</span>
              <div className="flex space-x-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPhoto(photo);
                  }}
                  className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-white" />
                </button>
                <button 
                  className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        );
      })}
      </div>

      {/* Modal de detalhes da foto */}
      <PhotoDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photo={selectedPhoto}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default PhotoGrid;