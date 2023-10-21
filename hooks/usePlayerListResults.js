import { useEffect, useState } from "react";
import { fetchPlayerList } from "../api/fetch/fetchPlayerList";

export default (listType, data, setIsLoading) => {
    const [results, setResults] = useState({
        players: [],
    });

    const getPlayerList = async (data) => {
        try {
            const result = await fetchPlayerList(data, listType);
            setResults({
                players: [...results.players, ...result.players],
                pageCount: result.pageCount,
            });
        } catch (error) {
            setResults({
                error: 1,
            });
            console.error("Veri çekme hatası:", error);
        }
    };

    const initialList = async () => {
        setIsLoading(true);
        await getPlayerList(data);
        setIsLoading(false);
    };

    useEffect(() => {
        initialList();
    }, []);

    return { getPlayerList, results };
};
