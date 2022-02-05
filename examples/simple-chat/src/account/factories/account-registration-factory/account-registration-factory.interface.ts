import { AccountRegistrationData } from "../../data/data.well";
import { AccountRegistrationInterface } from "../../values/values.well";


export interface AccountRegistrationFactoryInterface {
    
    /**
     * createFromDto()
     * 
     * creates an account registration from a DTO.
     * @param source the DTO source to create the registration from.
     */
    
    createFromDto(source: AccountRegistrationData): AccountRegistrationInterface;
}