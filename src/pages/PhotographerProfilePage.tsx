import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Instagram, Facebook, Globe, Calendar, Camera, Tag } from 'lucide-react';
import { EventType } from '../types';

// Dados de exemplo para o fotógrafo
const PHOTOGRAPHER_DATA = {
  id: '1',
  name: 'Carlos Silva',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  coverImage: 'https://images.pexels.com/photos/3800507/pexels-photo-3800507.jpeg',
  bio: 'Fotógrafo profissional especializado em eventos esportivos há mais de 10 anos. Apaixonado por capturar momentos de superação e emoção em competições de todos os níveis.',
  location: 'São Paulo, SP',
  specialties: ['Corrida', 'Triatlo', 'Ciclismo', 'Maratonas'],
  contactEmail: 'carlos.silva@sportshot.com',
  socialMedia: {
    instagram: '@carlossilva.photo',
    facebook: 'carlossilva.sportphoto',
    website: 'www.carlossilva.com.br'
  }
};

// Eventos cobertos pelo fotógrafo (exemplo)
const PHOTOGRAPHER_EVENTS: EventType[] = [
  {
    id: '1',
    name: 'Maratona de Boston 2025',
    date: 'April 21, 2025 - 08:00',
    location: 'Boston, MA',
    coverImage: 'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg',
    totalPhotos: 2457,
    participants: 30000,
    description: 'A maratona anual mais antiga do mundo e um dos eventos de corrida de rua mais prestigiados.',
    category: 'Corrida',
    photographers: [
      { id: '1', name: 'Carlos Silva', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }
    ]
  },
  {
    id: '3',
    name: 'Meia Maratona de Chicago',
    date: 'September 7, 2025 - 06:45',
    location: 'Chicago, IL',
    coverImage: 'https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg',
    totalPhotos: 1245,
    participants: 12000,
    description: 'Corra ao longo da orla de Chicago com vistas deslumbrantes do horizonte da cidade.',
    category: 'Corrida',
    photographers: [
      { id: '1', name: 'Carlos Silva', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }
    ]
  },
  {
    id: '7',
    name: 'Desafio de Mountain Bike de Denver',
    date: 'July 29, 2025 - 08:45',
    location: 'Denver, CO',
    coverImage: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
    totalPhotos: 2145,
    participants: 1200,
    description: 'Mountain bike extremo através do terreno desafiador das Montanhas Rochosas.',
    category: 'Ciclismo',
    photographers: [
      { id: '1', name: 'Carlos Silva', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }
    ]
  }
];

// Componente para exibir um evento na grade
const EventCard: React.FC<{ event: EventType }> = ({ event }) => {
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
    <div className="group">
      <Link to={`/event/${event.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[4/5]">
          {/* Imagem */}
          <img
            src={event.coverImage}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Tag de categoria */}
          {event.category && (
            <div className="absolute top-2 left-2 bg-primary/80 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
              {event.category}
            </div>
          )}
          
          {/* Gradiente sobreposto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Conteúdo sobreposto */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
              {event.name}
            </h3>
            <div className="space-y-1">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1 text-white/80" />
                <span className="text-white/90 text-xs">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-white/80" />
                <span className="text-white/90 text-xs">{event.location}</span>
              </div>
              <div className="flex items-center mt-1">
                <Camera className="w-3 h-3 mr-1 text-white/80" />
                <span className="text-white/90 text-xs">{event.totalPhotos} fotos</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const PhotographerProfilePage: React.FC = () => {
  // Em uma implementação real, você buscaria os dados do fotógrafo com base no ID
  // const { id } = useParams<{ id: string }>();
  // console.log(`Carregando dados do fotógrafo com ID: ${id}`);
  
  // Por enquanto, usamos dados estáticos
  const photographer = PHOTOGRAPHER_DATA;
  const events = PHOTOGRAPHER_EVENTS;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section com foto de capa */}
      <div className="relative h-[30vh] md:h-[35vh]">
        <div className="absolute inset-0">
          <img 
            src={photographer.coverImage} 
            alt={`${photographer.name} - Capa`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
      </div>
      
      {/* Perfil do fotógrafo */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
          <img 
            src={photographer.avatar} 
            alt={photographer.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <div className="text-center md:text-left p-4 -mt-6 rounded-lg">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{photographer.name}</h1>
            <div className="flex items-center justify-center md:justify-start mt-2">
              <MapPin className="w-4 h-4 mr-1 text-primary" />
              <span className="text-gray-800 font-medium">{photographer.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da esquerda - Informações do fotógrafo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre</h2>
              <p className="text-gray-700 mb-6">{photographer.bio}</p>
              
              {/* Especialidades */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {photographer.specialties?.map((specialty, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <Tag className="w-3 h-3 mr-1 text-primary" />
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Contato */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Contato</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-primary" />
                    <a href={`mailto:${photographer.contactEmail}`} className="text-gray-700 hover:text-primary">
                      {photographer.contactEmail}
                    </a>
                  </div>
                  
                  {photographer.socialMedia?.instagram && (
                    <div className="flex items-center">
                      <Instagram className="w-5 h-5 mr-2 text-primary" />
                      <a href="#" className="text-gray-700 hover:text-primary">
                        {photographer.socialMedia.instagram}
                      </a>
                    </div>
                  )}
                  
                  {photographer.socialMedia?.facebook && (
                    <div className="flex items-center">
                      <Facebook className="w-5 h-5 mr-2 text-primary" />
                      <a href="#" className="text-gray-700 hover:text-primary">
                        {photographer.socialMedia.facebook}
                      </a>
                    </div>
                  )}
                  
                  {photographer.socialMedia?.website && (
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-primary" />
                      <a href="#" className="text-gray-700 hover:text-primary">
                        {photographer.socialMedia.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Botão de contato */}
              <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                Contratar para Evento
              </button>
            </div>
          </div>
          
          {/* Coluna da direita - Eventos do fotógrafo */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Eventos Recentes</h2>
                <span className="text-sm text-gray-500">{events.length} eventos</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
            
            {/* Estatísticas */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Estatísticas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="block text-2xl font-bold text-primary">{events.length}</span>
                  <span className="text-gray-600 text-sm">Eventos</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="block text-2xl font-bold text-primary">5.8k</span>
                  <span className="text-gray-600 text-sm">Fotos</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="block text-2xl font-bold text-primary">43k</span>
                  <span className="text-gray-600 text-sm">Atletas</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="block text-2xl font-bold text-primary">4.9</span>
                  <span className="text-gray-600 text-sm">Avaliação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerProfilePage;
