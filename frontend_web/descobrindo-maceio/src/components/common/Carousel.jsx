import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DestinationCard from './DestinosCard';
import './Carousel.css';

const Carousel = ({ items, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const getItemsPerPage = () => {
    if (window.innerWidth >= 1280) return 4; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 640) return 2;  // sm
    return 1;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= items.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, items.length - itemsPerPage) : prev - itemsPerPage
    );
  };

  // Garantir que cada item tenha a primeira foto disponível
  const itemsWithImages = items.map(item => ({
    ...item,
    imagem: item.fotos?.[0] || item.imagem || '/placeholder-image.jpg'
  }));

  const visibleItems = itemsWithImages.slice(currentIndex, currentIndex + itemsPerPage);

  const displayItems = [...visibleItems];
  while (displayItems.length < itemsPerPage && itemsWithImages.length > 0) {
    displayItems.push(itemsWithImages[displayItems.length % itemsWithImages.length]);
  }

  return (
    <div className="carousel-container">
      <div className="carousel-grid">
        {displayItems.map((item, index) => (
          <DestinationCard 
            key={`${item._id || item.id}-${index}`} 
            destino={item} 
            onClick={onItemClick} 
          />
        ))}
      </div>

      {items.length > itemsPerPage && (
        <div className="carousel-controls">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="carousel-btn"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex + itemsPerPage >= items.length}
            className="carousel-btn"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {items.length > itemsPerPage && (
        <div className="carousel-indicators">
          {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map((_, idx) => (
            <div
              key={idx}
              className={`indicator-dot ${
                Math.floor(currentIndex / itemsPerPage) === idx ? 'active' : ''
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;