import {useState, useContext, useCallback, useEffect} from "react";
import {Box} from "@mui/system";
import {v4 as uuidv4} from "uuid";

import ChatInterface from "../../../../components/chat/ChatInterface";
import {ObjectContext, UserContext} from "../../../../context";
import dayjs from "dayjs";
import client from "../../../../feathers";
import moment from "moment";
import {toast} from "react-toastify";

const PreAuthChat = ({closeChat}) => {
  const preAuthServer = client.service("preauth");
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [sendingMsg, setSendingMsg] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  //const [prevM]

  const getChatMessages = useCallback(async () => {
    const id = state.PreAuthModule.selectedPreAuth._id;
    await preAuthServer
      .get(id)
      .then(resp => {
        //console.log(resp);
        setMessages(resp.convo || []);
      })
      .catch(err => {
        //toast.error("There was an error getting messages for this chat");
        console.log(err);
      });
  }, [state.PreAuthModule]);

  useEffect(() => {
    getChatMessages();

    preAuthServer.on("created", obj => getChatMessages());
    preAuthServer.on("updated", obj => getChatMessages());
    preAuthServer.on("patched", obj => getChatMessages());
    preAuthServer.on("removed", obj => getChatMessages());
  }, [getChatMessages]);

  const sendNewChatMessage = async () => {
    setSendingMsg(true);
    const employee = user.currentEmployee;
    const currentPreAuth = state.PreAuthModule.selectedPreAuth;

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
      preAuthId: currentPreAuth._id,
    };

    const newChat = [...messages, messageDoc];

    const documentId = currentPreAuth._id;

    await preAuthServer
      .patch(documentId, {convo: newChat})
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
    const currentPreAuth = state.PreAuthModule.selectedPreAuth;
    const documentId = currentPreAuth._id;

    const updatedMsg = {...message, seen: [userId, ...message.seen]};

    const updatedChat = messages.map(item => {
      if (item._id === updatedMsg._id) {
        return updatedMsg;
      } else {
        return item;
      }
    });

    await preAuthServer
      .patch(documentId, {convo: updatedChat})
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

export default PreAuthChat;
