import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { gql } from "@apollo/client";

const CREATE_POST = gql`mutation CreatePost($content: String, $tags: [String], $imgUrl: String) {
  createPost(content: $content, tags: $tags, imgUrl: $imgUrl)
}`

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

export default function CreatePost({ navigation }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [tags, setTags] = useState(null);

  let tag;

  if (tags) {
    tag = tags.split(", ")
  }

  const [doCreatePost] = useMutation(CREATE_POST, {
    refetchQueries: [GET_ALL_POST],
    onCompleted: () => {
      navigation.navigate("Home")
    }
  })
  const submitCreatePost = async () => {
    try {
      const result = await doCreatePost({
        variables: {
          content: content,
          imgUrl: imgUrl,
          tags: tag
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Caption"
          value={content}
          onChangeText={setContent}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={imgUrl}
          onChangeText={setImgUrl}
        />
        <TextInput
          style={styles.input}
          placeholder="Tags"
          value={tags}
          onChangeText={(text) => setTags(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={submitCreatePost}
        >
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 56,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0DC556",
    padding: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
