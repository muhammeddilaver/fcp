import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Player from "../components/PlayerList/Player";
import LoadingScreen from "./LoadingScreen";
import usePlayerListResults from "../hooks/usePlayerListResults";
import { useNavigation } from "@react-navigation/native";

export default function TopPlayers() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [isPaging, setIsPaging] = useState(false);
    const { getPlayerList, results } = usePlayerListResults(
        "/top",
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
        navigation.navigate("PlayerScreen", {
            playerId: playerId,
            customTitle: name,
        });
    }

    if(isLoading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
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
            />
            {isPaging && <LoadingScreen/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
    },
});
