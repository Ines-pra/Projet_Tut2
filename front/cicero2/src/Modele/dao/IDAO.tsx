export default interface IDAO<T> {
    create(item: T): Promise<number>;
    update(item: T): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T>;
}