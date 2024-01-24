import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import Info from "../../molecules/Info";
import axios from "axios";


function Home() {
  const [userData, setUserData] = useState({});
  const [errorState, setErrorState] = useState("");
  const handle = async () => {
    try{

        const uri = "http://localhost:3000/users/me";
        const token  = localStorage.getItem("token");
        
        const result = await axios.get(uri, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(localStorage.getItem('userData')[0]);
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
    catch(err){

        setErrorState(err.message);
    }
    
  };
  useEffect(() => {
    handle();
  }, []);

  return (
    <div className="container" id="parentContainer">
        <h2 id="heading">Profile</h2>
        {!errorState.length &&
            <>
      <Info data={userData.name} icon={"Name"}/>
      <Info data={userData.email} icon={"Email"}/>
      <Info data={userData.mobile} icon={"Mobile"} />
            </>
        }
      
      {<div className="error">{errorState}</div>}
    </div>
  );
}

export default Home;
