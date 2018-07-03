export interface IAccount {
    new: {
        name: string;
        type: string;
    };
    update: {
        id: string;
        name?: string;
        type?: string;
    };
}
