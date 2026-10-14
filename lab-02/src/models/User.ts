import { IUser } from '../interfaces/IUser';

export class User implements IUser {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public borrowedBooksCount: number = 0,
    ) {}

    public get DisplayName(): string {
        return `${this.id} ${this.name} (${this.email})`;
    }
}