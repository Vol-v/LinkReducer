import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop, //просто функция для передачи, чтобы контекст понимал, что лигин и логаут это функции
    logout: noop,
    isAuthenticated: false
})