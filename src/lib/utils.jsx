import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString) {
  if (dateString) {
    return moment(dateString).format("MMMM Do YYYY");
  }

  return "";
}
