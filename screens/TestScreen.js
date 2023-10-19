import React from "react";
import {
    Text,
    Box,
    Button,
    ButtonText,
    ButtonIcon,
    AddIcon,
    HStack,
} from "@gluestack-ui/themed";
export default function TestScreen() {
    return (
        <Box bg="$secondary500">
            <HStack space="" reversed={false} justifyContent="space-between">
                <Box w="$20" h="$20" bg="$blue300" />
                <Box w="$20" h="$20" bg="$blue400" />
                <Box w="$20" h="$20" bg="$blue500" />
            </HStack>
        </Box>
    );
}
