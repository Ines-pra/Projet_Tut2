import { Case } from '../../metier/Case';
import CaseDAO from '../CaseDAO';


export class localCaseDAO implements CaseDAO {
    public async create(object: Case): Promise<number> {
        
        return object.id;
    }
    public async update(object: Case): Promise<boolean> {
        
        return true;
    }
    public async delete(id: number): Promise<boolean> {
        
        return true;
    }
    public async findAll(): Promise<Case[]> {
        
        return [];
    }
    public async findById(id: number): Promise<Case> {
        
        return new Case(id, "electron", "", new Date(), true, new Date(), 1, []);
    }


}