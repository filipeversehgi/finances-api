import * as express from 'express';

declare module "express" {
    interface Request {
        token: any;
    }
}