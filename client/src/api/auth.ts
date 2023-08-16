import axios from "axios";
import {User} from "@/assets/types/User";

const auth = axios.create({
    baseURL: process.env.NEXT_APP_API_URL,
})

const login = auth.post<User, any, User>('/login', {
    name
});