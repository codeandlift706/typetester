import { gql } from '@apollo/client';

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
        scores {
          _id
          score
        }
      }
    }
  }
`;

// Get all prompts
export const QUERY_PROMPTS = gql`
  query {
    prompts {
      _id
      text
    }
  }
`;

// Get logged in user info
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
