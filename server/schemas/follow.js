const Follow = require('../models/Follow')


const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type Query {
        follows: [Follow]
    }

    input FollowUser {
        followingId: ID
    }

    type Mutation {
        followOtherUser(followingId: ID): Follow
    }
`

const resolvers = {
    Query: {
        follows: async (_, __, contextValue) => {
            const user = contextValue.auth();
            const data = await Follow.findAllFollowsById(user._id);
            return data;
        }
    },

    Mutation: {
        followOtherUser: async (_, args, contextValue) => {
            const user = contextValue.auth();
            const addFollow = await Follow.addFollow(args.followingId, user);
            
            const result = await Follow.findFollowById(addFollow.insertedId);
            return result;
        }
    }
}

module.exports = { typeDefs, resolvers }