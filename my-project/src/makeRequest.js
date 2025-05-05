import axios from "axios"

const baseUrl = "https://pro2-xoka.onrender.com"

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY…Q2M30.fXPzC7qfNCgsAncR3QpoS0cV6wfczY_XjjbmIsa1klU`



export const publicRequest =  axios.create({
    baseURL:baseUrl
})



// export const privateRequest =  axios.create({
//     baseURL:baseUrl,
//     // headers:{

//     //     token:`Bearer ${token}`
//     // }
// })
