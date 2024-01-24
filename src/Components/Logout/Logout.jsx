import React, { useEffect, useState } from 'react'

function Logout() {
    const [data, setData] = useState("");
    useEffect(()=>{
        if(localStorage.getItem('token')){
            localStorage.clear();
            setData("LOGGED OUT");
        }
        else setData("INVALID REQUEST");
    }, [])
  return (
    <div>{data}</div>
  )
}

export default Logout