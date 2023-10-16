import { StyleSheet, View } from "react-native";
import React from "react";
import List from "../components/PlayerList/List";

export default function TopPlayers() {
    return (
        <View style={{position:"absolute", top:0,right:0,left:0,bottom:0}}>
            <List listType={"/top"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
    },
});
