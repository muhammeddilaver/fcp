export const heightWeightRate = (height, weight) => {
    const bmi = weight / ((height / 100) * (height / 100));

    const inches = height / 2.54; // 1 inç = 2.54 cm
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);
    const feetInch = `${feet}' ${remainingInches}"`;

    const lbs = weight * 2.20462;

    let body_type;
    let bgColor;
    if (bmi <= 18.5) {
        body_type = "WEAK";
        bgColor = "#e9573e";
    } else if (bmi > 18.5 && bmi <= 24.9) {
        body_type = "LEAN";
        bgColor = "#239454";
    } else {
        body_type = "FAT";
        bgColor = "#e9573e";
    }

    return {
        bmi,
        feetInch,
        lbs,
        kg: weight,
        cm: height,
        body_type,
        bgColor,
    };
};
