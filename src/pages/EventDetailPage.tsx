import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Image, Upload, ChevronDown, Filter, Search, Camera, ArrowRight } from 'lucide-react';
import { EventType } from '../types';
import SelfieModal from '../components/common/SelfieModal';
import FacialRecognitionModal from '../components/common/FacialRecognitionModal';

// Componente para exibir a galeria de fotos do evento
const PhotoGallery: React.FC<{ photos: string[], eventId: string }> = ({ photos, eventId }) => {
  const handlePhotoClick = (photoId: string) => {
    window.location.href = `/event/${eventId}/photo/${photoId}`;
  };
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {photos.map((photo, index) => (
        <div 
          key={index} 
          className="relative aspect-[4/5] overflow-hidden rounded-lg group cursor-pointer"
          onClick={() => handlePhotoClick(String(index + 1))}
        >
          <img 
            src={photo} 
            alt={`Foto ${index + 1}`} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-3">
            <button className="text-white bg-primary/80 hover:bg-primary px-3 py-1 rounded-full text-xs backdrop-blur-sm">
              Ver detalhes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente para exibir as opções de filtro
const FilterOptions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Cabeçalho */}
      <div 
        className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/90 to-blue-400/70 text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
            <Filter size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium">Filtrar fotos</h3>
            <p className="text-sm text-white/80">Encontre fotos específicas</p>
          </div>
        </div>
        <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full transition-transform duration-300 transform-gpu" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <ChevronDown size={18} />
        </div>
      </div>
      
      {/* Conteúdo do filtro */}
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Álbum</label>
              <div className="relative">
                <select className="w-full p-2.5 pl-4 pr-10 appearance-none border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Todos os álbuns</option>
                  <option value="album1">Largada</option>
                  <option value="album2">Percurso</option>
                  <option value="album3">Chegada</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Ordenar por</label>
              <div className="relative">
                <select className="w-full p-2.5 pl-4 pr-10 appearance-none border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="recent">Mais recentes</option>
                  <option value="oldest">Mais antigas</option>
                  <option value="popular">Mais populares</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Buscar</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar por número, nome..." 
                  className="w-full p-2.5 pl-10 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Limpar filtros
            </button>
            <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Filter size={16} />
              <span>Aplicar filtros</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para reconhecimento facial
const FacialRecognition: React.FC = () => {
  const [isSelfieModalOpen, setIsSelfieModalOpen] = useState(false);
  
  const handleOpenSelfieModal = () => {
    setIsSelfieModalOpen(true);
  };
  
  const handleCloseSelfieModal = () => {
    setIsSelfieModalOpen(false);
  };
  
  const handleCaptureSelfie = (imageSrc: string) => {
    console.log('Selfie capturada:', imageSrc);
    // Aqui você pode implementar a lógica para enviar a selfie para o servidor
    // e iniciar o processo de reconhecimento facial
    
    // Exemplo de como você poderia mostrar um feedback ao usuário:
    alert('Sua selfie foi enviada! Estamos procurando suas fotos...');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100 dark:border-gray-700">
      {/* Cabeçalho com gradiente */}
      <div className="bg-gradient-to-r from-primary/90 to-primary/70 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
            <Upload size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Reconhecimento facial</h3>
            <p className="text-sm text-white/80">
              Encontre todas as suas fotos neste evento
            </p>
          </div>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="p-5">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
          Nosso sistema de reconhecimento facial identifica automaticamente você nas fotos do evento. 
          Escolha uma das opções abaixo para começar:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Upload size={24} className="text-primary" />
            </div>
            <div className="text-center">
              <span className="block font-medium mb-1">Enviar foto</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Selecione uma foto do seu dispositivo</span>
            </div>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors group"
            onClick={handleOpenSelfieModal}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Camera size={24} className="text-primary" />
            </div>
            <div className="text-center">
              <span className="block font-medium mb-1">Tirar selfie</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Use a câmera do seu dispositivo</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Modal de selfie */}
      <SelfieModal 
        isOpen={isSelfieModalOpen} 
        onClose={handleCloseSelfieModal} 
        onCapture={handleCaptureSelfie} 
      />
    </div>
  );
};

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isRecognitionModalOpen, setIsRecognitionModalOpen] = useState(false);
  
  // Dados de exemplo para o evento
  const event: EventType = {
    id: id || '1',
    name: 'Maratona de João Pessoa 2025',
    date: 'April 21, 2025 - 08:00',
    location: 'João Pessoa, PB',
    coverImage: 'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg',
    totalPhotos: 5332,
    participants: 12500,
    description: 'A maratona anual de João Pessoa reúne corredores de todo o Brasil em um percurso deslumbrante pela orla da cidade. Venha participar desta experiência única!',
    category: 'Corrida'
  };
  
  // Fotos de exemplo para o evento
  const eventPhotos = [
    'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg',
    'https://images.pexels.com/photos/2421452/pexels-photo-2421452.jpeg',
    'https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg',
    'https://images.pexels.com/photos/2048716/pexels-photo-2048716.jpeg',
    'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg',
    'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg',
    'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg',
    'https://images.pexels.com/photos/3912366/pexels-photo-3912366.jpeg'
  ];
  
  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString.split(' - ')[0]);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);
    
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const weekday = weekdays[date.getDay()];
    
    return `${day}.${month}.${year} - ${weekday}`;
  };

  return (
    <div>
      {/* Hero section com imagem de capa e informações do evento */}
      <div className="relative">
        {/* Imagem de capa */}
        <div className="h-[30vh] md:h-[35vh] overflow-hidden">
          <img 
            src={event.coverImage} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        {/* Tag de categoria */}
        <div className="absolute top-4 left-4 bg-primary/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          {event.category}
        </div>
        
        {/* Botão de reconhecimento facial */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsRecognitionModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium flex items-center justify-center hover:bg-blue-600 transition-colors group"
          >
            <Upload className="w-4 h-4 mr-2" />
            <span>Encontrar minhas fotos</span>
            <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
          </button>
        </div>
        
        {/* Informações do evento sobrepostas */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{event.name}</h1>
            
            <div className="flex flex-wrap gap-3 mb-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-primary" />
                <span>{event.participants.toLocaleString()} participantes</span>
              </div>
              
              <div className="flex items-center">
                <Image className="w-4 h-4 mr-2 text-primary" />
                <span>{event.totalPhotos.toLocaleString()} fotos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Descrição do evento */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Sobre o evento</h2>
          <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
        </div>
        
        {/* Reconhecimento facial */}
        <FacialRecognition />
        
        {/* Filtros */}
        <FilterOptions />
        
        {/* Galeria de fotos */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Fotos do evento</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{event.totalPhotos.toLocaleString()} fotos</span>
          </div>
          
          <PhotoGallery photos={eventPhotos} eventId={event.id} />
          
          {/* Botão para carregar mais */}
          <div className="mt-8 text-center">
            <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Carregar mais fotos
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
        }} 
      />
    </div>
  );
};

export default EventDetailPage;
