import { useForm } from "react-hook-form"
import { useAuthUser } from "../service/hook/user/userHook"

import type { UserAuth } from "../service/user/user.service"
import { Link, useNavigate } from "react-router-dom"

export const classNameContainer: string = "flex justify-center items-center bg-blue-200/70 w-screen h-screen font-serif"

export function Login() {
    const { mutate: onAuthUser } = useAuthUser()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserAuth>()

    function sendData(data: UserAuth) {
        onAuthUser(
            data,
            {
                onSuccess: () => {
                    navigate("/candys")

                }, onError: (error) => {
                    if (String(error).includes("401")) {
                        alert("Email ou senha incorreto!")
                    }
                }
            }
        )
    }

    return (
        <div className={classNameContainer}>
            <main className="w-[90%] h-[50%]">
                <form onSubmit={handleSubmit(sendData)} className="flex flex-col bg-white w-full h-full rounded-xl px-6">
                    <header className="text-2xl text-blue-950 font-semibold h-20 text-center pt-5">Candly</header>
                    <div className="w-full flex flex-col grow pt-10 gap-6">
                        <div className="w-full flex flex-col justify-center h-20">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" {...register("email", { required: "Email obrigatório" })}
                                className="outline-0 w-full h-8 px-2 border border-blue-500 rounded-md" />
                            {errors.email?.message && <p className="text-sm text-red-400 italic">{errors.email.message}</p>}
                        </div>
                        <div className="w-full flex flex-col justify-center h-20">
                            <label htmlFor="pass">Senha</label>
                            <input id="pass" type="password" {...register("password", { required: "Senha obrigatório" })}
                                className="outline-0 w-full h-8 px-2 border border-blue-500 rounded-md" />
                            {errors.password?.message && <p className="text-sm text-red-400 italic">{errors.password.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col w-full items-center h-30 gap-8">
                        <Link to="/create-account"
                            className="w-full text-end italic underline">
                            Criar conta
                        </Link>
                        <button type="submit" className="bg-blue-700 text-white w-30 h-8 rounded-md">Login</button>
                    </div>
                </form>
            </main>
        </div>
    )
} ''