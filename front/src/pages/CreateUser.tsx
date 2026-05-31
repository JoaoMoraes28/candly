import { useForm } from "react-hook-form"
import { useCreateUser } from "../service/hook/user/userHook"

import type { User } from "../service/user/user.service"
import { Link, useNavigate } from "react-router-dom"

const classNameContainer: string = "flex justify-center items-center bg-blue-200/70 w-screen h-screen font-serif"

export function CreateUser() {
    const { mutate: onInsertUser } = useCreateUser()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<User>()

    function sendData(data: User) {
        onInsertUser(
            data,
            {
                onSuccess: () => {
                    alert("Usuário criado!")
                    navigate(-1)
                }, onError: (error) => {
                    console.log(error)
                }
            }
        )
    }

    return (
        <div className={classNameContainer}>
            <main className="w-[90%] h-[70%]">
                <form onSubmit={handleSubmit(sendData)} className="flex flex-col bg-white w-full h-full rounded-xl px-6">
                    <header className="text-2xl text-blue-950 font-semibold h-20 text-center pt-5">Criar Usuário</header>
                    <div className="w-full flex flex-col grow pt-10 gap-6">
                        <div className="w-full flex flex-col justify-center h-22">
                            <label htmlFor="name">Nome</label>
                            <input id="name" type="text" {...register("name", { required: "Nome obrigatório" })}
                                className="outline-0 w-full h-10 px-2 border border-blue-500 rounded-md" />
                            {errors.name?.message && <p className="text-sm text-red-400 italic">{errors.name.message}</p>}
                        </div>
                        <div className="w-full flex flex-col justify-center h-22">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" {...register("email", { required: "Email obrigatório" })}
                                className="outline-0 w-full h-10 px-2 border border-blue-500 rounded-md" />
                            {errors.email?.message && <p className="text-sm text-red-400 italic">{errors.email.message}</p>}
                        </div>
                        <div className="w-full flex flex-col justify-center h-22">
                            <label htmlFor="pass">Senha</label>
                            <input id="pass" type="password" {...register("password", { required: "Senha obrigatório" })}
                                className="outline-0 w-full h-10 px-2 border border-blue-500 rounded-md" />
                            {errors.password?.message && <p className="text-sm text-red-400 italic">{errors.password.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col w-full items-center h-30 gap-8">
                        <Link to="/"
                            className="w-full text-end italic underline">
                            Voltar
                        </Link>
                        <button type="submit" className="bg-blue-700 text-white w-35 h-8 rounded-md">Criar conta</button>
                    </div>
                </form>
            </main>
        </div>
    )
} ''