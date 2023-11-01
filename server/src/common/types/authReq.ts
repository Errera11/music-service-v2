import {SignTokenDTO} from "./token";

export interface AuthReq extends Request {
    readonly headers: Headers & {
        user?: SignTokenDTO
    }
}