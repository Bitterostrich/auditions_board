"use client";
import { useState } from "react";
import Link from "next/link";
import {useRouter} from 'next/router';
import {useApiClient} from '../../contexts/ApiClientContext'

const Register = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordStrengthClass, setPasswordStrengthClass] = useState("")
  const [progressBarClass, setProgressBarClass] = useState("");
  const [progressBarWidth, setProgressBarWidth] = useState(0)
  const router = useRouter()
  const {client, register} = useApiClient()

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    console.log("Client object:", props.client);
 
    client.register(e.target.username.value, e.target.password.value)
      .then((response) => {
        setDisabled(false);
        localStorage.setItem("token", response.data.token);
        router.push('/landing')
      })
      .catch(() => {
        alert("An error occurred");
        setDisabled(false);
      });
  };



    
  const strength = {
    1: "weak",
    2: "medium",
    3: "strong",
  };


  const getIndicator = (password, strengthValue) => {
    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!strengthValue.upper && char >= 65 && char <= 90) {
        strengthValue.upper = true;
      } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
        strengthValue.numbers = true;
      } else if (!strengthValue.lower && char >= 97 && char <= 122) {
        strengthValue.lower = true;
      }
    }
    let strengthIndicator = 0;
    for (let metric in strengthValue) {
      if (strengthValue[metric] === true) {
        strengthIndicator++;
      }
    }
    return strength[strengthIndicator] ?? "";
  };


  const getStrength = (password) => {
    let strengthValue = {
      upper: false,
      numbers: false,
      lower: false,
    };
    return getIndicator(password, strengthValue);
  };
  
  const handleChange = (e) => {
    const password = e.target.value;
    const strengthText = getStrength(password);
    setPasswordStrength(`${strengthText} Password`);
    updateProgressBar(strengthText);
  };

  const updateProgressBar = (strengthText) => {
    let width, className;
    switch (strengthText) {
      case "weak":
        width = 33;
        className = "bg-weak";
        break;
      case "medium":
        width = 66;
        className = "bg-medium";
        break;
      case "strong":
        width = 100;
        className = "bg-strong";
        break;
      default:
        width = 0;
        className = "";
    }
    setProgressBarClass(className);
    setProgressBarWidth(width);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Sign up to apply for roles!
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={disabled}
            />
          </div>
         
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled={disabled}
            />
          </div>
          <div 
          className={`h-2.5 rounded-full progress-bar ${progressBarClass}`} style={{ width: `${progressBarWidth}%` }}></div>
          <div className="flex justify-between items-center">
                    <button 
                        type="submit" 
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-300"
                        disabled={disabled}
                    >
                        Register
                    </button>

                    <Link 
                    className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-300"
                    href="/login">
                   Login</Link>
                    </div>
        </form>
        {/* <button onClick={props.toggleView}>Don't have an account?
                    <Link href="/register"> Sign Up</Link></button> */}
      </div>
    </div>
  );
};

export default Register;
