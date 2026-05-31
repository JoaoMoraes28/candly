import { api } from "../api"

export interface Trash {
    name_user: string,
    candy: string,
    date_trash: string,
    id: number
}

export interface ResponseTrash {
    status_code: number
    trash: Trash[]
}


export const getCandysTrash = async (): Promise<ResponseTrash> => {
    const response = await api.get<ResponseTrash>("http://localhost:3000/candly/trash");
    return response.data;
};