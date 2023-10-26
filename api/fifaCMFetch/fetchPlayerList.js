import * as cheerio from "cheerio";
import fifaCM from "../fifacm";

export const fetchPlayerList = async (listType, data) => {
    let playerList = {};
    await fifaCM
        .get(`/${listType}`, {
            params: data,
        })
        .then((response) => {
            if (response.status === 200) {
                const htmlData = response.data;
                const $ = cheerio.load(htmlData);
                playerList.players = [];

                $("tr.player-row").each((_, player) => {
                    const tempPlayer = {};
                    tempPlayer.playerId = parseInt(
                        $(player)
                            .find("div.player-name a")
                            .attr("href")
                            .split("/")[2]
                    );
                    tempPlayer.playerImgUrl = $(player)
                        .find("img.player-img-info")
                        .attr("data-lazy-src");
                    tempPlayer.teamImgUrl = $(player)
                        .find("img.team-img")
                        .first()
                        .attr("data-lazy-src");
                    tempPlayer.nationImgUrl = $(player)
                        .find("img.team-img")
                        .last()
                        .attr("data-lazy-src");
                    tempPlayer.loan = $(".loan-player").text() === "Loan" ? true : false;
                    tempPlayer.name = $(player)
                        .find("div.player-name a")
                        .text()
                        .trim();
                    tempPlayer.positions = $(player)
                        .find("div.player-position-cln")
                        .text()
                        .trim()
                        .split("|")[0]
                        .trim()
                        .split(", ");
                    tempPlayer.ovr = parseInt(
                        $(player).find("div.player-overall").text().trim()
                    );
                    tempPlayer.pot = parseInt(
                        $(player).find("div.player-potential").text().trim()
                    );
                    tempPlayer.age = parseInt(
                        $(player).find("div.player-age").text().trim()
                    );

                    playerList.players.push(tempPlayer);
                });
                const pageTarget =
                    parseInt($("ul.pagination").children().length) > 6
                        ? parseInt($("ul.pagination").children().length) - 2
                        : parseInt($("ul.pagination").children().length) - 1;

                playerList.pageCount = parseInt(
                    $(`ul.pagination li:eq(${pageTarget})`).text().trim()
                );
            }
        })
        .catch((error) => {
            console.error("Veri çekme hatası:", error);
        });
    return playerList;
};
