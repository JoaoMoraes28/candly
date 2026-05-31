import { classNameContainer } from "./Login"

import { useGetCandys } from "../service/hook/candy/candyHook"
import { useDeleteCandy } from "../service/hook/candy/candyHook"
import type { Candy } from "../service/candy/candy.service"

import Trash from "../assets/line-md_trash.svg"
import OrderBy from "../assets/tabler_arrows-sort.svg"

import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { differenceInCalendarDays, format } from "date-fns"


export function Candys() {
    const { data: onGetCandy, isLoading, isError } = useGetCandys()
    const { mutate: onDeleteCandy } = useDeleteCandy()

    const [changeOrder, setChangeOrder] = useState<boolean>(true)
    const [candys, setCandys] = useState<Candy[]>()

    function deleteCandy(id: number) {
        onDeleteCandy(
            [Number(localStorage.getItem("id_user")), id],
            {
                onSuccess: () => {
                    setCandys(candys?.filter(it => it.id_candy != id))

                }, onError: () => {
                    alert("Erro ao deletar doce!")
                }
            }
        )
    }

    function getDateValues(data: Candy) {
        const date = new Date()
        const today = date.toISOString()

        const daysRemainders = differenceInCalendarDays(data.expiration_date, today)
        return daysRemainders > 0 ? daysRemainders : 0
    }

    function getFormatedDate(date: string) {
        return format(date, "dd/MM/yyyy")
    }

    function orderArray(typeOrder: 'asc' | 'desc') {
        if (typeOrder == 'asc') {
            setCandys(candys?.sort((a, b) => a.name.localeCompare(b.name)))

        } else {
            setCandys(candys?.sort((a, b) => b.name.localeCompare(a.name)))

        }

        setChangeOrder(!changeOrder)
    }

    useEffect(() => {
        if (!isLoading && !isError) {
            setCandys(onGetCandy?.candys)
        }
    }, [onGetCandy])

    return (
        <div className={classNameContainer}>
            <main className="flex flex-col bg-white w-[90%] h-[90%] rounded-xl">
                <header className="text-blue-900 font-semibold text-2xl text-center h-20 pt-6">Doces</header>
                <div className="relative w-full h-[calc(100%-80px)]">
                    <header className="flex justify-between w-full px-4">
                        <Link to="/trash" className="flex items-center">
                            <img src={Trash} alt="" className="w-auto h-8" />
                            <span className="text-red-700 font-semibold">LIXEIRA</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-800 font-semibold">A-Z</span>
                            <button onClick={() => orderArray(changeOrder ? 'asc' : 'desc')} className="flex justify-center items-center w-8 h-8 bg-blue-800 rounded-md">
                                <img src={OrderBy} alt="" className="w-auto h-6" />
                            </button>
                        </div>
                    </header>
                    {isLoading && !isError && <p className="w-full h-full justify-center items-center flex text-xl text-blue-800 font-semibold">Carregando doces...</p>}

                    {!isLoading && isError && <p className="w-full h-full justify-center items-center flex text-xl text-red-600 font-semibold">Erro na API</p>}

                    {!isLoading && candys?.length == 0 && (
                        <div className="w-full h-full justify-center items-center pb-30 flex">
                            <p className="text-xl text-blue-950 font-semibold">Nenhum doce cadastrado!</p>
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <ul className="relative w-full max-h-full pt-4 pb-28 overflow-auto gap-6 px-4 flex flex-col items-center">
                            {candys?.map((candy) => (
                                <li
                                    key={candy.id_candy}
                                    className="w-full rounded-xl h-30 flex items-center justify-between p-4 bg-blue-200"
                                >
                                    <div className="h-full flex justify-between flex-col">
                                        <p className="font-semibold text-[14px] text-blue-800">
                                            {candy.name} ({candy.quantity} un)
                                        </p>
                                        <span className={`text-[12px] font-sans ${getDateValues(candy) <= 4 ? 'text-red-500' : ""}`}>Validade: {getFormatedDate(candy.expiration_date)} <br /> {getDateValues(candy)} dias restante(s)</span>
                                    </div>

                                    <div className="flex flex-col items-end h-full justify-between">
                                        <Link
                                            to={`/update-candy/${candy.id_candy}`}
                                            className="bg-white rounded-md w-24 text-[12px] h-6 flex justify-center items-center"
                                        >
                                            Atualizar doce
                                        </Link>
                                        <button onClick={() => deleteCandy(candy.id_candy)}>
                                            <img src={Trash} alt="" className="w-auto h-6" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="absolute w-full bottom-0 bg-white flex justify-center h-25 items-center rounded-b-xl">
                        <Link to="/create-candy"
                            className="bg-blue-500 text-white w-40 h-10 rounded-lg flex justify-center items-center">
                            Adicionar Doce
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}