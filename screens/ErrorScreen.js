import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

export default function ErrorScreen({ error }) {
    return (
        <Box marginTop={20} alignItems="center" justifyContent="center">
            <Text>{error}</Text>
        </Box>
    );
}
