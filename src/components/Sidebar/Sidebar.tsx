"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DropdownSection from "../Atom/DropdownSection";
// Dropdown data
const dropdowns = [
  {
    name: "posts",
    label: "Posts",
    links: [
      { href: "/all-post", text: "All Post" },
      { href: "/create-post", text: "Create New Post" },
    ],
  },
  {
    name: "category",
    label: "Category",
    links: [
      { href: "/all-category", text: "All Category" },
      { href: "/create-category", text: "Create New Category" },
    ],
  },
  {
    name: "tags",
    label: "Tags",
    links: [
      { href: "/all-tags", text: "All Tags" },
      { href: "/create-tags", text: "Create New Tags" },
    ],
  },
  {
    name: "Project",
    label: "Projects",
    links: [
      { href: "/all-projects", text: "All Projects" },
      { href: "/create-projects", text: "Create New Project" },
    ],
  },
  {
    name: "Testimonials",
    label: "Testimonials",
    links: [
      { href: "/all-testimonials", text: "All Testimonials" },
      { href: "/create-testimonial", text: "Create New Testimonial" },
    ],
  },
  {
    name: "settings",
    label: "Settings",
    links: [{ href: "/profile", text: "Profile" }],
  },
];

function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="w-64 sticky top-0 min-h-screen bg-gray-800 text-white p-4">
      <div className="flex justify-center items-center flex-col mb-8">
        <Image src={"/Profile.png"} width={100} height={100} alt="profile" />
        <h1 className="">Anirudh Kulkarni</h1>
      </div>
      <ul className="space-y-2">
        {dropdowns.map((dropdown) => (
          <DropdownSection
            key={dropdown.name}
            name={dropdown.name}
            label={dropdown.label}
            links={dropdown.links}
            openDropdown={openDropdown}
            handleDropdown={handleDropdown}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
