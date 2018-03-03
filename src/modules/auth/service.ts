import { User } from "../../models/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const saltRounds = 5;

export const create = async (model) => {
    // Checks if user already exists
    const user = await User.query().findOne({email: model.email});
    if (user) {
        throw "User already exists";
    }

    // Encrypts password
    model.password = bcrypt.hashSync(model.password, saltRounds);

    console.dir(model);

    const createdUser = await User.query().insertAndFetch(model);
    return createdUser;

};

export const login = async (model) => {
    const user = await User.query().findOne({email: model.email});
    if (!user) {
        throw "User not found";
    }

    const checkPassword = bcrypt.compareSync(model.password, user.password);

    if (!checkPassword) {
        throw "Invalid password";
    }

    return { token: jwt.sign(model, "woeijoij424234d") };
};
