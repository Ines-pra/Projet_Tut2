import { gql } from '@apollo/client';

export const CREATE_CLIENT = gql`
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

export const DELETE_CLIENT = gql`
    mutation Mutation($deleteClientId: ID!) {
        deleteClient(id: $deleteClientId)
    }
`

export const UPDATE_CLIENT = gql`
    mutation Mutation($id:ID!, $lastname: String!, $firstname:String!, $address:String!, $birthDate:DateTime!, $createdDate:DateTime!) {
        updateClient(input: {id:$id,lastname:$lastname, firstname:$firstname, address:$address, birthDate:$birthDate, createdDate:$createdDate}) 
    }
`