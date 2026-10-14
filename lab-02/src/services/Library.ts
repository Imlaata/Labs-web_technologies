export interface HasId {
    id: string;
}

export class Library<T extends HasId> {
    private items: T[] = [];

    constructor(initialItems: T[] = []) {
        this.items = initialItems;
    }

    public add(item: T): void {
        this.items.push(item);
    }

    public remove(id: string): boolean {
        const index = this.items.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    public findById(id: string): T | undefined {
        return this.items.find((item) => item.id === id);
    }

    public getAll(): T[] {
        return [...this.items];
    }

    public search(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }
}