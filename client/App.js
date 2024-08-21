// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./src/contexts/Auth";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserNavigator from "./src/navigators/UserNavigator";
import * as SecureStore from "expo-secure-store";

// const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function check() {
      const result = await SecureStore.getItemAsync("access_token");

      if (result) {
        setIsSignedIn(true);
      }
    }
    check();
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{
          isSignedIn: isSignedIn,
          setIsSignedIn: setIsSignedIn,
          // user: user,
          // setUser: setUser,
        }}
      >
        <NavigationContainer>
          <UserNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
