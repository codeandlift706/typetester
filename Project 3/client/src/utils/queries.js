import { gql } from '@apollo/client';
// Get all users
export const QUERY_USERS =gql `
  query {
    users {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;

// Get a single user by ID
export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;

// Get all scores
export const QUERY_SCORES = gql`
  query {
    scores {
      _id
      score
      user {
        _id
        username
        firstName
        lastName
      }
    }
  }
`;

