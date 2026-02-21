from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Order Assignment Service")

# Allow your Next.js Vercel frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change to your Vercel URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FoodRequest(BaseModel):
    members: int
    preference: str

@app.post("/api/request-food")
async def assign_order(req: FoodRequest):
    
    preference = req.preference.lower()

    if preference == "veg":
        food_item = {
            "food_name": "Paneer Butter Masala with Naan",
            "image_url": "https://images.unsplash.com/photo-1701579231378-3726490a407b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZWVyJTIwYnV0dGVyJTIwbWFzYWxhfGVufDB8fDB8fHww"
        }
    elif preference == "non-veg":
        food_item = {
            "food_name": "Chicken Biryani",
            "image_url": "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=400&h=300"
        }
    else:
        return {
            "status": "Error",
            "message": "Invalid preference. Please choose 'veg' or 'non-veg'."
        }

    return {
        "status": "Order Assigned",
        **food_item,
        "driver_name": "Rahul Kumar",
        "driver_phone": "+91-9876543210",
        "restaurant_name": "Annapurna Kitchen",
        "restaurant_address": "City Center, Durgapur, West Bengal"
    }