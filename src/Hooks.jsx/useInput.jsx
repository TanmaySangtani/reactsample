import { useState } from "react";

export const useInput = (validate)=>{
    const [didEdit, setDidEdit] = useState(false);
    const [error, setError] = useState(false);
    

    const handleOnChange = (e)=>{
        console.log('change');
        setDidEdit(true);
    }

    const handleOnBlur = (e)=>{
        console.log(didEdit && validate(e.target.value));
        setError(didEdit && !validate(e.target.value));
    }

    return {
        error, handleOnBlur, handleOnChange
    }
}

