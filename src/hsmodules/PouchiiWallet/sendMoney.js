import api from "../../utils/api";
import { useEffect,useContext, useState } from "react";
import {UserContext, ObjectContext} from "../../context";




export default function SendMoney(){
    const {state} = useContext(ObjectContext);
    const client = state.ClientModule.selectedClient;
    const {user, setUser} = useContext(UserContext);
    // const [walletProfile,setWalletProfile] = useState([])
    const phoneNumber = '08108444864'
    
useEffect(() => {
    try {
        const res = api.get(`/profiles/${phoneNumber}`);
        console.log(res.data)
        setClientProfile(res.data);
      } catch (error) {
        console.log(error.message)
      }
},[])

const handlePayWithWallet = async () => {
    try {
        const res = await api.post(`/send-money`,{
            accountNumber: "1048324537",
            amount: 100,
            channel: "wallettoBank",
            sourceBankCode: "ADB",
            sourceAccountNumber: "2394401810",
            destBankCode: "044",
            pin: "1234",
            transRef: "50099995010011",
            phoneNumber: "+2347064907683",
            narration: "Transfer",
        });
        console.log(res.data)  
        return res.data;
      } catch (error) {
        console.log(error.message)
      }
}


  return(
          <div>
            <button onClick={handleWallet}></button>
          </div>
  )  
}