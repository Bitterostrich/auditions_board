import { useState, useEffect } from "react";

const Add = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [currentPost, setCurrentPost] = useState(props.currentPost);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [postData, setPostData] = useState({
        postTitle: '',
        postType: '',
        postDate: '',
        postTime: '',
        postLocation: '',
        postDescription: ''
    });



    useEffect(() => {
        if (props.currentPost) {
            setPostData({
                postTitle: props.currentPost.postTitle || '',
                postType: props.currentPost.postType || '',
                postDate: props.currentPost.postDate || '',
                postTime: props.currentPost.postTime || '',
                postLocation: props.currentPost.postLocation || '',
                postDescription: props.currentPost.postDescription || ''
            });
        } else {
            setPostData({
                postTitle: '',
                postType: '',
                postDate: '',
                postTime: '',
                postLocation: '',
                postDescription: ''
            });
        }
    }, [props.currentPost]);

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setDisabled(true);

        let result = props.currentPost
            ? props.client.updatePost(props.currentPost._id, postData)
            : props.client.addPost(postData);

        result
            .then(() => {
                setDisabled(false);
                props.refreshPost();
                setPostData({
                    postTitle: '',
                    postType: '',
                    postDate: '',
                    postTime: '',
                    postLocation: '',
                    postDescription: ''
                });
            })
            .catch((error) => {
                console.error("Error adding/updating post: ", error);
                alert("There was an error");
                setDisabled(false);
            });
    };

    const cancelUpdateHandler = () => {
        setPostData({
            postTitle: '',
            postType: '',
            postDate: '',
            postTime: '',
            postLocation: '',
            postDescription: ''
        });
    };


    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                {props.currentPost ? "Update Post" : "Add Post"}
            </h2>
            <form onSubmit={submitHandler}  id="addForm" className="space-y-4">
                <div>
                    <label htmlFor="postTitle" className="block mb-2 text-sm font-medium text-gray-700">Title:</label>
                    <input 
                        type="text" 
                        name="postTitle" 
                        value={postData.postTitle}
                        onChange={handleChange} 
                        disabled={disabled}
                        
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                

                <div>
                    <label htmlFor="postType" className="block mb-2 text-sm font-medium text-gray-700">Type:</label>
                    <select 
                        type="text" 
                        name="postType" 
                        value={postData.postType}
                        onChange={handleChange}
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">[No Selection]</option>
                        <option value="Leading Role">Leading Role</option>
                        <option value="Dance">Dance</option>
                        <option value="Voice Over">Voice Over</option>
                        <option value="Extra">Extra</option>
                        <option value="Child">Child</option>
                        <option value="Animal">Animal</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="postTime" className="block mb-2 text-sm font-medium text-gray-700">Time: </label>
                    <input 
                        type ='time'
                        name="postTime" 
                        value={postData.postTime}
                        onChange={handleChange}
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div>
                    <label htmlFor="postDate" className="block mb-2 text-sm font-medium text-gray-700">Date</label>
                    <input 
                        type ='date'
                        name="postDate" 
                        value={postData.postDate}
                        onChange={handleChange}
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div>
                    <label htmlFor="postLocation" className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                    <input 
                        type="text" 
                        name="postLocation" 
                        value={postData.postLocation}
                        onChange={handleChange}
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                     />
                </div>

                <div>
                    <label htmlFor="postDescription" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                    <textarea   
                        type="text" 
                        name="postDescription"
                        value={postData.postDescription}
                        onChange={handleChange}
                        disabled={disabled}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={disabled}
                    className="text-white bg-slate-800 hover:bg-slate-600 hover:scale-x-95 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-300"
                >
                    {props.currentPost ? "Update" : "Add"}
                </button>

                {props.currentPost && (
                    <button
                        type="button"
                        onClick={cancelUpdateHandler}
                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Cancel Update
                    </button>
                )}
            </form>
        </div>
    );
};

export default Add;
