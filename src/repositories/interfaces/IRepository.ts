export interface IRepository<T> {
    getOne(id: string): Promise<T>;
    getAll(): Promise<T[]>;
    findOne(id: string): Promise<T>;
}

export abstract class BaseRepository<T> implements IRepository<T> {
    getOne = (id: string): Promise<T> => {
        throw new Error('Method not implemented.');
    };
    getAll = (): Promise<T[]> => {
        throw new Error('Method not implemented.');
    };
    findOne = (id: string): Promise<T> => {
        throw new Error('Method not implemented.');
    };
}
