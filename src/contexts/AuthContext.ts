import { createContext } from "react";

export interface AuthContextProps {
    authenticated: boolean,
    setAuthenticated: (val: boolean) => void
}

const AuthContext = createContext<AuthContextProps>({
    authenticated: true,
    setAuthenticated: () => { }
})

export default AuthContext;