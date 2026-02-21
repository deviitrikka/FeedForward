import FavsComponent from "@/components/FavsComponent";
import { getAllItems, getFavorites } from "@/services/favourites_service";

// Server Component (async allowed)
export default async function FavsPage() {
  // Fetch all foods on the server
  const foodsData = await getAllItems();
  const favsData = await getFavorites();
  // Pass to client component as prop
  return <FavsComponent foodsData={foodsData} favsData={favsData} />;
}