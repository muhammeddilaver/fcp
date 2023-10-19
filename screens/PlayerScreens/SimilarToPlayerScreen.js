import React from "react";
import List from "../../components/PlayerList/List";
import { Box } from "@gluestack-ui/themed";

export default function SimilarToPlayerScreen({ route }) {
    const player = route.params.player;

    return (
        <Box
        >
            <List
                listType={""}
                data={{
                    gender: 0,
                    height_0: player.bmi.cm - 15,
                    height_1: player.bmi.cm + 15,
                    weight_0: player.bmi.kg - 15,
                    weight_1: player.bmi.kg + 15,
                    position: player.prefered_positions.map(
                        (position) => position.id
                    ),
                    preferredfoot: player.prefered_foot.toLowerCase(),
                    value_0: player.value - (player.value * 50) / 100,
                    value_1: player.value + (player.value * 50) / 100,
                    wage_0: player.wage - (player.wage * 50) / 100,
                    wage_1: player.wage + (player.wage * 50) / 100,
                    overallrating_0: player.ovr - 5,
                    overallrating_1: player.ovr + 5,
                    potential_0: player.pot - 5,
                    potential_1: player.pot + 5,
                    age_0: player.age - 3,
                    age_1: player.age + 3,
                    order: "desc",
                }}
            />
        </Box>
    );
}
