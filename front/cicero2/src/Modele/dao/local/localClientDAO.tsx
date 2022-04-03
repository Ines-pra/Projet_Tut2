import { Client } from '../../metier/Client';
import ClientDAO from '../ClientDAO';
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

// Lecture du fichier client.json //
const readOnFile = async () => {
    try {
        const contents = await Filesystem.readFile({
            path: 'client.json',
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          });
          return contents.data
    } catch (e) {
        console.log(e)
        return "";
    }
  };
// Ecriture dans le fichier client.json //
const writeOnFile = async (char: string) => {
    try {
        const file = await Filesystem.writeFile({
            data: char,
            path: 'client.json',
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });
    } catch (e) {
        console.log(e)
    }
}
// Fonction qui permet de formater le texte pour qu'il soit de type json //
function getClientText(clientText: string) {
    let pos = clientText.length;
    return clientText.substring(1, pos -1);
}
// Fontion qui permet de récupérer l'id du dernier client //
const getIdClient = async (list: any) => {
    if( list === "") {

        return 1;
    }
    let clients = JSON.parse(list);
    let id = clients[0].id + 1;
    
    return id;
};

export class localClientDAO implements ClientDAO {

    public async create(object: Client): Promise<number> { 
        writeOnFile("");    
        let clientsList = await readOnFile();
        let id = await getIdClient(clientsList);
        object.id = id;

        if( clientsList === '') {
            writeOnFile("[" + JSON.stringify(object) +"]");
        } else {
            writeOnFile("[" + JSON.stringify(object)+ "," + getClientText(clientsList) +"]");
        }

        return object.id;
    }

    public async update(object: Client): Promise<boolean> {
        let clientsListText = await readOnFile();
        let clientList = await JSON.parse(clientsListText);
        let client = clientList.find((client: Client) => client.id === object.id);
        let index = clientList.indexOf(client);
        object.id = client.id;
        clientList[index] = object;
        writeOnFile(JSON.stringify(clientList));
        
        return true;
    }

    public async delete(id: number): Promise<boolean> {
        let clientsListText = await readOnFile();
        let clientList = await JSON.parse(clientsListText);
        let client = clientList.find((client: Client) => client.id === id);
        let index = clientList.indexOf(client);
        clientList.splice(index, 1);
        writeOnFile(JSON.stringify(clientList));
        
        return true;
    }

    public async findAll(): Promise<Client[]> {
        let clientsList = await readOnFile();
        
        return clientsList === '' ? [] : JSON.parse(clientsList);
    }

    public async findById(id: number): Promise<Client> {
        let clientsListText = await readOnFile();
        let clientList = await JSON.parse(clientsListText);
        let client = clientList.find((client: Client) => client.id === id);
        
        return client;
    }
}