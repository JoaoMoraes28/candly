import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { CreateUser } from "./pages/CreateUser";
import { Candys } from "./pages/Candys";
import { CreateCandy } from "./pages/CreateCandy";
import { UpdateCandy } from "./pages/UpdateCandy";
import { Trash } from "./pages/Trash";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/create-account" element={<CreateUser />}></Route>
                <Route path="/candys" element={<Candys />}></Route>
                <Route path="/create-candy" element={<CreateCandy />}></Route>
                <Route path="/update-candy/:idCandy" element={<UpdateCandy />}></Route>
                <Route path="/trash" element={<Trash />}></Route>
            </Routes>
        </BrowserRouter>
    )
}