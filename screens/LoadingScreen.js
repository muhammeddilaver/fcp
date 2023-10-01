import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function LoadingScreen({ error, isLoading }) {
    return (
        <View style={[styles.container]}>
            <View style={styles.spinner}>
                <ActivityIndicator size="large" color={"red"} animating />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "black",
        opacity: 0.4,
    },
    spinner: {
        flex: 1,
        justifyContent: "center",
        opacity: 1,
    },

    darkBg: {
        alignItems: "center",
        justifyContent: "center",
        width: 89,
        height: 89,
        backgroundColor: "#2B2F42",
    },
    gray: {
        backgroundColor: "#CCC",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 8,
    },
});
