import { Path, ServiceContext, Context, GET } from "typescript-rest";
import { AccountRepository } from "../../infra/repositories/account"
import { Account } from "../../infra/database/models/Account";

@Path('/v1/accounts')
export class AccountController {

    public repository: AccountRepository;

    constructor(){
        this.repository = new AccountRepository();
    }

    @Context
    context: ServiceContext;

    @Path("/")
    @GET
    public async listAccounts(): Promise<Account[]> {
        return await this.repository.list(this.context.request.token.id);
    }
}