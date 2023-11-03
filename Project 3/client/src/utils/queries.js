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
      scores {
      _id
      score
      }
    }
  }
`;

// Get a single user by their username
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      firstName
      lastName
      email
      scores {
      _id
      score
      }
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
        email
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      firstName
      lastName
      email
      scores {
        _id
        score
      }
    }
  }
`;