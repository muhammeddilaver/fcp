import * as React from "react";
import { GluestackUIProvider, } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import PlayerListRoutes from "./routes/PlayerListRoutes";

export default function App() {
    return (
        <GluestackUIProvider config={config}>
            <NavigationContainer>
                <StatusBar animated translucent={false} />
                <PlayerListRoutes />
            </NavigationContainer>
        </GluestackUIProvider>
    );
}
