export const expressionColors: Record<string, string> = {
  happy: "#FFD700",
  sad: "#1E90FF",
  angry: "#FF6347",
  surprised: "#FFB347",
  neutral: "#A9A9A9",
  
};

export function isExpressionColor(key: string): boolean {
  return key in expressionColors;
}
