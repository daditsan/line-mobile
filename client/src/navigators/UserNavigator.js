import { Text, TouchableOpacity, Image, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import Login from "../screens/Login";
import Register from "../screens/Register";
import CreatePost from "../screens/CreatePost";
import Search from "../screens/Search";
import Detail from "../screens/Detail";
import UserProfile from "../screens/UserProfile";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <View style={{ gap: 20, flexDirection: "row", marginRight: 20 }}>
              <TouchableOpacity
                onPress={async () => {
                  await SecureStore.deleteItemAsync("access_token");
                  setIsSignedIn(false);
                }}
              >
                <Feather name="log-out" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerRight: () => (
            <View style={{ gap: 20, flexDirection: "row", marginRight: 20 }}>
              <TouchableOpacity
                onPress={async () => {
                  await SecureStore.deleteItemAsync("access_token");
                  setIsSignedIn(false);
                }}
              >
                <Feather name="log-out" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          headerRight: () => (
            <View style={{ gap: 20, flexDirection: "row", marginRight: 20 }}>
              <TouchableOpacity
                onPress={async () => {
                  await SecureStore.deleteItemAsync("access_token");
                  setIsSignedIn(false);
                }}
              >
                <Feather name="log-out" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerRight: () => (
            <View style={{ gap: 20, flexDirection: "row", marginRight: 20 }}>
              <TouchableOpacity
                onPress={async () => {
                  await SecureStore.deleteItemAsync("access_token");
                  setIsSignedIn(false);
                }}
              >
                <Feather name="log-out" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function UserNavigator() {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Login">
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Detail" component={Detail} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
