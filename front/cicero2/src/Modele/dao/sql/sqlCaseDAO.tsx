import { Case } from '../../metier/Case';
import CaseDAO from '../CaseDAO';
import { client } from '../../../index';
import { CREATE_CASE, DELETE_CASE, LINK_CLI_CASE, UPDATE_CASE } from '../../../graphql/Mutations/mutationsCase';
import { GET_ALL_CASE, GET_CASE_ID } from '../../../graphql/Query/queryCase';




export class sqlCaseDAO implements CaseDAO {
    public async create(cas: Case): Promise<number> {
        let idC: number;
        await client
        .mutate({
            mutation: CREATE_CASE,
            variables: {
                description: cas.description,
                startedAt:"2022-03-31T22:43:47.000Z",
                endedAt:"2022-03-31T22:43:47.000Z",
                code:cas.code,
                status:cas.status
            }
        }).then(result =>{
            idC = result.data.createCase_af.id;
        });

        
        cas.clients.forEach(element => {
            client
            .mutate({
                mutation: LINK_CLI_CASE,
                variables: {
                    caseAfId: idC,
                    clientId: element.id
                }
            });
        });
        return cas.id;
    }
    public async update(object: Case): Promise<boolean> {
    
        object.clients.forEach(element => {
            console.log(element.id);
            console.log(object.id)
            
            client
            .mutate({
                mutation: LINK_CLI_CASE,
                variables: {
                    caseAfId: object.id,
                    clientId: element.id
                }
            });
        });

        client
        .mutate({
            mutation:UPDATE_CASE,
            variables:{
                description: object.description,
                status: object.status,
                code: object.code,
                endedAt: object.endedAt,
                startedAt: object.startedAt,
                id: object.id
            } 
        })
        return true;
    }
    public async delete(id: number): Promise<boolean> {
        client
        .mutate({
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
        let c1:Case = new Case(1, "", "", new Date(), false, new Date(), [], []);
        await client
            .query({
                query: GET_CASE_ID,
                variables:{caseAfId:id}
            })
            .then(result =>{
                
                    c1 = new Case(
                        result.data.case_af.id, result.data.case_af.code, result.data.case_af.description, result.data.case_af.startedAt, result.data.case_af.status, result.data.case_af.endedAt, result.data.case_af.clients, result.data.case_af.events
                    );
                    // console.log(result);
                    
             
            });
        
        return c1;
    }


}