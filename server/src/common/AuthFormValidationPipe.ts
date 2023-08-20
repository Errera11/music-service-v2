
import {ValidationError} from "class-validator";
import {BadRequestException, ValidationPipe} from "@nestjs/common";

export const AuthFormValidationPipe = () => new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const invalidProperty = validationErrors[0].property;
        const errMessage = Object.values(validationErrors[0].constraints)[0];
        throw new BadRequestException(JSON.stringify([{
            property: invalidProperty,
            constraints: errMessage.charAt(0).toUpperCase() + errMessage.slice(1)
        }]));
    },
})