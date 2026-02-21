"use client";

import { motion } from "framer-motion";
import RestaurantCard from '@/components/PastOrderCard';
import restaurantData from '@/data/restaurants.json';
import PastOrderCard from "@/components/PastOrderCard";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function RatingsPage() {
  const sortedRestaurants = [...restaurantData].sort(
    (a, b) => b.rating - a.rating
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-6xl mx-auto space-y-8"
    >
      
      {/* Header */}
      <motion.div variants={stagger}>
        <motion.h1
          variants={fadeUp}
          className="text-3xl font-bold font-lato mb-2 text-background"
        >
          My Ratings
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-neutral-500 font-lato"
        >
          Discover the top-rated spots based on community feedback.
        </motion.p>
      </motion.div>

      {/* Grid of Restaurants */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {sortedRestaurants.map((restaurant) => (
          <motion.div key={restaurant.id} variants={fadeUp}>
            <PastOrderCard order={restaurant} />
          </motion.div>
        ))}
      </motion.div>

    </motion.div>
  );
}