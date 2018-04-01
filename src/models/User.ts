import { Model } from "objection";
import * as Joi from "joi";

export class User extends Model {
    public id: number;
    public email: string;
    public password: string;
    public recovery_token: string;
    public last_login: Date;
    public created_at: Date;
    public updated_at: Date;

    static getTableName(): string {
        return "users";
    }
}

export const userSchema = Joi.object().keys({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password")
});
