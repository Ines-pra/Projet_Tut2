import { Event } from './Event';
import { Client } from './Client';

export class Case {
    id: number;
    code: string;
    description: string;
    startedAt: Date;
    status: Boolean;
    endedAt: Date;
    clients: Client[];
    events: Event[];
    constructor(id:number, code:string, description:string, startedAt:Date, status:Boolean, endedAt:Date, clients:Client[], events:Event[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.status = status;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.clients = clients;
        this.events = events;
    }
}