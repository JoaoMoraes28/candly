import { useForm } from "react-hook-form"
import { classNameContainer } from "./Login"
import { Link, useNavigate } from "react-router-dom"

import { useCreateCandy } from "../service/hook/candy/candyHook"
import type { CreateCandy } from "../service/candy/candy.service"

export function CreateCandy() {
    const { mutate: onInsertCandy } = useCreateCandy()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateCandy>()

    function sendData(data: CreateCandy) {
        onInsertCandy(
            data,
            {
                onSuccess: () => {
                    alert("Doce registrado!")
                    navigate(-1)
                }, onError: () => {

                }
            }
        )
    }

    return (
        <div className={classNameContainer}>
            <main className="w-[90%] h-[70%]">
                <form onSubmit={handleSubmit(sendData)} className="flex flex-col bg-white w-full h-full rounded-xl px-6">
                    <header className="text-2xl text-blue-950 font-semibold h-20 text-center pt-5">Registrar Doce</header>
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
                        <Link to="/"
                            className="w-full text-end italic underline">
                            Voltar
                        </Link>
                        <button type="submit" className="bg-blue-700 text-white w-35 h-8 rounded-md">Registrar</button>
                    </div>
                </form>
            </main>
        </div>
    )
}