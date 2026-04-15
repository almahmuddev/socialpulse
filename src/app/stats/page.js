"use client";

import { useTimeline } from "@/context/TimelineContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const chartColors = {
  Call: "#22c55e",
  Text: "#3b82f6",
  Video: "#a855f7",
};

export default function StatsPage() {
  const { entries } = useTimeline();

  const callCount = entries.filter((e) => e.type === "Call").length;
  const textCount = entries.filter((e) => e.type === "Text").length;
  const videoCount = entries.filter((e) => e.type === "Video").length;

  const chartData = [
    { name: "Call", value: callCount },
    { name: "Text", value: textCount },
    { name: "Video", value: videoCount },
  ].filter((item) => item.value > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Friendship Analytics</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Interaction Types</h2>
        <div className="h-80">
          {chartData.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}