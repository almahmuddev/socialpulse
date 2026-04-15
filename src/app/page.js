

"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import SummaryCards from "@/components/SummaryCards";
import FriendCard from "@/components/FriendCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HomePage() {
  const [allFriends, setAllFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setAllFriends(data);
        setLoadingFriends(false);
      })
      .catch((err) => {
        console.error("Failed to load friends:", err);
        setLoadingFriends(false);
      });
  }, []);

  if (loadingFriends) return <LoadingSpinner />;

  return (
    <>
      <Banner />
      <SummaryCards friendsList={allFriends} />
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allFriends.map((oneFriend) => (
            <FriendCard key={oneFriend.id} friendData={oneFriend} />
          ))}
        </div>
      </section>
    </>
  );
}