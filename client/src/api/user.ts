import api from "@/api/root";
import {AxiosResponse} from "axios";
import {User} from "@/assets/types/User";

export interface IUserApiResponse {
    users: User[]
    totalCount: number
}

export interface ExtendedUserInfo {
    user: User
    userFavSongsCount: number
    userPlaylistsCount: number
}

const getAllUsers = ({skip, take}: { skip?: number, take?: number }) => api.get<AxiosResponse<IUserApiResponse>>('getUsers', {
    params: {
        skip,
        take
    }
});

const makeAdmin = ({userId}: {userId: string}) => api.put<User>('makeAdmin', {
    userId
})

const revokeAdmin = ({userId}: {userId: string}) => api.put<User>('revokeAdmin', {
    userId
})

const getUserById = ({userId}: {userId: string}) => api.get<ExtendedUserInfo>(`getUserById/${userId}`);
export const userApi = {
    getAllUsers,
    makeAdmin,
    revokeAdmin,
    getUserById
}