const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const prompts = require('./models/Prompt');

const app = express();
const PORT = process.env.PORT || 3000;
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server, { context: authMiddleware }));

    app.get('/api/prompts', async (req, res) => {
        try {
            const randomPrompt = await prompts.aggregate([{ $sample: { size: 1 } }]);
            res.json(randomPrompt);
        } catch (err) {
            console.error('Error fetching prompt', err);
            res.status(500).json({ error: 'server error' });
        }
    });
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    });
};

startApolloServer();
