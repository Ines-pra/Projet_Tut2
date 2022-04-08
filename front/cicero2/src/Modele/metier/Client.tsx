export class Client {
    id: number;
    lastname: string;
    firstname: string;
    address: string;
    birthDate: Date;
    createdDate: Date;
    constructor(id:number, lastname:string, firstname:string, address:string, birthDate:Date, createdDate:Date) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.address = address;
        this.birthDate = birthDate;
        this.createdDate = createdDate;
    }
}