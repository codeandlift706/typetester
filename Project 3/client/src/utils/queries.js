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

<<<<<<< HEAD
export const QUERY_PROMPTS = gql`
  query {
    prompts {
      _id
      text
    }
  }
`; 
=======
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
>>>>>>> b5c109e00dd66848864acb99dc6d3d09363657e7
