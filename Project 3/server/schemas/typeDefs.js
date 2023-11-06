const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        password: String
        scores: [Score]
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

    type Prompt{
        _id: ID
        text: String
    }

    type Query { 
        users: [User]
        user(username: String!): User
        scores: [Score]
        prompts: [Prompt]
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        updateUser(username: String): User
        removeUser(userId: ID!): User
        removeScore(scoreId: ID!): Score
    }
`;

module.exports = typeDefs;