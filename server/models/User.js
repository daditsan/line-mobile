const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");
const { hashPassword, comparePassword } = require('../helpers/bcryptjs')

class User {
  static async create(newUser) {
    if (!newUser.username) {
      throw new Error("Username cannot be empty");
    }

    if (!newUser.email) {
      throw new Error("Email cannot be empty");
    }

    if (!newUser.password) {
      throw new Error("Password cannot be empty");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      throw new Error("Invalid email format");
    }

    const usernameExists = await database.collection("users").findOne({ username: newUser.username });
    const emailExists = await database.collection("users").findOne({ username: newUser.email });

    if (usernameExists) {
      throw new Error("Username is taken");
    }

    if (emailExists) {
      throw new Error("This email is already registered");
    }

    if (newUser.password.length < 5) {
      throw new Error("Minimum password is 5 character");
    }

    newUser.password = hashPassword(newUser.password);

    const result = await database.collection("users").insertOne(newUser);
    return newUser;
  }

  static async findById(_id) {
    const user = await database.collection("users").findOne({ _id: new ObjectId(String(_id)) });
    if (!user) {
      throw new Error("User not found")
    }
    return user;
  }

  static async userProfile(_id) {
    const users = database.collection("users");
    const follows = database.collection("follows");
    
    // let aggfindUser = [
    //   {
    //     $match: {
    //       _id: new ObjectId(String(_id))
    //     }
    //   },
    //   { $unset: 'password' }
    // ]

    let findUser = await users.findOne({
      _id: new ObjectId(String(_id))
    })

    // let findUser = await users.aggregate(aggfindUser) apa aggregate ga bisa tanpa toArray() ?? 
    // jadinya buat sekarang userProfile masih nampilin password, solusi?

    const aggFollowing = [
        {
            $match: {
                followerId: new ObjectId(String(_id)),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "followingId",
                foreignField: "_id",
                as: "following",
            },
        },
    ]
    const following = await follows.aggregate(aggFollowing).toArray()

    const aggFollower = [
        {
            $match: {
                followingId: new ObjectId(String(_id)),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "followerId",
                foreignField: "_id",
                as: "follower",
            },
        },
    ]

    const follower = await follows.aggregate(aggFollower).toArray()

    findUser.follower = follower
    findUser.following = following

    return findUser
  }

  static async findByNameOrUsername(name, username) {
    const user = await database.collection("users").findOne({
      $or: [{ name: name }, { username: username }],
    });
    return user;
  }

  static async loginUser(body) {
    if (!body.username) {
      throw new Error("Username cannot be empty")
    }

    if (!body.password) {
      throw new Error("Password cannot be empty")
    }
    
    const users = database.collection("users");
    const findUsername = await users.findOne({
      username: body.username
    })

    return findUsername
  }
}

module.exports = User;
