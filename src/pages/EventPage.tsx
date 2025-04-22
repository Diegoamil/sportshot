import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Upload, Filter } from 'lucide-react';
import EventBanner from '../components/event/EventBanner';
import PhotoGrid from '../components/search/PhotoGrid';
import { EventType, PhotoType } from '../types';

// Mock data
const EVENTS: EventType[] = [
  {
    id: '1',
    name: 'Maratona de Boston 2025',
    date: '21 de Abril, 2025',
    location: 'Boston, MA',
    coverImage: 'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg',
    totalPhotos: 2457,
    participants: 30000,
    description: 'A maratona anual mais antiga do mundo e um dos eventos de corrida de rua mais prestigiados.'
  },
  {
    id: '2',
    name: 'Triatlo de Nova York',
    date: '15 de Julho, 2025',
    location: 'Nova York, NY',
    coverImage: 'https://images.pexels.com/photos/2421452/pexels-photo-2421452.jpeg',
    totalPhotos: 1890,
    participants: 5000,
    description: 'Corrida de distância olímpica com 1,5km de natação, 40km de ciclismo e 10km de corrida por Nova York.'
  },
  {
    id: '3',
    name: 'Meia Maratona de Chicago',
    date: '7 de Setembro, 2025',
    location: 'Chicago, IL',
    coverImage: 'https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg',
    totalPhotos: 1245,
    participants: 12000,
    description: 'Corra ao longo da orla de Chicago com vistas deslumbrantes do horizonte da cidade.'
  },
  {
    id: '4',
    name: 'Torneio de Futebol de Seattle',
    date: '12-14 de Agosto, 2025',
    location: 'Seattle, WA',
    coverImage: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    totalPhotos: 3210,
    participants: 2500,
    description: 'Torneio anual de futebol juvenil com equipes de todo o Noroeste do Pacífico.'
  }
];

// Mock photo data - would come from an API in a real application
const MOCK_PHOTOS: PhotoType[] = Array.from({ length: 30 }, (_, i) => ({
  id: `photo-${i + 1}`,
  url: `https://images.pexels.com/photos/${2000000 + i * 11}/pexels-photo-${2000000 + i * 11}.jpeg`,
  caption: `Foto esportiva ${i + 1}`,
  price: 9.99,
  date: new Date().toISOString(),
  eventId: i % 4 === 0 ? '1' : i % 4 === 1 ? '2' : i % 4 === 2 ? '3' : '4',
}));

const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoType[]>([]);

  useEffect(() => {
    // In a real app, you would fetch event and photos from an API
    const foundEvent = EVENTS.find(e => e.id === id);
    
    if (foundEvent) {
      setEvent(foundEvent);
      setPhotos(MOCK_PHOTOS.filter(photo => photo.eventId === id));
    }
    
    setLoading(false);
  }, [id]);

  const handleSelectPhoto = (photo: PhotoType) => {
    setSelectedPhotos(prev => {
      if (prev.some(p => p.id === photo.id)) {
        return prev.filter(p => p.id !== photo.id);
      } else {
        return [...prev, photo];
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Evento Não Encontrado</h2>
          <p className="text-gray-600">O evento que você está procurando não existe ou foi removido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <EventBanner event={event} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-grow max-w-xl">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Buscar fotos neste evento..."
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                <span>Encontrar-me</span>
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                <span>Filtrar</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Todas as Fotos</h2>
          <p className="text-gray-600">Navegue por todas as {photos.length} fotos deste evento</p>
        </div>
        
        <PhotoGrid photos={photos} onSelectPhoto={handleSelectPhoto} />
        
        {selectedPhotos.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-4 px-4 sm:px-6 z-40">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="text-gray-700">
                  <span className="font-medium">{selectedPhotos.length}</span> fotos selecionadas
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-gray-900">
                  ${(selectedPhotos.length * 9.99).toFixed(2)}
                </span>
                <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;