import { User } from "../../infra/database/models/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ITokenUser } from "../../interfaces/token";
import validationError from "../../app/functions/validationError";

export const createUser = async (model) => {
    // Checks if user already exists
    const user = await User.query().findOne({ email: model.email });
    if (user) {
        throw "User already exists";
    }

    // Encrypts password
    model.password = bcrypt.hashSync(model.password, Number(process.env.BCRYPT_SALT_NUMBER));

    // Encrypted
    const createdUser = await User.query().insertAndFetch(model);
    delete createdUser.password;
    return createdUser;

};

export const login = async (model) => {
    const user = await User.query().findOne({ email: model.email });
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

// import { User } from "../../infra/database/models/User";
// import * as bcrypt from "bcryptjs";
// //import * as jwt from "jsonwebtoken";
// //import { ITokenUser } from "../../../interfaces/token";
// //import validationError from "../../../app/functions/validationError";
// import { ServiceContext, Context, Path, POST } from "typescript-rest";
// import { IUserCreationRequest } from "../../interfaces/iUser";

// @Path("/auth")
// export class AuthController {

//     @Context
//     public context: ServiceContext;

//     /**
//      * Creates a new User
//      * @param user
//      */
//     @Path("/")
//     @POST
//     public async createUser(user: IUserCreationRequest): Promise<any> {
//         // Checks if user already exists
//         const user = await User.query().findOne({ email: model.email });
//         if (user) {
//             throw "User already exists";
//         }

//         // Encrypts password
//         model.password = bcrypt.hashSync(model.password, Number(process.env.BCRYPT_SALT_NUMBER));

//         // Encrypted
//         const createdUser = await User.query().insertAndFetch(model);
//         delete createdUser.password;
//         return createdUser;
//     }

//     // @Post('/login')
//     // public async createUser(@Body() requestBody: LoginRequest): Promise<void> {
//     //     try {
//     //         const data = await authService.login(request);
//     //         this.setStatus(200);
//     //         return Promise.resolve(data);
//     //     } catch (err) {
//     //         return Promise.reject(err);
//     //     }
//     // }
// }

// // export const login = async (model) => {
// //     const user = await User.query().findOne({email: model.email});
// //     if (!user) {
// //         throw validationError(400, "User not found");
// //     }

// //     const checkPassword = bcrypt.compareSync(model.password, user.password);

// //     if (!checkPassword) {
// //         throw validationError(401, "Invalid password");
// //     }

// //     const tokenContent: ITokenUser = {
// //         email: user.email,
// //         id: user.id
// //     };

// //     return { token: jwt.sign(tokenContent, process.env.JWT_SECRET) };
// // };
