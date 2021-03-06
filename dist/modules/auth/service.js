"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.create = async (model) => {
    // Checks if user already exists
    const user = await User_1.User.query().findOne({ email: model.email });
    if (user) {
        throw "User already exists";
    }
    // Encrypts password
    model.password = bcrypt.hashSync(model.password, Number(process.env.BCRYPT_SALT_NUMBER));
    console.dir(model);
    const createdUser = await User_1.User.query().insertAndFetch(model);
    return createdUser;
};
exports.login = async (model) => {
    const user = await User_1.User.query().findOne({ email: model.email });
    if (!user) {
        throw "User not found";
    }
    const checkPassword = bcrypt.compareSync(model.password, user.password);
    if (!checkPassword) {
        throw "Invalid password";
    }
    const tokenContent = {
        email: user.email,
        id: user.id
    };
    return { token: jwt.sign(tokenContent, process.env.JWT_SECRET) };
};
exports.userId = (req) => {
    return req.session.token.id;
};
