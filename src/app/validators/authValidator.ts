import { BaseValidator } from "./BaseValidator";
import * as Joi from "joi";

export class AuthValidator extends BaseValidator {
    public signInSchema = Joi.object().keys({
        email: Joi.string().email().required().label("email"),
        password: Joi.string().required().label("password")
    });

    public logInSchema = Joi.object().keys({
        email: Joi.string().email().required().label("email"),
        password: Joi.string().required().label("password")
    });

    constructor() {
        super();
    }

    public signIn<T>(model: any): Promise<T> {
        return super.validate(model, this.signInSchema);
    }

    public logIn<T>(model: any): Promise<T> {
        return super.validate(model, this.logInSchema);
    }
}
