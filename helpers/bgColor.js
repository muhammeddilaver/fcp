export const progressColor = (point) => {
    return point >= 90
        ? "#239454"
        : point < 90 && point >= 80
        ? "#8dc153"
        : point < 80 && point >= 70
        ? "#f6bb43"
        : point < 70 && point >= 60
        ? "#e77e23"
        : "#e9573e";
};

export const potColor = (point) => {
    return point >= 90
        ? "#239454"
        : point < 90 && point >= 80
        ? "#8dc153"
        : point < 80 && point >= 70
        ? "#f6bb43"
        : point < 70 && point >= 60
        ? "#e77e23"
        : "#e9573e";
};

export const ageColor = (age) => {
    return {
        backgroundColor:
            age < 22
                ? "#239454"
                : age >= 22 && age < 26
                ? "#8dc153"
                : age >= 26 && age < 30
                ? "#f6bb43"
                : age >= 30 && age < 35
                ? "#e77e23"
                : "#e9573e",
    };
};

export const positionColor = (position) => {
    position = position.toLowerCase();

    const blueList = [
        "cf",
        "lcf",
        "lf",
        "ls",
        "lw",
        "rcf",
        "rf",
        "rs",
        "rw",
        "st",
    ];
    const greenList = [
        "cam",
        "cdm",
        "cm",
        "lam",
        "lcam",
        "lcdm",
        "lcm",
        "ldm",
        "lm",
        "lwm",
        "ram",
        "rcam",
        "rcdm",
        "rcm",
        "rdm",
        "rm",
        "rwm",
    ];
    const yellowList = ["cb", "lb", "lcb", "lwb", "rb", "rcb", "rwb", "sw"];
    const grayList = ["res", "sub"];
    //const redList = ["gk"];

    return blueList.includes(position)
        ? "#4b89dc"
        : greenList.includes(position)
        ? "#8dc153"
        : yellowList.includes(position)
        ? "#f6bb43"
        : grayList.includes(position)
        ? "#bdc3c7"
        : "#e9573e";
};
