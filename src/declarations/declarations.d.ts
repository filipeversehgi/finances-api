import { ITokenUser } from '../interfaces/token';

declare module "express" {
    interface Request {
        token: ITokenUser;
    }
}