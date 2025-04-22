import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';

interface PhotoOption {
  id: string;
  name: string;
  description: string;
  price: number;
  resolution: string;
}

const PhotoDetailPage: React.FC = () => {
  const { eventId, photoId } = useParams<{ eventId: string; photoId: string }>();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Dados de exemplo para a foto
  const photo = {
    id: photoId || '1',
    url: `https://images.pexels.com/photos/${2000000 + Number(photoId || 1) * 11}/pexels-photo-${2000000 + Number(photoId || 1) * 11}.jpeg`,
    eventId: eventId || '1',
    eventName: 'Maratona de João Pessoa 2025',
    date: 'April 21, 2025',
    code: `FOTO${photoId}30849`,
    photographer: 'MegaFotógrafo'
  };
  
  // Opções de compra
  const photoOptions: PhotoOption[] = [
    {
      id: 'high',
      name: 'Alta resolução',
      description: 'Ideal para impressões grandes e uso profissional',
      price: 17.90,
      resolution: '4000 x 3000 px'
    },
    {
      id: 'medium',
      name: 'Média resolução',
      description: 'Perfeita para redes sociais e impressões pequenas',
      price: 11.90,
      resolution: '2000 x 1500 px'
    }
  ];
  
  const handleAddToCart = () => {
    if (!selectedOption) return;
    
    // Aqui você adicionaria a lógica para adicionar ao carrinho
    console.log(`Adicionando foto ${photoId} com opção ${selectedOption} ao carrinho`);
    
    // Exibir feedback de sucesso
    alert('Foto adicionada ao carrinho com sucesso!');
  };
  
  const handleContinueShopping = () => {
    navigate(`/event/${eventId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Cabeçalho */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to={`/event/${eventId}`} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span className="text-sm">Voltar</span>
            </Link>
          </div>
          
          <div className="flex-1 text-center">
            <Link to="/" className="inline-block">
              <div className="flex items-center justify-center">
                <span className="text-primary font-bold text-lg">SportShot</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/checkout" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 pt-14 pb-6">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Coluna da foto */}
          {/* Coluna da foto - ocupa mais espaço em telas maiores */}
          <div className="md:w-3/5 lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative aspect-[4/5]">
                <img 
                  src={photo.url} 
                  alt={`Foto ${photoId}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Foto por {photo.photographer}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Cód: {photo.code}</p>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {photo.eventName} | {photo.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna de opções de compra */}
          {/* Coluna de opções de compra - ocupa menos espaço em telas maiores */}
          <div className="md:w-2/5 lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">PRODUTOS</h2>
              
              <div className="space-y-3 mb-6">
                {photoOptions.map((option) => (
                  <div 
                    key={option.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedOption === option.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">{option.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{option.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Resolução: {option.resolution}</p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-base font-bold text-gray-900 dark:text-white">
                          R$ {option.price.toFixed(2).replace('.', ',')}
                        </span>
                        
                        {selectedOption === option.id && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  className={`w-full py-2 rounded-lg font-medium text-sm ${
                    selectedOption 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                  onClick={handleAddToCart}
                  disabled={!selectedOption}
                >
                  IR PARA O CARRINHO
                </button>
                
                <button 
                  className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  onClick={handleContinueShopping}
                >
                  CONTINUAR COMPRANDO
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetailPage;
