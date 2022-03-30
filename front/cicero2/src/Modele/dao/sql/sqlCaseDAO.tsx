import { Case } from '../../metier/Case';
import CaseDAO from '../CaseDAO';

export class sqlCaseDAO implements CaseDAO {
    public create(object: Case): number {
        
        return object.id;
    }
    public update(object: Case): boolean {
        
        return true;
    }
    public delete(id: number): boolean {
        
        return true;
    }
    public findAll(): Case[] {
        
        return [];
    }
    public findById(id: number): Case {
        
        return new Case(id, "web", "", new Date(), true, new Date(), 1, []);
    }


}