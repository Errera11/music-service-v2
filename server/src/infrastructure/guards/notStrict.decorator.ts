import {SetMetadata} from "@nestjs/common";

const notStrict = (notStrictRoute: boolean) => SetMetadata('notStrict', notStrictRoute)