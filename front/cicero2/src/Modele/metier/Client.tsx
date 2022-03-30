export class Client {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    birthDate: Date;
    createdAt: Date;
    constructor(id:number, firstname:string, lastname:string, address:string, birthDate:Date, createdAt:Date) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.birthDate = birthDate;
        this.createdAt = createdAt;
    }
}