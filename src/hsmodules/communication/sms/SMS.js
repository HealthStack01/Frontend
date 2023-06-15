import {useState, useEffect, useCallback, useContext, useRef} from "react";
import {Box, Typography} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import client from "../../../feathers";

import {ObjectContext, UserContext} from "../../../context";
import CustomTable from "../../../components/customtable";
import dayjs from "dayjs";
import {TableMenu} from "../../../ui/styled/global";
import FilterMenu from "../../../components/utilities/FilterMenu";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import ModalBox from "../../../components/modal";
import axios from "axios";
import CommunicationSMSCreate from "./CreateSMS";

const CommunicationSMS = () => {
  const [createModal, setCreateModal] = useState(false);
  return (
    <Box p={2}>
      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Send New SMS"
      >
        <CommunicationSMSCreate closeModal={() => setCreateModal(false)} />
      </ModalBox>
      <Box>
        <CommunicationSMSList showCreate={() => setCreateModal(true)} />
      </Box>
    </Box>
  );
};

export default CommunicationSMS;

export const CommunicationSMSList = ({showCreate}) => {
  const sendSmsServer = client.service("sendsms");
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSMS = useCallback(async () => {
    setLoading(true);
    const facId = user.currentEmployee.facilityDetail._id;
    const resp = await sendSmsServer.find({
      query: {
        facilityId: facId,
        $sort: {
          createdAt: -1,
        },
      },
    });
    //console.log(resp.data);
    setMessages(resp.data);
    //setEmails(resp.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getSMS();

    sendSmsServer.on("created", obj => getSMS());
    sendSmsServer.on("updated", obj => getSMS());
    sendSmsServer.on("patched", obj => getSMS());
    sendSmsServer.on("removed", obj => getSMS());
  }, [getSMS]);

  const handleSearch = val => {};

  const handleCreateNew = () => {
    showCreate();
  };

  const messagesColumn = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },

    {
      name: "Receiver",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.receiver}
        </Typography>
      ),
      width: "120px",
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
      },
    },

    {
      name: "Time",
      key: "sn",
      description: "Enter name of Company",
      width: "120px",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {dayjs(row.createdAt).format("DD/MM/YYYY")}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#000000",
        textTransform: "capitalize",
      },
    },

    {
      name: "Delivered",
      key: "sn",
      description: "SN",
      selector: (row, i) => (row.delivered ? "Yes" : "No"),
      sortable: true,
      inputType: "HIDDEN",
      width: "120px",
    },

    {
      name: "Message",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.message}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#000000",
        textTransform: "capitalize",
      },
    },
  ];

  return (
    <Box>
      <TableMenu>
        <div style={{display: "flex", alignItems: "center"}}>
          {handleSearch && (
            <div className="inner-table">
              <FilterMenu onSearch={handleSearch} />
            </div>
          )}
          <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>SMS</h2>
        </div>

        <GlobalCustomButton onClick={handleCreateNew}>
          <SmsIcon fontSize="small" sx={{marginRight: "5px"}} />
          Send New SMS
        </GlobalCustomButton>
      </TableMenu>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 170px)",
          overflowY: "scroll",
        }}
      >
        <CustomTable
          title={""}
          columns={messagesColumn}
          data={messages}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRow}
          progressPending={loading}
          //conditionalRowStyles={conditionalRowStyles}
        />
      </Box>
    </Box>
  );
};
