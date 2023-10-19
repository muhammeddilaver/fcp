import React, { memo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import usePlayerListResults from "../../hooks/usePlayerListResults";
import {
    Box,
    FlatList,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    SearchIcon,
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
            <FlatList
                data={results.players}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={async () => {
                                setIsPaging(true);
                                await handlePress(item.playerId, item.name);
                                setIsPaging(false);
                            }}
                        >
                            <Player player={item} />
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item, index) => {
                    return item.playerId.toString();
                }}
                onEndReached={handleEndReached} // Sonuna gelindiğinde çalışacak işlev
                onEndReachedThreshold={0.2} // Sonuna gelmeden önce ne kadar mesafe kaldığını ayarlar
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
