import { TouchableOpacity } from "react-native";
import React from "react";
import { ageColor, positionColor, potColor } from "../../helpers/bgColor";
import { Box, HStack, Image, Text, VStack } from "@gluestack-ui/themed";

export default function Player({ player }) {
    return (
        <Box paddingHorizontal={4}>
            <HStack alignItems="center">
                <VStack>
                    <Image
                        width={50}
                        height={50}
                        alt="Player Photo"
                        source={{ uri: player.imageUrl }}
                    />
                    <Image
                        position="absolute"
                        top={0}
                        right={0}
                        zIndex={1}
                        width={15}
                        height={20}
                        alt="nation photo"
                        source={{ uri: player.nationality.imageUrl }}
                    />
                    <Text
                        size="2xs"
                        bold
                        textAlign="center"
                        color="$white"
                        style={[ageColor(player.age)]}
                    >
                        Age: {player.age}
                    </Text>
                </VStack>
                <Box flex={3} justifyContent="center" paddingStart={"$3"}>
                    <Text bold size="lg">
                        {player.name}
                    </Text>
                    <HStack>
                        {player.prefered_positions.map((position, index) => {
                            return (
                                <Text
                                    key={index}
                                    size="xs"
                                    bold
                                    textAlign="center"
                                    color="$white"
                                    marginEnd={3}
                                    paddingHorizontal={4}
                                    style={[positionColor(position.name)]}
                                >
                                    {position.name}
                                </Text>
                            );
                        })}
                    </HStack>
                </Box>
                <Box justifyContent="center">
                    <HStack>
                        <Box justifyContent="center">
                            <Text
                                color="$white"
                                width={"$9"}
                                height={"$9"}
                                textAlignVertical="center"
                                textAlign="center"
                                bold
                                size="2xl"
                                style={[potColor(player.ovr)]}
                            >
                                {player.ovr}
                            </Text>
                            <Text
                                color="$white"
                                size="2xs"
                                bold
                                bg="#42aead"
                                textAlign="center"
                                textAlignVertical="center"
                            >
                                OVR
                            </Text>
                        </Box>
                        <Box marginHorizontal={"$2"}>
                            <Text
                                color="$white"
                                width={"$9"}
                                height={"$9"}
                                textAlignVertical="center"
                                textAlign="center"
                                bold
                                size="2xl"
                                style={[potColor(player.pot)]}
                            >
                                {player.pot}
                            </Text>
                            <Text
                                color="$white"
                                size="2xs"
                                bold
                                bg="#42aead"
                                textAlign="center"
                                textAlignVertical="center"
                            >
                                POT
                            </Text>
                        </Box>
                    </HStack>
                </Box>
                <TouchableOpacity>
                    <Image
                        alt="Club logo"
                        size="xs"
                        source={{ uri: player.team.imageUrl }}
                    />
                </TouchableOpacity>
            </HStack>
        </Box>
    );
}
