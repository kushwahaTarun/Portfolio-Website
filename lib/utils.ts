import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatYear(date: string | Date) {
  return new Date(date).getFullYear();
}

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
