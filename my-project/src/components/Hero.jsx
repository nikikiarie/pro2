import React, { useState } from "react";
import { Link } from 'react-scroll';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { sliderItems } from '../data';

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex <= 0 ? sliderItems.length - 1 : slideIndex - 1);
    } else {
      setSlideIndex(slideIndex >= sliderItems.length - 1 ? 0 : slideIndex + 1);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Navigation Arrows */}
      <div 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black hover:text-white transition-colors duration-300 shadow-lg"
        onClick={() => handleClick("left")}
      >
        <FaChevronLeft />
      </div>
      <div 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black hover:text-white transition-colors duration-300 shadow-lg"
        onClick={() => handleClick("right")}
      >
        <FaChevronRight />
      </div>

      {/* Slider Wrapper */}
      <div 
        className="h-full flex transition-transform duration-500 ease-out"
        style={{ 
          width: `${sliderItems.length * 100}vw`,
          transform: `translateX(-${slideIndex * 100}vw)` 
        }}
      >
        {sliderItems.map((item) => (
          <div 
            key={item.id} 
            className="w-screen h-screen flex flex-col md:flex-row items-center justify-between"
            style={{ backgroundColor: `#${item.bg}` }}
          >
            {/* Image Container */}
            <div className="h-1/2 w-full flex items-center justify-center md:h-full md:w-1/2 p-4">
              <img 
                src={item.img} 
                alt={item.title} 
                className="h-full w-full object-contain md:object-cover"
              />
            </div>

            {/* Text Container */}
            <div className="h-1/2 w-full flex flex-col items-center justify-center text-center p-8 md:h-full md:w-1/2 md:items-start md:text-left md:p-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">{item.title}</h1>
              <p className="text-lg md:text-xl mb-8 tracking-wider text-gray-700">{item.desc}</p>
              <Link 
                to="products" 
                spy={true} 
                smooth={true} 
                duration={500}
                className="px-8 py-3 border-2 border-gray-800 text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition-all duration-300 cursor-pointer"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {sliderItems.map((_, index) => (
          <div 
            key={index}
            onClick={() => setSlideIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${index === slideIndex ? 'bg-gray-800 w-6' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;