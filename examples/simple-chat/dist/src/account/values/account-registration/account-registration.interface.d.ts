import { DateTime } from "@swindle/core";
import { TagInterface, UsernameInterface } from "../values.well";
export interface AccountRegistrationInterface {
    /**
     * age()
     *
     * gets the age of the registrant.
     */
    age(): number;
    /**
     * dob()
     *
     * gets the date of birth.
     */
    dob(): DateTime;
    /**
     * tag()
     *
     * gets the tag.
     */
    tag(): TagInterface;
    /**
     * username()
     *
     * gets the username.
     */
    username(): UsernameInterface;
}
//# sourceMappingURL=account-registration.interface.d.ts.map