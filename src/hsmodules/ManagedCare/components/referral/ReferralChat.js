import { useState, useContext, useCallback, useEffect } from "react";
import { Box } from "@mui/system";
import { v4 as uuidv4 } from "uuid";

import ChatInterface from "../../../../components/chat/ChatInterface";
import { ObjectContext, UserContext } from "../../../../context";
import dayjs from "dayjs";
import client from "../../../../feathers";
import moment from "moment";
import { toast } from "react-toastify";

const ReferralChat = ({ closeChat }) => {
  const referralServer = client.service("referral");
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const [sendingMsg, setSendingMsg] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  //const [prevM]

  const getChatMessages = useCallback(async () => {
    const id = state.ReferralModule.selectedReferral._id;
    await referralServer
      .get(id)
      .then((resp) => {
        //console.log(resp);
        setMessages(resp.convo || []);
      })
      .catch((err) => {
        //toast.error("There was an error getting messages for this chat");
        console.log(err);
      });
  }, [state.ReferralModule]);

  useEffect(() => {
    getChatMessages();

    referralServer.on("created", (obj) => getChatMessages());
    referralServer.on("updated", (obj) => getChatMessages());
    referralServer.on("patched", (obj) => getChatMessages());
    referralServer.on("removed", (obj) => getChatMessages());
  }, [getChatMessages]);

  const sendNewChatMessage = async () => {
    setSendingMsg(true);
    const employee = user.currentEmployee;
    const currentReferral = state.ReferralModule.selectedReferral;

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
      preAuthId: currentReferral._id,
    };

    const newChat = [...messages, messageDoc];

    const documentId = currentReferral._id;

    await referralServer
      .patch(documentId, { convo: newChat })
      .then((res) => {
        setMessage("");
        setSendingMsg(false);
        //toast.success("Message sent");
      })
      .catch((err) => {
        toast.error("Message failed");
        setSendingMsg(false);
      });
  };

  const updateMessageAsSeen = async (message) => {
    // console.log(message);
    const userId = user.currentEmployee.userId;
    const currentReferral = state.ReferralModule.selectedReferral;
    const documentId = currentReferral._id;

    const updatedMsg = { ...message, seen: [userId, ...message.seen] };

    const updatedChat = messages.map((item) => {
      if (item._id === updatedMsg._id) {
        return updatedMsg;
      } else {
        return item;
      }
    });

    await referralServer
      .patch(documentId, { convo: updatedChat })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
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

export default ReferralChat;
