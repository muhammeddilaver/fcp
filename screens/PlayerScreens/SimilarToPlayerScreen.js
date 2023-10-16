import { StyleSheet, Text, View } from "react-native";
import React from "react";
import List from "../../components/PlayerList/List";

export default function SimilarToPlayerScreen({ route }) {
    const player = route.params.player;

    return (
        <View style={{position:"absolute", top:0,right:0,left:0,bottom:0}}>
            <List
                style={{flex:1, alignSelf:"center", alignItems:"center", justifyContent:"center"}}
                listType={""}
                data={{
                    gender: 0,
                    height_0: player.bmi.cm - 15,
                    height_1: player.bmi.cm + 15,
                    weight_0: player.bmi.kg - 15,
                    weight_1: player.bmi.kg + 15,
                    position: player.prefered_positions.map(position => position.id),
                    preferredfoot: player.prefered_foot.toLowerCase(),
                    value_0: player.value - (player.value * 50) / 100,
                    value_1: player.value + (player.value * 50) / 100,
                    wage_0: player.wage - (player.wage * 50) / 100,
                    wage_1: player.wage + (player.wage * 50) / 100,
                    order: "desc",
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containera: {
        flexDirection: "row",
        flex:1,
        alignItems:"center",
        alignSelf:"center",
        justifyContent: "center",
    },
});
