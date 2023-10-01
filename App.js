import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PlayerScreen from "./screens/PlayerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    animation: "none",
                }}
            >
                <Stack.Screen
                    name="FIFA Index TOP 100"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="PlayerScreen"
                    component={PlayerScreen}
                    options={({ route }) => ({
                        headerTitle: route.params?.customTitle || "Player Page",
                        headerShown: false,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
