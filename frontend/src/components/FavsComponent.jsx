"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import FoodItem from "@/components/FoodItem";
import { addToFavorites } from "@/services/favourites_service";

export default function FavsComponent({ foodsData: initialFoods }) {
  // Initialize favorites from localStorage
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favoriteIds");
    if (storedFavs) {
      try {
        setFavoriteIds(JSON.parse(storedFavs));
      } catch {
        setFavoriteIds([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = async (id) => {
    const strId = id.toString();
    try {
      if (favoriteIds.includes(strId)) {
        setFavoriteIds((prev) => prev.filter((favId) => favId !== strId));
      } else {
        // Call API if needed
        await addToFavorites(strId);
        setFavoriteIds((prev) => [...prev, strId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const favoriteFoods = useMemo(
    () => initialFoods.filter((food) => favoriteIds.includes(food.id.toString())),
    [initialFoods, favoriteIds]
  );

  const scrollToAllFoods = () => {
    document.getElementById("all-foods-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* FAVORITES */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-background font-lato">My Favs</h1>
          <button
            onClick={scrollToAllFoods}
            className="text-background font-semibold font-lato hover:scale-105 transition-colors"
          >
            See All Items
          </button>
        </div>

        {favoriteFoods.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <p className="text-neutral-500 font-lato text-center">
              You haven't added any favorites yet.<br />
              Scroll down to explore our menu!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteFoods.map((food) => (
              <motion.div
                key={food.id.toString()}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FoodItem food={food} isFavorite={true} onToggleFavorite={toggleFavorite} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <hr className="border-neutral-200" />

      {/* ALL ITEMS */}
      <section id="all-foods-section">
        <h2 className="text-2xl font-bold text-neutral-900 font-lato mb-6">Explore Menu</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialFoods.map((food) => {
            const strId = food.id.toString();
            const isFavorite = favoriteIds.includes(strId);
            return (
              <motion.div
                key={strId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FoodItem food={food} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}