import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacialRecognitionModal from '../../components/common/FacialRecognitionModal';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [isRecognitionModalOpen, setIsRecognitionModalOpen] = useState(false);

  const handleFindPhotos = () => {
    setIsRecognitionModalOpen(true);
  };

  return (
    <div className="relative h-[40vh] flex items-center">

      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/2608519/pexels-photo-2608519.jpeg"
          alt="Fotógrafo profissional segurando câmera"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Photographers list above hero text */}
          <div className="mb-6 inline-flex bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 items-center">
            <div className="flex -space-x-2 mr-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Fotógrafo" className="w-8 h-8 rounded-full object-cover shadow-md" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Fotógrafa" className="w-8 h-8 rounded-full object-cover shadow-md" />
              <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Fotógrafo" className="w-8 h-8 rounded-full object-cover shadow-md" />
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Fotógrafa" className="w-8 h-8 rounded-full object-cover shadow-md" />
              <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Fotógrafo" className="w-8 h-8 rounded-full object-cover shadow-md" />
              <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="Fotógrafa" className="w-8 h-8 rounded-full object-cover shadow-md" />
              <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Fotógrafo" className="w-8 h-8 rounded-full object-cover shadow-md" />
            </div>
            <span className="text-white text-sm font-normal">Junte-se aos +de 100 profissionais</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Encontre suas fotos de eventos esportivos
          </h1>
          <p className="mt-3 text-lg text-white/90">
            Envie uma selfie para descobrir todas as suas fotos de eventos esportivos usando nossa tecnologia de reconhecimento facial.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleFindPhotos}
              className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Encontrar minhas fotos
            </button>
            <button
              onClick={() => navigate('/events')}
              className="px-6 py-3 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Buscar eventos
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de reconhecimento facial */}
      <FacialRecognitionModal 
        isOpen={isRecognitionModalOpen} 
        onClose={() => setIsRecognitionModalOpen(false)} 
        onCapture={(imageSrc) => {
          console.log('Imagem capturada:', imageSrc);
          // Aqui você pode implementar a lógica para enviar a imagem para o servidor
          // e iniciar o processo de reconhecimento facial
          
          // Exemplo de como você poderia mostrar um feedback ao usuário:
          alert('Sua imagem foi enviada! Estamos procurando suas fotos...');
          setIsRecognitionModalOpen(false);
          
          // Redirecionar para a página de resultados de pesquisa
          navigate('/search?mode=facial');
        }} 
      />
    </div>
  );
};

export default HeroSection;