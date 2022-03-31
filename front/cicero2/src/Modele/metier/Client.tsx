export class Client {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    birthDate: Date;
    createdDate: Date;
    constructor(id:number, firstname:string, lastname:string, address:string, birthDate:Date, createdDate:Date) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.birthDate = birthDate;
        this.createdDate = createdDate;
    }
}