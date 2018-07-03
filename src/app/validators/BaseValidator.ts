import * as joi from "joi";

export abstract class BaseValidator {

    constructor() {}

    /**
     * Validates current schema
     */
    public validate<T>(model: any, schema: joi.ObjectSchema): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            joi.validate(model, schema, { abortEarly: false }, (err, value) => {
                if (!err) {
                    return resolve(value);
                }

                reject({
                    validationError: true,
                    message: err.details.map((d: any) => {
                        d.path = d.path.join(".");
                        return d;
                    })
                });
            });
        });
    }
}
