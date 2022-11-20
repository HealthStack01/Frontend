import axios from "axios"

const token = "4865616c7468737461636b"

export default axios.create({
    baseURL: "https://walletdemo.remita.net/api",
    headers: {
      "Content-type": "application/json",
       Authorization: `Bearer ${token}`
    },
  });