import { gql } from '@apollo/client';

export const CREATE_CASE = gql`
    mutation Mutation($description:String!,$status:String!, $startedAt:DateTime!, $endedAt:DateTime!, $code:String!) {
    createCase_af(input: {status:$status description:$description, startedAt:$startedAt, endedAt:$endedAt, code:$code}) {
        id
    }}
`

export const DELETE_CASE = gql`
    mutation Mutation($deleteCaseAfId: ID!) {
        deleteCase_af(id: $deleteCaseAfId)
    }
`

export const UPDATE_CASE = gql`
    mutation UpdateCase_af($id: ID!, $description:String!, $code:String!,$endedAt:DateTime!,$startedAt:DateTime!, $status:String!) {
    updateCase_af(input: {
        id:$id, description:$description, code:$code, endedAt: $endedAt, startedAt:$startedAt, status:$status
    }) 
    }
`