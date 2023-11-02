// write mutations.js
import { gql } from '@apollo/client';

// Add a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
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

// Login user
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
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

// Update a user by ID
export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $username: String, $email: String, $password: String) {
    updateUser(_id: $id, username: $username, email: $email, password: $password) {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;

// Delete a user by ID
export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;

// Delete a score by ID
export const DELETE_SCORE = gql`
  mutation deleteScore($id: ID!) {
    deleteScore(_id: $id) {
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

