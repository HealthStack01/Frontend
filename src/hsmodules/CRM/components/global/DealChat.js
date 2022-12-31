import {useState, useContext, useCallback, useEffect} from "react";
import {Box} from "@mui/system";
import {v4 as uuidv4} from "uuid";

import ChatInterface from "../../../../components/chat/ChatInterface";
import {ObjectContext, UserContext} from "../../../../context";
import dayjs from "dayjs";
import client from "../../../../feathers";
import moment from "moment";
import {toast} from "react-toastify";

const GlobalDealChat = ({closeChat}) => {
  const dealServer = client.service("deal");
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [sendingMsg, setSendingMsg] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatMessages = state.DealModule.selectedDeal.chat || [];
    setMessages(chatMessages);
  }, [state.DealModule]);

  const sendNewChatMessage = async () => {
    setSendingMsg(true);
    const employee = user.currentEmployee;
    const currentDeal = state.DealModule.selectedDeal;

    const prevChat = currentDeal.chat || [];

    const messageDoc = {
      message: message,
      time: moment(),
      _id: uuidv4(),
      seen: [],
      status: "delivered",
      //senderId: "000",
      senderId: employee.userId,
      dp: "",
      sender: `${employee.firstname} ${employee.lastname}`,
      type: "text",
      dealId: currentDeal._id,
    };

    const newChat = [...prevChat, messageDoc];

    const newDealDetail = {
      ...currentDeal,
      chat: newChat,
    };

    const documentId = currentDeal._id;

    await dealServer
      .patch(documentId, {chat: newChat})
      .then(res => {
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: newDealDetail},
        }));

        setMessage("");
        setSendingMsg(false);
        toast.success("Message sent");
      })
      .catch(err => {
        toast.error("Message failed");
        setSendingMsg(false);
      });
  };

  return (
    <Box sx={{width: "100%", height: "100%"}}>
      <ChatInterface
        closeChat={closeChat}
        sendMessage={sendNewChatMessage}
        messages={messages}
        message={message}
        setMessage={setMessage}
        isSendingMessage={sendingMsg}
      />
    </Box>
  );
};

export default GlobalDealChat;
