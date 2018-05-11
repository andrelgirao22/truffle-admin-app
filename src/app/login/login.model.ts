import { Account } from "../account/account.model";

export interface Login {

    account: Account
    access_token: string
    expires_in: number

}