import { DateTime } from "@swindle/core";
import { TagInterface, UsernameInterface } from "../../values/values.well";


export interface AccountInterface {

    /**
     * ownerAge()
     * 
     * gets the owner age.
     */

    ownerAge(): number;

    /**
     * ownerDob()
     * 
     * gets the owner date of birth.
     */

    ownerDob(): DateTime;

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
     * gets the tag.
     */

    tag(): TagInterface;

    /**
     * username()
     * 
     * gets the account username.
     */
    
    username(): UsernameInterface;
}