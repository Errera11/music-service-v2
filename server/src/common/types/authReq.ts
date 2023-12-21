import {SignTokenDTO} from "./token";

export interface AuthReq extends Request {
    user: SignTokenDTO
}