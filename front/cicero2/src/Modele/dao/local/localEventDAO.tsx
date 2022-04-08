import { Event } from '../../metier/Event';
import EventDAO from '../EventDAO';
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

// Lecture du fichier event.json //
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
// Lecture du fichier case.json //
const readCaseFile = async () => {
  try {
      const contents = await Filesystem.readFile({
          path: 'case.json',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        return contents.data
  } catch (e) {
      console.log(e)
      return "";
  }
};
// Ecriture dans le fichier case.json //
const writeCaseFile = async (char: string) => {
  try {
      const file = await Filesystem.writeFile({
          data: char,
          path: 'case.json',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
      });
  } catch (e) {
      console.log(e)
  }
}
// Ecriture dans le fichier event.json //
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

export class localEventDAO implements EventDAO {
    public async create(object: Event): Promise<number> {
        let casesText = await readCaseFile();
        let cases = JSON.parse(casesText);
        let cas = cases.find((cas: Event) => cas.id === object.idCase);
        let index = cases.indexOf(cas);
        cases[index].events = [...cases[index].events, object];
        writeCaseFile(JSON.stringify(cases));

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