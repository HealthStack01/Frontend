import axios from "axios"

const token = process.env.POUCHII_WALLET

export default axios.create({
    baseURL: "https://walletdemo.remita.net/api",
    headers: {
      "Content-type": "application/json",
       Authorization: `Bearer ${token}`
    },
  });