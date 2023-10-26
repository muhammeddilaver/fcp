import React, { memo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import usePlayerListResults from "../../hooks/usePlayerListResults";
import {
    Box,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    SearchIcon,
    SelectVirtualizedList,
    Spinner,
    Text,
} from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import Player from "./Player";
import ErrorScreen from "../../screens/ErrorScreen";

const List = memo(({ listType, data = {} }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [isPaging, setIsPaging] = useState(false);
    const { getPlayerList, results } = usePlayerListResults(
        listType,
        data,
        setIsLoading
    );
    const [page, setPage] = useState(1);

    const handleEndReached = async () => {
        if (page < results.pageCount) {
            setIsPaging(true);
            await getPlayerList({ page: page + 1 });
            setPage(page + 1);
            setIsPaging(false);
        }
    };

    const handlePress = (playerId, name) => {
        navigation.push("PlayerScreen", {
            playerId: playerId,
            customTitle: name,
        });
    };

    if (results.error === 1) {
        return <ErrorScreen error={"Not found."} />;
    }

    return (
        <Box>
            <SelectVirtualizedList
                data={results.players}
                initialNumToRender={15}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setIsPaging(true);
                                handlePress(item.playerId, item.name);
                                setIsPaging(false);
                            }}
                        >
                            <Player player={item} />
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.playerId.toString() + listType}
                getItemCount={() => results.players.length}
                getItem={(data, index) => data[index]}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.3}
                ListEmptyComponent={() =>
                    !isLoading && (
                        <Box>
                            <Text>No data available</Text>
                        </Box>
                    )
                }
                ListHeaderComponent={() => (
                    <Input>
                        <InputSlot pl="$3">
                            <InputIcon as={SearchIcon} />
                        </InputSlot>
                        <InputField placeholder="Search..." />
                    </Input>
                )}
                ListFooterComponent={() =>
                    (isLoading || isPaging) && <Spinner size="large" />
                }
            />
        </Box>
    );
});

export default List;
