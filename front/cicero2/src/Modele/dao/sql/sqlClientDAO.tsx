import { Client } from '../../metier/Client';
import ClientDAO from '../ClientDAO';

export class sqlClientDAO implements ClientDAO {
    public create(client: Client): number {
        
        return client.id;
    }
    public update(client: Client): boolean {
        
        return true;
    }
    public delete(id: number): boolean {
        
        return true;
    }
    public findAll(): Client[] {
        
        return [];
    }
    public findById(id: number): Client {
        
        return new Client(id, "web", "", "", new Date(), new Date());
    }


}