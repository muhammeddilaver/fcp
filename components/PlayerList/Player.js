import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ageColor, positionColor, potColor } from "../../helpers/bgColor";

export default function Player({ player }) {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.playerImage}
                    source={{ uri: player.imageUrl }}
                />
                <Image
                    style={styles.flagImage}
                    source={{ uri: player.nationality.imageUrl }}
                />
                <Text style={[styles.age, ageColor(player.age)]}>
                    Age: {player.age}
                </Text>
            </View>

            <View style={styles.playerInfoContainer}>
                <Text style={styles.playerName}>{player.name}</Text>
                <View style={styles.positionContainer}>
                    {player.prefered_positions.map((position, index) => {
                        return (
                            <Text
                                key={index}
                                style={[
                                    styles.positionName,
                                    positionColor(position.name),
                                ]}
                            >
                                {position.name}
                            </Text>
                        );
                    })}
                </View>
            </View>
            <View style={styles.opContainer}>
                <View style={styles.pointContainer}>
                    <Text style={[styles.point, potColor(player.ovr)]}>
                        {player.ovr}
                    </Text>
                    <Text style={styles.pointName}>OVR</Text>
                </View>
                <View style={styles.pointContainer}>
                    <Text style={[styles.point, potColor(player.pot)]}>
                        {player.pot}
                    </Text>
                    <Text style={styles.pointName}>POT</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Image
                    style={styles.teamLogoImage}
                    source={{ uri: player.team.imageUrl }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBlockColor: "#afafaf",
    },
    playerImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    flagImage: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
        width: 15,
        height: 20,
    },
    opContainer: {
        width: 70,
        height: 35,
        marginEnd: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    pointContainer: {
        flexDirection: "column",
        backgroundColor: "#42aead",
        alignItems: "center",
        marginEnd: 4,
    },
    point: {
        width: 35,
        height: 35,
        textAlign: "center",
        color: "white",
        verticalAlign: "middle",
        fontSize: 20,
        fontWeight: "bold",
    },
    pointName: {
        alignSelf: "center",
        fontSize: 10,
        fontWeight: "bold",
        color: "white",
    },
    playerInfoContainer: {
        flex: 3,
        marginStart: 15,
    },
    playerName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    positionContainer: {
        flexDirection: "row",
        marginTop: 5,
    },
    positionName: {
        color: "white",
        marginEnd: 5,
        width: 25,
        height: 15,
        fontSize: 9,
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
    },
    age: {
        height: 15,
        alignSelf: "stretch",
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
        verticalAlign: "middle",
    },
    teamLogoImage: {
        width: 35,
        height: 35,
        marginEnd:10
    },
});
