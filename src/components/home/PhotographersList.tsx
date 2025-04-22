import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PhotographerType } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotographersListProps {
  photographers: PhotographerType[];
}

const PhotographersList: React.FC<PhotographersListProps> = ({ photographers }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fotógrafos Cadastrados</h2>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
              aria-label="Rolar para a esquerda"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
              aria-label="Rolar para a direita"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div ref={scrollContainerRef} className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex space-x-6 pl-1">
              {photographers.map((photographer) => (
                <Link 
                  key={photographer.id} 
                  to={`/photographer/${photographer.id}`}
                  className="group flex-shrink-0 flex flex-col items-center text-center w-24"
                >
                  <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-primary transition-colors duration-300">
                      <img 
                        src={photographer.avatar} 
                        alt={photographer.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors truncate w-full">
                    {photographer.name}
                  </h3>
                  {photographer.specialties && photographer.specialties.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-full">
                      {photographer.specialties[0]}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* O estilo para ocultar a scrollbar está definido no CSS global */}
    </section>
  );
};

export default PhotographersList;
