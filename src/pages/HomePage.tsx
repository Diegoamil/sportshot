import React, { useMemo } from 'react';
import HeroSection from '../components/home/HeroSection';
import EventsGrid from '../components/home/EventsGrid';
import PhotographersList from '../components/home/PhotographersList';
import { EventType, PhotographerType } from '../types';

export const RECENT_EVENTS: EventType[] = [
  {
    id: '1',
    name: 'Maratona de Boston 2025',
    date: 'April 21, 2025 - 08:00',
    location: 'Boston, MA',
    coverImage: 'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg',
    totalPhotos: 2457,
    participants: 30000,
    description: 'A maratona anual mais antiga do mundo e um dos eventos de corrida de rua mais prestigiados.',
    photosReleaseDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias a partir de agora
    uploadProgress: 65,
    category: 'Corrida',
    photographers: [
      { id: '1', name: 'Carlos Silva', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: '2', name: 'Ana Oliveira', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: '3', name: 'Pedro Santos', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' }
    ]
  },
  {
    id: '2',
    name: 'Triatlo de Nova York',
    date: 'July 15, 2025 - 07:30',
    location: 'Nova York, NY',
    coverImage: 'https://images.pexels.com/photos/2421452/pexels-photo-2421452.jpeg',
    totalPhotos: 1890,
    participants: 5000,
    description: 'Corrida de distância olímpica com 1,5km de natação, 40km de ciclismo e 10km de corrida por Nova York.',
    category: 'Triatlo',
    photographers: [
      { id: '4', name: 'Mariana Costa', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
      { id: '5', name: 'Rafael Mendes', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
      { id: '6', name: 'Juliana Alves', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
      { id: '7', name: 'Bruno Martins', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' }
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
    photosReleaseDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 horas a partir de agora
    uploadProgress: 92,
    category: 'Corrida',
    photographers: [
      { id: '8', name: 'Fernanda Lima', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
      { id: '9', name: 'Ricardo Souza', avatar: 'https://randomuser.me/api/portraits/men/36.jpg' },
      { id: '10', name: 'Camila Torres', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
      { id: '11', name: 'Diego Almeida', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
      { id: '12', name: 'Luiza Ferreira', avatar: 'https://randomuser.me/api/portraits/women/57.jpg' },
      { id: '13', name: 'Marcos Ribeiro', avatar: 'https://randomuser.me/api/portraits/men/62.jpg' }
    ]
  },
  {
    id: '4',
    name: 'Torneio de Futebol de Seattle',
    date: 'August 12, 2025 - 09:00',
    location: 'Seattle, WA',
    coverImage: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    totalPhotos: 3210,
    participants: 2500,
    description: 'Torneio anual de futebol juvenil com equipes de todo o Noroeste do Pacífico.',
    category: 'Futebol',
    photographers: [
      { id: '14', name: 'Gabriel Costa', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
      { id: '15', name: 'Isabela Santos', avatar: 'https://randomuser.me/api/portraits/women/23.jpg' }
    ]
  }
];

export const FEATURED_EVENTS: EventType[] = [
  {
    id: '5',
    name: 'Travessia da Baía de São Francisco',
    date: 'June 8, 2025 - 07:15',
    location: 'São Francisco, CA',
    coverImage: 'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg',
    totalPhotos: 875,
    participants: 800,
    description: 'Desafiadora natação em águas abertas através da Baía de São Francisco.',
    category: 'Natação',
    photographers: [
      { id: '16', name: 'Luciana Vieira', avatar: 'https://randomuser.me/api/portraits/women/42.jpg' },
      { id: '17', name: 'Thiago Pereira', avatar: 'https://randomuser.me/api/portraits/men/29.jpg' },
      { id: '18', name: 'Carla Duarte', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
    ]
  },
  {
    id: '6',
    name: 'Vôlei de Praia de Miami',
    date: 'May 22, 2025 - 10:30',
    location: 'Miami, FL',
    coverImage: 'https://images.pexels.com/photos/2444852/pexels-photo-2444852.jpeg',
    totalPhotos: 1560,
    participants: 350,
    description: 'Torneio profissional de vôlei de praia com os melhores jogadores de todo o mundo.',
    photosReleaseDate: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos a partir de agora
    uploadProgress: 98,
    category: 'Vôlei',
    photographers: [
      { id: '19', name: 'Amanda Rocha', avatar: 'https://randomuser.me/api/portraits/women/15.jpg' },
      { id: '20', name: 'Felipe Gomes', avatar: 'https://randomuser.me/api/portraits/men/77.jpg' },
      { id: '21', name: 'Bianca Lopes', avatar: 'https://randomuser.me/api/portraits/women/37.jpg' },
      { id: '22', name: 'Henrique Dias', avatar: 'https://randomuser.me/api/portraits/men/83.jpg' }
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
      { id: '23', name: 'Renata Campos', avatar: 'https://randomuser.me/api/portraits/women/52.jpg' },
      { id: '24', name: 'Lucas Moreira', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
      { id: '25', name: 'Patrícia Nunes', avatar: 'https://randomuser.me/api/portraits/women/89.jpg' }
    ]
  },
  {
    id: '8',
    name: 'Expo Fitness de Portland',
    date: 'October 5, 2025 - 09:30',
    location: 'Portland, OR',
    coverImage: 'https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg',
    totalPhotos: 3500,
    participants: 15000,
    description: 'Exposição anual de fitness com competições, demonstrações e workshops.',
    category: 'Fitness',
    photographers: [
      { id: '26', name: 'Eduardo Freitas', avatar: 'https://randomuser.me/api/portraits/men/91.jpg' },
      { id: '27', name: 'Daniela Cardoso', avatar: 'https://randomuser.me/api/portraits/women/75.jpg' },
      { id: '28', name: 'Roberto Teixeira', avatar: 'https://randomuser.me/api/portraits/men/39.jpg' },
      { id: '29', name: 'Aline Barros', avatar: 'https://randomuser.me/api/portraits/women/63.jpg' },
      { id: '30', name: 'Gustavo Pinto', avatar: 'https://randomuser.me/api/portraits/men/25.jpg' }
    ]
  }
];

const HomePage: React.FC = () => {
  // Extrair fotógrafos únicos de todos os eventos
  const uniquePhotographers = useMemo(() => {
    const allEvents = [...RECENT_EVENTS, ...FEATURED_EVENTS];
    const photographersMap = new Map<string, PhotographerType>();
    
    allEvents.forEach(event => {
      event.photographers?.forEach(photographer => {
        if (!photographersMap.has(photographer.id)) {
          photographersMap.set(photographer.id, photographer);
        }
      });
    });
    
    return Array.from(photographersMap.values());
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="pt-12">
        <EventsGrid title="Eventos Recentes" events={RECENT_EVENTS} />
        <EventsGrid title="Eventos em Destaque" events={FEATURED_EVENTS} />
        <PhotographersList photographers={uniquePhotographers} />
      </div>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Como Funciona</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa tecnologia de reconhecimento facial torna a busca por suas fotos esportivas mais fácil do que nunca
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-500">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Envie uma Selfie</h3>
              <p className="text-gray-600">
                Simplesmente envie uma foto clara do seu rosto ou tire uma selfie usando nosso aplicativo
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-500">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Correspondência Automática</h3>
              <p className="text-gray-600">
                Nossa IA encontra instantaneamente todas as fotos suas de qualquer evento que você tenha participado
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-500">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Baixe e Compartilhe</h3>
              <p className="text-gray-600">
                Compre downloads de alta qualidade ou compartilhe seus momentos esportivos nas redes sociais
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;