import React from "react";
import { useNavigate } from "react-router-dom";
import Announcement from "../components/Announcement";
import NavBar from "../components/NavBar";

const Success = () => {
  const navigate = useNavigate();

  
  return (
    <div>
      <Announcement/>
      <NavBar/>

      Success
      <button onClick={()=>navigate('/')}>Continue Shopping</button>
    </div>
  );
};

export default Success;
