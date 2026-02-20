"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import FoodItem from '@/components/FoodItem';
import foodsData from '@/data/foods.json';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function FavsPage() {
  const [favoriteIds, setFavoriteIds] = useState(['1', '2']);

  const toggleFavorite = (id) => {
    setFavoriteIds((prevIds) => {
      if (prevIds.includes(id)) return prevIds.filter((favId) => favId !== id);
      return [...prevIds, id];
    });
  };

  const favoriteFoods = foodsData.filter((food) => favoriteIds.includes(food.id.toString()));

  const scrollToAllFoods = () => {
    document.getElementById('all-foods-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-6xl mx-auto space-y-12"
    >

      <motion.section variants={stagger}>
        <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-background font-lato">
            My Favs
          </h1>
          <button 
            onClick={scrollToAllFoods}
            className="text-background font-semibold font-lato hover:scale-105 transition-colors"
          >
            See All Items
          </button>
        </motion.div>

        {favoriteFoods.length === 0 ? (
          <motion.div variants={fadeUp} className="bg-neutral-50 border border-neutral-200 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center">
            <p className="text-neutral-500 font-lato text-center">
              You haven't added any favorites yet.<br/>
              Scroll down to explore our menu!
            </p>
          </motion.div>
        ) : (
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteFoods.map((food) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <FoodItem
                  food={food} 
                  isFavorite={true} 
                  onToggleFavorite={toggleFavorite} 
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>

      <hr className="border-neutral-200" />

      {/* ALL FOOD ITEMS */}
      <motion.section id="all-foods-section" variants={stagger}>
        <motion.h2 variants={fadeUp} className="text-2xl font-bold text-neutral-900 font-lato mb-6">
          Explore Menu
        </motion.h2>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodsData.map((food) => {
            const isFavorite = favoriteIds.includes(food.id);
            return (
              <motion.div key={food.id} variants={fadeUp}>
                <FoodItem 
                  food={food} 
                  isFavorite={isFavorite} 
                  onToggleFavorite={toggleFavorite} 
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

    </motion.div>
  );
}