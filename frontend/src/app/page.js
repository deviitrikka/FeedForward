"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

/* ================= PREMIUM ANIMATION SYSTEM ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // premium cubic-bezier
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Home() {
  return (
    <div className="bg-white text-neutral-800 scroll-smooth">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full bg-white/70 backdrop-blur-xl border-b border-neutral-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-semibold tracking-tight">
              Feed-Forward
            </h1>
          </Link>

          <div className="hidden md:flex gap-10 text-sm font-medium text-neutral-600">
            <a href="#who-we-are" className="hover:text-neutral-900 transition">
              Who We Are
            </a>
            <a href="#what-we-do" className="hover:text-neutral-900 transition">
              What We Do
            </a>
            <a href="#news" className="hover:text-neutral-900 transition">
              News & Events
            </a>
          </div>

          <Link href="/request-food">
            <Button className="bg-neutral-900 text-white px-6 py-2 rounded-full hover:bg-neutral-800 transition-all duration-300 shadow-sm hover:shadow-md">
              Explore Platform
            </Button>
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 px-6 text-center overflow-hidden bg-gradient-to-b from-primary to-white">
        
        {/* Soft glow layer */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_70%)]" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-6"
          >
            Fueling the Nation,
            <br />
            Not the Landfill
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto text-lg text-neutral-600 mb-10"
          >
            Millions in India sleep hungry every night, while tons of perfectly
            edible food are wasted daily in restaurants and events.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/request-food">
              <Button className="bg-neutral-900 text-white px-10 py-6 rounded-full text-lg hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-xl">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section id="who-we-are" className="py-28 px-6 bg-white bg-gradient-to-tr from-primary/20 to-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h3
            variants={fadeUp}
            className="text-4xl font-semibold tracking-tight mb-6 text-neutral-900"
          >
            Who We Are
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="text-lg text-neutral-600 leading-relaxed"
          >
            Feed-Forward is a social impact platform committed to eliminating
            hunger and reducing food waste across India.
            <br /><br />
            We connect surplus food from restaurants, weddings, and events
            directly to communities in need — ensuring food feeds people,
            not landfills.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section id="what-we-do" className="py-28 px-6 bg-gradient-to-t from-primary to-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h3
            variants={fadeUp}
            className="text-4xl font-semibold tracking-tight mb-6 text-neutral-900"
          >
            What We Do
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="text-lg text-neutral-600 mb-16"
          >
            We use technology, logistics, and community partnerships to
            build hunger-free ecosystems.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Food Collection",
                desc: "Seamless reporting of surplus food from restaurants and events.",
              },
              {
                title: "Smart Distribution",
                desc: "Real-time matching with NGOs and communities in need.",
              },
              {
                title: "Sustainable Impact",
                desc: "Reducing waste, cutting emissions, and building a stronger nation.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-xl transition-all"
              >
                <h4 className="font-semibold text-xl mb-4 text-neutral-900">
                  {item.title}
                </h4>
                <p className="text-neutral-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= NEWS & EVENTS ================= */}
      <section id="news" className="py-28 px-6 bg-gradient-to-b from-primary to-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h3
            variants={fadeUp}
            className="text-4xl font-semibold tracking-tight mb-6 text-neutral-900"
          >
            News & Events
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="text-lg text-neutral-600 leading-relaxed"
          >
            From food recovery drives to awareness campaigns in colleges and
            businesses, Feed-Forward is building a movement that empowers
            citizens to act.
            <br /><br />
            Together, we are not just reducing waste — we are reshaping India's future.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-neutral-950 text-neutral-400 py-10 text-center text-sm">
        © 2026 Feed-Forward. Bridging Hunger & Surplus.
      </footer>
    </div>
  );
}