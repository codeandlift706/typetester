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
        scores {
          _id
          score
        }
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
        scores {
          _id
          score
        }
      }
    }
  }
`;

// Update a user with new username
export const UPDATE_USER = gql`
  mutation updateUser($username: String) {
    updateUser(username: $username) {
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

// Remove a user by email and password
export const REMOVE_USER = gql`
  mutation removeUser($email: String!, $password: String!) {
    removeUser(email: $email, password: $password) {
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

// Remove a score by ID
export const REMOVE_SCORE = gql`
  mutation removeScore($userId: ID!, $scoreId: ID!) {
    removeScore(userId: $userId, scoreId: $id) {
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

// Add a score by ID
export const ADD_SCORE = gql`
  mutation addScore($wpm: Int!) {
    addScore(wpm: $wpm) {
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