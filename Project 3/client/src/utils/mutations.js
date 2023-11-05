// write mutations.js
import { gql } from '@apollo/client';

// Add a new user
export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        username
        email
      }
    }
  }
`;

// Login user
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        username
        email
      }
    }
  }
`;

// Update a user by ID
export const UPDATE_USER = gql`
  mutation updateUser($username: String) {
    updateUser(username: $username) {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;

// Remove a user by ID
export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $id) {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;

// Remove a score by ID
export const REMOVE_SCORE = gql`
  mutation removeScore($scoreId: ID!) {
    removeScore(scoreId: $id) {
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

// Add a new comment
export const ADD_COMMENT = gql`
    mutation addComment($text: String!, $userId: ID!) {
        addComment(text: $text, userId: $userId) {
            _id
            text
            user {
                _id
                username
                firstName
                lastName
            }
        }
    }
`;

// Update a comment by ID
export const UPDATE_COMMENT = gql`
    mutation updateComment($id: ID!, $text: String!) {
        updateComment(_id: $id, text: $text) {
            _id
            text
            user {
                _id
                username
                firstName
                lastName
            }
        }
    }
`;

