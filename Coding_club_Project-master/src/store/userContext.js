import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext);

export default useUser;
export {UserProvider};