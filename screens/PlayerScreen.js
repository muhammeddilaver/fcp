import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as cheerio from "cheerio";
import fifa from "../api/fifa";
import LoadingScreen from "./LoadingScreen";
import {
    ageColor,
    positionColor,
    potColor,
    progressColor,
} from "../helpers/bgColor";
import { heightWeightRate } from "../helpers/calculate";
import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    AntDesign,
    Foundation,
    SimpleLineIcons,
} from "@expo/vector-icons";
import numeral from "numeral";
import ProgressFeature from "../components/ProgressFeature";

export default function PlayerScreen({ route }) {
    const playerId = route.params.playerId;
    const [player, setPlayer] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPlayer({});
    }, []);

    const getPlayer = async (data) => {
        await fifa
            .get(`/player/${playerId}/`, {
                params: data,
            })
            .then((response) => {
                if (response.status === 200) {
                    const htmlData = response.data;
                    const $ = cheerio.load(htmlData);

                    const name = $("h1").text().trim().split(" EA FC FIFA")[0];
                    const imageUrl = $("div.align-self-center img.player").attr(
                        "src"
                    );
                    const nationalityId = parseInt(
                        $("a.link-nation img.nation")
                            .attr("src")
                            .split(".")[2]
                            .split("/")[5]
                    );
                    const nationalityImageUrl = $(
                        "a.link-nation img.nation"
                    ).attr("src");
                    const nationality = $("a.link-nation").text().trim();

                    let ovr, pot;
                    $("h5.card-header span.rating").each((i, element) => {
                        if (i === 0) {
                            ovr = parseInt($(element).text().trim());
                        } else {
                            pot = parseInt($(element).text().trim());
                        }
                    });

                    const futgg = $(
                        "a.btn.btn-block.btn-sm.btn-primary.mb-3"
                    ).attr("href");
                    const height = parseInt(
                        $('p:contains("Height")').text().split(" ")[1]
                    );
                    const weight = parseInt(
                        $('p:contains("Weight")').text().split(" ")[1]
                    );
                    const prefered_foot = $(
                        'p:contains("Preferred Foot") span.float-right'
                    ).text();
                    const birth_date = $(
                        'p:contains("Birth Date") span.float-right'
                    ).text();
                    const age = parseInt(
                        $('p:contains("Age") span.float-right').text()
                    );
                    const prefered_positions = [];
                    $('p:contains("Preferred Positions") a.link-position').each(
                        (i, element) => {
                            prefered_positions.push({
                                id: parseInt(
                                    $(element).attr("href").split("=")[1]
                                ),
                                name: $(element).text().trim(),
                            });
                        }
                    );

                    const ofensive_work_rate = $(
                        'p:contains("Player Work Rate") span.float-right'
                    )
                        .text()
                        .split(" / ")[0];

                    const defensive_work_rate = $(
                        'p:contains("Player Work Rate") span.float-right'
                    )
                        .text()
                        .split(" / ")[1];

                    const weak_foot = parseInt(
                        $(
                            'p:contains("Weak Foot") span.star i.fas.fa-star.fa-lg'
                        ).length
                    );
                    const skill_moves = parseInt(
                        $(
                            'p:contains("Skill Moves") span.star i.fas.fa-star.fa-lg'
                        ).length
                    );
                    const value = parseInt(
                        $('p:contains("Value") span.float-right')
                            .text()
                            .split("$")[0]
                            .replace(/[€.]/g, "")
                    );
                    const wage = parseInt(
                        $('p:contains("Wage") span.float-right')
                            .text()
                            .split("$")[0]
                            .replace(/[€.]/g, "")
                    );

                    const teams = [];
                    $("div.col-12.col-sm-6.col-lg-6.team").each(
                        (i, element) => {
                            const teamId = parseInt(
                                $(element)
                                    .find("a.link-team img.team")
                                    .attr("src")
                                    .split(".")[2]
                                    .split("/")[4]
                            );
                            const teamImageUrl = $(element)
                                .find("a.link-team img.team")
                                .attr("src");
                            const teamName = $(element)
                                .find("a.link-team")
                                .text()
                                .trim();
                            const positionId = parseInt(
                                $(element)
                                    .find(
                                        'p:contains("Position") a.link-position'
                                    )
                                    .attr("href")
                                    .split("=")[1]
                            );

                            const positionName = $(element)
                                .find(
                                    'p:contains("Position") a.link-position span.badge'
                                )
                                .text()
                                .trim();
                            const kitNumber = parseInt(
                                $(element)
                                    .find(
                                        'p:contains("Kit Number") span.float-right'
                                    )
                                    .text()
                            );
                            const joinedClub = $(element)
                                .find(
                                    'p:contains("Joined Club") span.float-right'
                                )
                                .text();
                            const contractLength = $(element)
                                .find(
                                    'p:contains("Contract Length") span.float-right'
                                )
                                .text();

                            teams.push({
                                id: teamId,
                                imageUrl: teamImageUrl,
                                name: teamName,
                                position: {
                                    id: positionId,
                                    name: positionName,
                                },
                                kit_number: kitNumber,
                                joined_club: joinedClub,
                                contract_length: contractLength,
                            });
                        }
                    );

                    const ball_skills = {
                        ball_control: parseInt(
                            $(
                                'p:contains("Ball Control") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        dribbling: parseInt(
                            $(
                                'p:contains("Dribbling") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const defence = {
                        marking: $(
                            'p:contains("Marking") span.float-right span.badge.rating'
                        )
                            .text()
                            .trim(),
                        slide_tackle: parseInt(
                            $(
                                'p:contains("Slide Tackle") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        stand_tackle: parseInt(
                            $(
                                'p:contains("Stand Tackle") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const mental = {
                        aggression: parseInt(
                            $(
                                'p:contains("Aggression") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        reactions: parseInt(
                            $(
                                'p:contains("Reactions") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        att_position: parseInt(
                            $(
                                'p:contains("Att. Position") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        interceptions: parseInt(
                            $(
                                'p:contains("Interceptions") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        vision: parseInt(
                            $(
                                'p:contains("Vision") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        composure: parseInt(
                            $(
                                'p:contains("Composure") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const passing = {
                        crossing: parseInt(
                            $(
                                'p:contains("Crossing") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        short_pass: parseInt(
                            $(
                                'p:contains("Short Pass") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        long_pass: parseInt(
                            $(
                                'p:contains("Long Pass") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const physical = {
                        acceleration: parseInt(
                            $(
                                'p:contains("Acceleration") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        stamina: parseInt(
                            $(
                                'p:contains("Stamina") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        strength: parseInt(
                            $(
                                'p:contains("Strength") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        balance: parseInt(
                            $(
                                'p:contains("Balance") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        sprint_speed: parseInt(
                            $(
                                'p:contains("Sprint Speed") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        agility: parseInt(
                            $(
                                'p:contains("Agility") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        jumping: parseInt(
                            $(
                                'p:contains("Jumping") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const shooting = {
                        heading: parseInt(
                            $(
                                'p:contains("Heading") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        shot_power: parseInt(
                            $(
                                'p:contains("Shot Power") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        finishing: parseInt(
                            $(
                                'p:contains("Finishing") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        long_shots: parseInt(
                            $(
                                'p:contains("Long Shots") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        curve: parseInt(
                            $(
                                'p:contains("Curve") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        fk_acc: parseInt(
                            $(
                                'p:contains("FK Acc.") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        penalties: parseInt(
                            $(
                                'p:contains("Penalties") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        volleys: parseInt(
                            $(
                                'p:contains("Volleys") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const goalkeeper = {
                        gk_positioning: parseInt(
                            $(
                                'p:contains("GK Positioning") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        gk_diving: parseInt(
                            $(
                                'p:contains("GK Diving") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        gk_handling: parseInt(
                            $(
                                'p:contains("GK Handling") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        gk_kicking: parseInt(
                            $(
                                'p:contains("GK Kicking") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        gk_reflexes: parseInt(
                            $(
                                'p:contains("GK Reflexes") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const attackPoint =
                        (passing.crossing +
                            shooting.finishing +
                            passing.short_pass +
                            shooting.volleys +
                            shooting.heading) /
                        5;

                    const skillPoint =
                        (shooting.curve +
                            shooting.fk_acc +
                            passing.long_pass +
                            ball_skills.ball_control) /
                        4;

                    const powerPoint =
                        (shooting.shot_power +
                            physical.jumping +
                            physical.stamina +
                            physical.strength +
                            shooting.long_shots) /
                        5;

                    const movementPoint =
                        (physical.acceleration +
                            physical.sprint_speed +
                            physical.agility +
                            mental.reactions +
                            physical.balance) /
                        5;

                    const mentalPoint =
                        (mental.aggression +
                            mental.interceptions +
                            mental.att_position +
                            mental.vision +
                            shooting.penalties +
                            mental.composure) /
                        6;

                    const defencePoint =
                        (defence.stand_tackle + defence.slide_tackle) / 2;

                    const specialities = [];
                    $('div.card.mb-5:contains("Specialities") p').each(
                        (i, element) => {
                            specialities.push($(element).text().trim());
                        }
                    );

                    const traits = [];
                    $('div.card.mb-5:contains("Traits") p').each(
                        (i, element) => {
                            traits.push($(element).text().trim());
                        }
                    );

                    const bmi = heightWeightRate(height, weight);

                    const playerData = {
                        playerId,
                        name,
                        imageUrl,
                        nationality: {
                            id: nationalityId,
                            imageUrl: nationalityImageUrl,
                            nation: nationality,
                        },
                        ovr,
                        pot,
                        futgg,
                        bmi,
                        prefered_foot,
                        birth_date,
                        age,
                        prefered_positions,
                        ofensive_work_rate,
                        defensive_work_rate,
                        weak_foot,
                        skill_moves,
                        value,
                        wage,
                        teams,
                        ball_skills,
                        defence,
                        mental,
                        passing,
                        physical,
                        shooting,
                        goalkeeper,
                        attackPoint,
                        skillPoint,
                        powerPoint,
                        movementPoint,
                        mentalPoint,
                        defencePoint,
                        specialities,
                        traits,
                    };
                    setPlayer(playerData);
                }
            })
            .catch((error) => {
                console.error("Veri çekme hatası:", error);
            });
        setIsLoading(false);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    /* console.log(player); */

    return (
        <View style={styles.container}>
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
                            <AntDesign name="staro" size={16} color="white" />{" "}
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
                        € {numeral(player.value).format("0.0a").toUpperCase()}
                    </Text>
                </View>
                <View style={styles.priceContainers}>
                    <Text style={styles.featureTitle}>WAGE</Text>
                    <Text style={styles.pricesText}>
                        € {numeral(player.wage).format("0.0a").toUpperCase()}
                    </Text>
                </View>
            </View>
            <View
                style={[
                    styles.twoColumnsContainer,
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
                                                player.teams[1].position.name
                                            ),
                                        ]}
                                    >
                                        <Text style={styles.teamPositionName}>
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
            <View style={styles.progressFeaturesContainers}>
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
                            <Text style={styles.progressFeaturesContainerTitle}>
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
                            <Text style={styles.progressFeaturesContainerTitle}>
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
                            <Text style={styles.progressFeaturesContainerTitle}>
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
                            <Text style={styles.progressFeaturesContainerTitle}>
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
                            <Text style={styles.progressFeaturesContainerTitle}>
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
                            <Text style={styles.progressFeaturesContainerTitle}>
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
        </View>
    );
}

const styles = StyleSheet.create({
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
    twoColumnsContainer: {
        flexDirection: "row",
        paddingVertical: 10,
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
        padding: 10,
        flexDirection: "column",
        paddingTop: 30,
    },
});
