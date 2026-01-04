import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge to safely merge Tailwind CSS classes
 * Prevents conflicting classes from being applied
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
