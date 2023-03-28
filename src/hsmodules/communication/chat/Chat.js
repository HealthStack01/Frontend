import {useState, useEffect, useCallback, useContext, useRef} from "react";
import {Box} from "@mui/system";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {Button, Typography} from "@mui/material";
import Textarea from "../../../components/inputs/basic/Textarea";
import {useForm} from "react-hook-form";
import VoiceTextArea from "../../../components/inputs/basic/Textarea/VoiceInput";
import CommunicationChatStaffsList from "./components/staffs-list/staffs-list";
import Slide from "@mui/material/Slide";
import CommunicationChatsList from "./components/chat-list/chats-list";
import ChatBoard from "./components/chat-board/ChatBoard";

const CommunicationChat = () => {
  const [sideMenu, setSideMenu] = useState("chats");
  const [text, setText] = useState("");

  const containerRef = useRef(null);

  const toggleSideMenu = menu => {
    setSideMenu(menu);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 60px)",
        backgroundColor: "green",
        display: "flex",
      }}
    >
      <Box
        sx={{height: "100%", width: "400px", background: "#ffffff"}}
        ref={containerRef}
      >
        <Slide
          direction="right"
          in={sideMenu === "staffs"}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <Box sx={{height: "100%", width: "400px", background: "#ffffff"}}>
            <CommunicationChatStaffsList
              closeStaffsList={() => toggleSideMenu("chats")}
            />
          </Box>
        </Slide>

        <Slide
          direction="right"
          in={sideMenu === "chats"}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <Box sx={{height: "100%", width: "400px", background: "#ffffff"}}>
            <CommunicationChatsList
              showStaffsList={() => toggleSideMenu("staffs")}
            />
          </Box>
        </Slide>
      </Box>

      <Box
        sx={{
          width: "calc(100% - 400px)",
          height: "calc(100vh - 60px)",
          backgroundColor: "#ffffff",
          borderLeft: "1px solid #ced4da",
        }}
      >
        <ChatBoard />
      </Box>
    </Box>
  );
};

export default CommunicationChat;
