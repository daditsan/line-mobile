import React, { useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./src/contexts/Auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Image, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Detail from "./src/screens/Detail";
import UserProfile from "./src/screens/UserProfile";
import Search from "./src/screens/Search";
import CreatePost from "./src/screens/CreatePost";
import Register from "./src/screens/Register";

const Stack = createNativeStackNavigator();


export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: () => (
                  <Image
                    source={require("./assets/facebook-logo.png")}
                    style={{ width: 103, height: 20, marginRight: 10 }}
                  />
                ),
                headerRight: () => (
                  <View style={{ gap: 20, flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={async () => {
                        await SecureStore.deleteItemAsync("acess_token");
                        authContext.setIsSignedIn(false);
                      }}
                    >
                      <Feather name="log-out" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                headerTitle: () => (
                  <Image
                    source={require("./assets/facebook-logo.png")}
                    style={{ width: 103, height: 20, marginRight: 10 }}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={async () => {
                      await SecureStore.deleteItemAsync("access_token");
                      authContext.setIsSignedIn(false);
                    }}
                  >
                    <Feather name="log-out" size={24} color="red" />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                headerTitle: () => (
                  <Image
                    source={require("./assets/facebook-logo.png")}
                    style={{ width: 103, height: 20, marginRight: 10 }}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={async () => {
                      await SecureStore.deleteItemAsync("access_token");
                      authContext.setIsSignedIn(false);
                    }}
                  >
                    <Feather name="log-out" size={24} color="red" />
                  </TouchableOpacity>
                ),
              }}
            />
            {/* <Stack.Screen
              name="User Profile"
              component={UserProfile}
              options={{
                headerTitle: () => (
                  <Image
                    source={require("./assets/facebook-logo.png")}
                    style={{ width: 103, height: 20, marginRight: 10 }}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={async () => {
                      await SecureStore.deleteItemAsync("access_token");
                      authContext.setIsSignedIn(false);
                    }}
                  >
                    <Feather name="log-out" size={24} color="red" />
                  </TouchableOpacity>
                ),
              }}
            /> */}
            <Stack.Screen
              name="Create Post"
              component={CreatePost}
              options={{
                headerTitle: () => (
                  <Image
                    source={require("./assets/facebook-logo.png")}
                    style={{ width: 103, height: 20, marginRight: 10 }}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={async () => {
                      await SecureStore.deleteItemAsync("access_token");
                      authContext.setIsSignedIn(false);
                    }}
                  ></TouchableOpacity>
                ),
              }}
            />
          </>
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={Login}
            />
            <Stack.Screen
              name="Register"
              options={{ headerShown: false }}
              component={Register}
            />
          </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
