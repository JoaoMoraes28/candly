import { useForm } from "react-hook-form"
import { classNameContainer } from "./Login"
import { Link, useNavigate, useParams  } from "react-router-dom"

import { useUpdateCandy } from "../service/hook/candy/candyHook"
import { useGetCandy } from "../service/hook/candy/candyHook"
import type { CreateCandy } from "../service/candy/candy.service"
import type { Candy } from "../service/candy/candy.service"
import { useEffect, useState } from "react"

export function UpdateCandy() {
    const { idCandy } = useParams()

    const { mutate: onUpdateCandy } = useUpdateCandy()
    const { data: onGetCandy } = useGetCandy(Number(idCandy))

    const navigate = useNavigate()

    const [candy, setCandy] = useState<Candy>()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<CreateCandy>()

    function sendData(data: CreateCandy) {
        onUpdateCandy(
            {
                data: data,
                id_candy: candy!.id_candy
            },
            {
                onSuccess: () => {
                    alert("Doce Alterado!")
                    navigate(-1)
                }, onError: () => {

                }
            }
        )
    }

    useEffect(() => {
        if (!onGetCandy) {
            return
        }
    
        if (onGetCandy) {
            const candy = onGetCandy.candy[0]

            setCandy(candy)

            setValue("name", candy.name)
            setValue("quantity", candy.quantity)
            setValue("date", candy.expiration_date.split("T")[0])
        }
    }, [onGetCandy])

    return (
        <div className={classNameContainer}>
            <main className="w-[90%] h-[70%]">
                <form onSubmit={handleSubmit(sendData)} className="flex flex-col bg-white w-full h-full rounded-xl px-6">
                    <header className="text-2xl text-blue-950 font-semibold h-20 text-center pt-5">Atualizar Doce</header>
                    <div className="w-full flex flex-col grow pt-10 gap-6">
                        <div className="w-full flex flex-col justify-center h-22">
                            <label htmlFor="name">Doce</label>
                            <input id="name" type="text" {...register("name", { required: "Doce obrigatório" })}
                                className="outline-0 w-full h-10 px-2 border border-blue-500 rounded-md" />
                            {errors.name?.message && <p className="text-sm text-red-400 italic">{errors.name.message}</p>}
                        </div>
                        <div className="w-full flex flex-col justify-center h-22">
                            <label htmlFor="email">Quantidade</label>
                            <input id="email" type="number" {...register("quantity", { required: "Quantidade obrigatório" })}
                                className="outline-0 w-full h-10 px-2 border border-blue-500 rounded-md" />
                            {errors.quantity?.message && <p className="text-sm text-red-400 italic">{errors.quantity.message}</p>}
                        </div>
                        <div className="w-full flex flex-col justify-center h-22">
                            <label htmlFor="pass">Validade</label>
                            <input id="pass" type="date" {...register("date", { required: "Data obrigatório" })}
                                className="outline-0 w-full h-10 px-2 border border-blue-500 rounded-md" />
                            {errors.date?.message && <p className="text-sm text-red-400 italic">{errors.date.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col w-full items-center h-30 gap-8">
                        <Link to="/candys"
                            className="w-full text-end italic underline">
                            Voltar
                        </Link>
                        <button type="submit" className="bg-blue-700 text-white w-45 h-9 rounded-md">Salvar alterações</button>
                    </div>
                </form>
            </main>
        </div>
    )
}