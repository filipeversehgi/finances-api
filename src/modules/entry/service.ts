import { Entry } from "../../models/Entry";

export const list = async (startDate: string, endDate: string) => {
    const entries = await Entry
        .query()
        .where("date", ">=", startDate)
        .andWhere("data", "<", endDate)
        .orderBy("date");
        
    return entries;
};
