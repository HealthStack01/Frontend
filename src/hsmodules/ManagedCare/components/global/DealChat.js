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
  //const [prevM]

  const getChatMessages = useCallback(async () => {
    const id = state.DealModule.selectedDeal._id;
    await dealServer
      .get(id)
      .then(resp => {
        //console.log(resp);
        setMessages(resp.chat || []);
      })
      .catch(err => {
        //toast.error("There was an error getting messages for this chat");
        console.log(err);
      });
  }, [state.DealModule]);

  useEffect(() => {
    getChatMessages();

    dealServer.on("created", obj => getChatMessages());
    dealServer.on("updated", obj => getChatMessages());
    dealServer.on("patched", obj => getChatMessages());
    dealServer.on("removed", obj => getChatMessages());
  }, [getChatMessages]);

  const sendNewChatMessage = async () => {
    setSendingMsg(true);
    const employee = user.currentEmployee;
    const currentDeal = state.DealModule.selectedDeal;

    const messageDoc = {
      message: message,
      time: moment(),
      _id: uuidv4(),
      seen: [],
      status: "delivered",
      //senderId: "000",
      senderId: employee.userId,
      dp: employee.imageurl,
      sender: `${employee.firstname} ${employee.lastname}`,
      type: "text",
      dealId: currentDeal._id,
    };

    const newChat = [...messages, messageDoc];

    const documentId = currentDeal._id;

    await dealServer
      .patch(documentId, {chat: newChat})
      .then(res => {
        setMessage("");
        setSendingMsg(false);
        //toast.success("Message sent");
      })
      .catch(err => {
        toast.error("Message failed");
        setSendingMsg(false);
      });
  };

  const updateMessageAsSeen = async message => {
    // console.log(message);
    const userId = user.currentEmployee.userId;
    const currentDeal = state.DealModule.selectedDeal;
    const documentId = currentDeal._id;

    const updatedMsg = {...message, seen: [userId, ...message.seen]};

    const updatedChat = messages.map(item => {
      if (item._id === updatedMsg._id) {
        return updatedMsg;
      } else {
        return item;
      }
    });

    await dealServer
      .patch(documentId, {chat: updatedChat})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
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
        markMsgAsSeen={updateMessageAsSeen}
      />
    </Box>
  );
};

export default GlobalDealChat;
