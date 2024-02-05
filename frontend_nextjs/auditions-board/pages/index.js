"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ApiClient } from "@/utils/apiClient";
import { useApiClient } from '../contexts/ApiClientContext';
// import Landing from "../pages/landing/page"
// import Login from "../pages/login/page";




export default function Home() {

  const [token, setToken] = useState(null);
  const router = useRouter()

  
  const client = new ApiClient(
    () => token, 
    () => logout())

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      router.push('/landing')
    } else {
      router.push('/login')
 
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    console.log(token)
    setToken(token);
    router.push('/landing')
    
  }



  const toggleView = () => {
    setShowLogin(!showLogin)
  }


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push('/login')
  }

  return (
   <div>
  Redirecting....
   </div>
  );
}