import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createUser } from "../../user/user.service"
import { authUser } from "../../user/user.service"
import type { User } from "../../user/user.service"
import type { UserAuth } from "../../user/user.service"

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (data: User) => createUser(data),
        
        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}

export const useAuthUser = () => {
    return useMutation({
        mutationFn: (data: UserAuth) => authUser(data),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}