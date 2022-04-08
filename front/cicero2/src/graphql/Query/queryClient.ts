import { gql } from '@apollo/client';

export const GET_ALL_CLIENT = gql`
        query Query {
            clients {
                id
                lastname
                firstname
                address
                birthDate
                createdDate
            
            }}
`

export const GET_CLIENT_ID = gql`
    query Query($clientId: ID!) {
        client(id: $clientId) {
            lastname
            firstname
            id
            address
            birthDate
            createdDate
        }}
`