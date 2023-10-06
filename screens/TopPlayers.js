import { StyleSheet, View } from "react-native";
import React from "react";
import List from "../components/PlayerList/List";

export default function TopPlayers() {
    return (
        <View>
            <List type={"/top"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
    },
});
