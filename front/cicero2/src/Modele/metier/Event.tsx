export class Event {
    id: number;
    idCase: number;
    description: string;
    createdDate: Date;
    duration: number;
    constructor(id:number, idCase: number, description:string, createdDate:Date, duration:number) {
        this.id = id;
        this.description = description;
        this.createdDate = createdDate;
        this.duration = duration;
        this.idCase = idCase;
    }
}