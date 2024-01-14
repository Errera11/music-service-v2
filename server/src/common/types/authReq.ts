import {SignTokenDTO} from "./token";
import {Request} from "express";

export interface AuthReq extends Request {
    user: SignTokenDTO
}