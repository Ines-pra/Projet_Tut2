import { gql } from '@apollo/client';

export const GET_ALL_EVENT = gql`
        query Events {
            events {
                id
                description
                createdDate
                duration
            }
}
`

export const GET_EVENT_ID = gql`
    query Events($eventId: ID!) {
    event(id: $eventId) {
        id
        description
        createdDate
        duration
    }
    }
`