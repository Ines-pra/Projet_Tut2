import { Client } from '../../metier/Client';
import ClientDAO from '../ClientDAO';

// declare global {
//     interface Window {
//       require: any;
//     }
//   }

// const app = window.require('electron');
// const fs = app.require('fs')

export class localClientDAO implements ClientDAO {
    public create(client: Client): number {
        
        // fs.appendFile('nouveauFichier.txt', 'Mon contenu', function (err : any) {
        //     if (err) throw err;
        //     console.log('Fichier créé !');
        //  });
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
        
        return new Client(id, "electron", "", "", new Date(), new Date());
    }


}