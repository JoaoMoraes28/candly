import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCandys } from "../../candy/candy.service";
import { getCandy } from "../../candy/candy.service";
import { createCandy } from "../../candy/candy.service";
import { updateCandy } from "../../candy/candy.service";
import { deleteCandy } from "../../candy/candy.service";
import type { ResponseCandys } from "../../candy/candy.service";
import type { ResponseCandy } from "../../candy/candy.service";
import type { CreateCandy } from "../../candy/candy.service";

export const useGetCandys = () => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    return useQuery<ResponseCandys>({
        queryKey: ['candys'],
        queryFn: async () => {
            await delay(800)
            const response = await getCandys()
            return response
        }
    });
}

export const useGetCandy = (id_candy: number) => {
    return useQuery<ResponseCandy>({
        queryKey: ['candy'],
        queryFn: async () => {
            const response = await getCandy(id_candy)
            return response
        }
    });
}

export const useCreateCandy = () => {
    return useMutation({
        mutationFn: (data: CreateCandy) => createCandy(data),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}

export const useUpdateCandy = () => {
    return useMutation({
        mutationFn: ({ data, id_candy }: { data: CreateCandy, id_candy: number }) => updateCandy(data, id_candy),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}

export const useDeleteCandy = () => {
    return useMutation({
        mutationFn: (ids: number[]) => deleteCandy(ids),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}