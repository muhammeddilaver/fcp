import { HStack, Text, VStack } from "@gluestack-ui/themed";
import React from "react";
import { progressColor } from "../helpers/bgColor";
import ProgressFeature from "./ProgressFeature";
import { isKeyGreaterThanOthers } from "../helpers/compareValues";

export default function Stats({
    name,
    stats,
    compare = false,
    players,
    player,
    upStat,
}) {
    const capitalizeFirstLetterOfEachWord = (str) => {
        return str.replace(/\b\w/g, function (match) {
            return match.toUpperCase();
        });
    };

    return (
        <VStack marginHorizontal={"$2"}>
            <HStack justifyContent="space-between">
                <Text bold size={"md"} color="$secondary400">
                    {name.toUpperCase()}
                </Text>
                <Text
                    bold
                    style={[
                        {
                            color: progressColor(
                                Object.values(stats).reduce(
                                    (sum, value) => sum + value,
                                    0
                                ) / Object.values(stats).length
                            ),
                        },
                    ]}
                >
                    {(
                        Object.values(stats).reduce(
                            (sum, value) => sum + value,
                            0
                        ) / Object.values(stats).length
                    ).toFixed()}
                </Text>
            </HStack>
            <VStack>
                {Object.keys(stats).map((statName, index) => (
                    <ProgressFeature
                        key={!compare ? index : index + "compare"}
                        opacity={
                            compare
                                ? isKeyGreaterThanOthers(
                                      player,
                                      players,
                                      "stats." + upStat + "." + statName
                                  )
                                    ? "yes"
                                    : "no"
                                : "yes"
                        }
                        title={capitalizeFirstLetterOfEachWord(
                            statName.replace("_", " ")
                        )
                            .replace("Gk", "GK")
                            .replace("Acc", "Acc.")
                            .replace("Def", "Def.")
                            .replace("Att", "Att.")}
                        point={stats[statName]}
                    />
                ))}
            </VStack>
        </VStack>
    );
}
