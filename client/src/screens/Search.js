import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const SEARCH_USER = gql`
  query SearchUser($username: String, $name: String) {
    findUser(username: $username, name: $name) {
      _id
      name
      username
      email
    }
  }
`;

export default function Search({ navigation }) {
  const [search, onChangeSearch] = useState("");
//   const { loading, error, data } = useQuery(SEARCH_USER, {
//     variables: {
//       username: search,
//       name: search,
//     },
//   });

//   if (loading) {
//     return (
//       <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

  return (
    <>
      <View style={styles.view}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={onChangeSearch}
            value={search}
            placeholder="Search here.."
          />
        </View>

        {/* {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        )} */}
        {/* {data.findUser ? ( */}
          <FlatList
            // data={data.findUser}
            // renderItem={({ item }) => <UserCard item={item} />}
            // keyExtractor={(item) => item.id}
            // showsVerticalScrollIndicator={false}
          />
         {/* ) : ( */}
        {/* "" */}
        {/* )} */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    width: "100%",
    height: 56,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 16,
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
