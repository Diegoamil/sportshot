import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import { EventType } from '../types';

// Importar dados de eventos da HomePage para reutilizar
import { RECENT_EVENTS, FEATURED_EVENTS } from '../pages/HomePage';

// Combinar todos os eventos da plataforma
const ALL_EVENTS: EventType[] = [...RECENT_EVENTS, ...FEATURED_EVENTS];

// Categorias de eventos disponíveis (extraídas dos eventos)
const EVENT_CATEGORIES = Array.from(
  new Set(ALL_EVENTS.map(event => event.category).filter(Boolean) as string[])
);

const AllEventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'photos'>('date');

  // Filtrar eventos com base na pesquisa e categoria selecionada
  const filteredEvents = ALL_EVENTS.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Ordenar eventos
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date.split(' - ')[0]).getTime() - new Date(a.date.split(' - ')[0]).getTime();
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'photos') {
      return b.totalPhotos - a.totalPhotos;
    }
    return 0;
  });

  // Função auxiliar para formatar a data
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg" 
            alt="Eventos esportivos" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Todos os Eventos
          </h1>
          <p className="text-lg text-center text-gray-300 max-w-3xl mb-8">
            Encontre eventos esportivos, navegue pelas fotos e descubra imagens incríveis de suas competições favoritas
          </p>
          
          {/* Barra de pesquisa */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar eventos por nome ou localização..."
                className="w-full py-3 pl-12 pr-4 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtros e ordenação */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Filtros</h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-sm ${!selectedCategory ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  Todos
                </button>
                {EVENT_CATEGORIES.map(category => (
                  <button 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Ordenar por</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSortBy('date')}
                  className={`px-3 py-1 rounded-full text-sm ${sortBy === 'date' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  Data
                </button>
                <button 
                  onClick={() => setSortBy('name')}
                  className={`px-3 py-1 rounded-full text-sm ${sortBy === 'name' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  Nome
                </button>
                <button 
                  onClick={() => setSortBy('photos')}
                  className={`px-3 py-1 rounded-full text-sm ${sortBy === 'photos' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  Quantidade de Fotos
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resultados */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {sortedEvents.length} {sortedEvents.length === 1 ? 'Evento Encontrado' : 'Eventos Encontrados'}
          </h2>
        </div>
        
        {/* Grid de eventos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedEvents.map((event) => (
            <div key={event.id} className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <a href={`/event/${event.id}`} className="block">
                <div className="relative overflow-hidden aspect-[4/3]">
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
                  
                  {/* Total de fotos */}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {event.totalPhotos} fotos
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                    {event.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  {/* Fotógrafos */}
                  {event.photographers && event.photographers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-2">
                          {event.photographers.slice(0, 3).map((photographer, index) => (
                            <img 
                              key={`${photographer.id}-${index}`}
                              src={photographer.avatar} 
                              alt={photographer.name}
                              title={photographer.name}
                              className="w-6 h-6 rounded-full border border-white object-cover"
                            />
                          ))}
                          {event.photographers.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 border border-white">
                              +{event.photographers.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {event.photographers.length} {event.photographers.length === 1 ? 'fotógrafo' : 'fotógrafos'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </a>
            </div>
          ))}
        </div>
        
        {/* Mensagem quando não há resultados */}
        {sortedEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-600 mb-4">
                Não encontramos eventos que correspondam aos seus critérios de busca.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEventsPage;
