from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Favorites Service")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Your provided catalog items
CATALOG_ITEMS = [
  {"id": "1", "name": "Paneer Butter Masala with Naan", "description": "Creamy tomato-based curry with soft paneer cubes served with butter naan.", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400&h=300"},
  {"id": "2", "name": "Chicken Tikka Burger", "description": "Juicy chicken tikka patty with mint chutney mayo and fresh onions.", "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=400&h=300"},
  {"id": "3", "name": "Hyderabadi Chicken Biryani", "description": "Fragrant basmati rice cooked with spiced chicken and saffron.", "image": "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=400&h=300"},
  {"id": "4", "name": "Masala Dosa", "description": "Crispy rice crepe filled with spiced potato masala, served with chutney and sambar.", "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400&h=300"},
  {"id": "5", "name": "Gulab Jamun with Rabri", "description": "Soft milk-solid dumplings soaked in sugar syrup served with chilled rabri.", "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400&h=300"}
]

# In-memory storage for favorites (MVP only)
user_favorites = []

@app.get("/api/items")
async def get_all_items():
    return CATALOG_ITEMS

@app.post("/api/favorites/{item_id}")
async def add_to_favorites(item_id: str):
    item = next((i for i in CATALOG_ITEMS if i["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    if item not in user_favorites:
        user_favorites.append(item)
    
    return {"message": f"'{item['name']}' added to favorites", "favorites_count": len(user_favorites)}