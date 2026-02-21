from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Rating Service")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Your provided past orders
PAST_ORDERS = [
  {"id": "1", "orderNumber": "#ORD1024", "restaurantName": "Royal Tandoor Palace", "items": ["Butter Chicken", "Garlic Naan", "Jeera Rice"], "orderDate": "2026-02-15", "status": "Delivered", "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400&h=300"},
  {"id": "2", "orderNumber": "#ORD1023", "restaurantName": "Bombay Masala House", "items": ["Pav Bhaji", "Vada Pav", "Masala Chai"], "orderDate": "2026-02-12", "status": "Delivered", "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400&h=300"},
  {"id": "3", "orderNumber": "#ORD1022", "restaurantName": "Sattvik Greens", "items": ["Paneer Tikka Salad", "Green Smoothie Bowl"], "orderDate": "2026-02-10", "status": "Delivered", "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400&h=300"},
  {"id": "4", "orderNumber": "#ORD1021", "restaurantName": "Dakshin Spice Kitchen", "items": ["Masala Dosa", "Idli Sambar", "Filter Coffee"], "orderDate": "2026-02-08", "status": "Delivered", "image": "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&q=80&w=400&h=300"},
  {"id": "5", "orderNumber": "#ORD1020", "restaurantName": "Desi Chaat Junction", "items": ["Pani Puri", "Bhel Puri", "Dahi Papdi Chaat"], "orderDate": "2026-02-05", "status": "Delivered", "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400&h=300"},
  {"id": "6", "orderNumber": "#ORD1019", "restaurantName": "Punjabi Dhaba Express", "items": ["Tandoori Chicken", "Dal Makhani", "Butter Naan"], "orderDate": "2026-02-02", "status": "Delivered", "image": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400&h=300"}
]

# In-memory storage for ratings
order_ratings = {}

class Rating(BaseModel):
    stars: int
    review: str = None

@app.get("/api/past-orders")
async def get_past_orders():
    return PAST_ORDERS

@app.post("/api/ratings/{order_id}")
async def submit_rating(order_id: str, rating: Rating):
    order = next((o for o in PAST_ORDERS if o["id"] == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if rating.stars < 1 or rating.stars > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5 stars")

    order_ratings[order_id] = {"stars": rating.stars, "review": rating.review}
    return {"message": f"Rating of {rating.stars} stars submitted for order {order['orderNumber']}"}