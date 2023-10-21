import * as cheerio from "cheerio";
import fifa from "../fifa";

export const fetchPlayerList = async (data, listType) => {
    const results = {};
    await fifa
        .get(`/players${listType}/fifa24_590/`, {
            params: data,
        })
        .then((response) => {
            if (response.status === 200) {
                const htmlData = response.data;
                const $ = cheerio.load(htmlData);

                const players = [];

                // Tabloyu seç ve her satırı döngüye al
                $("table.table-players tbody tr").each((index, element) => {
                    if ($(element).attr("data-playerid")) {
                        const player = {};
                        player.imageUrl = $(element)
                            .find("td figure.player img")
                            .attr("src");
                        player.age = parseInt(
                            $(element)
                                .find('td[data-title="Age"]')
                                .text()
                                .trim()
                        );
                        player.name = $(element)
                            .find('td[data-title="Name"] a.link-player')
                            .text()
                            .trim();

                        // Nationality verilerini çek
                        const nationalityElement = $(element).find(
                            'td[data-title="Nationality"] a.link-nation img'
                        );
                        player.nationality = {
                            id: parseInt(
                                nationalityElement
                                    .attr("src")
                                    .split(".")[2]
                                    .split("/")[5]
                            ),
                            imageUrl: nationalityElement.attr("src"),
                            nation: nationalityElement.attr("alt"),
                        };

                        // OVR ve POT verilerini çek
                        $(element)
                            .find('td[data-title="OVR / POT"] span.rating')
                            .each((i, asd) => {
                                if (i === 0) {
                                    player.ovr = parseInt($(asd).text().trim());
                                } else {
                                    player.pot = parseInt($(asd).text().trim());
                                }
                            });

                        const positions = [];
                        $(element)
                            .find(
                                'td[data-title="Preferred Positions"] a.link-position'
                            )
                            .each((i, positionElement) => {
                                positions.push({
                                    id: parseInt(
                                        $(positionElement)
                                            .attr("href")
                                            .split("=")[1]
                                    ),
                                    name: $(positionElement).text().trim(),
                                });
                            });
                        player.prefered_positions = positions;

                        // Team verilerini çek
                        const teamElement = $(element).find(
                            'td[data-title="Team"] a.link-team img'
                        );
                        player.team = {
                            id: parseInt(
                                teamElement
                                    .attr("src")
                                    .split(".")[2]
                                    .split("/")[4]
                            ),
                            name: teamElement.attr("alt"),
                            imageUrl: teamElement.attr("src"),
                        };

                        // Player ID verilerini çek
                        player.playerId = parseInt(
                            $(element).attr("data-playerid")
                        );

                        players.push(player);

                        results.players = [...players];
                        results.pageCount = $(
                            '#bigpagination a.page-link:contains("Last")'
                        )
                            .attr("href")
                            .split("=")[1];
                    }
                });
            }
        })
        .catch((error) => {
            console.error("Veri çekme hatası:", error);
        });

    return results;
};
