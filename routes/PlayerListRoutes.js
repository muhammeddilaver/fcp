import React from "react";
import PlayerRoutes from "./PlayerRoutes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerRoutes from "./DrawerRoutes";

const Stack = createNativeStackNavigator();

export default function PlayerListRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "none",
                headerShown: false,
            }}
        >
            <Stack.Screen name="FIFA Index TOP 100" component={DrawerRoutes} />
            <Stack.Screen
                name="PlayerScreen"
                component={PlayerRoutes}
                options={({ route }) => ({
                    headerTitle: route.params?.customTitle || "Player Page",
                    headerShown: true,
                })}
            />
        </Stack.Navigator>
    );
}
