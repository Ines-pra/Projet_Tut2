import { Event } from '../../metier/Event';
import EventDAO from '../EventDAO';

export class sqlEventDAO implements EventDAO {
    public async create(object: Event): Promise<number> {
        
        return object.id;
    }
    public async update(object: Event): Promise<boolean> {
        
        return true;
    }
    public async delete(id: number): Promise<boolean> {
        
        return true;
    }
    public async findAll(): Promise<Event[]> {
        
        return [];
    }
    public async findById(id: number): Promise<Event> {
        
        return new Event(id, 1, "web", new Date(), 30);
    }


}