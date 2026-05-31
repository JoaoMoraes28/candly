import { api } from "../api"

export interface Candy {
    id_candy: number
    name: string,
    quantity: number,
    expiration_date: string
    active: boolean
}

export interface CreateCandy {
    name: string,
    quantity: number,
    date: string
}

export interface ResponseCandys {
    status_code: number
    candys: Candy[]
}

export interface ResponseCandy {
    status_code: number
    candy: Candy[]
}

export interface ResponseCandyStatus {
    status_code: number
    message?: string
}

export const getCandys = async (): Promise<ResponseCandys> => {
    const response = await api.get<ResponseCandys>("http://localhost:3000/candly/candy");
    return response.data;
};

export const getCandy = async (id_candy: number): Promise<ResponseCandy> => {
    const response = await api.get<ResponseCandy>(`http://localhost:3000/candly/candy/${id_candy}`);
    return response.data;
};

export const createCandy = async (data: CreateCandy): Promise<ResponseCandyStatus> => {
    const response = await api.post<ResponseCandyStatus>("http://localhost:3000/candly/candy", data);
    return response.data;
};

export const updateCandy = async (data: CreateCandy, id_candy: number): Promise<ResponseCandy> => {
    const response = await api.put<ResponseCandy>(`http://localhost:3000/candly/candy/${id_candy}`, data);
    return response.data;
};

export const deleteCandy = async (ids: number[]): Promise<ResponseCandyStatus> => {
    const response = await api.delete<ResponseCandyStatus>(`http://localhost:3000/candly/candy`, { data: { id_user: ids[0], id_candy: ids[1] } });
    return response.data;
};