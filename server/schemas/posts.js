const redis = require('../config/redis');
const Post = require('../models/Post')


const typeDefs = `#graphql
    type Like {
        username: String
        createdAt: String
        updatedAt: String
    }

    type Comment {
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }

    type AuthorDetail {
        _id: ID
        name: String
        username: String
        email: String
    }

    type Post {
        _id: ID
        content: String
        tags: [String]
        imgUrl: String
        authorId: String
        comments: [Comment]
        likes: [Like]
        createdAt: String
        updatedAt: String
        author: AuthorDetail
    }

    type Query {
        getPosts: [Post]
        getPostById(_id: ID): Post
    }

    type Mutation {
        createPost(content: String, tags: [String], imgUrl: String): String
        createComment(postId: ID, content: String): String
        createLike(postId: ID): String
    }
`

const resolvers = {
    Query: {
        getPosts: async (_, __, { auth }) => {
            auth();

            const postsCache = await redis.get("posts");
            if(postsCache) {
                return JSON.parse(postsCache)
            }

            const posts = await Post.getAllPosts();
            await redis.set("posts", JSON.stringify(posts))
            return posts
        },

        getPostById: async (_, args) => {
            const { _id } = args
            console.log(_id);
            const data = await Post.getPostById(_id);
            return data[0]
        }

    },

    Mutation: {
        createPost: async (_, args, contextValue) => {
            const user = contextValue.auth();
            const { content, tags, imgUrl } = args;
            
            await Post.createPost({ content, tags, imgUrl }, user._id);
            await redis.del("posts")
            return "Post added!"
        },

        createComment: async (_, args, contextValue) => {
            const { username } = contextValue.auth()
            const { content, postId } = args

            const result = await Post.createComment({ content, username }, postId)
            return result
        },

        createLike: async (_, args, contextValue) => {
            const { username } = contextValue.auth()
            const { postId } = args

            const result = await Post.createLike({ username }, postId)
            return result
        }
    }
}

module.exports = { typeDefs, resolvers }