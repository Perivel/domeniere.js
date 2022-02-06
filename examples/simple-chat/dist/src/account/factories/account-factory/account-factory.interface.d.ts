import { AccountInterface } from "../../aggregates/aggregates.well";
import { AccountRegistrationInterface, UserIdInterface } from "../../values/values.well";
export interface AccountFactoryInterface {
    /**
     * createFromRegistration()
     *
     * creates an account from a registration object.
     * @param registration the registration to create the account from.
     * @param id the user id to assign to the account.
     */
    createFromRegistration(registration: AccountRegistrationInterface, id: UserIdInterface): AccountInterface;
}
//# sourceMappingURL=account-factory.interface.d.ts.map