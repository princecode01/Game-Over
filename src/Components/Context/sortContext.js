import { createContext, useState } from "react";


export let SortContext = createContext(null);

export default function SortContextProvider(props) {


    let [sort, setSort] = useState('');


    return <SortContext.Provider value={{ sort, setSort }}>

        {props.children}

    </SortContext.Provider>
}