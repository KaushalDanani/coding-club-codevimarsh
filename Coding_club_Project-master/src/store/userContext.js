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

const useUser = () => {
    const contextValue = useContext(UserContext);
    if (typeof contextValue === 'undefined') 
        throw new Error('Cannot access UserContext');

    return contextValue;
}

export default useUser;
export {UserProvider};