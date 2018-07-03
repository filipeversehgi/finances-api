import { Model } from "objection";

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
