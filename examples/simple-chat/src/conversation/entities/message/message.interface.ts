import { AccountInterface } from "../../../account/account.module";
import { MessageContentInterface } from "../../values/values.well";


export interface MessageInterface {
    
    /**
     * author()
     * 
     * gets the author.
     */

    author(): AccountInterface;

    /**
     * content()
     * 
     * gets the content of the message.
     */
    
    content(): MessageContentInterface;

    /**
     * setContent()
     * 
     * sets the message content.
     * @param content the content to set
     */
    
    setContent(content: MessageContentInterface): void;
}