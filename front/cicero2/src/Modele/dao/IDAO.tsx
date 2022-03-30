export default interface IDAO<T> {
    create(item: T): number;
    update(item: T): boolean;
    delete(id: number): boolean;
    findAll(): T[];
    findById(id: number): T;
}