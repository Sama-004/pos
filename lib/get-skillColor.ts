export const getSkillColor = (level: number) => {
  const colors = [
    "bg-gray-100",
    "bg-lime-200",
    "bg-green-200",
    "bg-green-500",
    "bg-green-800",
  ];
  return colors[Math.min(level, 5)];
};
