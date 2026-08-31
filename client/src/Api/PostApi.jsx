import { api } from "./AxiosIntense";

const postApi = {
    createPost: (data) => {
        return api.post('/post/create-post', data)
    },
    getAllPosts: () => {
        return api.get('/post/all-posts')
    },
    getMyPosts: () => {
        return api.get('/post/my-posts')
    },
    updatePost: (id, data) => {
        return api.put(`/post/update-post/${id}`, data)
    }
}

export { postApi }