import { StyleSheet, View } from "react-native";
import React from "react";
import List from "../components/PlayerList/List";
import { Box } from "@gluestack-ui/themed";

export default function TopPlayers() {
    return (
        <Box>
            <List listType={"/top"} />
        </Box>
    );
}
