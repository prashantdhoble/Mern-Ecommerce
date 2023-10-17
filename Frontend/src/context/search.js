
import { useState, useContext, createContext} from "react";


const SearchContext = createContext()


const SearchProvider = ({children}) =>{
    const [auth, setAuth] =useState({
        //initally the user is null and token is also empty
        keyword:"",
        result: []
    })

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}

// custom hooks

const useSearch =() => useContext(SearchContext)
export {useSearch, SearchProvider}