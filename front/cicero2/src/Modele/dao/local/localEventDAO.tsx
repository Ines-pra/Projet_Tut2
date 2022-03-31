import { Event } from '../../metier/Event';
import EventDAO from '../EventDAO';
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const readOnFile = async () => {
    try {
        const contents = await Filesystem.readFile({
            path: 'event.json',
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          });
          return contents.data
    } catch (e) {
        console.log(e)
        return "";
    }
  };

const writeOnFile = async (char: string) => {
    try {
        const file = await Filesystem.writeFile({
            data: char,
            path: 'event.json',
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
        });
    } catch (e) {
        console.log(e)
    }
}

function cutText(text: string) {
    let pos = text.length;
    return text.substring(1, pos -1);
}

function getEventText(eventText: string) {
    let event = cutText(eventText);  
    return event;
}

const getIdEvent = async (list: any) => {
    if( list === "") {
        return 1;
    }
    let events = JSON.parse(list);
    let id = events[0].id + 1;
    return id;
};

export class localEventDAO implements EventDAO {
    public async create(object: Event): Promise<number> {
        writeOnFile("");    
        let eventsList = await readOnFile();
        let id = await getIdEvent(eventsList);
        object.id = id;

        if( eventsList === '') {
            writeOnFile("[" + JSON.stringify(object) +"]");
        } else {
            writeOnFile("[" + JSON.stringify(object)+ "," + getEventText(eventsList) +"]");
        }

        return object.id;
    }
    public async update(object: Event): Promise<boolean> {
        let eventsListText = await readOnFile();
        let eventList = await JSON.parse(eventsListText);
        let event = eventList.find((event: Event) => event.id === object.id);
        let index = eventList.indexOf(event);
        object.id = event.id;
        eventList[index] = object;
        writeOnFile(JSON.stringify(eventList));
        
        return true;
    }
    public async delete(id: number): Promise<boolean> {
        let eventsListText = await readOnFile();
        let eventList = await JSON.parse(eventsListText);
        let event = eventList.find((event: Event) => event.id === id);
        let index = eventList.indexOf(event);
        eventList.splice(index, 1);
        writeOnFile(JSON.stringify(eventList));
        
        return true;
    }
    public async findAll(): Promise<Event[]> {
        let eventsList = await readOnFile();
        
        return eventsList === '' ? [] : JSON.parse(eventsList);
    }
    public async findById(id: number): Promise<Event> {
        let eventsListText = await readOnFile();
        let eventList = await JSON.parse(eventsListText);
        let event = eventList.find((event: Event) => event.id === id);
        
        return event
    }


}