import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation Mutation($user: NewUser) {
    register(user: $user) {
      _id
      name
      email
      username
    }
  }
`;

export default function Register({ navigation }) {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [username, onChangeUsername] = useState("")
  const [password, onChangePassword] = useState("");

  const [register, { loading, error }] = useMutation(REGISTER);

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
      <View style={styles.view}>
        <Text style={styles.text.head}>LINE</Text>
        <Text style={styles.text.subHead}>Stay in the know</Text>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        )}
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={[styles.button.primary, styles.shadow]}
          onPress={async () => {
            const result = await register({
              variables: {
                user: {
                  name,
                  email,
                  username,
                  password,
                },
              },
            });
            navigation.navigate("Login");
          }}
          
        >
          <Text style={styles.button.text}>Create New Account</Text>
        </TouchableOpacity>
        <View style={styles.viewOption}>
          <Text style={styles.text.other}>Already have an account?</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Login");
          }}>
            <Text style={styles.text.other.login}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  viewOption: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40,
  },
  image: {
    marginTop: 24,
    marginBottom: 24,
    width: 280,
    height: 280,
  },
  text: {
    head: {
      fontSize: 28,
      color: "#0DC556",
      marginBottom: 8,
      fontWeight: 800,
    },
    subHead: {
      fontSize: 18,
      color: "#9a9c9a",
      fontWeight: "bold",
      marginBottom: 40,
    },
    other: {
      fontSize: 16,
      color: "#9a9c9a",
      marginRight: 4,
      fontWeight: "bold",
      login: {
        color: "#1877F2",
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline",
      },
    },
  },
  button: {
    primary: {
      width: "100%",
      height: 56,
      marginTop: 16,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: "#0DC556",
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
