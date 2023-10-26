import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { progressColor } from "../helpers/bgColor";
import {
    Box,
    HStack,
    Progress,
    ProgressFilledTrack,
    Text,
} from "@gluestack-ui/themed";

const ProgressFeature = ({ title, point, star, text, opacity = "yes" }) => {
    star && (point = star * 10 * 2);

    text && text === "Low" && (point = 50);
    text && text === "Med" && (point = 70);
    text && text === "High" && (point = 100);
    
    return (
        <Box marginTop={4} opacity={opacity === "no" ? 0.3 : 1}>
            <HStack justifyContent="space-between" alignItems="center">
                <Text size={"xs"}>{title}</Text>
                {!star && !text && (
                    <Text size={"xs"} style={[{ color: progressColor(point) }]}>
                        {point}
                    </Text>
                )}
                {star && (
                    <HStack>
                        {Array.from({ length: star }).map((_, index) => (
                            <AntDesign
                                key={index}
                                name="star"
                                size={12}
                                color="orange"
                            />
                        ))}
                    </HStack>
                )}
                {text && (
                    <Text size={"xs"} style={[{ color: progressColor(point) }]}>
                        {text}
                    </Text>
                )}
            </HStack>
            <Progress value={point} h="$2">
                <ProgressFilledTrack h="$2" bg={progressColor(point)} />
            </Progress>
        </Box>
    );
};

export default ProgressFeature;
