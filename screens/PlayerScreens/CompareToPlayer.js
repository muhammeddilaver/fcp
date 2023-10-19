import React, { useState } from "react";
import { ageColor } from "../../helpers/bgColor";
import { AntDesign } from "@expo/vector-icons";
import {
    Box,
    FlatList,
    HStack,
    Image,
    ScrollView,
    Text,
    VStack,
} from "@gluestack-ui/themed";

export default function CompareToPlayer({ route }) {
    const [players, setPlayers] = useState([
        route.params.player,
        route.params.player,
        route.params.player,
        route.params.player,
    ]);

    return (
        <HStack>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <FlatList
                    data={players}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <VStack w={120} marginEnd={10}>
                                <Text size={"md"} textAlign="center" bold>
                                    {item.name}
                                </Text>
                                <VStack alignItems="center">
                                    <Image
                                        alt="Player photo"
                                        size={"md"}
                                        source={{ uri: item.imageUrl }}
                                    />
                                    <Image
                                        position="absolute"
                                        top={0}
                                        right={0}
                                        zIndex={1}
                                        width={30}
                                        height={30}
                                        alt="Player photo"
                                        source={{
                                            uri: item.nationality.imageUrl,
                                        }}
                                    />
                                    <Text
                                        alignSelf="stretch"
                                        textAlign="center"
                                        color="$white"
                                        bold
                                        textAlignVertical="center"
                                        style={[ageColor(item.age)]}
                                    >
                                        Age: {item.age}
                                    </Text>
                                </VStack>
                            </VStack>
                        );
                    }}
                    keyExtractor={(item, index) => {
                        return item.playerId.toString();
                    }}
                />
            </ScrollView>
            <Box p={"$2"} paddingTop={65}>
                <AntDesign name="adduser" size={48} color="black" />
            </Box>
        </HStack>
    );
}
