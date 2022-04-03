import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
    mutation Mutation( $lastname: String!, $firstname:String!, $address:String!, $birthDate:DateTime!, $createdDate:DateTime!) {
        createClient(input: { lastname:$lastname, firstname:$firstname, address:$address, birthDate:$birthDate, createdDate:$createdDate}) {
            firstname
            address
            lastname
            birthDate
            createdDate
        }
    }
`

export const DELETE_EVENT = gql`
    mutation Mutation($deleteEventId: ID!) {
        deleteEvent(id: $deleteEventId)
    }
`