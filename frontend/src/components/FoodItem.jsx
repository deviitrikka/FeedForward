"use client";

import { Heart } from 'lucide-react';

export default function FoodItem({ food, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col group transition-transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Absolute positioned favorite button over the image */}
        <button 
          onClick={() => onToggleFavorite(food.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-500'
            }`} 
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-neutral-900 font-lato leading-tight">
            {food.name}
          </h3>
          <span className="font-bold text-green-600 font-lato ml-3">
            {food.price}
          </span>
        </div>
        <p className="text-neutral-500 text-sm font-lato flex-1">
          {food.description}
        </p>
      </div>
    </div>
  );
}