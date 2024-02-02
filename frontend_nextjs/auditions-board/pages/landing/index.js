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
            <div className="flex items-center px-10 py-10  mx-auto justify-between text-center">
 
            <h1 className="text-3xl dynamic-bg font-bold text-center text-gray-800 uppercase">The Auditions Board</h1>
            <button onClick={logout} className="logout-button-styles text-white bg-blue-400 p-2 rounded-lg duration-300  hover:scale-110 hover:bg-blue-600">
                    Logout
                </button>
            </div>
            
            
            
            <div className="container flex flex-cols-1md:flex-cols-2 mx-auto py-8">
                <div className="flex">
                <aside className="w-1/4 sticky top-20 self-start">
                <div className="mt-8">
                    <Add
                        client={client}
                        refreshPost={refreshPosts}
                        currentPost={current}
                    />
                </div>
                </aside>
                <div className="w-3/4 ml-8">
                
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
