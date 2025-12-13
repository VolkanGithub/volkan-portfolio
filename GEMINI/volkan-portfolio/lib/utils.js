import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class'ları birleştirir ve çakışmaları çözer.
 * Örn: cn("bg-red-500", "bg-blue-500") -> "bg-blue-500" (Son geleni alır)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}