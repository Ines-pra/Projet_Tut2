import { gql } from '@apollo/client';

export const GET_ALL_CASE = gql`
query Query {
  case_afs {
    id
    description
    startedAt
    status
    endedAt
    clients {
      id
      lastname
      firstname
      address
      birthDate
      createdDate
    }
    events {
      id
      description
      createdDate
      duration
    }
    code
  }
}
`

export const GET_CASE_ID = gql`
query Case_af($caseAfId: ID!) {
  case_af(id: $caseAfId) {
    id
    description
    startedAt
    status
    endedAt
    code
    
    events {
      description
      createdDate
      duration
      id
    }
    clients {
      lastname
      firstname
      address
      birthDate
      createdDate
      id
    }
  }
}
`