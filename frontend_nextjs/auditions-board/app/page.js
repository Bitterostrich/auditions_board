"use client";
import { useEffect, useState } from "react";
import { ApiClient } from "@/utils/apiClient";
import Landing from "./landing/page";
import Login from "./login/page";



export default function Home() {

  const [token, setToken] = useState(null);
  // const [showLogin, setShowLogin] = useState(true);
  
  const client = new ApiClient(
    () => token, 
    () => logout())

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      localStorage.removeItem("token")
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    console.log(token)
    setToken(token);
    
  }

  const toggleView = () => {
    setShowLogin(!showLogin)
  }



  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
   <div>
      {
        token ? (
          <Landing
          client ={client}
          logout={logout}
       />
        ) : ( <Login loggedIn={(token) => login(token)} client={client}/>
        ) 
          
          // : (
          //   <Register registeredIn={(token) => register(token)} client={client} toggleView={toggleView} />
          // )
         
        // ) 
      }
   </div>
  );
}