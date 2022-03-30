import { Client } from '../../metier/Client';
import ClientDAO from '../ClientDAO';
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const readClientFile = async () => {
    const contents = await Filesystem.readFile({
      path: 'client.json',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    return contents.data
  };

function cutText(text: string) {
    let pos = text.length;
    return text.substring(1, pos -1);
}

function getClientText(clientText: string) {
    let client = cutText(clientText);  
    return client;
}

const getIdClient = async (list: any) => {
    let promise = JSON.parse(list);
    let id = 0;
    id = promise.length + 1;
    return id;
};

export class localClientDAO implements ClientDAO {
    public async create(object: Client): Promise<number> {        
        let clientsList = await readClientFile();
        let id = await getIdClient(clientsList);
        object.id = id;

        if( clientsList === '') {
          Filesystem.writeFile({
              data: "[" + JSON.stringify(object) +"]",
              path: "client.json",
              directory: Directory.Documents,
              encoding: Encoding.UTF8,
            });
        } else {
            Filesystem.writeFile({
                data: "[" + JSON.stringify(object)+ "," + getClientText(clientsList) +"]",
                path: "client.json",
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
              });
        }
        return object.id;
    }
    public async update(object: Client): Promise<boolean> {

        let clientsListText = await readClientFile();
        let clientList = await JSON.parse(clientsListText);
        let client = clientList.find((client: Client) => client.id === object.id);
        let index = clientList.indexOf(client);
        clientList[index] = object;

        Filesystem.writeFile({
            data: JSON.stringify(clientList),
            path: "client.json",
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
            });
        
        return true;
    }
    public async delete(id: number): Promise<boolean> {

        let clientsListText = await readClientFile();
        let clientList = await JSON.parse(clientsListText);
        let client = clientList.find((client: Client) => client.id === id);
        let index = clientList.indexOf(client);
        clientList.splice(index, 1);

        Filesystem.writeFile({
            data: JSON.stringify(clientList),
            path: "client.json",
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
            });
        
        return true;
    }
    public async findAll(): Promise<Client[]> {

        let clientsList = await readClientFile();
        
        return JSON.parse(clientsList);
    }
    public async findById(id: number): Promise<Client> {

        let clientsListText = await readClientFile();
        let clientList = await JSON.parse(clientsListText);
        let client = clientList.find((client: Client) => client.id === id);
        
        return client;
    }


}