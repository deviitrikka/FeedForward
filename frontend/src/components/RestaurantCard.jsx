import { Star } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  // Helper to generate an array of 5 items to represent stars
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col transition-transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="h-40 w-full overflow-hidden bg-neutral-100">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-xl text-neutral-900 font-lato mb-1">
          {restaurant.name}
        </h3>
        <p className="text-neutral-500 text-sm font-lato mb-4">
          {restaurant.cuisine}
        </p>
        
        {/* Ratings Section */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            {stars.map((star) => (
              <Star 
                key={star} 
                className={`w-5 h-5 ${
                  star <= Math.round(restaurant.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-neutral-300'
                }`} 
              />
            ))}
          </div>
          <div className="text-right">
            <span className="block font-bold text-neutral-900 font-lato">
              {restaurant.rating} / 5
            </span>
            <span className="text-xs text-neutral-500 font-lato">
              ({restaurant.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}