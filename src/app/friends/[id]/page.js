"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { useTimeline } from "@/context/TimelineContext";
import toast from "react-hot-toast";
import {
  FaPhoneAlt,
  FaCommentDots,
  FaVideo,
  FaClock,
  FaArchive,
  FaTrash,
} from "react-icons/fa";

const statusColorMap = {
  overdue: "bg-status-overdue text-red-800",
  "almost due": "bg-status-almost text-yellow-800",
  "on-track": "bg-status-ontrack text-green-800",
};

export default function FriendDetailPage() {
  const { id } = useParams();
  const [currentFriend, setCurrentFriend] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addEntry } = useTimeline();

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((friendArray) => {
        const foundFriend = friendArray.find((f) => f.id === Number(id));
        if (!foundFriend) {
          notFound();
        } else {
          setCurrentFriend(foundFriend);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        notFound();
      });
  }, [id]);

  const recordInteraction = (interactionType) => {
    if (!currentFriend) return;
    addEntry(currentFriend.id, currentFriend.name, interactionType);
    toast.success(`${interactionType} logged with ${currentFriend.name}`);
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!currentFriend) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Friend profile */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border">
          <div className="flex flex-col items-center text-center">
            <Image
              src={currentFriend.picture}
              alt={currentFriend.name}
              width={120}
              height={120}
              className="rounded-full"
            />
            <h2 className="text-2xl font-bold mt-4">{currentFriend.name}</h2>
            <span
              className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                statusColorMap[currentFriend.status]
              }`}
            >
              {currentFriend.status}
            </span>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {currentFriend.tags.map((tagName) => (
                <span
                  key={tagName}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tagName}
                </span>
              ))}
            </div>
            <p className="mt-4 text-gray-600">{currentFriend.bio}</p>
            <p className="mt-2 text-blue-600">{currentFriend.email}</p>
          </div>
          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition">
              <FaClock /> Snooze 2 Weeks
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition">
              <FaArchive /> Archive
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg transition">
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-gray-500 text-sm">Days Since Contact</p>
              <p className="text-3xl font-bold">{currentFriend.days_since_contact}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-gray-500 text-sm">Goal (days)</p>
              <p className="text-3xl font-bold">{currentFriend.goal}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <p className="text-gray-500 text-sm">Next Due Date</p>
              <p className="text-xl font-semibold">
                {new Date(currentFriend.next_due_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Relationship Goal Card */}
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Relationship Goal</h3>
                <p className="text-gray-600">
                  Contact every {currentFriend.goal} days
                </p>
              </div>
              <button className="text-blue-600 hover:underline">Edit</button>
            </div>
          </div>

          {/* Quick Check-In Card */}
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-lg mb-4">Quick Check-In</h3>
            <div className="flex gap-4">
              <button
                onClick={() => recordInteraction("Call")}
                className="flex-1 flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-800 py-3 rounded-lg transition"
              >
                <FaPhoneAlt /> Call
              </button>
              <button
                onClick={() => recordInteraction("Text")}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 rounded-lg transition"
              >
                <FaCommentDots /> Text
              </button>
              <button
                onClick={() => recordInteraction("Video")}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-800 py-3 rounded-lg transition"
              >
                <FaVideo /> Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}