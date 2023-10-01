import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ProgressBar from "react-native-progress-bar-horizontal";
import { AntDesign } from "@expo/vector-icons";
import { progressColor } from "../helpers/bgColor";

const ProgressFeature = ({ title, point, star, text }) => {
    star && (point = star * 10 * 2);

    text && text === "Low" && (point = 50);
    text && text === "Med" && (point = 70);
    text && text === "High" && (point = 100);

    return (
        <View style={styles.featureContainer}>
            <View style={styles.featureTitleContainer}>
                <Text style={styles.featureTitle}>{title}</Text>
                {!star && !text && (
                    <Text
                        style={[
                            styles.featurePoint,
                            { color: progressColor(point) },
                        ]}
                    >
                        {point}
                    </Text>
                )}
                {star && (
                    <View style={styles.stars}>
                        {Array.from({ length: star }).map((_, index) => (
                            <AntDesign
                                key={index}
                                name="star"
                                size={12}
                                color="orange"
                            />
                        ))}
                    </View>
                )}
                {text && (
                    <Text
                        style={[
                            styles.featurePoint,
                            { color: progressColor(point) },
                        ]}
                    >
                        {text}
                    </Text>
                )}
            </View>
            <ProgressBar
                progress={point / 100}
                borderWidth={1}
                height={10}
                borderColor={progressColor(point)}
                color={progressColor(point)}
                duration={100}
                fillColor={progressColor(point)}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    stars: {
        flexDirection: "row",
    },
    featurePoint: {
        fontSize: 12,
    },
    featureTitle: {
        fontSize: 12,
    },
    featureTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 1,
    },
    featureContainer: {
        marginTop: 3,
    },
});
export default ProgressFeature;
