import { Client } from '../../metier/Client';
import ClientDAO from '../ClientDAO';

// import fs from 'fs';

export class localClientDAO implements ClientDAO {
    public create(object: Client): number {
        
        // fs.appendFile('clients.json', 'Test', function (err : any) {
        //     if (err) throw err;
        //     console.log('Fichier créé !');
        //  });
        return object.id;
    }
    public update(object: Client): boolean {
        
        return true;
    }
    public delete(id: number): boolean {
        
        return true;
    }
    public findAll(): Client[] {
        
        return [];
    }
    public findById(id: number): Client {
        
        return new Client(id, "electron", "", "", new Date(), new Date());
    }


}