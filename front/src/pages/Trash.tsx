import { classNameContainer } from "./Login"

import { useGetCandysTrash } from "../service/hook/trash/useGetTrash"
import type { Trash } from "../service/trash/trash.service"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { differenceInCalendarDays, format } from "date-fns"


export function Trash() {
    const { data: onGetTrash, isLoading, isError } = useGetCandysTrash()

    const [candysTRash, setCandysTrash] = useState<Trash[]>()

    const navigate = useNavigate()

    function getDateValues(data: Trash) {
        const date = new Date()
        const today = date.toISOString()

        const daysRemainders = differenceInCalendarDays(data.date_trash, today)
        return daysRemainders > 0 ? daysRemainders : 0
    }

    function getFormatedDate(date: string) {
        return format(date, "dd/MM/yyyy")
    }

    useEffect(() => {
        if (!isLoading && !isError) {
            setCandysTrash(onGetTrash?.trash)
        }
    }, [onGetTrash])

    return (
        <div className={classNameContainer}>
            <main className="flex flex-col bg-white w-[90%] h-[90%] rounded-xl">
                <header className="text-blue-900 font-semibold text-2xl text-center h-20 pt-6">Doces excluídos</header>
                <div className="relative w-full h-[calc(100%-80px)] justify-center">
                    <header className="w-full flex justify-end px-4">
                        <button onClick={() => navigate(-1)} className="text-xl underline italic">Voltar</button>
                    </header>
                    {isLoading && !isError && <p className="w-full h-full justify-center items-center flex text-xl text-blue-800 font-semibold">Carregando doces excluídos...</p>}

                    {!isLoading && isError && <p className="w-full h-full justify-center items-center flex text-xl text-red-600 font-semibold">Erro na API</p>}

                    {!isLoading && onGetTrash!.trash.length == 0 && (
                        <div className="w-full h-full justify-center items-center pb-30 flex">
                            <p className="text-xl text-blue-950 font-semibold">Nenhum doce excluído!</p>
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <ul className="relative w-full max-h-full pt-4 pb-28 overflow-auto gap-6 px-4 flex flex-col items-center">
                            {candysTRash?.map((candy) => (
                                <li
                                    key={candy.id}
                                    className="w-full rounded-xl h-30 flex items-center justify-between p-4 bg-blue-200"
                                >
                                    <div className="h-full w-full flex justify-between flex-col">
                                        <p className="font-semibold text-[14px] text-blue-800">
                                            {candy.candy}
                                        </p>
                                        <p>Excluído por {candy.name_user}</p>
                                        <div className="w-full flex justify-between">
                                            <span className="text-[12px] font-sans">no dia {getFormatedDate(candy.date_trash.split("T")[0])}</span>
                                            <span className="text-[12px] font-sans italic">Há {getDateValues(candy)} dias atrás</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    )
}