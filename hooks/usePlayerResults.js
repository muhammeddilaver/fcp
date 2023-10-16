import { useEffect, useState } from "react";
import * as cheerio from "cheerio";
import fifa from "../api/fifa";
import { heightWeightRate } from "../helpers/calculate";

export default (playerId, data = {}, setIsLoading) => {
    const [player, setPlayer] = useState({});

    const getPlayer = async (playerId, data) => {
        await fifa
            .get(`/player/${playerId}/`, {
                params: data,
            })
            .then((response) => {
                if (response.status === 200) {
                    const htmlData = response.data;
                    const $ = cheerio.load(htmlData);

                    const name = $("h1").text().trim().split(" EA FC FIFA")[0];
                    const imageUrl = $("div.align-self-center img.player").attr(
                        "src"
                    );
                    const nationalityId = parseInt(
                        $("a.link-nation img.nation")
                            .attr("src")
                            .split(".")[2]
                            .split("/")[5]
                    );
                    const nationalityImageUrl = $(
                        "a.link-nation img.nation"
                    ).attr("src");
                    const nationality = $("a.link-nation").text().trim();

                    let ovr, pot;
                    $("h5.card-header span.rating").each((i, element) => {
                        if (i === 0) {
                            ovr = parseInt($(element).text().trim());
                        } else {
                            pot = parseInt($(element).text().trim());
                        }
                    });

                    const futgg = $(
                        "a.btn.btn-block.btn-sm.btn-primary.mb-3"
                    ).attr("href");
                    const height = parseInt(
                        $('p:contains("Height")').text().split(" ")[1]
                    );
                    const weight = parseInt(
                        $('p:contains("Weight")').text().split(" ")[1]
                    );
                    const prefered_foot = $(
                        'p:contains("Preferred Foot") span.float-right'
                    ).text();
                    const birth_date = $(
                        'p:contains("Birth Date") span.float-right'
                    ).text();
                    const age = parseInt(
                        $('p:contains("Age") span.float-right').text()
                    );
                    const prefered_positions = [];
                    $('p:contains("Preferred Positions") a.link-position').each(
                        (i, element) => {
                            prefered_positions.push({
                                id: parseInt(
                                    $(element).attr("href").split("=")[1]
                                ),
                                name: $(element).text().trim(),
                            });
                        }
                    );

                    const ofensive_work_rate = $(
                        'p:contains("Player Work Rate") span.float-right'
                    )
                        .text()
                        .split(" / ")[0];

                    const defensive_work_rate = $(
                        'p:contains("Player Work Rate") span.float-right'
                    )
                        .text()
                        .split(" / ")[1];

                    const weak_foot = parseInt(
                        $(
                            'p:contains("Weak Foot") span.star i.fas.fa-star.fa-lg'
                        ).length
                    );
                    const skill_moves = parseInt(
                        $(
                            'p:contains("Skill Moves") span.star i.fas.fa-star.fa-lg'
                        ).length
                    );
                    const value = parseInt(
                        $('p:contains("Value") span.float-right')
                            .text()
                            .split("$")[0]
                            .replace(/[€.]/g, "")
                    );
                    const wage = parseInt(
                        $('p:contains("Wage") span.float-right')
                            .text()
                            .split("$")[0]
                            .replace(/[€.]/g, "")
                    );

                    const teams = [];
                    $("div.col-12.col-sm-6.col-lg-6.team").each(
                        (i, element) => {
                            const teamId = parseInt(
                                $(element)
                                    .find("a.link-team img.team")
                                    .attr("src")
                                    .split(".")[2]
                                    .split("/")[4]
                            );
                            const teamImageUrl = $(element)
                                .find("a.link-team img.team")
                                .attr("src");
                            const teamName = $(element)
                                .find("a.link-team")
                                .text()
                                .trim();
                            const positionId = parseInt(
                                $(element)
                                    .find(
                                        'p:contains("Position") a.link-position'
                                    )
                                    .attr("href")
                                    .split("=")[1]
                            );

                            const positionName = $(element)
                                .find(
                                    'p:contains("Position") a.link-position span.badge'
                                )
                                .text()
                                .trim();
                            const kitNumber = parseInt(
                                $(element)
                                    .find(
                                        'p:contains("Kit Number") span.float-right'
                                    )
                                    .text()
                            );
                            const joinedClub = $(element)
                                .find(
                                    'p:contains("Joined Club") span.float-right'
                                )
                                .text();
                            const contractLength = $(element)
                                .find(
                                    'p:contains("Contract Length") span.float-right'
                                )
                                .text();

                            teams.push({
                                id: teamId,
                                imageUrl: teamImageUrl,
                                name: teamName,
                                position: {
                                    id: positionId,
                                    name: positionName,
                                },
                                kit_number: kitNumber,
                                joined_club: joinedClub,
                                contract_length: contractLength,
                            });
                        }
                    );

                    const ball_skills = {
                        ball_control: parseInt(
                            $(
                                'p:contains("Ball Control") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        dribbling: parseInt(
                            $(
                                'p:contains("Dribbling") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const defence = {
                        marking: $(
                            'p:contains("Marking") span.float-right span.badge.rating'
                        )
                            .text()
                            .trim(),
                        slide_tackle: parseInt(
                            $(
                                'p:contains("Slide Tackle") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        stand_tackle: parseInt(
                            $(
                                'p:contains("Stand Tackle") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const mental = {
                        aggression: parseInt(
                            $(
                                'p:contains("Aggression") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        reactions: parseInt(
                            $(
                                'p:contains("Reactions") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        att_position: parseInt(
                            $(
                                'p:contains("Att. Position") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        interceptions: parseInt(
                            $(
                                'p:contains("Interceptions") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        vision: parseInt(
                            $(
                                'p:contains("Vision") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        composure: parseInt(
                            $(
                                'p:contains("Composure") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const passing = {
                        crossing: parseInt(
                            $(
                                'p:contains("Crossing") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        short_pass: parseInt(
                            $(
                                'p:contains("Short Pass") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        long_pass: parseInt(
                            $(
                                'p:contains("Long Pass") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const physical = {
                        acceleration: parseInt(
                            $(
                                'p:contains("Acceleration") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        stamina: parseInt(
                            $(
                                'p:contains("Stamina") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        strength: parseInt(
                            $(
                                'p:contains("Strength") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        balance: parseInt(
                            $(
                                'p:contains("Balance") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        sprint_speed: parseInt(
                            $(
                                'p:contains("Sprint Speed") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        agility: parseInt(
                            $(
                                'p:contains("Agility") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        jumping: parseInt(
                            $(
                                'p:contains("Jumping") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const shooting = {
                        heading: parseInt(
                            $(
                                'p:contains("Heading") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        shot_power: parseInt(
                            $(
                                'p:contains("Shot Power") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        finishing: parseInt(
                            $(
                                'p:contains("Finishing") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        long_shots: parseInt(
                            $(
                                'p:contains("Long Shots") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        curve: parseInt(
                            $(
                                'p:contains("Curve") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        fk_acc: parseInt(
                            $(
                                'p:contains("FK Acc.") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        penalties: parseInt(
                            $(
                                'p:contains("Penalties") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        volleys: parseInt(
                            $(
                                'p:contains("Volleys") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const goalkeeper = {
                        gk_positioning: parseInt(
                            $(
                                'p:contains("GK Positioning") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        gk_diving: parseInt(
                            $(
                                'p:contains("GK Diving") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        gk_handling: parseInt(
                            $(
                                'p:contains("GK Handling") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        gk_kicking: parseInt(
                            $(
                                'p:contains("GK Kicking") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                        gk_reflexes: parseInt(
                            $(
                                'p:contains("GK Reflexes") span.float-right span.badge.rating'
                            )
                                .text()
                                .trim()
                        ),
                    };

                    const attackPoint =
                        (passing.crossing +
                            shooting.finishing +
                            passing.short_pass +
                            shooting.volleys +
                            shooting.heading) /
                        5;

                    const skillPoint =
                        (shooting.curve +
                            shooting.fk_acc +
                            passing.long_pass +
                            ball_skills.ball_control) /
                        4;

                    const powerPoint =
                        (shooting.shot_power +
                            physical.jumping +
                            physical.stamina +
                            physical.strength +
                            shooting.long_shots) /
                        5;

                    const movementPoint =
                        (physical.acceleration +
                            physical.sprint_speed +
                            physical.agility +
                            mental.reactions +
                            physical.balance) /
                        5;

                    const mentalPoint =
                        (mental.aggression +
                            mental.interceptions +
                            mental.att_position +
                            mental.vision +
                            shooting.penalties +
                            mental.composure) /
                        6;

                    const defencePoint =
                        (defence.stand_tackle + defence.slide_tackle) / 2;

                    const specialities = [];
                    $('div.card.mb-5:contains("Specialities") p').each(
                        (i, element) => {
                            specialities.push($(element).text().trim());
                        }
                    );

                    const traits = [];
                    $('div.card.mb-5:contains("Traits") p').each(
                        (i, element) => {
                            traits.push($(element).text().trim());
                        }
                    );

                    const bmi = heightWeightRate(height, weight);

                    const playerData = {
                        playerId,
                        name,
                        imageUrl,
                        nationality: {
                            id: nationalityId,
                            imageUrl: nationalityImageUrl,
                            nation: nationality,
                        },
                        ovr,
                        pot,
                        futgg,
                        bmi,
                        prefered_foot,
                        birth_date,
                        age,
                        prefered_positions,
                        ofensive_work_rate,
                        defensive_work_rate,
                        weak_foot,
                        skill_moves,
                        value,
                        wage,
                        teams,
                        ball_skills,
                        defence,
                        mental,
                        passing,
                        physical,
                        shooting,
                        goalkeeper,
                        attackPoint,
                        skillPoint,
                        powerPoint,
                        movementPoint,
                        mentalPoint,
                        defencePoint,
                        specialities,
                        traits,
                    };
                    setPlayer(playerData);
                }
            })
            .catch((error) => {
                console.error("Veri çekme hatası:", error);
            });
    };

    const initialList = async () => {
        setIsLoading(true);
        await getPlayer(playerId, data);
        setIsLoading(false);
    };

    useEffect(() => {
        initialList();
    }, []);

    return { getPlayer, player };
};
