import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
/**
 *
 * @param inputs 类名
 * @returns 合并后的类名
 */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export { cn }
