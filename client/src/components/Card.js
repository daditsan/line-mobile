const { useMutation } = require("@apollo/client");
const { useNavigation } = require("@react-navigation/native");
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
const { ProfilePictureS, ProfilePictureM } = require("./ProfilePicture");
const { timeFormat } = require("../helpers/timeFormat");
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";


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

const PostCard = ({ item }) => {
  const navigation = useNavigation();

  const [addLike, { loading, error }] = useMutation(ADD_LIKE, {
    refetchQueries: [{ query: GET_ALL_POST }],
  });

  if (loading) {
    return (
      <>
        <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }
  
  return (
    <>
    {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      )}
      <Pressable
        key={item._id}
        style={styles.card}
        onPress={() => {
          navigation.navigate("Detail", {
            id: item._id,
          });
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("User Profile", {
                id: item.author._id
              });
            }}
          >
            <ProfilePictureS item={item} />
          </TouchableOpacity>
          <View>
            <Text style={styles.userName}>{item.author.name}</Text>
            <Text style={styles.timestamp}>{timeFormat(item.updatedAt)}</Text>
          </View>
        </View>
        <Text style={styles.postText}>{item.content}</Text>
        {item.tags && (
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            {item.tags.map((tag, index) => {
              return <Text style={styles.postTags} key={index}>#{tag}</Text>;
            })}
          </View>
        )}
        {item.imgUrl && (
          <Image source={{ uri: item.imgUrl }} style={styles.postImage} />
        )}
        <View style={styles.likesContainer}>
          <View style={styles.likes}></View>
          {/* <Text style={styles.comments}>1K comments</Text> */}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            {/* <AntDesign name="like2" style={styles.buttonIcon} /> */}
            {/* <Text style={styles.buttonText}>Like</Text> */}
          </Pressable>
          <View styles={styles.button}>
            {/* <FontAwesome name="comment-o" style={styles.buttonIcon} /> */}
            {/* <Text style={styles.buttonText}>Comments</Text> */}
          </View>
        </View>
      </Pressable>
    </>
  );
};

const FOLLOW_OTHER_USER = gql`
  mutation Mutation($followingId: ID) {
    followOtherUser(followingId: $followingId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

const USER_PROFILE = gql`
  query Query($id: ID) {
    userById(_id: $id) {
      _id
      name
      username
      email
    }
  }
`;

export function UserCard({ item }) {
  const [follow, setFollow] = useState(false);
  const navigation = useNavigation();

  const [followOtherUser, { loading, error, data }] = useMutation(
    FOLLOW_OTHER_USER,
    {
      refetchQueries: [{ query: USER_PROFILE, variables: { id: item._id } }],
    }
  );

  const { name, username } = item;

  return (
    <>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      )}
      <View style={styles.cardSearch}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => {
            navigation.navigate("User Profile", {
              id: item._id,
            });
          }}
        >
          <View style={styles.itemLeft}>
            <ProfilePictureM item={item} />
            <View>
              <Text style={styles.userName}>{name}</Text>
              <Text styles={styles.timestamp}>{username}</Text>
            </View>
          </View>
          {!follow ? (
            <TouchableOpacity
              onPress={async () => {
                const result = await followOtherUser({
                  variables: {
                    followingId: item._id,
                  },
                });
                setFollow(true);
              }}
              style={styles.button.primary}
            >
              <Text style={styles.button.text}>Follow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: 90,
                paddingVertical: 12,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                backgroundColor: "#cdcdcd",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Followed
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    gap: 12,
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
      width: 90,
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
      textAlign: "center",
    },
  },
  cardSearch: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 8,
    padding: 16,
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

export default PostCard;
