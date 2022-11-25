import axios from "axios"


export default axios.create({
    baseURL: "https://walletdemo.remita.net/api",
    // headers: {
    //   "Content-type": "application/json",
    //   //  Authorization: `Bearer ${token}`
    // },
  });