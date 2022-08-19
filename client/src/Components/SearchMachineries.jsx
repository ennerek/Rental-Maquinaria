import { FormControl, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetMachineries } from "../hooks/useGetMachineries";


export const SearchMachineries = ({setMachineries}) => {

    const [inputValue, setInputValue] = useState('');
    
    
    const state = useGetMachineries(inputValue);

    

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setMachineries(state);
    }


    return (
        <form onChange={handleOnChange}>
          <input style={{marginTop:'100px'}} value={inputValue} name="search" onChange={handleInputChange} placeholder="Buscar"/>
        </form>
    )
}

