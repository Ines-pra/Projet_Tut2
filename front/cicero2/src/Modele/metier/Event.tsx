export class Event {
    id: number;
    description: string;
    createdAt: Date;
    duration: number;
    constructor(id:number, description:string, createdAt:Date, duration:number) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.duration = duration;
    }
}