import { Client } from '../../metier/Client';
import ClientDAO from '../ClientDAO';

export class sqlClientDAO implements ClientDAO {
    public async create(client: Client): Promise<number> {
        
        return client.id;
    }
    public async update(client: Client): Promise<boolean> {
        
        return true;
    }
    public async delete(id: number): Promise<boolean> {
        
        return true;
    }
    public async findAll(): Promise<Client[]> {
        
        return [];
    }
    public async findById(id: number): Promise<Client> {
        
        return new Client(id, "web", "", "", new Date(), new Date());
    }


}