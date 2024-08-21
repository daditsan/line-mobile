import { useQuery } from "@apollo/client";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import PostCard from "../components/Card";
import { gql } from "@apollo/client";

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

export default function Home() {
  const { loading, data, error } = useQuery(GET_ALL_POST);

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
    <View style={styles.view}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      )}

      {/* {data.getPost.length > 0 && */}
      <FlatList
        data={data.getPosts}
        renderItem={({ item }) =>  
          <PostCard item={item} key={item.id} /> 
        }
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
      {/* } */}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  image: {
    marginTop: 24,
    marginBottom: 24,
    width: "100%",
    height: 280,
  },
  text: {
    head: {
      fontSize: 24,
      color: "#1877F2",
      marginBottom: 32,
      fontWeight: 800,
    },
    other: {
      fontSize: 16,
      color: "#9a9c9a",
      fontWeight: 500,
    },
  },
  button: {
    primary: {
      width: "100%",
      height: 56,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: "#0DC556",
      //   borderColor: "#0DC556",
      marginBottom: 8,
    },
    secondary: {
      width: "100%",
      backgroundColor: "#48a336",
      marginTop: 12,
      height: 56,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    text: {
      color: "white",
      fontSize: 16,
      fontWeight: 500,
    },
  },
  shadow: {
    shadowColor: "#3f3f3f",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  input: {
    width: "100%",
    height: 56,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 8,
    borderColor: "#dedede",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    textAlign: "center",
    color: "#ff3333",
    fontSize: 16,
    fontWeight: "bold",
  },
});
