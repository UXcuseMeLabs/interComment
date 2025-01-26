import { HelixUser } from "@twurple/api";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserProviderProps {
    children: ReactNode;
  }

const UserContext = createContext<{
    user: HelixUser | null;
    handleUser: (user: HelixUser | null ) => void;
}>({
    user: null,
    handleUser: () => {},
});


export const useUser = () => useContext(UserContext);


export function UserProvider({children}: UserProviderProps ) {
    const [user, setUser] = useState<HelixUser | null>(null);

    const handleUser = (user: HelixUser | null) => {
        setUser(user);
    }
    return (
        <UserContext value={{user, handleUser}}>
            {children}
        </UserContext>
        
    )
}

