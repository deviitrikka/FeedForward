const BASE_URL_FAVOURITES = "http://localhost:8000";

// Get all catalog items
export const getAllItems = async () => {
  const response = await fetch(`${BASE_URL_FAVOURITES}/api/items`);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return response.json();
};

// Add item to favorites
export const addToFavorites = async (itemId) => {
  const response = await fetch(
    `${BASE_URL_FAVOURITES}/api/favorites/${itemId}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add favorite");
  }

  return response.json();
};

// Get user favorites
export const getFavorites = async () => {
  const response = await fetch(`${BASE_URL_FAVOURITES}/api/favorites`);

  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }

  return response.json();
};