const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        password: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Score {
        _id: ID
        score: Int
        user(_id: ID!): User
        createdAt: String
    }

    type Query { 
        users: [User]
        user(_id: ID!): User
        scores: [Score]
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        updateUser(_id: ID!, username: String): User
        removeUser(_id: ID!): User
        removeScore(_id: ID!): Score
    }
`;

module.exports = typeDefs;