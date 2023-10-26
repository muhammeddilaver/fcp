import { TouchableOpacity } from "react-native";
import React from "react";
import { ageColor, positionColor, potColor } from "../../helpers/bgColor";
import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    AntDesign,
    Foundation,
    SimpleLineIcons,
} from "@expo/vector-icons";
import ProgressFeature from "../../components/ProgressFeature";
import {
    Box,
    Divider,
    HStack,
    Heading,
    Image,
    ScrollView,
    Text,
    VStack,
} from "@gluestack-ui/themed";
import Stats from "../../components/Stats";
import RPP from "../../components/RPP";

export default function PlayerScreen({ route }) {
    const player = route.params.player;
    /* console.log(player); */

    return (
        <Box>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                vertical={true}
            >
                <Box borderBottomWidth={1} borderBlockColor="$secondary200">
                    <HStack>
                        <Box position="absolute" right={10} top={0}>
                            <HStack alignItems="center">
                                <Text marginEnd={5} color="$secondary400">
                                    {player.teams.nation}
                                </Text>
                                <Image
                                    size={"xs"}
                                    alt="nation photo"
                                    source={{ uri: player.teams.nation_img }}
                                />
                            </HStack>
                        </Box>
                        <Image
                            size={"xl"}
                            alt="Player Image"
                            source={{ uri: player.imageUrl }}
                        />
                        <VStack
                            justifyContent="center"
                            alignItems="center"
                            flex={1}
                        >
                            <Text
                                size={"2xl"}
                                bold
                                color="$secondary500"
                                textAlign="center"
                                textAlignVertical="center"
                            >
                                {player.player_firstname +
                                    " " +
                                    player.player_lastname}
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    bgColor={"$teal600"}
                                    color="$white"
                                    width={200}
                                    textAlign="center"
                                    textAlignVertical="center"
                                    p={"$1"}
                                    borderRadius={100}
                                >
                                    <AntDesign
                                        name="staro"
                                        size={16}
                                        color="white"
                                    />{" "}
                                    Add to Favorites
                                </Text>
                            </TouchableOpacity>
                        </VStack>
                    </HStack>
                </Box>
                <HStack
                    paddingVertical={"$3"}
                    borderBottomWidth={1}
                    borderBlockColor="$secondary200"
                >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        <Box alignItems="center" marginHorizontal={10}>
                            <Text size={"xs"} color={"$secondary300"}>
                                OVR
                            </Text>
                            <Text
                                size={"2xl"}
                                bold
                                color="$white"
                                p={"$1"}
                                bgColor={potColor(player.player_rating)}
                            >
                                {player.player_rating}
                            </Text>
                        </Box>
                        <Box alignItems="center" marginHorizontal={10}>
                            <Text size={"xs"} color={"$secondary300"}>
                                POT
                            </Text>
                            <Text
                                size={"2xl"}
                                bold
                                color="$white"
                                p={"$1"}
                                bgColor={potColor(player.potential)}
                            >
                                {player.potential}
                            </Text>
                        </Box>
                        <Box alignItems="center" marginHorizontal={10}>
                            <Text size={"xs"} color={"$secondary300"}>
                                AGE
                            </Text>
                            <Text
                                size={"2xl"}
                                bold
                                color="$white"
                                p={"$1"}
                                style={[ageColor(player.age)]}
                            >
                                {player.age}
                            </Text>
                        </Box>
                        <Box alignItems="center" marginHorizontal={10}>
                            <Text size={"xs"} color={"$secondary300"}>
                                POSITIONS
                            </Text>
                            {player.positions.map((item, i) => (
                                <Text
                                    key={i}
                                    size={"2xs"}
                                    bold
                                    color="$white"
                                    width={30}
                                    textAlign="center"
                                    backgroundColor={positionColor(item)}
                                >
                                    {item}
                                </Text>
                            ))}
                        </Box>
                        <Box alignItems="center" marginHorizontal={10}>
                            <Text size={"xs"} color={"$secondary300"}>
                                FOOT
                            </Text>
                            <Foundation
                                transform={
                                    player.prefered_foot === "Right"
                                        ? [{ scaleX: -1 }]
                                        : []
                                }
                                name="foot"
                                size={40}
                                textAlign="center"
                                color="darkgray"
                            />
                        </Box>
                        <Box alignItems="center" marginHorizontal={10}>
                            <Text size={"xs"} color={"$secondary300"}>
                                {player.body_type}
                            </Text>
                            <VStack>
                                <HStack alignItems="center">
                                    <FontAwesome5
                                        name="weight"
                                        size={18}
                                        color="gray"
                                    />
                                    <Text
                                        fontSize={11}
                                        lineHeight={12}
                                        marginLeft={3}
                                    >
                                        {player.bmi.kg}
                                        {"\n"}
                                        {player.bmi.lbs}
                                    </Text>
                                </HStack>
                                <Divider my="$0.5" />
                                <HStack alignItems="center">
                                    <MaterialCommunityIcons
                                        name="human-male-height-variant"
                                        size={18}
                                        color="gray"
                                    />
                                    <Text
                                        fontSize={11}
                                        lineHeight={12}
                                        marginLeft={3}
                                    >
                                        {player.bmi.cm}
                                        {"\n"}
                                        {player.bmi.feetInch}
                                    </Text>
                                </HStack>
                            </VStack>
                        </Box>
                    </ScrollView>
                </HStack>
                <HStack
                    paddingVertical={"$3"}
                    borderBottomWidth={1}
                    borderBlockColor="$secondary200"
                >
                    <VStack flex={1} alignItems="center">
                        <Text bold color="$secondary400">
                            {player.teams.team.toUpperCase()}
                        </Text>
                        <HStack marginTop={5}>
                            <Image
                                alt="Team Logo"
                                size={"sm"}
                                source={{ uri: player.teams.team_img }}
                            />
                            <VStack marginStart={5}>
                                <HStack alignItems="center">
                                    <SimpleLineIcons
                                        name="location-pin"
                                        size={16}
                                        color="gray"
                                    />

                                    <Text
                                        marginStart={3}
                                        color="$white"
                                        size={"xs"}
                                        bold
                                        w={30}
                                        textAlign="center"
                                        backgroundColor={positionColor(player.positions[0])}
                                    >
                                        {player.positions[0]}
                                    </Text>
                                </HStack>
                                <HStack alignItems="center">
                                    <Ionicons
                                        name="shirt-outline"
                                        size={16}
                                        color="gray"
                                    />
                                    <Text marginStart={3}>{player.tshirt}</Text>
                                </HStack>
                                <HStack alignItems="center">
                                    <MaterialCommunityIcons
                                        name="book-edit-outline"
                                        size={16}
                                        color="gray"
                                    />
                                    <Text marginStart={3}>
                                        {player.contract_lenght}
                                    </Text>
                                </HStack>
                            </VStack>
                        </HStack>
                    </VStack>
                    <VStack flex={1} alignItems="center">
                        <VStack flex={1} alignItems="center">
                            <Text size={"sm"} color="$secondary300">
                                VALUE
                            </Text>
                            <Text
                                size={"xl"}
                                color="$secondary400"
                                borderColor="$secondary200"
                                borderBottomWidth={1}
                            >
                                {player.value}
                            </Text>
                        </VStack>
                        <VStack flex={1} alignItems="center">
                            <Text size={"sm"} color="$secondary300">
                                WAGE
                            </Text>
                            <Text size={"xl"} color="$secondary400">
                                {player.wage}
                            </Text>
                        </VStack>
                    </VStack>
                </HStack>
                <HStack
                    paddingVertical={"$3"}
                    borderBottomWidth={1}
                    borderBlockColor="$secondary200"
                >
                    <VStack flex={1} paddingHorizontal={15}>
                        <ProgressFeature
                            title="Skill Moves"
                            star={player.skill_moves}
                        />
                        <ProgressFeature
                            title="Weak Foot"
                            star={player.weak_foot}
                        />
                        <ProgressFeature
                            title="Int. Reputation"
                            star={player.int_rep}
                        />
                    </VStack>
                    <VStack flex={1} paddingHorizontal={15}>
                        <ProgressFeature
                            title="Attacking Work Rate"
                            text={player.attacking_work_rate.replace(
                                "Medium",
                                "Med"
                            )}
                        />
                        <ProgressFeature
                            title="Defensive Work Rate"
                            text={player.defensive_work_rate.replace(
                                "Medium",
                                "Med"
                            )}
                        />
                    </VStack>
                </HStack>
                <HStack
                    paddingVertical={"$3"}
                    borderBottomWidth={1}
                    borderBlockColor="$secondary200"
                >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        {Object.keys(player.stats).map((statName, index) => {
                            if (player.positions[0] !== "GK" && index === 0) {
                                return null;
                            }
                            return (
                                <VStack key={index} width={140}>
                                    <Stats
                                        name={statName}
                                        stats={player.stats[statName]}
                                    />
                                </VStack>
                            );
                        })}
                    </ScrollView>
                </HStack>
                <Box
                    padding={"$3"}
                    borderBottomWidth={1}
                    borderBlockColor="$secondary200"
                >
                    <Heading alignSelf="center" bold color="$secondary400">
                        RATING PER POSITION
                    </Heading>
                    <RPP
                        rpp={player.rpp}
                        gk={
                            Object.values(player.stats.goalkeeper).reduce(
                                (sum, value) => sum + value,
                                0
                            ) / Object.values(player.stats.goalkeeper).length
                        }
                    />
                </Box>
                <HStack
                    paddingVertical={"$3"}
                    borderBottomWidth={1}
                    borderBlockColor="$secondary200"
                >
                    <VStack flex={1} alignItems="center">
                        <Text bold size={"md"} color="$secondary400">
                            TRAITS
                        </Text>
                        {player.traits.map((trait, key) => (
                            <Text size={"md"} color="$secondary400" key={key}>
                                {trait}
                            </Text>
                        ))}
                    </VStack>
                    <VStack flex={1} alignItems="center">
                        <Text bold size={"md"} color="$secondary400">
                            SPECIALITIES
                        </Text>
                        {player.specialities.map((speciality, key) => (
                            <Text size={"md"} color="$secondary400" key={key}>
                                {speciality}
                            </Text>
                        ))}
                    </VStack>
                </HStack>
            </ScrollView>
        </Box>
    );
}
