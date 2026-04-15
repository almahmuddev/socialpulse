"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaHistory, FaChartBar } from "react-icons/fa";

const navLinks = [
  { name: "Home", path: "/", icon: FaHome },
  { name: "Timeline", path: "/timeline", icon: FaHistory },
  { name: "Stats", path: "/stats", icon: FaChartBar },
];

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-blue-600">SocialPulse</div>
          <div className="flex space-x-6">
            {navLinks.map(({ name, path, icon: IconComponent }) => {
              const active = currentPath === path;
              return (
                <Link
                  key={name}
                  href={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                    active
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="text-lg" />
                  <span className="hidden sm:inline">{name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}