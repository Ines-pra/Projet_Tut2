import { Client } from '../../metier/Client';
import ClientDAO from '../ClientDAO';
import { client } from '../../../index';
import { gql } from '@apollo/client';
import { CREATE_CLIENT, DELETE_CLIENT } from '../../../graphql/Mutations/mutationsClient';
import { GET_ALL_CLIENT, GET_CLIENT_ID } from '../../../graphql/Query/queryClient';
    

export class sqlClientDAO implements ClientDAO {
    public async create(cli: Client): Promise<number> {
        client.
            mutate({
                mutation: CREATE_CLIENT,
                variables: {
                        lastname: cli.lastname,
                        firstname: cli.firstname,
                        address: cli.address,
                        birthDate:"2022-03-31T22:43:47.000Z",
                        createdDate:"2022-03-31T22:43:47.000Z" 
                }
            });
        
        return cli.id;
    }
    public async update(client: Client): Promise<boolean> {
        
        return true;
    }
    public async delete(id: number): Promise<boolean> {
        client.
        mutate({
            mutation: DELETE_CLIENT,
            variables: {id:id}
        });
        return true;
    }
    public async findAll(): Promise<Client[]> {
        let obj:Array<Client> = [];
        client
            .query({
                query: GET_ALL_CLIENT,
            })
            .then(result =>{
                result.data.clients.forEach((element:Client) => {
                    obj.push(element);
                });
            });

        return obj;
    }
    public async findById(id: number): Promise<Client> {
        let c1:Client = new Client(1,"", "", "", new Date, new Date);
        client
            .query({
                query: GET_CLIENT_ID,
                variables:{id:id}
            })
            .then(result =>{
                
                    c1 = new Client(
                        result.data.id,
                        result.data.firstname,
                        result.data.lastname,
                        result.data.address,
                        result.data.birthDate,
                        result.data.createdDate
                    );
                    console.log(c1);
                    
             
            });
        
        return c1;
    }


}