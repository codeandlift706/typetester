const { User, Score, Prompt } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => { //GOOD -- do we still need? this or query scores can be for scoreboard?
            return User.find().populate('scores');
        },

        user: async (parent, { username }) => { //GOOD
            return User.findOne({ username }).populate('scores');
        },

        scores: async (parent, { userId }) => { //REVIEW!!!
            const params = userId ? { userId } : {};
            return Score.find(params).sort({ createdAt: -1 }); //latest score first
        },
        prompts: async () => {
            return Prompt.find();
        }
    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, username, email, password }) => { //GOOD
            const user = await User.create({ firstName, lastName, username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => { //GOOD
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },

        removeUser: async (parent, { userId }, context) => { //GOOD
            if (context.user) {
                await User.findOneAndDelete(
                    { _id: userId }
                );

                return;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },

        updateUser: async (parent, { userId, username }, context) => { //GOOD
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: userId },
                    { username },
                    { new: true });

                return user;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },


        removeScore: async (parent, { userId, scoreId }, context) => { //GOOD
            if (context.user) {
                const score = await Score.findOneAndDelete({
                    _id: scoreId,
                });

                await User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { scores: score._id } }
                );

                return score;
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;
