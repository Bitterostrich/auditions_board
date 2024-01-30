import axios from "axios";
const url = "http://localhost:3001/";


export class ApiClient {
    constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider
        this.logoutHandler = logoutHandler
    }

    async authenticatedCall(method, url, data) {
        try {
            return await axios({
                method, 
                url,
                headers: {
                    authorization: this.tokenProvider()
                },
                data, 
            })
        } catch (error) {
            if(error.response.status === 403) {
                this.logoutHandler();
                return Promise.reject()
            } else {
                throw error
            }
        }
    }

    getPosts() {
        return this.authenticatedCall("get", `${url}posts/`);
    }

    addPost(postTitle, postType, postDate, postTime, postLocation, postDescription) {
        return this.authenticatedCall("post", `${url}create/`, { postTitle, postType, postDate, postTime, postLocation, postDescription })
    }

    deletePost(id) {
        return this.authenticatedCall("delete", `${url}delete/${id}`)
    }

    updatePost(id, postTitle, postType, postDate, postTime, postLocation, postDescription) {
        return this.authenticatedCall("patch", `${url}update/${id}`, { postTitle, postType, postDate, postTime, postLocation, postDescription })
    }



    async login(username, password) {
        return await axios({
            method: "post",
            url: `${url}login`,
            data: {username, password}
        })
    }

    
    // async register(username, password) {
    //     return await axios({
    //         method: "post",
    //         url: `${url}register`,
    //         data: {username, password}
    //     })
    // }

}