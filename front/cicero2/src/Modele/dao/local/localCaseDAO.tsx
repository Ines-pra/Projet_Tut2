import { Case } from '../../metier/Case';
import CaseDAO from '../CaseDAO';
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const readOnFile = async () => {
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

const writeOnFile = async (char: string) => {
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

function cutText(text: string) {
    let pos = text.length;
    return text.substring(1, pos -1);
}

function getCaseText(caseText: string) {
    let cas = cutText(caseText);  
    return cas;
}

const getIdCase = async (list: any) => {
    if( list === "") {
        return 1;
    }
    let cases = JSON.parse(list);
    let id = cases[0].id + 1;
    return id;
};

export class localCaseDAO implements CaseDAO {

    public async create(object: Case): Promise<number> {
        writeOnFile("");    
        let casesList = await readOnFile();
        let id = await getIdCase(casesList);
        object.id = id;

        if( casesList === '') {
            writeOnFile("[" + JSON.stringify(object) +"]");
        } else {
            writeOnFile("[" + JSON.stringify(object)+ "," + getCaseText(casesList) +"]");
        }

        return object.id;
    }

    public async update(object: Case): Promise<boolean> {
        let casesListText = await readOnFile();
        let caseList = await JSON.parse(casesListText);
        let cas = caseList.find((cas: Case) => cas.id === object.id);
        let index = caseList.indexOf(cas);
        object.id = cas.id;
        caseList[index] = object;
        writeOnFile(JSON.stringify(caseList));
        
        return true;
    }

    public async delete(id: number): Promise<boolean> {
        let casesListText = await readOnFile();
        let caseList = await JSON.parse(casesListText);
        let cas = caseList.find((cas: Case) => cas.id === id);
        let index = caseList.indexOf(cas);
        caseList.splice(index, 1);
        writeOnFile(JSON.stringify(caseList));
        
        return true;
    }

    public async findAll(): Promise<Case[]> {
        let casesList = await readOnFile();
        
        return casesList === '' ? [] : JSON.parse(casesList);
    }

    public async findById(id: number): Promise<Case> {
        let casesListText = await readOnFile();
        let caseList = await JSON.parse(casesListText);
        let cas = caseList.find((cas: Case) => cas.id === id);
        
        return cas
    }


}