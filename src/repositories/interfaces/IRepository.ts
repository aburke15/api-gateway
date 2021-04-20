export interface IRepository<T> {
    getOne(id: string): Promise<T>;
    getAll(): Promise<T[]>;
    findOne(id: string): Promise<T>;
}
