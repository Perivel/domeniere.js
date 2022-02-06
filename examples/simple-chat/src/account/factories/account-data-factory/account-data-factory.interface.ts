import { AccountInterface } from "../../aggregates/aggregates.well";
import { AccountData } from "../../data/account.data";


export interface AccountDataFactoryInterface {
    
    /**
     * createFromAccountObject()
     * 
     * creates an account data instance from an Account aggregate.
     * @param object the account object
     */
    
    createFromAccountObject(object: AccountInterface): AccountData;
}