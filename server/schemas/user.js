const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const User = require("../models/User"); 

const typeDefs = `#graphql
    type User {
      _id: ID
      name: String
      username: String
      email: String
      password: String
    }

    type Follower {
      _id: ID
      follower: [User]
    }

    type Following {
      _id: ID
      following: [User]
    }

    type Profile {
      _id: ID
      name: String
      username: String
      email: String
      password: String
      follower: [Follower]
      following: [Following]
    }

    input NewUser {
      name: String
      username: String
      email: String
      password: String
    }

    input Login {
      username: String
      password: String
    }
    
    type LoginInfo {
      access_token: String
    }

    type Query {
      userById(_id: ID): User
      userByNameOrUsername(name: String, username: String): User
      userProfile(_id: ID): Profile
    }

    type Mutation {
      register(user: NewUser): User
      login(login: Login): LoginInfo
    }
`;

const resolvers = {
  Query: {
    userById: async (_, args) => {
      const { _id } = args;
      const user = await User.findById(_id);
      return user;
    },
    userProfile: async (_, args) => {
      const data = await User.userProfile(args._id)
      return data
    },
    userProfile: async (_, args) => {
      const data = await User.userProfile(args._id)
      return data
    },
    userByNameOrUsername: async (_, args) => {
      const { name, username } = args;
      const user = await User.findByNameOrUsername(name, username)
      return user;
    }
  },

  Mutation: {
    register: async (_, args) => {
      const newUser = { ...args.user };

      const result = await User.create(newUser);
      return result;
    },
    login: async (_, args) => {
      const body = args.login;
      const findUsername = await User.loginUser(body)

      if (!findUsername) {
        throw new Error("Username not found")
      }

      if (!comparePassword(body.password, findUsername.password)) {
        throw new Error("Invalid Password")
      }

      const token = signToken({ _id: findUsername._id, username: findUsername.username })
      return { access_token: token }
    }
  },
};

module.exports = { typeDefs, resolvers };
