const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Post {
    static async getAllPosts() {
        const agg = [
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $unwind: {
                    path: "$author",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unset: ["author.password"]
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ]

        const posts = database.collection("posts").aggregate(agg).toArray()
        return posts
    }

    static async getPostById(_id) {
        const posts = database.collection("posts")
        const data = await posts.aggregate([
            {
                $match: {
                    _id: new ObjectId(String(_id)),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $unwind: {
                    path: "$author",
                },
            },
            {
                $sort: {
                    "comments.createdAt": -1
                }
            },
        ]).toArray()
        return data
    }

    static async createPost(newPost, authorId) {
        newPost.createdAt = new Date()
        newPost.updatedAt = new Date()
        newPost.authorId = new ObjectId(String(authorId));
        const result = await database.collection("posts").insertOne(newPost)
        return newPost;
    }

    static async createComment(payload, postId) {       
        payload.createdAt = new Date()
        payload.updatedAt = new Date()
        await database.collection("posts").updateOne(
            {
                _id: new ObjectId(String(postId))
            },
            {
                $push: {
                    comments: payload
                }
            }
        )

        return "Success add comment"
    }

    static async createLike(payload, postId) {
        payload.createdAt = new Date()
        payload.updatedAt = new Date()
        await database.collection("posts").updateOne(
            {
                _id: new ObjectId(String(postId))
            },
            {
                $push: {
                    likes: payload
                }
            }
        )
        
        return "Success add like"
    }
}

module.exports = Post;