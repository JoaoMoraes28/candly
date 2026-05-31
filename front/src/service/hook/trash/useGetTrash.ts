import { useQuery } from "@tanstack/react-query";
import { getCandysTrash } from "../../trash/trash.service";
import type { ResponseTrash } from "../../trash/trash.service";

export const useGetCandysTrash = () => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    return useQuery<ResponseTrash>({
        queryKey: ['trash'],
        queryFn: async () => {
            await delay(800)
            const response = await getCandysTrash()
            return response
        }
    });
}