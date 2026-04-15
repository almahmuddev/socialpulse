

"use client";

import Image from "next/image";
import Link from "next/link";

const statusStyles = {
  overdue: "bg-status-overdue text-red-800",
  "almost due": "bg-status-almost text-yellow-800",
  "on-track": "bg-status-ontrack text-green-800",
};

export default function FriendCard({ friendData }) {
  return (
    <Link href={`/friends/${friendData.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 cursor-pointer border border-gray-100">
        <div className="flex items-center gap-4">
          <Image
            src={friendData.picture}
            alt={friendData.name}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">
              {friendData.name}
            </h3>
            <p className="text-sm text-gray-500">
              {friendData.days_since_contact} days since contact
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {friendData.tags.slice(0, 2).map((singleTag) => (
            <span
              key={singleTag}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {singleTag}
            </span>
          ))}
        </div>
        <div className="mt-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              statusStyles[friendData.status]
            }`}
          >
            {friendData.status}
          </span>
        </div>
      </div>
    </Link>
  );
}