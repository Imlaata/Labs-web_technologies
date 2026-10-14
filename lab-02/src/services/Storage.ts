export class StorageService {
    public static save<T>(key: string, data: T[]): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    public static load<T>(key: string): T[] {
        const raw = localStorage.getItem(key);
        if (!raw) return [];
        try {
            return JSON.parse(raw) as T[];
        } catch {
            return [];
        }
    }

    public static clear(): void {
        localStorage.clear();
    }
}