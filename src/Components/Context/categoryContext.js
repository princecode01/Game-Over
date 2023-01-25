import { createContext, useState } from "react";

export let CategoryContext= createContext(null);

export default function CategoryContextProvider(props){

   
    let [category, setCategory] = useState('');
    
    return <CategoryContext.Provider value={{category,setCategory}}>

        {props.children}

    </CategoryContext.Provider>
}