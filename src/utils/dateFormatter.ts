/**
 * Shared date formatting utilities for the entire application
 * Handles ISO 8601 format dates and provides various display formats
 */

export type DateFormat =
    | 'short' // Jan 01, 2025
    | 'long' // January 01, 2025
    | 'numeric' // 01/01/2025
    | 'time' // 20:17
    | 'datetime' // Jan 01, 2025 20:17
    | 'relative' // Today, Yesterday, Jan 01
    | 'receipt' // 01 JAN 2025 (for receipt-style display)
    | 'iso'; // 2025-01-01T20:17:46.384Z

export interface DateFormatterOptions {
    format: DateFormat;
    timezone?: string;
    locale?: string;
}

/**
 * Formats an ISO 8601 date string to various display formats
 * @param isoString - ISO 8601 date string (e.g., "2025-01-01T20:17:46.384Z")
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(isoString: string, options: DateFormatterOptions): string {
    try {
        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            console.warn(`Invalid date string: ${isoString}`);
            return 'Invalid Date';
        }

        const { format, timezone = 'UTC', locale = 'en-US' } = options;

        switch (format) {
            case 'short':
                return date.toLocaleDateString(locale, {
                    timeZone: timezone,
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                });

            case 'long':
                return date.toLocaleDateString(locale, {
                    timeZone: timezone,
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                });

            case 'numeric':
                return date.toLocaleDateString(locale, {
                    timeZone: timezone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });

            case 'time':
                return date.toLocaleTimeString(locale, {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                });

            case 'datetime':
                return (
                    date.toLocaleDateString(locale, {
                        timeZone: timezone,
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    }) +
                    ' ' +
                    date.toLocaleTimeString(locale, {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })
                );

            case 'relative':
                return getRelativeDate(date, timezone);

            case 'receipt':
                return date
                    .toLocaleDateString(locale, {
                        timeZone: timezone,
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    })
                    .toUpperCase();

            case 'iso':
                return date.toISOString();

            default:
                return date.toLocaleDateString(locale, { timeZone: timezone });
        }
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
}

/**
 * Gets relative date (Today, Yesterday, or formatted date)
 */
function getRelativeDate(date: Date, timezone: string): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (targetDate.getTime() === today.getTime()) {
        return 'Today';
    } else if (targetDate.getTime() === yesterday.getTime()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
    }
}

/**
 * Convenience functions for common formats
 */
export const dateFormatter = {
    short: (isoString: string) => formatDate(isoString, { format: 'short' }),
    long: (isoString: string) => formatDate(isoString, { format: 'long' }),
    numeric: (isoString: string) => formatDate(isoString, { format: 'numeric' }),
    time: (isoString: string) => formatDate(isoString, { format: 'time' }),
    datetime: (isoString: string) => formatDate(isoString, { format: 'datetime' }),
    relative: (isoString: string) => formatDate(isoString, { format: 'relative' }),
    receipt: (isoString: string) => formatDate(isoString, { format: 'receipt' }),
    iso: (isoString: string) => formatDate(isoString, { format: 'iso' }),
};

/**
 * Validates if a string is a valid ISO 8601 date
 */
export function isValidISODate(dateString: string): boolean {
    try {
        const date = new Date(dateString);
        return !isNaN(date.getTime()) && dateString.includes('T') && dateString.includes('Z');
    } catch {
        return false;
    }
}

/**
 * Creates an ISO 8601 date string from date components
 */
export function createISODate(
    year: number,
    month: number, // 1-12
    day: number,
    hour: number = 0,
    minute: number = 0,
    second: number = 0,
    timezone: string = 'UTC'
): string {
    const date = new Date(year, month - 1, day, hour, minute, second);
    return date.toISOString();
}
