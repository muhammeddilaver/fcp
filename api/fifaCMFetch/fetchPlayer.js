import * as cheerio from "cheerio";
import fifaCM from "../fifacm";

export const fetchPlayer = async (playerId, data) => {
    let player = {};
    await fifaCM
        .get(`/player/${playerId}`, {
            params: data,
        })
        .then((response) => {
            if (response.status === 200) {
                const htmlData = response.data;
                const $ = cheerio.load(htmlData);

                player.playerId = playerId;

                player.imageUrl = $("img#player-img-info-main").attr(
                    "data-lazy-src"
                );

                player.age = parseInt(
                    $(".player-age span").text().split(":")[1],
                    10
                );

                player.positions = $(".player-position ")
                    .text()
                    .trim()
                    .split(" ");

                player.player_rating = parseInt(
                    $(".player-rating-info").text(),
                    10
                );

                player.prefered_foot = $(".preferred-foot-info").text().trim();

                player.player_firstname = $(".player-firstname").text();
                player.player_lastname = $(".player-lastname").text();

                player.teams = {
                    team_img: $(".team-img").attr("src"),
                    team: $("div.col-md-12.col-12 div.d-inline a")
                        .text()
                        .trim(),
                    nation_img: $(".nation-img").attr("src"),
                    nation: $("div.col-md-12.col-12 div.d-inline.ml-3")
                        .text()
                        .trim()
                        .split(" ")[0],
                };

                const bmiText = $(".pl-1 div").text().split(" | ");
                player.bmi = {
                    feetInch: bmiText[1].trim().split(" ")[0],
                    lbs: bmiText[2].trim().split(" ")[0],
                    kg: bmiText[1].trim().split(" ")[1],
                    cm: bmiText[0].trim(),
                };

                player.contract_lenght =
                    bmiText[2].trim().split(" ")[3] +
                    "-" +
                    bmiText[2].trim().split(" ")[5];

                player.tshirt = bmiText[2].trim().split(" ")[6];

                player.int_rep = $(
                    "#panel10 div.d-flex div.d-inline.ml-2"
                ).children().length;

                player.rpp = {};
                $(
                    ".rpp_field_pos_ST, .rpp_field_pos_RW, .rpp_field_pos_LW, .rpp_field_pos_CF, .rpp_field_pos_RF, .rpp_field_pos_LF, .rpp_field_pos_CAM, .rpp_field_pos_CM, .rpp_field_pos_RM, .rpp_field_pos_LM, .rpp_field_pos_CDM, .rpp_field_pos_CB, .rpp_field_pos_LB, .rpp_field_pos_LWB, .rpp_field_pos_RB, .rpp_field_pos_RWB"
                ).each((_, el) => {
                    const className = $(el).attr("class").split(" ")[1];
                    player.rpp[className] = parseFloat(
                        $(el).attr("title").trim()
                    );
                });

                player.potential = parseInt(
                    $(".player-top-profile-value:eq(0)").text().trim()
                );

                player.value = $(".player-top-profile-value:eq(1)")
                    .text()
                    .trim();
                player.wage = $(".player-top-profile-value:eq(2)")
                    .text()
                    .trim();

                player.rel_clause = $(".player-top-profile-value:eq(3)")
                    .text()
                    .trim();

                player.body_type = $(".player-top-profile-value:eq(4)")
                    .text()
                    .trim();
                player.real_face = $(
                    ".player-top-profile-value:eq(5) i"
                ).hasClass("fa-check")
                    ? true
                    : false;

                player.skill_moves = $(
                    "div.row.col-md-6.col-6 div.float-right:eq(0) i"
                ).length;
                player.weak_foot = $(
                    "div.row.col-md-6.col-6 div.float-right:eq(1) i"
                ).length;

                player.attacking_work_rate = $(
                    "div.row.col-md-6.col-6 div.float-right:eq(2)"
                )
                    .text()
                    .trim();
                player.defensive_work_rate = $(
                    "div.row.col-md-6.col-6 div.float-right:eq(3)"
                )
                    .text()
                    .trim();

                player.traits = $(".ts-title.traits-holder .tands-holder")
                    .text()
                    .trim()
                    .split(",")
                    .map((item) => item.trim());

                player.specialities = $(".traits-specialities .tands-holder")
                    .text()
                    .trim()
                    .split(",")
                    .map((item) => item.trim());

                player.stats = {};
                $("div.player-stats")
                    .children()
                    .each((_, el) => {
                        const statName = $(el)
                            .find(".main-stat-title")
                            .text()
                            .trim()
                            .toLowerCase();
                        if (!player.stats[statName]) {
                            player.stats[statName] = {};
                        }
                        $(el)
                            .find(".sub-stat")
                            .each((_, substat) => {
                                const fieldName = $(substat)
                                    .find(".col-md-8.col-10.pl-4")
                                    .text()
                                    .trim()
                                    .toLowerCase()
                                    .replace(" ", "_")
                                    .replace(".", "")
                                    .trim();
                                const value = parseInt(
                                    $(substat)
                                        .find(".sub-stat-rating")
                                        .text()
                                        .trim()
                                );
                                player.stats[statName][fieldName] = value;
                            });
                    });
            }
        })
        .catch((error) => {
            console.error("Veri çekme hatası:", error);
        });
    return player;
};
