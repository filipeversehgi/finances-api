import { Entry } from "../../models/Entry";
import { ITokenUser } from "../../interfaces/token";
import * as uuidv1 from "uuid/v1";
import * as moment from "moment";
import * as _ from "lodash";

interface INewEntry {
    user_id: string;
    account_id: string;
    category_id: string;
    group_hash: string;
    group_order: number;
    description: string;
    amount: number;
    date: Date;
    type: string;
    observation?: string;
    repeat?: string;
    installments?: number;
}

export const list = async (token: ITokenUser, startDate: string, endDate: string) => {
    const entries = await Entry
        .query()
        .where("date", ">=", startDate)
        .andWhere("date", "<", endDate)
        .orderBy("date");

    return entries;
};

export const create = async (model) => {
    const entries = [];

    // Add Installments
    if (model.repeat === "installments" && !!model.installments) {
        model.group_hash = uuidv1();
        for (let i = 0; i < model.installments; i++) {
            console.log(model.date);
            let rModel = _.cloneDeep(model);
            rModel.group_order = i + 1;
            rModel.description += ` - ${rModel.group_order}/${model.installments}`;
            rModel.date = moment(rModel.date).add(i, "month").toISOString();
            const entry = await Entry.query().insertAndFetch(rModel);
            entries.push(entry);
        }
    }

    // Add Fixed
    // TODO

    // Add Single
    if (!entries.length) {
        const entry = await Entry.query().insertAndFetch(model);
        entries.push(entry);
    }

    return entries;
};

export const createMultiple = async (model) => {
    const entries = [];
    model.group_hash = uuidv1();
    for (let i of model.installments) {
        model.group_order = i;
        await Entry.query().insertAndFetch(model);
        entries.push(model);
    }
    return entries;
};
