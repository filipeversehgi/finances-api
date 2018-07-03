import * as authService from "../../domain/services/auth";
import { ServiceContext, Context, Path, POST } from "typescript-rest";
import { IUserCreationRequest } from "../../interfaces/iUser";
import { Errors } from "typescript-rest";
import { AuthValidator } from "../validators/authValidator";

@Path("/auth")
export class AuthController {

    @Context
    context: ServiceContext;

    /**
     * Creates a new User
     * @param user
     */
    @Path("/")
    @POST
    public async createUser(user: IUserCreationRequest): Promise<any> {
        let body = this.context.request.body;

        try {
            await new AuthValidator().signIn(body);
            return await authService.createUser(body);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Login with existing user
     */
    @Path("/login")
    @POST
    public async login(requestBody: LoginRequest): Promise<any> {
        let body = this.context.request.body;
        try {
            await new AuthValidator().logIn(body);
            return await authService.login(body);
        } catch (err) {
            throw err;
        }
    }
}

// import { NextFunction, Request, Response, Router } from "express";
// import * as AuthService from "../../domain/services/auth";
// import joiAsPromise from "../functions/joi";
// import { AuthValidator } from "../validators/authValidator";

// export const authRouter = Router({ mergeParams: true });

// const authService = new AuthService;

// authRouter.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         await new AuthValidator().signIn(req.body);
//         const newUser = await authService.createUser(req.body);
//         res.status(200).json(newUser);
//     } catch (err) {
//         next(err);
//     }
// });

// authRouter.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         await new AuthValidator().logIn(req.body);
//         const token = await authService.login(req.body);
//         res.status(200).json(token);
//     } catch (err) {
//         next(err);
//     }
// });
