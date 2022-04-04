import { Case } from '../../metier/Case';
import CaseDAO from '../CaseDAO';
import { client } from '../../../index';
import { CREATE_CASE, DELETE_CASE } from '../../../graphql/Mutations/mutationsCase';
import { GET_ALL_CASE, GET_CASE_ID } from '../../../graphql/Query/queryCase';




export class sqlCaseDAO implements CaseDAO {
    public async create(cas: Case): Promise<number> {
        client.
        mutate({
            mutation: CREATE_CASE,
            variables: {
                description: cas.description,
                startedAt:"2022-03-31T22:43:47.000Z",
                endedAt:"2022-03-31T22:43:47.000Z",
                code:cas.code,
                status:cas.status.toString()
            }
        });
        return cas.id;
    }
    public async update(object: Case): Promise<boolean> {
        
        return true;
    }
    public async delete(id: number): Promise<boolean> {
        client.
        mutate({
            mutation: DELETE_CASE,
            variables: {deleteCaseAfId:id}
        });
        return true;
    }
    public async findAll(): Promise<Case[]> {
        let obj:Array<Case> = [];
        await client
            .query({
                query: GET_ALL_CASE,
            })
            .then(result =>  {
                
                result.data.case_afs.forEach((element:Case) => {
                    
                    let cas = new Case(element.id, element.code, element.description, element.startedAt, element.status, element.endedAt, element.clients, element.events)
                    obj.push(cas);
                });
            });

        return obj;
    }
    public async findById(id: number): Promise<Case> {
        let c1:Case = new Case(1, "", "", new Date, false, new Date, [], []);
        client
            .query({
                query: GET_CASE_ID,
                variables:{caseAfId:id}
            })
            .then(result =>{
                
                    c1 = new Case(
                        result.data.id, result.data.code, result.data.description, result.data.startedAt, result.data.status, result.data.endedAt, result.data.clients, result.data.events
                    );
                    console.log(c1);
                    
             
            });
        
        return c1;
    }


}