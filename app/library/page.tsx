"use client";
import { useState } from "react";
import OurBlogs from "../blogs/page";
import Playbooks from "../playbooks/page";
import DeepDives from "../deepdives/page";

// Image URLs for each tab (use absolute paths for public folder assets)
const tabImages = {
  Blogs: "/ourblogs.png", // Assuming images are in the 'public' folder
  Playbooks: "/playbook.png",
  DeepDives: "/deepdives.png",
};

export default function Library() {
  const [activeTab, setActiveTab] = useState<"Blogs" | "Playbooks" | "DeepDives">("Blogs");

  // Function to switch between tabs
  const handleTabSwitch = (tab: "Blogs" | "Playbooks" | "DeepDives") => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      {/* Tab Section with Navigation (fixed at the top) */}
      <div className="sticky top-0 bg-[#f9f9f9] py-8 text-center z-10 shadow-md">
        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold">
          Library
        </h2>
        <div className="mt-6">
          <button
            className={`mr-6 px-6 py-3 rounded-full ${
              activeTab === "Blogs" ? "bg-[#21F2B5] text-white" : "text-[#21F2B5]"
            }`}
            onClick={() => handleTabSwitch("Blogs")}
          >
            Our Blogs
          </button>
          <button
            className={`mr-6 px-6 py-3 rounded-full ${
              activeTab === "Playbooks" ? "bg-[#21F2B5] text-white" : "text-[#21F2B5]"
            }`}
            onClick={() => handleTabSwitch("Playbooks")}
          >
            Playbooks
          </button>
          <button
            className={`px-6 py-3 rounded-full ${
              activeTab === "DeepDives" ? "bg-[#21F2B5] text-white" : "text-[#21F2B5]"
            }`}
            onClick={() => handleTabSwitch("DeepDives")}
          >
            Deep Dives
          </button>
        </div>
      </div>

      {/* Tab Image */}
      <div className="relative w-full h-[300px] bg-cover bg-center">
        <img
          src={tabImages[activeTab]}
          alt={`${activeTab} image`}
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Content for the Active Tab */}
      <div className="py-12">
        {activeTab === "Blogs" && <OurBlogs />}
        {activeTab === "Playbooks" && <Playbooks />}
        {activeTab === "DeepDives" && <DeepDives />}
      </div>
    </div>
  );
}
