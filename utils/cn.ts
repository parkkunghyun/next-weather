import clsx from "clsx"
import { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs));
}

// clsx('a', false && 'b', 'c')  // → 'a c'
// twMerge('text-sm text-lg')  // → 'text-lg' (덮어씀)