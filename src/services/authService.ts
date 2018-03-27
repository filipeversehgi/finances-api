import { User } from "../models/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ITokenUser } from "../interfaces/token";
import validationError from "./validationError";

export const create = async (model) => {
    // Checks if user already exists
    const user = await User.query().findOne({email: model.email});
    if (user) {
        throw "User already exists";
    }

    // Encrypts password
    model.password = bcrypt.hashSync(model.password, process.env.BCRYPT_SALT_NUMBER);

    // Encrypted
    const createdUser = await User.query().insertAndFetch(model);
    return createdUser;

};

export const login = async (model) => {
    const user = await User.query().findOne({email: model.email});
    if (!user) {
        throw validationError(400, "User not found");
    }

    const checkPassword = bcrypt.compareSync(model.password, user.password);

    if (!checkPassword) {
        throw validationError(401, "Invalid password");
    }

    const tokenContent: ITokenUser = {
        email: user.email,
        id: user.id
    };

    return { token: jwt.sign(tokenContent, process.env.JWT_SECRET) };
};
