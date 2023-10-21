import React, { memo, useEffect, useState } from "react";
import { ageColor, progressColor } from "../../helpers/bgColor";
import { AntDesign } from "@expo/vector-icons";
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetFlatList,
    ActionsheetItem,
    ActionsheetItemText,
    Box,
    Button,
    ButtonText,
    CloseCircleIcon,
    FlatList,
    HStack,
    Icon,
    Image,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    ScrollView,
    SearchIcon,
    Spinner,
    Text,
    VStack,
} from "@gluestack-ui/themed";
import ProgressFeature from "../../components/ProgressFeature";
import { fetchPlayer } from "../../api/fetch/fetchPlayer";
import { fetchPlayerList } from "../../api/fetch/fetchPlayerList";

export default function CompareToPlayer({ route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [players, setPlayers] = useState([route.params.player]);
    const [searchText, setSearchText] = useState("");
    const [searchPlayerList, setSearchPlayerList] = useState({});
    const [isLoadingSearchList, setIsLoadingSearchList] = useState(false);
    const handleCloseActionSheet = () => setShowActionSheet(!showActionSheet);

    useEffect(() => {
        let debounceTimeout;
        const debounceDelay = 500;

        const fetchData = async () => {
            if (searchText.length > 2) {
                setIsLoadingSearchList(true);
                const result = await fetchPlayerList(
                    {
                        name: searchText,
                        gender: 0,
                        order: "desc",
                    },
                    ""
                );
                setSearchPlayerList(result.players);
                setIsLoadingSearchList(false);
            }
        };

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(() => {
            fetchData();
        }, debounceDelay);

        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [searchText]);

    const handleAddPlayer = async (playerId) => {
        setIsLoading(true);
        setPlayers([...players, await fetchPlayer(playerId, {})]);
        setIsLoading(false);
    };

    const handleDeletePlayer = async (indexToRemove) => {
        setPlayers(players.filter((_, index) => index !== indexToRemove));
    };

    function isKeyGreaterThanOthers(item, key) {
        if (!firstItemHasKey(key, item)) {
            return false;
        }

        const firstItemValue = getValueForKey(key, item);

        for (let i = 0; i < players.length; i++) {
            const currentItem = players[i];
            if (
                firstItemHasKey(key, currentItem) &&
                getValueForKey(key, currentItem) > firstItemValue
            ) {
                return false;
            }
        }

        return true;
    }

    function firstItemHasKey(key, item) {
        const keys = key.split(".");
        let currentObject = item;
        for (const subKey of keys) {
            if (!currentObject || !currentObject.hasOwnProperty(subKey)) {
                return false;
            }
            currentObject = currentObject[subKey];
        }
        return true;
    }

    function getValueForKey(key, item) {
        const keys = key.split(".");
        let currentObject = item;
        for (const subKey of keys) {
            if (!currentObject || !currentObject.hasOwnProperty(subKey)) {
                return undefined;
            }
            currentObject = currentObject[subKey];
        }
        return currentObject;
    }

    return (
        <Box paddingBottom={50}>
            <HStack marginTop={20}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <FlatList
                        data={players}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={() =>
                            isLoading && <Spinner size="large" />
                        }
                        renderItem={({ item, index }) => {
                            return (
                                <VStack w={130} marginStart={10}>
                                    <Box alignItems="center">
                                        <Text
                                            size={"md"}
                                            height={45}
                                            textAlignVertical="center"
                                            textAlign="center"
                                            bold
                                        >
                                            {item.name}
                                        </Text>
                                        <VStack>
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
                                                    uri: item.nationality
                                                        .imageUrl,
                                                }}
                                            />
                                            {index ? (
                                                <Icon
                                                    onPress={() =>
                                                        handleDeletePlayer(
                                                            index
                                                        )
                                                    }
                                                    as={CloseCircleIcon}
                                                    size={"lg"}
                                                    color="$rose700"
                                                    position="absolute"
                                                />
                                            ) : (
                                                ""
                                            )}
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
                                    </Box>
                                    <VStack marginTop={15} width={120}>
                                        <HStack
                                            justifyContent="space-between"
                                            opacity={
                                                isKeyGreaterThanOthers(
                                                    item,
                                                    "attackPoint"
                                                )
                                                    ? 1
                                                    : 0.3
                                            }
                                        >
                                            <Text
                                                bold
                                                size={"md"}
                                                color="$secondary400"
                                            >
                                                ATTACK
                                            </Text>
                                            <Text
                                                bold
                                                style={[
                                                    {
                                                        color: progressColor(
                                                            item.attackPoint.toFixed()
                                                        ),
                                                    },
                                                ]}
                                            >
                                                {item.attackPoint.toFixed()}
                                            </Text>
                                        </HStack>
                                        <VStack>
                                            <ProgressFeature
                                                title="Att. Work Rate"
                                                text={item.ofensive_work_rate.replace(
                                                    "Medium",
                                                    "Med"
                                                )}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "passing.crossing"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Crossing"
                                                point={item.passing.crossing}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "shooting.finishing"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Finishing"
                                                point={item.shooting.finishing}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "passing.short_pass"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Short Pass"
                                                point={item.passing.short_pass}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "shooting.volleys"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Volleys"
                                                point={item.shooting.volleys}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "shooting.heading"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Heading Acc."
                                                point={item.shooting.heading}
                                            />
                                        </VStack>
                                    </VStack>
                                    <VStack marginTop={15} width={120}>
                                        <HStack
                                            justifyContent="space-between"
                                            opacity={
                                                isKeyGreaterThanOthers(
                                                    item,
                                                    "skillPoint"
                                                )
                                                    ? 1
                                                    : 0.3
                                            }
                                        >
                                            <Text
                                                bold
                                                size={"md"}
                                                color="$secondary400"
                                            >
                                                SKILL
                                            </Text>
                                            <Text
                                                bold
                                                style={[
                                                    {
                                                        color: progressColor(
                                                            item.skillPoint.toFixed()
                                                        ),
                                                    },
                                                ]}
                                            >
                                                {item.skillPoint.toFixed()}
                                            </Text>
                                        </HStack>
                                        <VStack>
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "skill_moves"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Skill Moves"
                                                star={item.skill_moves}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "weak_foot"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Weak Foot"
                                                star={item.weak_foot}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "shooting.curve"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Curve"
                                                point={item.shooting.curve}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "shooting.fk_acc"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="FK Acc"
                                                point={item.shooting.fk_acc}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "passing.long_pass"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Long Pass"
                                                point={item.passing.long_pass}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "ball_skills.ball_control"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Ball Control"
                                                point={
                                                    item.ball_skills
                                                        .ball_control
                                                }
                                            />
                                        </VStack>
                                    </VStack>
                                    <VStack marginTop={15} width={120}>
                                        <HStack
                                            justifyContent="space-between"
                                            opacity={
                                                isKeyGreaterThanOthers(
                                                    item,
                                                    "powerPoint"
                                                )
                                                    ? 1
                                                    : 0.3
                                            }
                                        >
                                            <Text
                                                bold
                                                size={"md"}
                                                color="$secondary400"
                                            >
                                                POWER
                                            </Text>
                                            <Text
                                                bold
                                                style={[
                                                    {
                                                        color: progressColor(
                                                            item.powerPoint.toFixed()
                                                        ),
                                                    },
                                                ]}
                                            >
                                                {item.powerPoint.toFixed()}
                                            </Text>
                                        </HStack>
                                        <VStack>
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "shooting.shot_power"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Shot Power"
                                                point={item.shooting.shot_power}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "physical.jumping"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Jumping"
                                                point={item.physical.jumping}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "physical.stamina"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Stamina"
                                                point={item.physical.stamina}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "physical.strength"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Strength"
                                                point={item.physical.strength}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "shooting.long_shots"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Long Shots"
                                                point={item.shooting.long_shots}
                                            />
                                        </VStack>
                                    </VStack>
                                    <VStack marginTop={15} width={120}>
                                        <HStack
                                            justifyContent="space-between"
                                            opacity={
                                                isKeyGreaterThanOthers(
                                                    item,
                                                    "movementPoint"
                                                )
                                                    ? 1
                                                    : 0.3
                                            }
                                        >
                                            <Text
                                                bold
                                                size={"md"}
                                                color="$secondary400"
                                            >
                                                MOVEMENT
                                            </Text>
                                            <Text
                                                bold
                                                style={[
                                                    {
                                                        color: progressColor(
                                                            item.movementPoint.toFixed()
                                                        ),
                                                    },
                                                ]}
                                            >
                                                {item.movementPoint.toFixed()}
                                            </Text>
                                        </HStack>
                                        <VStack>
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "physical.acceleration"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Acceleration"
                                                point={
                                                    item.physical.acceleration
                                                }
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "physical.sprint_speed"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Sprint Speed"
                                                point={
                                                    item.physical.sprint_speed
                                                }
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "physical.agility"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Agility"
                                                point={item.physical.agility}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "mental.reactions"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Reactions"
                                                point={item.mental.reactions}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "physical.balance"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Balance"
                                                point={item.physical.balance}
                                            />
                                        </VStack>
                                    </VStack>
                                    <VStack marginTop={15} width={120}>
                                        <HStack
                                            justifyContent="space-between"
                                            opacity={
                                                isKeyGreaterThanOthers(
                                                    item,
                                                    "mentalPoint"
                                                )
                                                    ? 1
                                                    : 0.3
                                            }
                                        >
                                            <Text
                                                bold
                                                size={"md"}
                                                color="$secondary400"
                                            >
                                                MENTAL
                                            </Text>
                                            <Text
                                                bold
                                                style={[
                                                    {
                                                        color: progressColor(
                                                            item.mentalPoint.toFixed()
                                                        ),
                                                    },
                                                ]}
                                            >
                                                {item.mentalPoint.toFixed()}
                                            </Text>
                                        </HStack>
                                        <VStack>
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "mental.aggression"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Aggression"
                                                point={item.mental.aggression}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "mental.interceptions"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Interceptions"
                                                point={
                                                    item.mental.interceptions
                                                }
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "mental.att_position"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Att Position"
                                                point={item.mental.att_position}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "mental.vision"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Vision"
                                                point={item.mental.vision}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "shooting.penalties"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Penalties"
                                                point={item.shooting.penalties}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "mental.composure"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Composure"
                                                point={item.mental.composure}
                                            />
                                        </VStack>
                                    </VStack>
                                    <VStack marginTop={15} width={120}>
                                        <HStack
                                            justifyContent="space-between"
                                            opacity={
                                                isKeyGreaterThanOthers(
                                                    item,
                                                    "defencePoint"
                                                )
                                                    ? 1
                                                    : 0.3
                                            }
                                        >
                                            <Text
                                                bold
                                                size={"md"}
                                                color="$secondary400"
                                            >
                                                DEFENCE
                                            </Text>
                                            <Text
                                                bold
                                                style={[
                                                    {
                                                        color: progressColor(
                                                            item.defencePoint.toFixed()
                                                        ),
                                                    },
                                                ]}
                                            >
                                                {item.defencePoint.toFixed()}
                                            </Text>
                                        </HStack>
                                        <VStack>
                                            <ProgressFeature
                                                title="Def. Work Rate"
                                                text={item.defensive_work_rate.replace(
                                                    "Medium",
                                                    "Med"
                                                )}
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "defence.stand_tackle"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Stand Tackle"
                                                point={
                                                    item.defence.stand_tackle
                                                }
                                            />
                                            <ProgressFeature
                                                opacity={
                                                    isKeyGreaterThanOthers(
                                                        item,
                                                        "defence.slide_tackle"
                                                    )
                                                        ? "yes"
                                                        : "no"
                                                }
                                                title="Slide Tackle"
                                                point={
                                                    item.defence.slide_tackle
                                                }
                                            />
                                        </VStack>
                                    </VStack>
                                </VStack>
                            );
                        }}
                        keyExtractor={(item, index) => {
                            return item.playerId.toString();
                        }}
                    />
                </ScrollView>
            </HStack>
            <Box position="absolute" bottom={5} right={10} left={10} flex={1}>
                <Actionsheet
                    isOpen={showActionSheet}
                    onClose={handleCloseActionSheet}
                    zIndex={999}
                >
                    <ActionsheetBackdrop />
                    <ActionsheetContent h={"$5/6"} zIndex={999}>
                        <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>
                        <ActionsheetItem>
                            <VStack flex={1}>
                                <Input>
                                    <InputSlot pl="$3">
                                        <InputIcon as={SearchIcon} />
                                    </InputSlot>
                                    <InputField
                                        onChangeText={(text) =>
                                            setSearchText(text)
                                        }
                                        placeholder="Search..."
                                    />
                                </Input>
                            </VStack>
                        </ActionsheetItem>
                        <ActionsheetFlatList
                            data={searchPlayerList}
                            renderItem={({ item }) => {
                                return (
                                    <ActionsheetItem
                                        onPress={async () => {
                                            handleAddPlayer(item.playerId);
                                            handleCloseActionSheet();
                                        }}
                                    >
                                        <VStack>
                                            <Image
                                                width={50}
                                                height={50}
                                                alt="Player Photo"
                                                source={{ uri: item.imageUrl }}
                                            />
                                            <Image
                                                position="absolute"
                                                top={0}
                                                right={0}
                                                zIndex={1}
                                                width={15}
                                                height={20}
                                                alt="nation photo"
                                                source={{
                                                    uri: item.nationality
                                                        .imageUrl,
                                                }}
                                            />
                                            <Text
                                                size="2xs"
                                                bold
                                                textAlign="center"
                                                color="$white"
                                                style={[ageColor(item.age)]}
                                            >
                                                Age: {item.age}
                                            </Text>
                                        </VStack>
                                        <ActionsheetItemText>
                                            {item.name}
                                        </ActionsheetItemText>
                                    </ActionsheetItem>
                                );
                            }}
                            keyExtractor={(item, index) => {
                                return item.playerId.toString();
                            }}
                            ListEmptyComponent={() =>
                                !isLoadingSearchList &&
                                !(searchText.length < 3) && (
                                    <Box>
                                        <Text>No data available</Text>
                                    </Box>
                                )
                            }
                            ListHeaderComponent={() =>
                                isLoadingSearchList && <Spinner size="large" />
                            }
                        />
                    </ActionsheetContent>
                </Actionsheet>
                <Button action={"positive"} onPress={handleCloseActionSheet}>
                    <AntDesign name="adduser" size={24} color="white" />
                    <ButtonText marginStart={5}>Add Player</ButtonText>
                </Button>
            </Box>
        </Box>
    );
}
