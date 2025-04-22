import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, Grid, List, Image as ImageIcon, Camera } from 'lucide-react';
import UploadArea from '../components/search/UploadArea';
import PhotoGrid from '../components/search/PhotoGrid';
import FacialRecognitionModal from '../components/common/FacialRecognitionModal';
import LoadingOverlay from '../components/common/LoadingOverlay';
import { PhotoType } from '../types';
import { recognizeFace, fileToBase64 } from '../services/facialRecognitionService';

// Mock photo data
const MOCK_PHOTOS: PhotoType[] = Array.from({ length: 24 }, (_, i) => ({
  id: `photo-${i + 1}`,
  url: `https://images.pexels.com/photos/${2000000 + i * 11}/pexels-photo-${2000000 + i * 11}.jpeg`,
  caption: `Sports photo ${i + 1}`,
  price: 9.99,
  date: new Date().toISOString(),
  eventId: i % 4 === 0 ? '1' : i % 4 === 1 ? '2' : i % 4 === 2 ? '3' : '4',
}));

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchMode = searchParams.get('mode') || 'text';
  const searchQuery = searchParams.get('q') || '';
  
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isFacialRecognitionModalOpen, setIsFacialRecognitionModalOpen] = useState(searchMode === 'facial' && !showResults);

  useEffect(() => {
    if (searchQuery && searchMode === 'text') {
      // Simular busca por texto
      setIsSearching(true);
      setTimeout(() => {
        // Aqui você faria uma chamada de API real para buscar fotos baseadas no texto
        const mockResults = Array.from({ length: 8 }, (_, i) => ({
          id: `photo-${i + 1}`,
          url: `https://images.pexels.com/photos/${2000000 + i * 11}/pexels-photo-${2000000 + i * 11}.jpeg`,
          caption: `Resultado para "${searchQuery}" ${i + 1}`,
          price: 9.99,
          date: new Date().toISOString(),
          eventId: i % 4 === 0 ? '1' : i % 4 === 1 ? '2' : i % 4 === 2 ? '3' : '4',
        }));
        setPhotos(mockResults);
        setIsSearching(false);
        setShowResults(true);
      }, 1000);
    }
  }, [searchQuery, searchMode]);

  const handleImageUpload = async (file: File) => {
    setIsSearching(true);
    try {
      // Converter o arquivo para base64
      const imageData = await fileToBase64(file);
      
      // Simular um pequeno atraso para mostrar a animação de carregamento
      // Em produção, isso seria o tempo real de processamento da API
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Processar reconhecimento facial
      const results = await recognizeFace(imageData);
      
      setPhotos(results);
      setShowResults(true);
    } catch (error) {
      console.error('Erro ao processar reconhecimento facial:', error);
      alert('Ocorreu um erro ao processar sua imagem. Por favor, tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleFacialRecognitionCapture = async (imageSrc: string) => {
    setIsFacialRecognitionModalOpen(false);
    setIsSearching(true);
    
    try {
      // Simular um pequeno atraso para mostrar a animação de carregamento
      // Em produção, isso seria o tempo real de processamento da API
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Processar reconhecimento facial com a imagem capturada
      const results = await recognizeFace(imageSrc);
      
      setPhotos(results);
      setShowResults(true);
    } catch (error) {
      console.error('Erro ao processar reconhecimento facial:', error);
      alert('Ocorreu um erro ao processar sua imagem. Por favor, tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPhoto = (photo: PhotoType) => {
    setSelectedPhotos(prev => {
      if (prev.some(p => p.id === photo.id)) {
        return prev.filter(p => p.id !== photo.id);
      } else {
        return [...prev, photo];
      }
    });
  };

  const handleCheckout = () => {
    // Aqui você redirecionaria para a página de checkout com os IDs das fotos selecionadas
    const photoIds = selectedPhotos.map(photo => photo.id).join(',');
    navigate(`/checkout?photos=${photoIds}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Encontre Suas Fotos</h1>
        <p className="text-lg text-gray-600 mb-8">
          {searchMode === 'facial' 
            ? 'Envie uma selfie para encontrar todas as suas fotos usando reconhecimento facial' 
            : searchQuery ? `Resultados da busca para "${searchQuery}"` : 'Busque por eventos, locais ou datas'}
        </p>

        {/* Removemos a área de upload direta, agora o usuário usará o botão "Nova Busca" */}

        {/* Overlay de carregamento com animação */}
        <LoadingOverlay 
          isVisible={isSearching}
          message={searchMode === 'facial' ? 'Processando reconhecimento facial' : 'Buscando suas fotos'}
        />
        
        {/* Removemos o indicador de carregamento antigo, pois agora usamos o LoadingOverlay */}

        {showResults && !isSearching && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <p className="text-gray-700">
                  Encontradas <span className="font-semibold">{photos.length}</span> fotos
                </p>
                
                {/* Botão para enviar nova foto */}
                <button 
                  onClick={() => {
                    setShowResults(false);
                    setIsFacialRecognitionModalOpen(true);
                  }}
                  className="flex items-center px-3 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  <span>Nova Busca</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  <span>Filtrar</span>
                </button>
                
                <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
                  <button className="p-2 bg-blue-50 text-blue-500">
                    <Grid className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <PhotoGrid photos={photos} onSelectPhoto={handleSelectPhoto} selectedPhotos={selectedPhotos} />
            
            {selectedPhotos.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-4 px-4 sm:px-6 z-40">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <ImageIcon className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">{selectedPhotos.length}</span> fotos selecionadas
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-gray-900">
                      R$ {(selectedPhotos.length * 9.99).toFixed(2)}
                    </span>
                    <button 
                      onClick={handleCheckout}
                      className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Modal de reconhecimento facial */}
      <FacialRecognitionModal 
        isOpen={isFacialRecognitionModalOpen} 
        onClose={() => setIsFacialRecognitionModalOpen(false)} 
        onCapture={handleFacialRecognitionCapture} 
      />
    </div>
  );
};

export default SearchPage;