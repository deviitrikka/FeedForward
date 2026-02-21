"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

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
      staggerChildren: 0.12,
    },
  },
};

export default function MyOrdersPage() {
   const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("orderData");
    if (storedData) {
      setOrder(JSON.parse(storedData));
    }
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="px-6 py-10"
    >
      <motion.h1
        variants={fadeUp}
        className="text-3xl font-bold mb-6 text-background"
      >
        My Orders
      </motion.h1>

      {!order ? (
        <motion.div variants={fadeUp} className="text-background">
          <p>You haven't placed any orders yet.</p>
        </motion.div>
      ) : (
        <motion.div
          variants={fadeUp}
          className="bg-white rounded-2xl shadow-lg overflow-hidden w-100 h-auto"
        >
          {/* Food Image */}
          <div className="w-full h-64 overflow-hidden">
            <Image
              src={order.image_url}
              width={500}
              height={500}
              alt={order.food_name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="p-6 space-y-4">
            {/* Food Name */}
            <h2 className="text-2xl font-semibold text-neutral-900">
              {order.food_name}
            </h2>

            {/* Status */}
            <p className="text-green-600 font-medium">
              {order.status}
            </p>

            {/* Driver Info */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-neutral-800">
                Delivery Partner
              </h3>
              <p className="text-neutral-600">
                {order.driver_name}
              </p>
              <p className="text-neutral-600">
                {order.driver_phone}
              </p>
            </div>

            {/* Restaurant Info */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-neutral-800">
                Restaurant
              </h3>
              <p className="text-neutral-600">
                {order.restaurant_name}
              </p>
              <p className="text-neutral-600">
                {order.restaurant_address}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}