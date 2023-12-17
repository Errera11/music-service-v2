import {SetMetadata} from "@nestjs/common";

export const NotStrict = (notStrictRoute: boolean) => SetMetadata('notStrict', notStrictRoute)