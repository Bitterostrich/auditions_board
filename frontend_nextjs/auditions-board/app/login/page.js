'use client'
import { useState } from "react";
import Link from 'next/link'

const Login = (props) => {
    const [disabled, setDisabled] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        props.client.login(e.target.username.value, e.target.password.value)
            .then((response) => {
                setDisabled(false);
                props.loggedIn(response.data.token);
            })
            .catch(() => {
                alert("An error occurred");
                setDisabled(false);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Login</h2>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-2">Username:</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            disabled={disabled}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            disabled={disabled}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-300"
                        disabled={disabled}
                    >
                        Login
                    </button>
                </form>
                {/* <button onClick={props.toggleView}>Don't have an account?
                    <Link href="/register"> Sign Up</Link></button> */}
            </div>
        </div>
    );
};

export default Login;