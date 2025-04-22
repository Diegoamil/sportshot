import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { EventType } from '../../types';

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

interface EventsGridProps {
  title: string;
  events: EventType[];
}

// Hook personalizado para calcular o tempo restante
const useCountdown = (targetDate: string | undefined) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
      }
      
      return {
        total: difference,
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

// Componente de contagem regressiva
const CountdownTimer: React.FC<{ releaseDate: string }> = ({ 
  releaseDate
}) => {
  const timeLeft = useCountdown(releaseDate);
  
  if (timeLeft.total <= 0) {
    return (
      <div className="flex items-center justify-center bg-primary/20 text-white p-2 rounded-md backdrop-blur-sm">
        <span className="text-sm font-medium">Fotos disponíveis</span>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center bg-black/40 backdrop-blur-md rounded-md px-2 py-1 border border-primary/30 w-full">
        <span className="text-xs text-white/80">Disponíveis em:</span>
        <div className="flex space-x-1.5 ml-1">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-primary">{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="text-[8px] text-white/70">dias</span>
          </div>
          <span className="text-primary font-bold self-start">:</span>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-primary">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-[8px] text-white/70">hrs</span>
          </div>
          <span className="text-primary font-bold self-start">:</span>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-primary">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-[8px] text-white/70">min</span>
          </div>
          <span className="text-primary font-bold self-start">:</span>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-primary">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-[8px] text-white/70">seg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsGrid: React.FC<EventsGridProps> = ({ title, events }) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div key={event.id} className="group">
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
                    {/* Avatares dos fotógrafos */}
                    {event.photographers && event.photographers.length > 0 && (
                      <div className="flex -space-x-2 mb-2">
                        {event.photographers.slice(0, 5).map((photographer, index) => (
                          <img 
                            key={`${photographer.id}-${index}`}
                            src={photographer.avatar} 
                            alt={photographer.name}
                            title={photographer.name}
                            className="w-6 h-6 rounded-full border border-white/70 object-cover shadow-sm"
                          />
                        ))}
                        {event.photographers.length > 5 && (
                          <div className="w-6 h-6 rounded-full bg-gray-800 border border-white/70 flex items-center justify-center text-[10px] text-white">
                            +{event.photographers.length - 5}
                          </div>
                        )}
                      </div>
                    )}
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
                      
                      {/* Contagem regressiva para liberação das fotos */}
                      {event.photosReleaseDate && (
                        <div className="mt-1">
                          <CountdownTimer 
                            releaseDate={event.photosReleaseDate} 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;