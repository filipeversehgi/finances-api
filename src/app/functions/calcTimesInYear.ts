export function calcTimesInYear(period: string, periodTime: number) {
    let periodInDays = 0;

    switch (period) {
        case "day":
            periodInDays = 360;
            break;
        case "week":
            periodInDays = 52;
            break;
        case "month":
            periodInDays = 12;
            break;
        case "year":
            periodInDays = 1;
            break;
        default:
            break;
    }

    return Math.ceil(periodInDays / periodTime);
}
