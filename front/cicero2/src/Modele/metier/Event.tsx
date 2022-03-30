export class Event {
    id: number;
    idCase: number;
    description: string;
    createdAt: Date;
    duration: number;
    constructor(id:number, idCase: number, description:string, createdAt:Date, duration:number) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.duration = duration;
        this.idCase = idCase;
    }
}