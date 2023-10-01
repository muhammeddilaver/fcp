import { StyleSheet, View } from "react-native";
import React from "react";
import TopPlayers from "./TopPlayers";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <TopPlayers />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
