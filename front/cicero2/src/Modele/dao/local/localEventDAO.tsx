import { Event } from '../../metier/Event';
import EventDAO from '../EventDAO';


export class localEventDAO implements EventDAO {
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
        
        return new Event(id, 1, "electron", new Date(), 30);
    }


}