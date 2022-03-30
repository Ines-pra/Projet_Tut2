import { Event } from '../../metier/Event';
import EventDAO from '../EventDAO';


export class localEventDAO implements EventDAO {
    public create(object: Event): number {
        
        return object.id;
    }
    public update(object: Event): boolean {
        
        return true;
    }
    public delete(id: number): boolean {
        
        return true;
    }
    public findAll(): Event[] {
        
        return [];
    }
    public findById(id: number): Event {
        
        return new Event(id, 1, "electron", new Date(), 30);
    }


}