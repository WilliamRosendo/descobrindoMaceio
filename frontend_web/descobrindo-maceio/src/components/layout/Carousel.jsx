import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DestinationCard from "../common/DestinosCard";

const Carousel = ({ items, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

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

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleItems.map((item) => (
          <DestinationCard key={item.id} destination={item} onClick={onItemClick} />
        ))}
      </div>

      {items.length > itemsPerPage && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex + itemsPerPage >= items.length}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;