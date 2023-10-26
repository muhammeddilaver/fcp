import fifaCM from "../fifacm";

export const fetchSearchList = async (term) => {
    let playerList = null;
    await fifaCM
        .get(`/api/search`, {
            params: {
                year: 24,
                extra: 1,
                v: 1,
                term: term
            },
        })
        .then((response) => {
            if (response.status === 200) {
                playerList = response.data;
            }
        })
        .catch((error) => {
            console.error("Veri çekme hatası:", error);
        });
    return playerList;
};
