import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PlayerRoutes from "./routes/PlayerRoutes";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar animated translucent={false} />
            <Stack.Navigator
                screenOptions={{
                    animation: "none",
                    headerShown: false, // Başlığı gizle
                    headerLeft: () => (
                        // Geri gitme işlemi için sol üst köşede bir buton
                        <AntDesign name="arrowleft" size={24} color="black" />
                    ),
                }}
            >
                <Stack.Screen
                    name="FIFA Index TOP 100"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="PlayerScreen"
                    component={PlayerRoutes}
                    options={({ route }) => ({
                        headerTitle: route.params?.customTitle || "Player Page",
                        headerShown: false,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
