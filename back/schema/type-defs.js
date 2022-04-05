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
        startedAt: DateTime!
        status: String!
        endedAt: DateTime!
        clients: [Client]
        events: [Event]
        code: String!
    } 

    input Case_af_input {
        id: ID
        description: String!
        startedAt: DateTime!
        status: String!
        endedAt: DateTime!
        code: String!
    } 

    input ClientInput {
        id:ID
        lastname: String!
        firstname: String!
        address: String!
        birthDate: DateTime!
        createdDate: DateTime!
    } 

    input EventInput {
        id:ID
        description: String!
        createdDate: DateTime!
        duration: Int!
        idCase: ID!
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
        deleteEvent(id:ID!): String,
        deleteCase_af(id:ID!): String,
        deleteClient(id:ID!): String,
        updateEvent(input: EventInput!): String,
        updateCase_af(input: Case_af_input!): String,
        updateClient(input: ClientInput!):String,
    }
`

module.exports = { typeDefs }