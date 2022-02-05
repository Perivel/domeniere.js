import { DateTime } from "@swindle/core";
import { TagInterface, UsernameInterface } from "../../values/values.well";
export interface UserInterface {
    /**
     * age()
     *
     * gets the
     */
    age(): number;
    /**
     * dob()
     *
     * gets the Date of Birth.
     */
    dob(): DateTime;
    /**
     * setUsername()
     *
     * sets the username.
     * @param username the username to set.
     */
    setUsername(username: UsernameInterface): void;
    /**
     * tag()
     *
     * gets the user tag.
     */
    tag(): TagInterface;
    /**
     * username()
     *
     * gets the username.
     */
    username(): UsernameInterface;
}
//# sourceMappingURL=user.interface.d.ts.map