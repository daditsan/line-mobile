const database = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class Follow {
    static async findAllFollowsById(_id) {
        const follows = database.collection("follows");
        const data = await follows.find({ followerId: new ObjectId(String(_id)) }).toArray();

        return data;
    }

    static async findFollowById(_id) {
        const follows = database.collection("follows");
        const data = await follows.findOne({ _id: new ObjectId(String(_id)) });
        return data
    }

    static async addFollow(followingId, user) {
        let follows = database.collection("follows");
        let newData = {
            createdAt: new Date(),
            updatedAt: new Date(),
            followerId: new ObjectId(String(user._id)),
            followingId: new ObjectId(String(followingId))
        } 

        const findFollow = await follows.findOne({
            followerId: newData.followerId,
            followingId: newData.followingId
        })

        if (findFollow) {
            throw new Error('You have followed this user')
        };
        

        const data = await follows.insertOne(newData);
        return data
        // return "Follow success";
    }

}

module.exports = Follow