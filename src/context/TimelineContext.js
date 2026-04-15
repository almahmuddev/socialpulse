

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TimelineContext = createContext(undefined);

export function TimelineProvider({ children }) {
  const [timelineEntries, setTimelineEntries] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // Load saved entries from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("timelineEntries");
    if (saved) {
      try {
        setTimelineEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse stored timeline entries", e);
      }
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("timelineEntries", JSON.stringify(timelineEntries));
  }, [timelineEntries]);

  const pushNewEntry = (friendId, friendName, type) => {
    const freshEntry = {
      id: crypto.randomUUID(),
      friendId,
      friendName,
      type,
      date: new Date().toISOString(),
    };
    setTimelineEntries((prev) => [freshEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider
      value={{
        entries: timelineEntries,
        addEntry: pushNewEntry,
        filterType: activeFilter,
        setFilterType: setActiveFilter,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const ctx = useContext(TimelineContext);
  if (ctx === undefined) {
    throw new Error("useTimeline must be used inside a TimelineProvider");
  }
  return ctx;
}