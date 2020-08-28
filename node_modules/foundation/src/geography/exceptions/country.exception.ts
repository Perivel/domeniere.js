import { BaseException } from "../../common/common.module";


export class CountryException extends BaseException {

    constructor(message: string = "Country Error") {
        super(message);
    }
}