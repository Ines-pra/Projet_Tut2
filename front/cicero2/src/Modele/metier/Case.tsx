import { Event } from './Event';

export class Case {
    id: number;
    code: string;
    description: string;
    startedAt: Date;
    status: Boolean;
    endedAt: Date;
    caseId: number;
    events: Event[];
    constructor(id:number, code:string, description:string, startedAt:Date, status:Boolean, endedAt:Date, caseId:number, events:Event[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.status = status;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.caseId = caseId;
        this.events = events;
    }
}