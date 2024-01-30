import { useState, useEffect } from "react";

const Add = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [currentPost, setCurrentPost] = useState(props.currentPost);

    useEffect(() => {
        setCurrentPost(props.currentPost);
    }, [props.currentPost]);

    const submitHandler = (e) => {
        e.preventDefault();
        setDisabled(true);





        const postData = {
            _id: currentPost._id,
            postTitle: e.target.postTitle.value,
            postType: e.target.postType.value,
            postDate: e.target.postDate.value,
            postTime: e.target.postTime.value,
            postLocation: e.target.postLocation.value,
            postDescription: e.target.postDescription.value

            
        };

      
        let result;
        if (currentPost) {
            result = props.client.addPost(postData);
           
        } else {
            result = props.client.updatePost(postData);
        }

        result.then(() => {
            setDisabled(false);
            document.getElementById("addForm").reset();
            props.refreshPost();
        }).catch(() => {
            alert("There was an error");
            setDisabled(false);
        });
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                {props.currentPost ? "Update Post" : "Add Post"}
            </h2>
            <form onSubmit={submitHandler} id="addForm" className="space-y-4">
                <div>
                    <label htmlFor="postTitle" className="block mb-2 text-sm font-medium text-gray-700">Title:</label>
                    <input 
                        type="text" 
                        name="postTitle" 
                        defaultValue={props.currentPost?.postTitle} 
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                

                <div>
                    <label htmlFor="postType" className="block mb-2 text-sm font-medium text-gray-700">Type:</label>
                    <select 
                        type="text" 
                        name="postType" 
                        defaultValue={props.currentPost?.postType} 
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">[No Selection]</option>
                        <option value="leading role">Leading Role</option>
                        <option value="dance">Dance</option>
                        <option value="voice over">Voice Over</option>
                        <option value="extra">Extra</option>
                        <option value="child">Child</option>
                        <option value="animal">Animal</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="postTime" className="block mb-2 text-sm font-medium text-gray-700">Time: </label>
                    <input 
                        type ='time'
                        name="postTime" 
                        defaultValue={props.currentPost?.postDate} 
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div>
                    <label htmlFor="postDate" className="block mb-2 text-sm font-medium text-gray-700">Date</label>
                    <input 
                        type ='date'
                        name="postDate" 
                        defaultValue={props.currentPost?.postTime} 
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div>
                    <label htmlFor="postLocation" className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                    <input 
                        type="text" 
                        name="postLocation" 
                        defaultValue={props.currentPost?.postLocation} 
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div>
                    <label htmlFor="postDescription" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                    <textarea   
                        type="text" 
                        name="postDescription" 
                        defaultValue={props.currentPost?.postDescription} 
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>


                {/* <div>
                    <label htmlFor="imageData" className="block mb-2 text-sm font-medium text-gray-700">Image:</label>
                    <input 
                        type="text" 
                        name="imageData" 
                        defaultValue={props.currentGame?.imageData} 
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div> */}
                <button 
                    type="submit" 
                    disabled={disabled}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-300"
                >
                    {props.currentPost ? "Update" : "Add"}
                </button>
            </form>
        </div>
    );
};

export default Add;