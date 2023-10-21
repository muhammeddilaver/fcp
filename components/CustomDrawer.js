import React from "react";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { Box, Text } from "@gluestack-ui/themed";

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <Box>
                <Text bold size={"2xl"} marginStart={10} marginVertical={20}>
                    F Career Potential
                </Text>
            </Box>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}
