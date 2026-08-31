import { api } from "./AxiosIntense";

const UserApi = {

    register: (data)=>{
        return api.post("/auth/register", data)
    },

    me:()=>{
        return api.get("/users/me")
    }

}

export  {UserApi}