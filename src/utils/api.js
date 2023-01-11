import axios from "axios"


let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrMjM0ODAzNjY0ODcxMiIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzYwMzc0ODR9.R8n7tTH3aHx8j8lk5xex5VgY4wq1Rq4XIKrNM3HdkzUViFWKW6CD_n4XUmTmqxA5d4FBgBE5QTAtHXIXeWM2RA"

export default axios.create({
    baseURL: "https://walletdemo.remita.net/api",
    headers: {
      "Content-type": "application/json",
       Authorization: `Bearer ${token}`
    },
  });