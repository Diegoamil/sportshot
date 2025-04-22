import React, { useEffect, useRef } from 'react';

interface PhotographerData {
  id: string;
  name: string;
  avatar: string;
}

interface PhotographersCarouselProps {
  photographers: PhotographerData[];
}

const PhotographersCarousel: React.FC<PhotographersCarouselProps> = ({ photographers }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Triplicar os fotógrafos para garantir um efeito de carrossel infinito mais suave
  const duplicatedPhotographers = [...photographers, ...photographers, ...photographers, ...photographers];
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let animationId: number;
    let position = 0;
    
    const animate = () => {
      position -= 0.8; // Aumentar a velocidade do carrossel
      
      // Reiniciar a posição quando os itens passarem
      if (position <= -(photographers.length * 88)) { // 88px = tamanho do item (56px) + margens (32px)
        position = 0;
      }
      
      if (carousel) {
        carousel.style.transform = `translateX(${position}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [photographers.length]);
  
  return (
    <div className="relative overflow-hidden py-4 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm">
      <div className="max-w-full mx-auto">
        <div className="overflow-hidden w-full">
          <div 
            ref={carouselRef} 
            className="flex items-center transition-transform"
            style={{ willChange: 'transform' }}
          >
            {duplicatedPhotographers.map((photographer, index) => (
              <div 
                key={`${photographer.id}-${index}`} 
                className="flex flex-col items-center mx-4 group relative"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary shadow-lg shadow-primary/20 transition-transform duration-200 group-hover:scale-110">
                  <img 
                    src={photographer.avatar} 
                    alt={photographer.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Nome do fotógrafo (visível apenas no hover) */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {photographer.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographersCarousel;
