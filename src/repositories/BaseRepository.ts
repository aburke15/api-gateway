import { IRepository } from './interfaces/IRepository';

export abstract class BaseRepository<T> implements IRepository<T> {
    public getOne = async (id: string): Promise<T> => {
        throw new Error('Method not implemented.');
    };

    public getAll = async (): Promise<T[]> => {
        throw new Error('Method not implemented.');
    };

    public findOne = async (id: string): Promise<T> => {
        throw new Error('Method not implemented.');
    };
}
