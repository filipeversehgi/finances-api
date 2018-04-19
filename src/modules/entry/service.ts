import { Entry } from "../../models/Entry";
import { ITokenUser } from "../../interfaces/token";
import * as uuidv1 from "uuid/v1";
import * as moment from "moment";
import * as _ from "lodash";
import { calcTimesInYear } from "../../functions/calcTimesInYear";
import validationError from "../../functions/validationError";

export const list = async (token: ITokenUser, startDate: string, endDate: string) => {
    const entries = await Entry
        .query()
        .where("date", ">=", startDate)
        .andWhere("date", "<", endDate)
        .orderBy("date");

    return entries;
};

async function divideIntoInstallments(model, repeat, installments = 1, period = "months", period_size = 1) {
    model.group_hash = uuidv1();

    let entries = [];

    for (let i = 0; i < installments; i++) {
        let rModel = _.cloneDeep(model);
        rModel.group_order = i + 1;
        rModel.date = moment(rModel.date).add(i * period_size, period).toISOString();
        const entry = await Entry.query().insertAndFetch(rModel);
        entries.push(entry);
    }

    return entries;
}

export const create = async (model) => {
    let entries = [];

    // Add Installments
    if (model.repeat === "installments") {
        entries = await divideIntoInstallments(model, model.repeat, model.installments, model.period, model.period_size);
    }

    // Add Fixed
    if (model.repeat === "fixed") {
        const timesInYear = calcTimesInYear(model.period, model.period_size);
        entries = await divideIntoInstallments(model, model.repeat, timesInYear, model.period, model.period_size);
    }

    // Add Single
    if (!entries.length) {
        const entry = await Entry.query().insertAndFetch(model);
        entries.push(entry);
    }

    return entries;
};

export const update = async (token: ITokenUser, model) => {
    const modelId = model.id;
    delete model.id;

    const modelAction = model.action || "";
    if (!!model.action) { delete model.action; }

    model.updated_at = new Date().toISOString();

    const entry = await Entry.query().where("id", modelId);
    const databaseRow = entry[0];

    // DELETE PROPERTIES THAT CANT BE CHANGED, BECAUSE: SECURITY
    delete model.group_hash;
    delete model.group_order;
    delete model.repeat;
    delete model.installments;
    delete model.period;
    delete model.period_size;

    if (!modelAction || !databaseRow.group_hash) {
        // 1 RECORD ONLY, UPDATE THIS ONE
        return await Entry.query()
        .patch(model)
        .where("id", "=", modelId)
        .andWhere("user_id", "=", token.id)
        .returning("*");
    }

    const editedRows = [];

    if (modelAction !== "forward" && modelAction !== "all") {
        throw validationError(400, "Invalid Action");
    }

    let filterPosition = 0;
    if (modelAction === "forward") {
        filterPosition = databaseRow.group_order;
    }

    const forwardEntries = await Entry.query()
        .where("group_hash", databaseRow.group_hash)
        .andWhere("group_order", ">=", filterPosition)
        .andWhere("user_id", "=", token.id)
        .orderBy("date", "asc");

    let forIndex = 0;
    for (let fEntry of forwardEntries) {
        let m = _.cloneDeep(model);
        m.date = moment(m.date).add(forIndex * databaseRow.period_size, databaseRow.period).toISOString();
        const result = await Entry.query()
            .patch(m)
            .where("id", "=", fEntry.id)
            .andWhere("user_id", "=", token.id)
            .returning("*");
        editedRows.push(result);
        forIndex++;
    }

    return editedRows;


};

export const destroy = async (token: ITokenUser, id, action) => {

    const entry = await Entry.query()
        .where("user_id", token.id)
        .andWhere("id", id);

    if (action === "all") {
        const result = await Entry.query()
            .delete()
            .where("user_id", token.id)
            .andWhere("group_hash", entry[0].group_hash);
        return result;
    }

    if (action === "forward") {
        const result = await Entry.query()
            .delete()
            .where("user_id", token.id)
            .andWhere("group_hash", entry[0].group_hash)
            .andWhere("group_order", ">=", entry[0].group_order);
        return result;
    }

    const result = await Entry.query()
        .delete()
        .where("user_id", token.id)
        .andWhere("id", id);
    return result;



};
