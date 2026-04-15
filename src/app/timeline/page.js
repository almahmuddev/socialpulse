

"use client";

import { useTimeline } from "@/context/TimelineContext";
import { FaPhoneAlt, FaCommentDots, FaVideo, FaFilter } from "react-icons/fa";
import { useState } from "react";

const iconMap = {
  Call: <FaPhoneAlt className="text-green-600" />,
  Text: <FaCommentDots className="text-blue-600" />,
  Video: <FaVideo className="text-purple-600" />,
};

export default function TimelinePage() {
  const { entries, filterType, setFilterType } = useTimeline();
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredEntries = entries.filter((entry) =>
    filterType === "All" ? true : entry.type === filterType
  );

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  const filterOptions = ["All", "Call", "Text", "Video"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Timeline</h1>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilterType(option)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                  filterType === option
                    ? "bg-white shadow text-blue-700"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {sortedEntries.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No interactions yet. Use Quick Check-In on a friend's page.
        </p>
      ) : (
        <div className="space-y-4">
          {sortedEntries.map((singleEntry) => (
            <div
              key={singleEntry.id}
              className="bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4"
            >
              <div className="text-2xl">{iconMap[singleEntry.type]}</div>
              <div className="flex-1">
                <p className="font-medium">
                  {singleEntry.type} with {singleEntry.friendName}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(singleEntry.date).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}