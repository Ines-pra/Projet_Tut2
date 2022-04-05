import { Event } from '../../metier/Event';
import EventDAO from '../EventDAO';
import { client } from '../../../index';
import { GET_ALL_EVENT, GET_EVENT_ID } from '../../../graphql/Query/queryEvent';
import { CREATE_EVENT, DELETE_EVENT } from '../../../graphql/Mutations/mutationsEvent';

export class sqlEventDAO implements EventDAO {
    public async create(object: Event): Promise<number> {
        client.
        mutate({
            mutation: CREATE_EVENT,
            variables: {
                    idCase:object.idCase,
                    description: object.description,
                    duration: object.duration,
                    createdDate:object.createdDate 
            }
        });
        return object.id;
    }
    public async update(object: Event): Promise<boolean> {
        
        return true;
    }
    public async delete(id: number): Promise<boolean> {
        client.
        mutate({
            mutation: DELETE_EVENT,
            variables: {deleteEventId:id}
        });
        return true;
    }
    public async findAll(): Promise<Event[]> {
        let obj:Array<Event> = [];
        await client
            .query({
                query: GET_ALL_EVENT,
            })
            .then(result =>  {
                result.data.events.forEach((element:Event) => {
                    let cli = new Event(element.id, 1, element.description, element.createdDate, element.duration)
                    obj.push(cli); 
                });
            });

        return obj;
    }
    public async findById(id: number): Promise<Event> {
        let e1:Event = new Event(1,1, "", new Date,3);
        await client
            .query({
                query: GET_EVENT_ID,
                variables:{eventId:id}
            })
            .then(result =>{
                
                    e1 = new Event(
                        result.data.id,
                        1,
                        result.data.event.description,
                        result.data.event.createdDate,
                        result.data.event.duration,
                    );
                    console.log();
                    
             
            });

            return e1;
    }


}