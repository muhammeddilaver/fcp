import React from "react";
import List from "../../components/PlayerList/List";
import { Box } from "@gluestack-ui/themed";

export default function SimilarToPlayerScreen({ route }) {
    const player = route.params.player;

    return (
        <Box>
            <List
                listType={`player/${player.playerId}/similar/similar`}
                data={{}}
            />
        </Box>
    );
}
