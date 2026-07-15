import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FastAverageColor } from "fast-average-color";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getDominantColor(imageUrl: string): Promise<string> {
  try {
    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(imageUrl, { algorithm: 'dominant' });
    return color.hex;
  } catch (e) {
    return '#0A0A0A'; // fallback to obsidian
  }
}
