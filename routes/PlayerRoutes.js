import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayerScreen from "../screens/PlayerScreens/PlayerScreen";
import SimilarToPlayerScreen from "../screens/PlayerScreens/SimilarToPlayerScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoadingScreen from "../screens/LoadingScreen";
import { fetchPlayer } from "../api/fifaCMFetch/fetchPlayer";
import CompareToPlayer from "../screens/PlayerScreens/CompareToPlayer/CompareToPlayer";

const Tab = createBottomTabNavigator();

export default function PlayerRoutes({ route }) {
    const playerId = route.params.playerId;
    const [isLoading, setIsLoading] = useState(true);
    const [player, setPlayer] = useState({});

    useEffect(() => {
        const handleFetchPlayer = async () => {
            const result = await fetchPlayer(playerId, {});
            setPlayer(result);
            setIsLoading(false);
            return result;
        };
        handleFetchPlayer();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === player.player_firstname) {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "SIMILAR") {
                        iconName = focused ? "people" : "people-outline";
                    } else if (route.name === "COMPARE") {
                        iconName = focused
                            ? "git-compare"
                            : "git-compare-outline";
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
                lazy: true,
            })}
        >
            <Tab.Screen
                name={player.player_firstname}
                component={PlayerScreen}
                initialParams={{ player }}
                options={({ route }) => ({
                    headerTitle: route.params?.customTitle || "Player Page",
                    headerShown: false,
                })}
            />
            <Tab.Screen
                name="SIMILAR"
                initialParams={{ player }}
                component={SimilarToPlayerScreen}
            />
            <Tab.Screen
                name="COMPARE"
                initialParams={{ player }}
                component={CompareToPlayer}
            />
        </Tab.Navigator>
    );
}
