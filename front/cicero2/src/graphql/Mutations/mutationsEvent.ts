import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
    mutation Mutation($idCase:ID!, $description: String!, $createdDate:DateTime!, $duration:Int!) {
    createEvent(input: {idCase:$idCase, description:$description,createdDate:$createdDate, duration:$duration}) {
        id
    }}
`

export const DELETE_EVENT = gql`
    mutation Mutation($deleteEventId: ID!) {
        deleteEvent(id: $deleteEventId)
    }
`

export const UPDATE_EVENT = gql`
mutation UpdateEvent($id:ID!,$idCase:ID!, $description: String!, $createdDate:DateTime!, $duration:Int!  ) {
  updateEvent(input: {id:$id idCase:$idCase, description:$description,createdDate:$createdDate, duration:$duration}) {
    id
  }
}

`