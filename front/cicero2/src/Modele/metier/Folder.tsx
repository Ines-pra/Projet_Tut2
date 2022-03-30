import { Event } from './Event';

export class Folder {
    id: number;
    code: string;
    description: string;
    startedAt: Date;
    status: Boolean;
    endedAt: Date;
    fileId: number;
    events: Event[];
    constructor(id:number, code:string, description:string, startedAt:Date, status:Boolean, endedAt:Date, fileId:number, events:Event[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.status = status;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.fileId = fileId;
        this.events = events;
    }
}