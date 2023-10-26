import { Box, HStack, Image, Text } from "@gluestack-ui/themed";
import React from "react";
import { Dimensions } from "react-native";
import { potColor } from "../helpers/bgColor";

import { Ionicons } from "@expo/vector-icons";

export default function RPP({ rpp, gk }) {
    const deviceScreen = Dimensions.get("window");
    const width = 260; //deviceScreen.width.toFixed(0) - 70;
    const height = width * 1.466208477;
    const shirtSize = 45;

    return (
        <Box width={width} height={height} alignSelf="center">
            <Image
                alt="Football Field"
                width={width}
                height={height}
                source={require("../assets/football-field.jpg")}
            />
            <Box position="absolute" top={0} right={0} left={0} bottom={0}>
                <Box position="absolute" top={75} left={10}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_LW)}
                    />
                    <Text
                        position="absolute"
                        left={13}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        LW{"\n" + rpp.rpp_field_pos_LW.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" top={55} left={55}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_LF)}
                    />
                    <Text
                        position="absolute"
                        left={14}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        LF{"\n" + rpp.rpp_field_pos_LF.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" top={10} left={107.5}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_ST)}
                    />
                    <Text
                        position="absolute"
                        left={14}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        ST{"\n" + rpp.rpp_field_pos_ST.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" top={55} left={107.5}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_CF)}
                    />
                    <Text
                        position="absolute"
                        left={14}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        CF{"\n" + rpp.rpp_field_pos_CF.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" top={55} right={55}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_RF)}
                    />
                    <Text
                        position="absolute"
                        left={14}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        RF{"\n" + rpp.rpp_field_pos_RF.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" top={75} right={10}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_RW)}
                    />
                    <Text
                        position="absolute"
                        left={13}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        RW{"\n" + rpp.rpp_field_pos_RW.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" top={110} left={107.5}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_CAM)}
                    />
                    <Text
                        position="absolute"
                        left={8}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        CAM{"\n" + rpp.rpp_field_pos_CAM.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" top={160} left={30}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_LM)}
                    />
                    <Text
                        position="absolute"
                        left={13}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        LM{"\n" + rpp.rpp_field_pos_LM.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" top={160} left={107.5}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_CM)}
                    />
                    <Text
                        position="absolute"
                        left={12}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        CM{"\n" + rpp.rpp_field_pos_CM.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" top={160} right={30}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_RM)}
                    />
                    <Text
                        position="absolute"
                        left={13}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        RM{"\n" + rpp.rpp_field_pos_RM.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" bottom={75} left={10}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_LWB)}
                    />
                    <Text
                        position="absolute"
                        left={9}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        LWB{"\n" + rpp.rpp_field_pos_LWB.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" bottom={55} left={55}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_LB)}
                    />
                    <Text
                        position="absolute"
                        left={14}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        LB{"\n" + rpp.rpp_field_pos_LB.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" bottom={110} left={107.5}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_CDM)}
                    />
                    <Text
                        position="absolute"
                        left={8}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        CDM{"\n" + rpp.rpp_field_pos_CDM.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" bottom={55} left={107.5}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_CB)}
                    />
                    <Text
                        position="absolute"
                        left={14}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        CB{"\n" + rpp.rpp_field_pos_CB.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" bottom={55} right={55}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_RB)}
                    />
                    <Text
                        position="absolute"
                        left={14}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        RB{"\n" + rpp.rpp_field_pos_RB.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" bottom={75} right={10}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(rpp.rpp_field_pos_RB)}
                    />
                    <Text
                        position="absolute"
                        left={13}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        RB{"\n" + rpp.rpp_field_pos_RB.toFixed(0)}
                    </Text>
                </Box>
                <Box position="absolute" bottom={10} left={107.5}>
                    <Ionicons
                        name="shirt-sharp"
                        size={shirtSize}
                        color={potColor(gk.toFixed(0))}
                    />
                    <Text
                        position="absolute"
                        left={14}
                        bottom={7}
                        fontSize={12}
                        lineHeight={12}
                        textAlign="center"
                        textAlignVertical="center"
                        color="$white"
                        bold
                    >
                        GK{"\n" + gk.toFixed(0)}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}
