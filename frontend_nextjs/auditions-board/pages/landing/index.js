'use client'

import React, { useState, useEffect } from "react";
import Add from "../components/Addposts";
import PostItem from "../components/PostItem";
import { useApiClient } from '../../contexts/ApiClientContext';

export default function Landing(props) {
    const [posts, setPosts] = useState([]);
    const [current, setCurrent] = useState(undefined);
    const [username, setUsername] = useState("");
    const {client, logout} = useApiClient()

    useEffect(() => {
       
        const userInfo = JSON.parse(localStorage.getItem("user"));
        if (userInfo && userInfo.username) {
            setUsername(userInfo.username);
        }
    }, []);

    const refreshPosts = () => {
        client.getPosts().then((response) => {
            setPosts(response.data);
            setCurrent(null)
        });
    };

    const removePost = (id) => {
        client.deletePost(id).then(() => {
            refreshPosts();
        });
    };

    const updatePost = (post) => {
        console.log(post)
        setCurrent(post);
    };

    useEffect(() => {
        refreshPosts();
    }, []);

    return (
        <div className="min-h-screen dynamic-bg">
            <div className=" p-5 flex border items-center md:px-10 md:py-10  mx-auto justify-between text-center">
 
            <h1 className="md:text-3xl dynamic-bg font-bold text-center text-gray-800 uppercase">The Auditions Board</h1>
            <button onClick={logout} className="logout-button-styles text-xs md:text-lg text-white bg-red-700 p-2 rounded-lg duration-300 hover:bg-red-600 hover:scale-105 ">
                    Logout
                </button>
            </div>
            
            
            
            <div className="md:container flex-col flex md:flex-row  md:flex-cols-2 md:mx-auto md:py-8">
                <div className="md:flex">
                <aside className="  md:w-1/4 md:sticky md:top-20 md:self-start">
                <div className="mt-1 ">
                    <Add
                        client={client}
                        refreshPost={refreshPosts}
                        currentPost={current}
                    />
                </div>
                </aside>
                <div className="md:w-3/4 md:ml-8">
                
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <PostItem
                            key={post._id}
                            postTitle={post.postTitle}
                            postType={post.postType}
                            postTime={post.postTime}
                            postDate={post.postDate}
                            postLocation={post.postLocation}
                            postDescription={post.postDescription}
                            onPostUpdate={() => updatePost(post)}
                            onPostDelete={() => removePost(post._id)}
                        />
                    ))}
                </div>
                    
                </div>
                
              
                </div>


            </div>
        </div>
    );
}
