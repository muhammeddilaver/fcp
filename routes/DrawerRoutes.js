import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TopPlayers from "../screens/TopPlayers";
import TestScreen from "../screens/TestScreen";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                drawerActiveTintColor:"#123",
                drawerInactiveTintColor:"#000",
                headerTitle:"F Career Potential"
            }}
            drawerContent={CustomDrawer}
        >
            <Drawer.Screen name="Home" component={TopPlayers} />
            <Drawer.Screen name="player" component={TestScreen} />
        </Drawer.Navigator>
    );
}

