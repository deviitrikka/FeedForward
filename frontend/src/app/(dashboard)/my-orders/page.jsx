"use client";

import { motion } from "framer-motion";

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

      <motion.div
        variants={fadeUp}
        className="p-6 text-background"
      >
        <p>You haven't placed any orders yet.</p>
      </motion.div>
    </motion.div>
  );
}