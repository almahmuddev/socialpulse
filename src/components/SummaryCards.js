

"use client";

export default function SummaryCards({ friendsList }) {
  const totalFriends = friendsList.length;
  const overdueCount = friendsList.filter((f) => f.status === "overdue").length;
  const almostDueCount = friendsList.filter((f) => f.status === "almost due").length;
  const onTrackCount = friendsList.filter((f) => f.status === "on-track").length;

  const summaryItems = [
    {
      label: "Total Friends",
      value: totalFriends,
      bgColor: "bg-blue-100 text-blue-800",
    },
    {
      label: "Overdue",
      value: overdueCount,
      bgColor: "bg-red-100 text-red-800",
    },
    {
      label: "Almost Due",
      value: almostDueCount,
      bgColor: "bg-yellow-100 text-yellow-800",
    },
    {
      label: "On Track",
      value: onTrackCount,
      bgColor: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className={`${item.bgColor} rounded-xl p-4 shadow-sm text-center`}
          >
            <div className="text-3xl font-bold">{item.value}</div>
            <div className="text-sm font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}