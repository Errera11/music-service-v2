import {HttpException} from "@nestjs/common";

export class AuthException extends HttpException {

    constructor(property: string, constraints: string | object, status: number) {
        super(JSON.stringify(
            [
                {
                    property,
                    constraints
                }
            ]
        ), status);
    }
}