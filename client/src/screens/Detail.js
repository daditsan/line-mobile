import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ProfilePictureS } from "../components/ProfilePicture";
import { timeFormat, timeFormatComment } from "../helpers/timeFormat";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_POST_DETAIL = gql`
  query GetPostById($id: ID) {
  getPostById(_id: $id) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    author {
      _id
      name
      username
      email
    }
  }
}
`;



const ADD_COMMENT = gql`
  mutation CreateComment($postId: ID, $content: String) {
    createComment(postId: $postId, content: $content)
  }
`;

const ADD_LIKE = gql`
  mutation CreateLike($postId: ID) {
    createLike(postId: $postId)
  }
`;

const GET_ALL_POST = gql`
  query Query {
    getPosts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export default function Detail({ route, navigation }) {
  const { id } = route.params;
  
  const [newComment, setNewComment] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_POST_DETAIL, {
    variables: {
      id: id
    },
  });
  
  const [doComment] = useMutation(ADD_COMMENT)
  const submitComment = async () => {
    try {
      const result = await doComment({
        variables: {
          content: newComment,
          postId: _id
        }
      })
      setNewComment("")
      // refecthQueries: [GET_POST_DETAIL]
      refetch()
      navigation.navigate("Detail", { id })
    } catch (error) {
      console.log(error.message);
    }
  }

  const [doLike] = useMutation(ADD_LIKE)
  const submitLike = async () => {
    try {
      const result = await doLike({
        variables: {
        postId: _id
        }
      })
      refetch()
      navigation.navigate("Detail", {id})
    } catch (error) {
      console.log(error.message);
    }
  }

  if (error) {
    return 
    <>
      <Text>ini error</Text>
    </>
  }

  if (loading) {
    return 
    <>
      <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
        <ActivityIndicator size="large" />
      </View>
    </>
  }

  let { _id, author, content, imgUrl, comments, tags, likes, createdAt } = data.getPostById;

  if (!likes) {
    likes = []
  }

  return (
    <>
      <View style={styles.view} key={id}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {error &&
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{likeError.message}</Text>
            </View>
          }
          <View style={styles.header}>
            <ProfilePictureS item={author} />
            <View>
              <Text style={styles.userName}>{author.username}</Text>
              <Text style={styles.timestamp}>{timeFormat(createdAt)}</Text>
            </View>
          </View>
          <Text style={styles.postText}>{content}</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {tags &&
              tags.map((tag, index) => {
                return (
                  <Text style={styles.postTags} key={index}>
                    #{tag}
                  </Text>
                );
              })}
          </View>
          {imgUrl && (
            <Image source={{ uri: imgUrl }} style={styles.postImage} />
          )}
          <View style={styles.likesContainer}>
            <View style={styles.likes}>
            {
              ( !likes &&
                <Text style={{ color: "#a3a3a3" }}>0 like</Text>)
              }
              {likes && likes.length === 1 ? 
                <>
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
                    }}
                    style={styles.userLiked}
                  />
                </>
               : likes.length === 2 ? 
                <>
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
                    }}
                    style={styles.userLiked}
                  />
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg",
                    }}
                    style={[
                      styles.userLiked,
                      { right: 6, borderColor: "white", borderWidth: 1 },
                    ]}
                  />
                </>
               : likes.length >= 3 ? 
                <>
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
                    }}
                    style={styles.userLiked}
                  />
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg",
                    }}
                    style={[
                      styles.userLiked,
                      { right: 6, borderColor: "white", borderWidth: 1 },
                    ]}
                  />
                  <Image
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwRltzEJ94vTnkSv9yLbztU8G3K45EtYrfw&s",
                    }}
                    style={[styles.userLiked, { right: 14 }]}
                  />
                </>
              : 
                ""
              }
              {(likes.length < 4 && likes.length !== 0)
                ?
                <Text style={{ left: 4, color: "#a3a3a3" }}>{likes.length} likes</Text>
                : (likes.length === 0 || null) ?
                  <Text style={{ color: "#a3a3a3" }}>{likes.length} like</Text>
                  :
                  <Text style={{ right: 8, color: "#a3a3a3" }}>+{likes.length - 3} likes</Text>
              }
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} 
              onPress={submitLike}
            >
              <AntDesign name="like2" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Like</Text>
            </Pressable>
            <View style={styles.button}>
              <Feather name="share-2" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Share</Text>
            </View>
          </View>

          <View style={styles.mainCommentContainer}>
            {comments &&
              comments.map((comment, index) => (
                <View style={styles.commentContainer} key={index}>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <ProfilePictureS item={comment} />
                    <View
                      style={{
                        flexDirection: "column",
                        marginStart: 10,
                        width: "79%",
                      }}
                    >
                      <Text style={styles.username}>{comment.username}</Text>
                      <Text style={styles.content}>{comment.content}</Text>
                      <View
                        style={{ gap: 16, flexDirection: "row", marginTop: 12 }}
                      >
                        {/* <AntDesign name="like2" style={styles.buttonIcon} /> */}
                        {/* <FontAwesome
                          name="comment-o"
                          style={styles.buttonIcon}
                        /> */}
                      </View>
                    </View>
                    <Text style={styles.timestamp}>
                      {timeFormatComment(comment.updatedAt)}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>

        <View style={styles.inputCommentContainer}>
          <TextInput
            style={styles.inputComment}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
            multiline={true}
            numberOfLines={3}
          />
          <TouchableOpacity
            style={styles.buttonComment}
            // onPress={() => {
            //   submitComment({
            //     variables: {
            //       createComment: {
            //         postId: _id,
            //         content: newComment,
            //       },
            //     },
            //   });
            // }}
            onPress={submitComment}
          >
            <Text style={styles.buttonTextComment}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  card: {
    width: 370,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  itemLeft: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userImageSearch: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postText: {
    fontSize: 16,
    marginBottom: 4,
  },
  postTags: {
    color: "#1877F2",
    fontSize: 16,
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 200,
    maxHeight: 500,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 14,
    gap: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonIcon: {
    color: "#6b6b6b",
    fontSize: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#6b6b6b",
  },
  timestamp: {
    color: "#a3a3a3",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
  },
  comments: {
    color: "#a3a3a3",
  },
  userLiked: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderColor: "white",
    borderWidth: 1,
  },
  button: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    primary: {
      paddingHorizontal: 10,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: "#1877F2",
    },
    text: {
      color: "white",
      fontSize: 16,
      fontWeight: 500,
    },
  },
  mainCommentContainer: {
    marginTop: 22,
  },
  commentContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    justifyContent: "space-between",
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
  },
  inputCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
  },
  inputComment: {
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#dedede",
    marginRight: 10,
  },
  buttonComment: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: "#0DC556",
    borderRadius: 22,
  },
  buttonTextComment: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerSpinner: {
    flex: 1,
    justifyContent: "center",
  },
  horizontalSpinner: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  errorContainer: {
    width: "100%",
    backgroundColor: "#ffe6e6",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    textAlign: "center",
    color: "#ff3333",
    fontSize: 16,
    fontWeight: "bold",
  },
});
