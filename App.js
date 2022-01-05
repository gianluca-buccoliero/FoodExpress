/** @format */
import * as Font from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Home, Restaurant, OrderDelivery } from "./screens";
import Tabs from "./navigation/tabs";
import AppLoading from "expo-app-loading";

import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  const [isFontReady, setFontReady] = useState(false);

  useEffect(() => {
    async function loadFont() {
      return await Font.loadAsync({
        "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
      });
    }
    // after the loading set the font status to true
    loadFont().then(() => {
      setFontReady(true);
    });
  }, []);

  if (!isFontReady) return <View></View>;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Tabs"}
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
      </Stack.Navigator>
    </NavigationContainer>
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
