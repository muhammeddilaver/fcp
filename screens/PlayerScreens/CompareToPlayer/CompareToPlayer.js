import React, { useEffect, useState } from "react";
import { ageColor, positionColor, potColor } from "../../../helpers/bgColor";
import { AntDesign } from "@expo/vector-icons";
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetFlatList,
    ActionsheetItem,
    Box,
    Button,
    ButtonText,
    Center,
    CloseCircleIcon,
    FlatList,
    HStack,
    Icon,
    Image,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    Pressable,
    ScrollView,
    SearchIcon,
    Spinner,
    Text,
    VStack,
} from "@gluestack-ui/themed";
import { fetchPlayer } from "../../../api/fifaCMFetch/fetchPlayer";
import { fetchSearchList } from "../../../api/fifaCMFetch/fetchSearchList";
import { TouchableOpacity } from "react-native";
import Stats from "../../../components/Stats";
import { isKeyGreaterThanOthers } from "../../../helpers/compareValues";
import ProgressFeature from "../../../components/ProgressFeature";

export default function CompareToPlayer({ route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [players, setPlayers] = useState([route.params.player]);
    const [activeTab, setActiveTab] = useState("STATS");
    const [searchText, setSearchText] = useState("");
    const [searchPlayerList, setSearchPlayerList] = useState([]);
    const [isLoadingSearchList, setIsLoadingSearchList] = useState(false);
    const handleToggleActionSheet = () => setShowActionSheet(!showActionSheet);

    useEffect(() => {
        let debounceTimeout;
        const debounceDelay = 500;

        const fetchData = async () => {
            if (searchText.length > 2) {
                setIsLoadingSearchList(true);
                const result = await fetchSearchList(searchText);
                setSearchPlayerList(result);
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

    return (
        <Box flex={1}>
            <Box borderBottomWidth={0.3} borderBlockColor="$secondary100">
                <HStack justifyContent="center">
                    <TouchableOpacity onPress={() => setActiveTab("STATS")}>
                        <Center
                            padding={10}
                            backgroundColor={
                                activeTab === "STATS"
                                    ? "$secondary200"
                                    : "$secondary100"
                            }
                        >
                            <Text>Stats</Text>
                        </Center>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab("INF")}>
                        <Center
                            backgroundColor={
                                activeTab === "INF"
                                    ? "$secondary200"
                                    : "$secondary100"
                            }
                            padding={10}
                            borderWidth={0.2}
                            borderEndWidth={0}
                            borderBlockColor="$secondary100"
                        >
                            <Text>Informations</Text>
                        </Center>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab("RPP")}>
                        <Center
                            backgroundColor={
                                activeTab === "RPP"
                                    ? "$secondary200"
                                    : "$secondary100"
                            }
                            padding={10}
                            borderWidth={0.2}
                            borderEndWidth={0}
                            borderBlockColor="$secondary100"
                        >
                            <Text>RPP</Text>
                        </Center>
                    </TouchableOpacity>
                </HStack>
            </Box>
            <Box paddingBottom={95}>
                <VStack marginTop={5}>
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
                                    <VStack w={140} marginStart={10}>
                                        <Box alignItems="center">
                                            <Text
                                                size={"md"}
                                                height={45}
                                                textAlignVertical="center"
                                                textAlign="center"
                                                bold
                                            >
                                                {item.player_firstname}
                                            </Text>
                                            <VStack>
                                                <Image
                                                    alt="Player photo"
                                                    size={"md"}
                                                    source={{
                                                        uri: item.imageUrl,
                                                    }}
                                                />
                                                <Image
                                                    position="absolute"
                                                    top={0}
                                                    right={-10}
                                                    zIndex={1}
                                                    width={30}
                                                    height={30}
                                                    alt="Player photo"
                                                    source={{
                                                        uri: item.teams
                                                            .nation_img,
                                                    }}
                                                />
                                                <Image
                                                    position="absolute"
                                                    top={0}
                                                    left={-10}
                                                    zIndex={1}
                                                    width={30}
                                                    height={30}
                                                    alt="Player photo"
                                                    source={{
                                                        uri: item.teams
                                                            .team_img,
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
                                                <Box height={20}>
                                                    {index ? (
                                                        <Pressable
                                                            onPress={() =>
                                                                handleDeletePlayer(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <HStack
                                                                alignItems="center"
                                                                justifyContent="center"
                                                            >
                                                                <Icon
                                                                    fill={
                                                                        "$rose700"
                                                                    }
                                                                    as={
                                                                        CloseCircleIcon
                                                                    }
                                                                    size={"lg"}
                                                                    color="$white"
                                                                />
                                                                <Text
                                                                    color="$rose700"
                                                                    marginStart={
                                                                        5
                                                                    }
                                                                    size={"xs"}
                                                                    textAlignVertical="center"
                                                                >
                                                                    REMOVE
                                                                </Text>
                                                            </HStack>
                                                        </Pressable>
                                                    ) : (
                                                        ""
                                                    )}
                                                </Box>
                                            </VStack>
                                        </Box>
                                        {activeTab === "STATS" &&
                                            Object.keys(item.stats).map(
                                                (statName, i) => {
                                                    return (
                                                        <VStack key={i}>
                                                            <Stats
                                                                key={
                                                                    i +
                                                                    "compare"
                                                                }
                                                                name={statName}
                                                                stats={
                                                                    item.stats[
                                                                        statName
                                                                    ]
                                                                }
                                                                compare={true}
                                                                players={
                                                                    players
                                                                }
                                                                player={item}
                                                                upStat={
                                                                    statName
                                                                }
                                                            />
                                                        </VStack>
                                                    );
                                                }
                                            )}
                                        {activeTab === "RPP" && (
                                            <VStack alignItems="center">
                                                {Object.keys(item.rpp).map(
                                                    (rppName, i) => {
                                                        return (
                                                            <HStack
                                                                key={i}
                                                                opacity={
                                                                    isKeyGreaterThanOthers(
                                                                        item,
                                                                        players,
                                                                        "rpp." +
                                                                            rppName
                                                                    )
                                                                        ? 1
                                                                        : 0.6
                                                                }
                                                                backgroundColor={potColor(
                                                                    item.rpp[
                                                                        rppName
                                                                    ].toFixed(0)
                                                                )}
                                                                w={75}
                                                                justifyContent="space-between"
                                                                marginBottom={4}
                                                                p={5}
                                                            >
                                                                <Text
                                                                    bold
                                                                    size={"md"}
                                                                    color="$white"
                                                                >
                                                                    {
                                                                        rppName.split(
                                                                            "_"
                                                                        )[3]
                                                                    }
                                                                </Text>
                                                                <Text
                                                                    color="$white"
                                                                    bold
                                                                >
                                                                    {item.rpp[
                                                                        rppName
                                                                    ].toFixed(
                                                                        0
                                                                    )}
                                                                </Text>
                                                            </HStack>
                                                        );
                                                    }
                                                )}
                                            </VStack>
                                        )}
                                        {activeTab === "INF" && (
                                            <VStack>
                                                <Box alignItems="center">
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        POSITIONS
                                                    </Text>
                                                    <HStack>
                                                        {item.positions.map(
                                                            (
                                                                position,
                                                                index
                                                            ) => (
                                                                <Text
                                                                    key={index}
                                                                    size="xs"
                                                                    bold
                                                                    textAlign="center"
                                                                    color="$white"
                                                                    marginEnd={
                                                                        3
                                                                    }
                                                                    paddingHorizontal={
                                                                        4
                                                                    }
                                                                    backgroundColor={positionColor(
                                                                        position
                                                                    )}
                                                                >
                                                                    {position}
                                                                </Text>
                                                            )
                                                        )}
                                                    </HStack>
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        TEAM
                                                    </Text>
                                                    <Text color="$secondary400">
                                                        {item.teams.team}
                                                    </Text>
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        VALUE
                                                    </Text>
                                                    <Text color="$secondary400">
                                                        {item.value}
                                                    </Text>
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        WAGE
                                                    </Text>
                                                    <Text color="$secondary400">
                                                        {item.wage}
                                                    </Text>
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        BODY TYPE
                                                    </Text>
                                                    <Text color="$secondary400">
                                                        {item.body_type}
                                                    </Text>
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        HEIGHT
                                                    </Text>
                                                    <Text color="$secondary400">
                                                        {item.bmi.cm} |{" "}
                                                        {item.bmi.feetInch}
                                                    </Text>
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        WEIGHT
                                                    </Text>
                                                    <Text color="$secondary400">
                                                        {item.bmi.kg} |{" "}
                                                        {item.bmi.lbs}
                                                    </Text>
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        SKILL MOVES
                                                    </Text>
                                                    <ProgressFeature
                                                        star={item.skill_moves}
                                                    />
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        WEAK FOOT
                                                    </Text>
                                                    <ProgressFeature
                                                        star={item.weak_foot}
                                                    />
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        Int. Reputation
                                                    </Text>
                                                    <ProgressFeature
                                                        star={item.int_rep}
                                                    />
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        Attacking Work Rate
                                                    </Text>
                                                    <ProgressFeature
                                                        text={
                                                            item.attacking_work_rate
                                                        }
                                                    />
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        Defensive Work Rate
                                                    </Text>
                                                    <ProgressFeature
                                                        text={
                                                            item.defensive_work_rate
                                                        }
                                                    />
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        CONTRACT
                                                    </Text>
                                                    <Text color="$secondary400">
                                                        {item.contract_lenght}
                                                    </Text>
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        TRAITS
                                                    </Text>
                                                    <VStack>
                                                        {item.traits.map(
                                                            (trait, index) => (
                                                                <Text
                                                                    key={index}
                                                                    textAlign="center"
                                                                    color="$secondary400"
                                                                    marginEnd={
                                                                        3
                                                                    }
                                                                    paddingHorizontal={
                                                                        4
                                                                    }
                                                                >
                                                                    {trait}
                                                                </Text>
                                                            )
                                                        )}
                                                    </VStack>
                                                </Box>
                                                <Box
                                                    alignItems="center"
                                                    marginTop={10}
                                                >
                                                    <Text
                                                        size={"sm"}
                                                        color="$secondary300"
                                                    >
                                                        SPECIALITIES
                                                    </Text>
                                                    <VStack>
                                                        {item.specialities.map(
                                                            (spec, index) => (
                                                                <Text
                                                                    key={index}
                                                                    textAlign="center"
                                                                    color="$secondary400"
                                                                    marginEnd={
                                                                        3
                                                                    }
                                                                    paddingHorizontal={
                                                                        4
                                                                    }
                                                                >
                                                                    {spec}
                                                                </Text>
                                                            )
                                                        )}
                                                    </VStack>
                                                </Box>
                                            </VStack>
                                        )}
                                    </VStack>
                                );
                            }}
                            keyExtractor={(item, index) => {
                                return item.playerId.toString() + "compare";
                            }}
                        />
                    </ScrollView>
                </VStack>
            </Box>
            <Box position="absolute" bottom={5} right={10} left={10} flex={1}>
                <Box>
                    <Actionsheet
                        isOpen={showActionSheet}
                        onClose={handleToggleActionSheet}
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
                                            onPress={() => {
                                                handleToggleActionSheet();
                                                handleAddPlayer(item.id);
                                            }}
                                        >
                                            <VStack>
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    alt="Player Photo"
                                                    source={{ uri: item.pimg }}
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
                                                        uri: item.nimg,
                                                    }}
                                                />
                                            </VStack>
                                            <Box
                                                flex={1}
                                                justifyContent="center"
                                                paddingStart={"$3"}
                                            >
                                                <Text>{item.fn}</Text>
                                                <HStack>
                                                    <Text
                                                        size="xs"
                                                        bold
                                                        textAlign="center"
                                                        color="$white"
                                                        paddingHorizontal={4}
                                                        backgroundColor={positionColor(
                                                            item.ps
                                                        )}
                                                    >
                                                        {item.ps}
                                                    </Text>
                                                </HStack>
                                            </Box>
                                            <Box
                                                alignItems="center"
                                                marginHorizontal={10}
                                            >
                                                <Text
                                                    size={"2xl"}
                                                    bold
                                                    color="$white"
                                                    p={"$1"}
                                                    bgColor={potColor(item.r)}
                                                >
                                                    {item.r}
                                                </Text>
                                            </Box>
                                        </ActionsheetItem>
                                    );
                                }}
                                keyExtractor={(item, index) => {
                                    return item.id.toString() + "comparesearch";
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
                                    isLoadingSearchList && (
                                        <Spinner size="large" />
                                    )
                                }
                            />
                        </ActionsheetContent>
                    </Actionsheet>
                    <Button
                        action={"positive"}
                        onPress={handleToggleActionSheet}
                    >
                        <AntDesign name="adduser" size={24} color="white" />
                        <ButtonText marginStart={5}>Add Player</ButtonText>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
