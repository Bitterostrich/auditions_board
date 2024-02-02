import React, {useState} from "react";
import Image from "next/image";

const PostItem = ({ postTitle, postTime, postType, postDate, postLocation, postDescription, onPostUpdate, onPostDelete}) => {

     
     const formattedPostDate = postDate ? new Date(postDate).toISOString().split("T")[0] : "";
     const formattedPostTime = postDate ? new Date(postDate).toISOString().split("T")[1] : ""

     const stringDate = formattedPostDate.toString()
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded =() => {
        setExpanded(!expanded);
    };

    return (



<div className="flex hover:shadow-xl transition-shadow duration-300 ">
<div className="w-3/4  p-4 mr-10flex flex-col border border-gray-200 rounded-l-lg overflow-hidden ">

<div className="bg-white mb-1">
    <h3 className="text-2xl font-semibold mb-1">{postTitle}</h3>


    <h3 className="flex font-bold text-sm">Role:  <p className="text-sm ml-1 font-normal">{postType}</p></h3>
    <h3 className="flex font-bold text-sm">Location:  <p className="text-sm ml-1 font-normal">{postLocation}</p></h3> 
   
</div>


<div className=" bg-white mb-1">
<h3 className="flex font-bold text-sm">Date: <p className="text-sm ml-1 font-normal">{stringDate}, {postTime}</p></h3> {/* convert date format to string(words)*/}

<p className="text-sm "></p>

    <div className="mb-4 text-sm">
      <h3 className="font-bold text-sm">Description:</h3> 
      {expanded ? postDescription : (postDescription ? postDescription.substring(0, 200) + '...' : "" )}
<p onClick={toggleExpanded} className="text-sm text-blue-600 cursor-pointer focus:outline-none">

{ !expanded ? 'See More' : 'See Less'}
</p> 


  
    </div>

    <div className="flex justify-between">
        <button 
            onClick={onPostUpdate} 
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
        >
            Update
        </button>
        <button 
            onClick={onPostDelete} 
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
        >
            Delete
        </button>
    </div>
</div>
</div>

<div className="w-1/4 items-center text-center  h-full bg-red-800 border rounded-r-lg ">
    <div className="border-lg p-4">
     
        <h3 className="mt-14 flex font-bold justify-center uppercase text-white text-md">Role:</h3>
        <p className="text-md mb-2 text-white font-normal">{postType}</p> 
        <button className="rounded-lg bg-blue-200 px-2 py-2 ">Apply</button>
    </div>
</div>
</div>



            
   
    );
};

export default PostItem;