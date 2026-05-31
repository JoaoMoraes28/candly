import { api } from "../api"

export interface GetUser {
  id_user: number,
  name: string,
  email: string,
  password: string
}

export interface User {
  name: string,
  email: string,
  password: string
}

export interface UserAuth {
  email: string,
  password: string
}

export interface ResponseUser {
  status_code: number
  user: GetUser[]
}

export const createUser = async (data: User): Promise<ResponseUser> => {
  const response = await api.post<ResponseUser>("http://localhost:3000/candly/user", data);
  return response.data;
};

export const authUser = async (data: UserAuth): Promise<ResponseUser> => {
  const response = await api.post<ResponseUser>("http://localhost:3000/candly/auth/user", data);
  if (response.data.status_code == 200) {
    localStorage.setItem("id_user", String(response.data.user[0].id_user))
  }
  return response.data;
};