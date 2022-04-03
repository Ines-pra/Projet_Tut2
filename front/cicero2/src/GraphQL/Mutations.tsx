import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
    }
  }
`;

export const CREATE_FOLDER_MUTATION = gql`
  mutation createForlder(
    $code: String!
    $description: String!
    $dateStart: DateTime!
    $dateEnd: DateTime!
    $statut: String!
    $clients: array!
  ) {
    createFolder(
      code: $code
      description: $description
      date: $date
      dateEnd : $dateEnd
      statut: $statut
      clients: $clients
    ) {
      id
    }
  }
`;