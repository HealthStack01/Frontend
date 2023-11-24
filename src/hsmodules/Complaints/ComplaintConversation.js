import {useState, useRef, useCallback, useEffect, useContext} from "react";
import {Avatar, Box, Button, IconButton, Typography} from "@mui/material";
import {ThreeCircles} from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Zoom from "@mui/material/Zoom";
import SendIcon from "@mui/icons-material/Send";
import {v4 as uuidv4} from "uuid";

import GlobalCustomButton from "../../components/buttons/CustomButton";
import ExpandableSearchInput from "../../components/inputs/Search/ExpandableSearch";
import {ObjectContext, UserContext} from "../../context";
import dayjs from "dayjs";
import client from "../../feathers";
import {toast} from "react-toastify";
import EachChatMessage from "../../components/chat/EachMessage";

const ThreeCirclesSpinner = () => {
  return (
    <ThreeCircles
      height="25"
      width="25"
      color="#ffffff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
};

const ComplaintConversation = ({closeConvo}) => {
  const complaintServer = client.service("complaints");
  const notificationsServer = client.service("notification");
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [showMore, setShowMore] = useState(false);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendingMsg, setSendingMsg] = useState(false);
  const [goDownIcon, setGoDownIcon] = useState(false);
  const [complaint, setComplaint] = useState(null);
  //const [expandButton]

  const chatBoxContainerRef = useRef(null);

  const getChatMessages = useCallback(async () => {
    const id = state.ComplaintModule.selectedComplaint._id;
    if (!id) return setMessage([]);
    await complaintServer
      .get(id)
      .then(resp => {
        //console.log(resp);
        setMessages(resp.convo || []);
      })
      .catch(err => {
        //toast.error("There was an error getting messages for this chat");
        console.log(err);
      });
  }, [state.ComplaintModule]);

  const scrollToBottom = useCallback(() => {
    const scroll =
      chatBoxContainerRef.current.scrollHeight -
      chatBoxContainerRef.current.clientHeight;

    chatBoxContainerRef.current.scrollTo({
      top: scroll,
      behaviour: "smooth",
    });
  }, [chatBoxContainerRef]);

  const handleOnScroll = event => {
    const {scrollHeight, scrollTop, clientHeight} = event.target;
    const scrollPosition = scrollHeight - scrollTop - clientHeight;

    if (scrollPosition > 400) {
      setGoDownIcon(true);
    } else if (scrollPosition <= 0) {
      setGoDownIcon(false);
    }
  };

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const handleSearchChange = e => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const healthstackId = "63d275e3b40a06001641ef71";

  const sendMessage = async () => {
    setSendingMsg(true);
    const employee = user.currentEmployee;
    const facility = employee.facilityDetail;
    //const currentComplaint = state.ComplaintModule.selectedComplaint;

    const employeeFullName = `${employee.firstname} ${employee.lastname}`;

    const isHealthsack = facility.id === healthstackId;

    const healthstackResponse = `Healthstack has posted a response regarding the complaint- "${complaint?.subject}"`;

    const complaintToId = complaint.to.entity.entityId;
    const complaintFrmId = complaint.from.entity.entityId;
    const copiedIds = complaint.copied.map(item => item.entity.entityId);

    const concernedIds = [complaintToId, complaintFrmId, ...copiedIds];

    const destUserIds = concernedIds.filter(
      item => item !== employee._id && item !== facility._id
    );

    const notificationObj = {
      type: "Complaint-Message",
      title: `New Complaint Message`,
      description: isHealthsack
        ? healthstackResponse
        : `${employeeFullName} from ${facility.facilityName} sent a new message regarding the complaint "${complaint?.subject}"`,
      facilityId: facility._id,
      sender: employeeFullName,
      senderId: employee._id,
      pageUrl: complaint?._id,
      priority: "normal",
      dest_userId: concernedIds,
    };

    const messageDoc = {
      message: message,
      time: dayjs(),
      _id: uuidv4(),
      seen: [],
      status: "delivered",
      senderId: employee.userId,
      senderOrgId: facility._id,
      senderOrgName: facility.facilityName,
      dp: employee.imageurl,
      sender: employeeFullName,
      type: "text",
      complaintId: complaint._id,
    };

    const newConvo = [...messages, messageDoc];

    const documentId = complaint._id;

    await complaintServer
      .patch(documentId, {convo: newConvo})
      .then(async res => {
        setMessage("");
        setSendingMsg(false);
        await notificationsServer.create(notificationObj);
      })
      .catch(err => {
        toast.error("Message failed");
        setSendingMsg(false);
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getChatMessages();

    complaintServer.on("created", obj => getChatMessages());
    complaintServer.on("updated", obj => getChatMessages());
    complaintServer.on("patched", obj => getChatMessages());
    complaintServer.on("removed", obj => getChatMessages());
  }, [getChatMessages]);

  useEffect(() => {
    //console.log(state.ComplaintModule, "whole state ");
    setComplaint(state.ComplaintModule.selectedComplaint);
  }, [state.ComplaintModule]);

  const searchedMessages = messages.filter(message => {
    if (searchValue === "") return message;
    if (message.message?.toLowerCase().includes(searchValue.toLowerCase()))
      return message;
  });

  const currentMessages = searchValue === "" ? messages : searchedMessages;

  const updateMessageAsSeen = async message => {
    // console.log(message);
    const userId = user.currentEmployee._id;
    // const currentDeal = state.DealModule.selectedDeal;
    const documentId = complaint._id;

    const updatedMsg = {...message, seen: [userId, ...message.seen]};

    const updatedChat = messages.map(item => {
      if (item._id === updatedMsg._id) {
        return updatedMsg;
      } else {
        return item;
      }
    });

    await complaintServer
      .patch(documentId, {convo: updatedChat})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f0f0f0",
          padding: "0 15px",
        }}
      >
        <Box sx={{width: "calc(100% - 100px)"}}>
          <ExpandableSearchInput
            onChange={handleSearchChange}
            value={searchValue}
          />
        </Box>

        <IconButton onClick={closeConvo}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: "0",
          top: "50px",
          width: "100%",
          minHeight: "80px",
          backgroundColor: "#f0f0f0",
          display: "flex",
          padding: "10px",
          zIndex: "999",
          boxShadow: showMore ? 1 : 0,
        }}
        gap={0.8}
      >
        <Avatar />
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {`${complaint?.submissionby?.firstname} ${complaint?.submissionby?.lastname}`}

              <Typography
                sx={{
                  color: "#1976d2",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                }}
              >{`(${complaint?.from?.entity?.name})`}</Typography>
            </Typography>

            {complaint?.complaint?.length > 200 && (
              <GlobalCustomButton
                variant="text"
                onClick={() => setShowMore(prev => !prev)}
              >
                {showMore ? "Contract" : "Expand"}
              </GlobalCustomButton>
            )}
          </Box>

          <Box
            sx={{
              maxHeight: showMore ? "100%" : "40px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                wordBreak: "break-word",
                marginBottom: "5px",
                display: "flex",
              }}
            >
              {complaint?.complaint}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 130px)",
          backgroundColor: "#f8f8f8",
          marginTop: "85px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "calc(100% - 60px)",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px 15px",
            }}
            ref={chatBoxContainerRef}
            onScroll={handleOnScroll}
          >
            {currentMessages.map(messageItem => {
              return (
                <EachChatMessage
                  key={messageItem._id}
                  messageObj={messageItem}
                  searchValue={searchValue}
                  chatBoxContainerRef={chatBoxContainerRef}
                  markAsSeen={updateMessageAsSeen}
                />
              );
            })}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "60px",
              padding: complaint?.resolution ? "0" : "0 15px",
            }}
          >
            {complaint?.resolution ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#d3d3d3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "#036666",
                  }}
                >
                  Complaint Resolved
                </Typography>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    width: "calc(100% - 50px)",
                  }}
                >
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      sendMessage();
                    }}
                  >
                    <input
                      type="text"
                      className="chat-input-box"
                      placeholder="Enter your message..."
                      tabIndex="0"
                      value={message}
                      onChange={handleChange}
                    />
                  </form>
                </Box>

                <Button
                  onClick={sendMessage}
                  variant="contained"
                  sx={{
                    padding: 0,
                    minWidth: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                >
                  {sendingMsg ? <ThreeCirclesSpinner /> : <SendIcon />}
                </Button>
              </>
            )}
          </Box>

          <Zoom in={goDownIcon}>
            <IconButton
              sx={{
                position: "absolute",
                right: "5%",
                bottom: "10%",
                zIndex: 9999,
                backgroundColor: "#386641",
                "&:hover": {
                  backgroundColor: "#386641",
                },
                color: "#ffffff",
              }}
              onClick={scrollToBottom}
            >
              <ArrowCircleDownIcon />
            </IconButton>
          </Zoom>
        </Box>
      </Box>
    </Box>
  );
};

export default ComplaintConversation;
