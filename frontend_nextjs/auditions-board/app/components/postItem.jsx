import React, {useState} from "react";
import Image from "next/image";

const postItem = ({ postTitle, postTime, postType, postDate, postLocation, postDescription}) => {

    
     
     const formattedpostDate = postDate ? new Date(postDate).toISOString().split("T")[0] : "";
     const formattedpostTime = postDate ? new Date(postDate).toISOString().split("T")[1] : ""



    return (
        <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Title and Release Date */}
            <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold mb-1">{postTitle}</h3>
                <p className="text-sm text-gray-600 mb-4">Date: {formattedpostDate}</p>
                <p className="text-sm text-gray-600 mb-4">Time: {postTime}</p>
            </div>

{/*      
            <div className="relative">
                <Image
                    src={gameImg}
                    width={300}
                    height={200}
                    layout="responsive"
                    objectFit="cover"
                    alt={`Image for ${gameName}`}
                />

 
            </div> */}

            {/* Difficulty Dropdown and Buttons */}
            <div className="p-4 bg-white">
  


                <div className="mb-4">
                    <div className="text-sm text-gray-700">{postType}</div>
                    <div className="text-sm text-gray-700">{postLocation}</div>
                    <div className="text-sm text-gray-700">{postDescription}</div>
   
                </div>

                <div className="flex justify-between">
                    <button 
                        onClick={onUpdate} 
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                    >
                        Update
                    </button>
                    <button 
                        onClick={onDelete} 
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default postItem;