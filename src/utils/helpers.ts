import { CONSTANTS_DATA } from "../constants";

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const timeAgo = (isoString: string): string => {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export const truncate = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;

export const validateTaskForm = (
  title: string,
  description: string,
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  if (!title.trim()) errors.title = CONSTANTS_DATA.Title;
  else if (title.trim().length < 5) errors.title = CONSTANTS_DATA.Min_5;
  else if (title.trim().length > 100) errors.title = CONSTANTS_DATA.Max_100;
  if (description.trim().length > 500)
    errors.description = CONSTANTS_DATA.Max_500;
  return { valid: Object.keys(errors).length === 0, errors };
};

export const groupByPriority = <T extends { priority: string }>(
  items: T[],
): Record<string, T[]> =>
  items.reduce(
    (acc, item) => ({
      ...acc,
      [item.priority]: [...(acc[item.priority] ?? []), item],
    }),
    {} as Record<string, T[]>,
  );
