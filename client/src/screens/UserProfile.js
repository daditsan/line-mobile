import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ProfilePictureL } from "../components/ProfilePicture";
import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

const USER_PROFILE = gql`
  query Query($id: ID) {
    userProfile(_id: $id) {
      _id
      name
      username
      email
      follower {
        _id
        follower {
          _id
          name
          username
          email
        }
      }
      following {
        _id
        following {
          _id
          name
          username
          email
        }
      }
    }
  }
`;

export default function UserProfile({ route }) {
  // const { id } = route.params;
  const test = useContext(AuthContext)
  // console.log(test);
  
  
  // console.log(user);
  const { loading, error, data } = useQuery(USER_PROFILE, {
    // variables: { id: data?.userProfile?._id },
    // variables: data?.userProfile?._id
    // console.log(data?.userProfile._id, "<<<<<<<<<<<<");
    variables: { id: '669e629e4a0859331e266e70' },
  });
  
  // console.log(data?.userProfile._id, "<<<<<<<<<<<<");
  // console.log(data, "ini dataaaa");

  if (loading) {
    return (
      <>
        <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  const following = data?.userProfile?.following.map((element) => {
    return element;
  });
  const follower = data?.userProfile?.follower.map((element) => {
    return element;
  });

  return (
    <>
      <ScrollView style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        )}
        {data?.userProfile && (
          <View style={styles.header}>
            <TouchableOpacity>
              <ProfilePictureL />
            </TouchableOpacity>
            <Text style={styles.userName}>{data.userProfile.name}</Text>
            <Text style={styles.userBio}>{data.userProfile.username}</Text>
            <View style={styles.followStats}>
              <View>
                <Text style={styles.statLabel}>FOLLOWERS</Text>
                <Text style={styles.statLabel2}>{follower.length}</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>FOLLOWING</Text>
                <Text style={styles.statLabel2}>{following.length}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userBio: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  followStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
    marginBottom: 24,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#c9c9c9",
    textAlign: "center",
  },
  statLabel2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8c8c8c",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photoImage: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  postList: {
    marginTop: 16,
  },
  postImage: {
    width: "32%",
    aspectRatio: 1,
    margin: 2,
    borderRadius: 8,
  },
  button: {
    primary: {
      width: "100%",
      height: 56,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: "#1877F2",
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
