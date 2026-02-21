export default function PastOrderCard({ order }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col transition-transform hover:-translate-y-1">
      
      {/* Image Section */}
      <div className="h-40 w-full overflow-hidden bg-neutral-100">
        <img 
          src={order.image} 
          alt={order.restaurantName} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        
        {/* Order Number */}
        <span className="text-xs text-neutral-500 font-lato mb-1">
          Order {order.orderNumber}
        </span>

        {/* Restaurant Name */}
        <h3 className="font-bold text-xl text-neutral-900 font-lato mb-1">
          {order.restaurantName}
        </h3>

        {/* Items Ordered */}
        <p className="text-neutral-500 text-sm font-lato mb-3 line-clamp-2">
          {order.items.join(", ")}
        </p>

        {/* Bottom Section */}
        <div className="mt-auto flex items-center justify-between">
          
          {/* Order Date */}
          <span className="text-sm text-neutral-500 font-lato">
            {order.orderDate}
          </span>

          {/* Status */}
          <div className="text-right">
            <span
              className={`text-xs font-lato ${
                order.status === "Delivered"
                  ? "text-green-600"
                  : order.status === "Cancelled"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}