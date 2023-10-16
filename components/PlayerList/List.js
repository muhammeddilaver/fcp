import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
    TextInput,
} from "react-native";
import React, { memo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import usePlayerListResults from "../../hooks/usePlayerListResults";
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
        <View style={{ flex: 1 }}>
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
                        <View
                            style={{
                                bottom: 0,
                            }}
                        >
                            <Text>No data available</Text>
                        </View>
                    )
                }
                ListHeaderComponent={() => (
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                        />
                    </View>
                )}
                ListFooterComponent={() =>
                    (isLoading || isPaging) && (
                        <ActivityIndicator
                            size="large"
                            color={"red"}
                            animating
                        />
                    )
                }
            />
        </View>
    );
});

const styles = StyleSheet.create({
    searchContainer: {
        padding: 10,
    },
    searchInput: {
        fontSize: 16,
        backgroundColor: "#f9f9f9",
        padding: 10,
    },
});

export default List;
