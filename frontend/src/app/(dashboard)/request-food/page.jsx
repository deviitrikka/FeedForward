"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

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

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
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

export default function RequestFoodPage() {
  const router = useRouter();

  const [members, setMembers] = useState("");
  const [preference, setPreference] = useState("veg");
  const [buttonState, setButtonState] = useState("idle");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!members) return;

    // If ready → navigate
    if (buttonState === "ready") {
      router.push("/my-orders");
      return;
    }

    try {
      setButtonState("searching");
      await delay(2000);

      setButtonState("accepted");
      await delay(2000);
      
      const response = await fetch(
        "http://localhost:8001/api/request-food",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            members: parseInt(members),
            preference: preference,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Store response for My Orders page
      localStorage.setItem("orderData", JSON.stringify(data));

      setButtonState("ready");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
      setButtonState("idle");
    }
  };

  const getButtonText = () => {
    switch (buttonState) {
      case "searching":
        return "Looking for Food...";
      case "accepted":
        return "Request Accepted!";
      case "ready":
        return "Click me to go to My Orders";
      default:
        return "Submit Request";
    }
  };

  const getButtonStyles = () => {
    switch (buttonState) {
      case "searching":
        return "bg-neutral-400 text-white cursor-not-allowed";
      case "accepted":
        return "bg-[#a1b542] text-white cursor-not-allowed";
      case "ready":
        return "bg-[#677aa4] text-white hover:bg-[#677aa4] shadow-md";
      default:
        return "bg-neutral-900 text-white hover:bg-neutral-800 shadow-md";
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-4xl mx-auto mt-10"
    >
      <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Mascot Section */}
        <motion.div
          variants={fadeLeft}
          className="p-8 mr-4 flex flex-col items-center justify-center md:w-2/5"
        >
          <div className="w-full h-full rounded-full flex items-center justify-center mb-6">
            <Image src="/mascot.png" width={500} height={500} alt="Mascot" />
          </div>

          <h2 className="text-2xl font-bold text-background font-lato text-center">
            Hungry?
          </h2>

          <p className="text-neutral-500 text-center mt-2 font-lato">
            Let our mascot find the perfect meal for you and your family!
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div variants={fadeRight} className="p-8 md:w-3/5">
          <motion.h1
            variants={fadeUp}
            className="text-3xl font-semibold text-neutral-900 mb-6 font-lato tracking-tight"
          >
            Request Food
          </motion.h1>

          <motion.form
            onSubmit={handleSubmit}
            variants={stagger}
            className="space-y-6"
          >
            {/* Members */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-black mb-2 font-lato">
                Number of Members
              </label>

              <Select
                value={members}
                onValueChange={setMembers}
                disabled={buttonState !== "idle"}
              >
                <SelectTrigger className="w-full px-4 py-6 rounded-lg border border-neutral-300 bg-white text-black font-lato outline-none transition-colors">
                  <SelectValue placeholder="Select number of members" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="font-lato cursor-pointer"
                    >
                      {num} {num === 1 ? "Member" : "Members"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Preference */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-black mb-2 font-lato">
                Food Preference
              </label>

              <Select
                value={preference}
                onValueChange={setPreference}
                disabled={buttonState !== "idle"}
              >
                <SelectTrigger className="w-full px-4 py-6 rounded-lg border border-neutral-300 bg-white text-black font-lato outline-none transition-colors">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>

                <SelectContent position="popper">
                  <SelectItem value="veg" className="font-lato cursor-pointer">
                    Vegetarian
                  </SelectItem>
                  <SelectItem
                    value="non-veg"
                    className="font-lato cursor-pointer"
                  >
                    Non-Vegetarian
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Button */}
            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={
                buttonState === "searching" ||
                buttonState === "accepted"
              }
              className={`w-full py-4 rounded-lg text-lg transition-all duration-300 font-lato tracking-tight mt-16 ${getButtonStyles()}`}
            >
              {getButtonText()}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
}