import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPrettyDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    dateStyle: 'short',
  });

export const SECONDS_IN_ONE_DAY = 86400;