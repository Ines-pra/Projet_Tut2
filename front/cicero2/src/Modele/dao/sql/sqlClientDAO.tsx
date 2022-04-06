import { Client } from '../../metier/Client';
import ClientDAO from '../ClientDAO';
import { client } from '../../../index';
import { gql } from '@apollo/client';
import { CREATE_CLIENT, DELETE_CLIENT, UPDATE_CLIENT } from '../../../graphql/Mutations/mutationsClient';
import { GET_ALL_CLIENT, GET_CLIENT_ID } from '../../../graphql/Query/queryClient';
    

export class sqlClientDAO implements ClientDAO {
    public async create(cli: Client): Promise<number> {
        client
            .mutate({
                mutation: CREATE_CLIENT,
                variables: {
                        lastname: cli.lastname,
                        firstname: cli.firstname,
                        address: cli.address,
                        birthDate:cli.birthDate,
                        createdDate:cli.createdDate 
                }
            });
        
        return cli.id;
    }
    public async update(cli: Client): Promise<boolean> {
        client
            .mutate(
                {
                    mutation: UPDATE_CLIENT,
                    variables: {
                        id: cli.id,
                        lastname: cli.lastname,
                        firstname:cli.firstname,
                        address:cli.address,
                        birthDate:cli.birthDate,
                        createdDate:cli.createdDate,
                      }
                }
            )
        
        return true;
    }
    public async delete(id: number): Promise<boolean> {
        client
        .mutate({
            mutation: DELETE_CLIENT,
            variables: {deleteClientId:id}
        });
        return true;
    }
    public async findAll(): Promise<Client[]> {
        let obj:Array<Client> = [];
        await client
            .query({
                query: GET_ALL_CLIENT,
            })
            .then(result =>  {
                result.data.clients.forEach((element:Client) => {
                    let cli = new Client(element.id, element.firstname, element.lastname, element.address, element.birthDate, element.createdDate)
                    obj.push(cli);
                   
                    
                });
            });

        return obj;
    }

    public async findById(id: number): Promise<Client> {
        let c1:Client = new Client(1,"", "", "", new Date(), new Date());
        await client
            .query({
                query: GET_CLIENT_ID,
                variables:{clientId:id}
            })
            .then(result =>{

                    c1 = new Client(
                        result.data.client.id,
                        result.data.client.firstname,
                        result.data.client.lastname,
                        result.data.client.address,
                        result.data.client.birthDate,
                        result.data.client.createdDate
                    );
                    // console.log(result.data.client);
            });

        return c1;
    }


}