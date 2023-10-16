import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
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

export default function PlayerScreen({ route }) {
    const player = route.params.player;

    /* console.log(player); */

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                vertical={true}
            >
                <View
                    style={[
                        styles.rowContainer,
                        { borderBottomWidth: 1, borderBlockColor: "#dedede" },
                    ]}
                >
                    <View style={styles.playerImageContainer}>
                        <Image
                            style={styles.playerImage}
                            source={{ uri: player.imageUrl }}
                        />
                    </View>
                    <View style={styles.headerRightContainer}>
                        <Text style={styles.playerName}>{player.name}</Text>
                        <TouchableOpacity>
                            <Text style={styles.favoriteButton}>
                                <AntDesign
                                    name="staro"
                                    size={16}
                                    color="white"
                                />{" "}
                                Add to Favorites
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>OVR</Text>
                            <Text
                                style={[
                                    styles.featureContent,
                                    potColor(player.ovr),
                                ]}
                            >
                                {player.ovr}
                            </Text>
                        </View>
                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>POT</Text>
                            <Text
                                style={[
                                    styles.featureContent,
                                    potColor(player.pot),
                                ]}
                            >
                                {player.pot}
                            </Text>
                        </View>
                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>AGE</Text>
                            <Text
                                style={[
                                    styles.featureContent,
                                    ageColor(player.age),
                                ]}
                            >
                                {player.age}
                            </Text>
                        </View>
                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>POSITIONS</Text>
                            {player.prefered_positions.map((item, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.position,
                                        positionColor(item.name),
                                    ]}
                                >
                                    <Text style={styles.positionName}>
                                        {item.name}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>FOOT</Text>
                            <Foundation
                                style={
                                    player.prefered_foot === "Right"
                                        ? styles.rightFoot
                                        : { textAlign: "center" }
                                }
                                name="foot"
                                size={40}
                                color="darkgray"
                            />
                        </View>
                        <View style={styles.featureContainer}>
                            <Text
                                style={[
                                    styles.featureTitle,
                                    { color: player.bmi.bgColor },
                                ]}
                            >
                                {player.bmi.body_type}
                            </Text>
                            <View style={[styles.bmiContainer]}>
                                <View style={styles.bmiRow}>
                                    <FontAwesome5
                                        name="weight"
                                        size={18}
                                        color="gray"
                                    />
                                    <Text style={styles.whText}>
                                        {player.bmi.kg} kg{"\n"}
                                        {player.bmi.lbs.toFixed()} lbs
                                    </Text>
                                </View>
                                <View style={styles.bmiRow}>
                                    <MaterialCommunityIcons
                                        name="human-male-height-variant"
                                        size={18}
                                        color="gray"
                                    />
                                    <Text style={styles.whText}>
                                        {player.bmi.cm} cm{"\n"}
                                        {player.bmi.feetInch}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View
                    style={[
                        styles.rowContainer,
                        {
                            borderBottomWidth: 1,
                            borderBlockColor: "#dedede",
                            paddingBottom: 10,
                        },
                    ]}
                >
                    <View style={styles.priceContainers}>
                        <Text style={styles.featureTitle}>VALUE</Text>
                        <Text style={styles.pricesText}>
                            €{" "}
                            {numeral(player.value).format("0.0a").toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.priceContainers}>
                        <Text style={styles.featureTitle}>WAGE</Text>
                        <Text style={styles.pricesText}>
                            €{" "}
                            {numeral(player.wage).format("0.0a").toUpperCase()}
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.rowContainer,
                        {
                            borderBottomWidth: 1,
                            borderBlockColor: "#dedede",
                            paddingBottom: 15,
                        },
                    ]}
                >
                    <View style={styles.teamContainer}>
                        <View style={styles.teamNameContainer}>
                            <Text style={styles.teamName}>
                                {player.teams[0].name.toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.teamBodyContainer}>
                            <Image
                                style={styles.teamLogo}
                                source={{ uri: player.teams[0].imageUrl }}
                            />
                            <View style={styles.teamInfo}>
                                <View style={styles.teamRow}>
                                    <SimpleLineIcons
                                        name="location-pin"
                                        size={16}
                                        color="gray"
                                    />
                                    <View
                                        style={[
                                            styles.teamPosition,
                                            positionColor(
                                                player.teams[0].position.name
                                            ),
                                        ]}
                                    >
                                        <Text style={styles.teamPositionName}>
                                            {player.teams[0].position.name.toUpperCase()}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.teamRow}>
                                    <Ionicons
                                        name="shirt-outline"
                                        size={16}
                                        color="gray"
                                    />
                                    <Text style={styles.kitNumber}>
                                        {player.teams[0].kit_number}
                                    </Text>
                                </View>
                                <View style={styles.teamRow}>
                                    <MaterialCommunityIcons
                                        name="book-edit-outline"
                                        size={16}
                                        color="gray"
                                    />
                                    <Text style={styles.kitNumber}>
                                        {player.teams[0].contract_length}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {player.teams[1] && (
                        <View style={styles.teamContainer}>
                            <View style={styles.teamNameContainer}>
                                <Text style={styles.teamName}>
                                    {player.teams[1].name.toUpperCase()}
                                </Text>
                            </View>
                            <View style={styles.teamBodyContainer}>
                                <Image
                                    style={styles.teamLogo}
                                    source={{ uri: player.teams[1].imageUrl }}
                                />
                                <View style={styles.teamInfo}>
                                    <View style={styles.teamRow}>
                                        <SimpleLineIcons
                                            name="location-pin"
                                            size={16}
                                            color="gray"
                                        />
                                        <View
                                            style={[
                                                styles.teamPosition,
                                                positionColor(
                                                    player.teams[1].position
                                                        .name
                                                ),
                                            ]}
                                        >
                                            <Text
                                                style={styles.teamPositionName}
                                            >
                                                {player.teams[1].position.name.toUpperCase()}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.teamRow}>
                                        <Ionicons
                                            name="shirt-outline"
                                            size={16}
                                            color="gray"
                                        />
                                        <Text style={styles.kitNumber}>
                                            {player.teams[1].kit_number}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
                <View
                    style={[
                        styles.progressFeaturesContainers,
                        {
                            borderBottomWidth: 1,
                            borderBlockColor: "#dedede",
                            paddingBottom: 15,
                        },
                    ]}
                >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        <View style={styles.progressFeaturesContainer}>
                            <View
                                style={
                                    styles.progressFeaturesContainerTitleContainer
                                }
                            >
                                <Text
                                    style={
                                        styles.progressFeaturesContainerTitle
                                    }
                                >
                                    ATTACK
                                </Text>
                                <Text
                                    style={[
                                        styles.progressFeaturesContainerPoint,
                                        {
                                            color: progressColor(
                                                player.attackPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.attackPoint.toFixed()}
                                </Text>
                            </View>
                            <View style={styles.progressFeaturesItems}>
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
                            </View>
                        </View>
                        <View style={styles.progressFeaturesContainer}>
                            <View
                                style={
                                    styles.progressFeaturesContainerTitleContainer
                                }
                            >
                                <Text
                                    style={
                                        styles.progressFeaturesContainerTitle
                                    }
                                >
                                    SKILL
                                </Text>
                                <Text
                                    style={[
                                        styles.progressFeaturesContainerPoint,
                                        {
                                            color: progressColor(
                                                player.skillPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.skillPoint.toFixed()}
                                </Text>
                            </View>
                            <View style={styles.progressFeaturesItems}>
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
                            </View>
                        </View>
                        <View style={styles.progressFeaturesContainer}>
                            <View
                                style={
                                    styles.progressFeaturesContainerTitleContainer
                                }
                            >
                                <Text
                                    style={
                                        styles.progressFeaturesContainerTitle
                                    }
                                >
                                    POWER
                                </Text>
                                <Text
                                    style={[
                                        styles.progressFeaturesContainerPoint,
                                        {
                                            color: progressColor(
                                                player.powerPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.powerPoint.toFixed()}
                                </Text>
                            </View>
                            <View style={styles.progressFeaturesItems}>
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
                            </View>
                        </View>
                        <View style={styles.progressFeaturesContainer}>
                            <View
                                style={
                                    styles.progressFeaturesContainerTitleContainer
                                }
                            >
                                <Text
                                    style={
                                        styles.progressFeaturesContainerTitle
                                    }
                                >
                                    MOVEMENT
                                </Text>
                                <Text
                                    style={[
                                        styles.progressFeaturesContainerPoint,
                                        {
                                            color: progressColor(
                                                player.movementPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.movementPoint.toFixed()}
                                </Text>
                            </View>
                            <View style={styles.progressFeaturesItems}>
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
                            </View>
                        </View>
                        <View style={styles.progressFeaturesContainer}>
                            <View
                                style={
                                    styles.progressFeaturesContainerTitleContainer
                                }
                            >
                                <Text
                                    style={
                                        styles.progressFeaturesContainerTitle
                                    }
                                >
                                    MENTAL
                                </Text>
                                <Text
                                    style={[
                                        styles.progressFeaturesContainerPoint,
                                        ,
                                        {
                                            color: progressColor(
                                                player.mentalPoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.mentalPoint.toFixed()}
                                </Text>
                            </View>

                            <View style={styles.progressFeaturesItems}>
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
                            </View>
                        </View>
                        <View style={styles.progressFeaturesContainer}>
                            <View
                                style={
                                    styles.progressFeaturesContainerTitleContainer
                                }
                            >
                                <Text
                                    style={
                                        styles.progressFeaturesContainerTitle
                                    }
                                >
                                    DEFENCE
                                </Text>
                                <Text
                                    style={[
                                        styles.progressFeaturesContainerPoint,
                                        ,
                                        {
                                            color: progressColor(
                                                player.defencePoint.toFixed()
                                            ),
                                        },
                                    ]}
                                >
                                    {player.defencePoint.toFixed()}
                                </Text>
                            </View>
                            <View style={styles.progressFeaturesItems}>
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
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.traitsSpecialities}>
                        <Text style={styles.traitsSpecialitiesTitle}>
                            TRAITS
                        </Text>
                        {player.traits.map((trait, key) => (
                            <Text
                                style={styles.traitsSpecialitiesText}
                                key={key}
                            >
                                {trait}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.traitsSpecialities}>
                        <Text style={styles.traitsSpecialitiesTitle}>
                            SPECIALITIES
                        </Text>
                        {player.specialities.map((speciality, key) => (
                            <Text
                                style={styles.traitsSpecialitiesText}
                                key={key}
                            >
                                {speciality}
                            </Text>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    traitsSpecialitiesText: {
        alignSelf: "center",
    },
    traitsSpecialitiesTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: "gray",
        alignSelf: "center",
    },
    traitsSpecialities: {
        flex: 1,
    },
    progressFeaturesItems: {
        width: 140,
        marginTop: 3,
    },
    progressFeaturesContainerPoint: {
        fontWeight: "bold",
    },
    progressFeaturesContainerTitle: {
        fontWeight: "bold",
    },
    progressFeaturesContainerTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    progressFeaturesContainer: {
        marginEnd: 20,
    },
    progressFeaturesContainers: {
        flexDirection: "row",
        marginTop: 10,
    },
    pricesText: {
        fontSize: 20,
        color: "gray",
    },
    priceContainers: {
        flex: 1,
        alignItems: "center",
    },
    kitNumber: {
        marginStart: 3,
        fontSize: 16,
    },
    teamPositionName: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
    },
    teamPosition: {
        width: 30,
    },
    teamRow: {
        flexDirection: "row",
        marginTop: 1,
        alignItems: "center",
    },
    teamInfo: {
        marginLeft: 10,
        flexDirection: "column",
    },
    teamLogo: {
        width: 60,
        height: 60,
        alignSelf: "center",
    },
    teamBodyContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        marginTop: 10,
    },
    teamName: {
        fontWeight: "bold",
        fontSize: 16,
        color: "gray",
    },
    teamNameContainer: {
        alignItems: "center",
    },
    teamContainer: {
        flex: 1,
        flexDirection: "column",
    },
    bmiText: {
        justifyContent: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    whText: {
        paddingStart: 4,
        fontSize: 10,
        fontWeight: "bold",
        color: "gray",
    },
    bmiRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    bmiContainer: {},
    rightFoot: {
        textAlign: "center",
        transform: [{ scaleX: -1 }],
    },
    positionName: {
        color: "white",
        fontSize: 9,
        width: 26,
        textAlign: "center",
        fontWeight: "bold",
    },
    position: {
        width: 26,
        justifyContent: "center",
        alignItems: "center",
    },
    featureContent: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        verticalAlign: "middle",
        width: 35,
        height: 35,
    },
    featureTitle: {
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "400",
        color: "gray",
    },
    featureContainer: {
        flexDirection: "column",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        margin: 10,
    },
    favoriteButton: {
        borderWidth: 1,
        borderRadius: 6,
        fontSize: 14,
        alignSelf: "center",
        color: "white",
        textAlign: "center",
        backgroundColor: "#42aead",
        paddingVertical: 2,
        paddingHorizontal: 30,
        verticalAlign: "middle",
        justifyContent: "center",
        alignItems: "center",
    },
    playerName: {
        fontSize: 24,
        fontWeight: "bold",
        //color:"black"
    },
    headerRightContainer: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    playerImage: {
        width: 120,
        height: 120,
    },
    playerImageContainer: {},
    rowContainer: {
        flexDirection: "row",
        paddingTop: 10,
    },
    container: {
        paddingHorizontal: 10,
    },
});
