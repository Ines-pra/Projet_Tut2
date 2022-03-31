const {gql} = require("apollo-server");

// Schéma GraphQL

const typeDefs = gql`

    scalar DateTime 


    type Client {
        id: ID!
        lastname: String!
        firstname: String!
        address: String!
        birthDate: DateTime!
        createdDate: DateTime!
        case_afs: [Case_af]
    } 

    type Event {
        id: ID!
        description: String!
        createdDate: DateTime!
        duration: Int!
    } 

    type Case_af {
        id: ID!
        description: String!
        date_begin: DateTime!
        status: String!
        date_end: DateTime!
        clients: [Client]
        events: [Event]
    } 

    input Case_af_input {
        description: String!
        date_begin: DateTime!
        status: String!
        date_end: DateTime!
    } 

    input ClientInput {
        lastname: String!
        firstname: String!
        address: String!
        birthday: DateTime!
        createddate: DateTime!
    } 

    input EventInput {
        description: String!
        datecrea: String!
        duration: Int!
        id_case: String!
    } 

    type Query {
    
        clients: [Client]!,
        events: [Event]!,
        case_afs: [Case_af]!,

        client(id:ID!): Client!,
        event(id:ID!): Event!,
        case_af(id:ID!): Case_af!,

        clientByName(lastname:String!): Client!,
    }

    type Mutation {
        createClient( input: ClientInput!): Client!,
        createEvent( input: EventInput!): Event!,
        createCase_af( input: Case_af_input!): Case_af!,

    }
`

module.exports = { typeDefs }