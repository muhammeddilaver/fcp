import { TouchableOpacity } from "react-native";
import React from "react";
import {
    ageColor,
    positionColor,
    potColor,
    progressColor,
} from "../../helpers/bgColor";
import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    AntDesign,
    Foundation,
    SimpleLineIcons,
} from "@expo/vector-icons";
import numeral from "numeral";
import ProgressFeature from "../../components/ProgressFeature";
import {
    Box,
    Divider,
    HStack,
    Image,
    ScrollView,
    Text,
    VStack,
} from "@gluestack-ui/themed";

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
                            <Text size={"2xl"} bold>
                                {player.name}
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
                                style={[potColor(player.ovr)]}
                            >
                                {player.ovr}
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
                                style={[potColor(player.pot)]}
                            >
                                {player.pot}
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
                            {player.prefered_positions.map((item, i) => (
                                <Text
                                    key={i}
                                    size={"2xs"}
                                    bold
                                    color="$white"
                                    width={30}
                                    textAlign="center"
                                    style={positionColor(item.name)}
                                >
                                    {item.name}
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
                            <Text
                                size={"xs"}
                                style={[{ color: player.bmi.bgColor }]}
                            >
                                {player.bmi.body_type}
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
                                        {player.bmi.kg} kg{"\n"}
                                        {player.bmi.lbs.toFixed()} lbs
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
                                        {player.bmi.cm} cm{"\n"}
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
                        <Text size={"sm"} color="$secondary300">
                            VALUE
                        </Text>
                        <Text size={"xl"} color="$secondary400">
                            €{" "}
                            {numeral(player.value).format("0.0a").toUpperCase()}
                        </Text>
                    </VStack>
                    <VStack flex={1} alignItems="center">
                        <Text size={"sm"} color="$secondary300">
                            WAGE
                        </Text>
                        <Text size={"xl"} color="$secondary400">
                            €{" "}
                            {numeral(player.wage).format("0.0a").toUpperCase()}
                        </Text>
                    </VStack>
                </HStack>
                <HStack
                    paddingVertical={"$3"}
                    borderBottomWidth={1}
                    borderBlockColor="$secondary200"
                >
                    <VStack flex={1} alignItems="center">
                        <Text bold color="$secondary400">
                            {player.teams[0].name.toUpperCase()}
                        </Text>
                        <HStack marginTop={5}>
                            <Image
                                alt="Team Logo"
                                size={"sm"}
                                source={{ uri: player.teams[0].imageUrl }}
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
                                        style={positionColor(
                                            player.teams[0].position.name
                                        )}
                                    >
                                        {player.teams[0].position.name.toUpperCase()}
                                    </Text>
                                </HStack>
                                <HStack alignItems="center">
                                    <Ionicons
                                        name="shirt-outline"
                                        size={16}
                                        color="gray"
                                    />
                                    <Text marginStart={3}>
                                        {player.teams[0].kit_number}
                                    </Text>
                                </HStack>
                                <HStack alignItems="center">
                                    <MaterialCommunityIcons
                                        name="book-edit-outline"
                                        size={16}
                                        color="gray"
                                    />
                                    <Text marginStart={3}>
                                        {player.teams[0].contract_length}
                                    </Text>
                                </HStack>
                            </VStack>
                        </HStack>
                    </VStack>
                    {player.teams[1] && (
                        <VStack flex={1} alignItems="center">
                            <Text bold color="$secondary400">
                                {player.teams[1].name.toUpperCase()}
                            </Text>
                            <HStack marginTop={5}>
                                <Image
                                    alt="Team Logo"
                                    size={"sm"}
                                    source={{ uri: player.teams[1].imageUrl }}
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
                                            style={positionColor(
                                                player.teams[1].position.name
                                            )}
                                        >
                                            {player.teams[1].position.name.toUpperCase()}
                                        </Text>
                                    </HStack>
                                    <HStack alignItems="center">
                                        <Ionicons
                                            name="shirt-outline"
                                            size={16}
                                            color="gray"
                                        />
                                        <Text marginStart={3}>
                                            {player.teams[1].kit_number}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </VStack>
                    )}
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
                        <VStack marginHorizontal={"$2"}>
                            <HStack justifyContent="space-between">
                                <Text bold size={"md"} color="$secondary400">
                                    ATTACK
                                </Text>
                                <Text
                                    bold
                                    style={[
                                        {
                                            color: progressColor(
                                                player.attackPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.attackPoint.toFixed()}
                                </Text>
                            </HStack>
                            <VStack w={140}>
                                <ProgressFeature
                                    title="Attack Work Rate"
                                    text={player.ofensive_work_rate.replace(
                                        "Medium",
                                        "Med"
                                    )}
                                />
                                <ProgressFeature
                                    title="Crossing"
                                    point={player.passing.crossing}
                                />
                                <ProgressFeature
                                    title="Finishing"
                                    point={player.shooting.finishing}
                                />
                                <ProgressFeature
                                    title="Short Pass"
                                    point={player.passing.short_pass}
                                />
                                <ProgressFeature
                                    title="Volleys"
                                    point={player.shooting.volleys}
                                />
                                <ProgressFeature
                                    title="Heading Acc."
                                    point={player.shooting.heading}
                                />
                            </VStack>
                        </VStack>
                        <VStack marginHorizontal={"$2"}>
                            <HStack justifyContent="space-between">
                                <Text bold size={"md"} color="$secondary400">
                                    SKILL
                                </Text>
                                <Text
                                    bold
                                    style={[
                                        {
                                            color: progressColor(
                                                player.skillPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.skillPoint.toFixed()}
                                </Text>
                            </HStack>
                            <VStack w={140}>
                                <ProgressFeature
                                    title="Skill Moves"
                                    star={player.skill_moves}
                                />
                                <ProgressFeature
                                    title="Weak Foot"
                                    star={player.weak_foot}
                                />
                                <ProgressFeature
                                    title="Curve"
                                    point={player.shooting.curve}
                                />
                                <ProgressFeature
                                    title="FK Acc"
                                    point={player.shooting.fk_acc}
                                />
                                <ProgressFeature
                                    title="Long Pass"
                                    point={player.passing.long_pass}
                                />
                                <ProgressFeature
                                    title="Ball Control"
                                    point={player.ball_skills.ball_control}
                                />
                            </VStack>
                        </VStack>
                        <VStack marginHorizontal={"$2"}>
                            <HStack justifyContent="space-between">
                                <Text bold size={"md"} color="$secondary400">
                                    POWER
                                </Text>
                                <Text
                                    bold
                                    style={[
                                        {
                                            color: progressColor(
                                                player.powerPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.powerPoint.toFixed()}
                                </Text>
                            </HStack>
                            <VStack w={140}>
                                <ProgressFeature
                                    title="Shot Power"
                                    point={player.shooting.shot_power}
                                />
                                <ProgressFeature
                                    title="Jumping"
                                    point={player.physical.jumping}
                                />
                                <ProgressFeature
                                    title="Stamina"
                                    point={player.physical.stamina}
                                />
                                <ProgressFeature
                                    title="Strength"
                                    point={player.physical.strength}
                                />
                                <ProgressFeature
                                    title="Long Shots"
                                    point={player.shooting.long_shots}
                                />
                            </VStack>
                        </VStack>
                        <VStack marginHorizontal={"$2"}>
                            <HStack justifyContent="space-between">
                                <Text bold size={"md"} color="$secondary400">
                                    MOVEMENT
                                </Text>
                                <Text
                                    bold
                                    style={[
                                        {
                                            color: progressColor(
                                                player.movementPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.movementPoint.toFixed()}
                                </Text>
                            </HStack>
                            <VStack w={140}>
                                <ProgressFeature
                                    title="Acceleration"
                                    point={player.physical.acceleration}
                                />
                                <ProgressFeature
                                    title="Sprint Speed"
                                    point={player.physical.sprint_speed}
                                />
                                <ProgressFeature
                                    title="Agility"
                                    point={player.physical.agility}
                                />
                                <ProgressFeature
                                    title="Reactions"
                                    point={player.mental.reactions}
                                />
                                <ProgressFeature
                                    title="Balance"
                                    point={player.physical.balance}
                                />
                            </VStack>
                        </VStack>
                        <VStack marginHorizontal={"$2"}>
                            <HStack justifyContent="space-between">
                                <Text bold size={"md"} color="$secondary400">
                                    MENTAL
                                </Text>
                                <Text
                                    bold
                                    style={[
                                        {
                                            color: progressColor(
                                                player.mentalPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.mentalPoint.toFixed()}
                                </Text>
                            </HStack>
                            <VStack w={140}>
                                <ProgressFeature
                                    title="Aggression"
                                    point={player.mental.aggression}
                                />
                                <ProgressFeature
                                    title="Interceptions"
                                    point={player.mental.interceptions}
                                />
                                <ProgressFeature
                                    title="Att Position"
                                    point={player.mental.att_position}
                                />
                                <ProgressFeature
                                    title="Vision"
                                    point={player.mental.vision}
                                />
                                <ProgressFeature
                                    title="Penalties"
                                    point={player.shooting.penalties}
                                />
                                <ProgressFeature
                                    title="Composure"
                                    point={player.mental.composure}
                                />
                            </VStack>
                        </VStack>
                        <VStack marginHorizontal={"$2"}>
                            <HStack justifyContent="space-between">
                                <Text bold size={"md"} color="$secondary400">
                                    DEFENCE
                                </Text>
                                <Text
                                    bold
                                    style={[
                                        {
                                            color: progressColor(
                                                player.defencePoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.defencePoint.toFixed()}
                                </Text>
                            </HStack>
                            <VStack w={140}>
                                <ProgressFeature
                                    title="Defensive Work Rate"
                                    text={player.defensive_work_rate.replace(
                                        "Medium",
                                        "Med"
                                    )}
                                />
                                <ProgressFeature
                                    title="Stand Tackle"
                                    point={player.defence.stand_tackle}
                                />
                                <ProgressFeature
                                    title="Slide Tackle"
                                    point={player.defence.slide_tackle}
                                />
                            </VStack>
                        </VStack>
                    </ScrollView>
                </HStack>
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
