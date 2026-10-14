export namespace Validation {
    export function isNonEmpty(value: string): boolean {
        return value.trim().length > 0;
    }

    export function isNumericId(id: string): boolean {
        return /^\d+$/.test(id.trim());
    }

    export function isValidYear(yearStr: string): boolean {
        if (!/^\d{4}$/.test(yearStr.trim())) {
            return false;
        }
        const year = parseInt(yearStr, 10);
        const currentYear = new Date().getFullYear();
        return year >= 800 && year <= currentYear;
    }

    export function isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }
}