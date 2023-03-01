import {useState, useEffect, useCallback, useContext} from "react";
import {Box, Typography} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
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
        header="Send Email"
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
  const smsServer = client.service("sms");
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSMS = useCallback(async () => {
    // axios.get("https://healthstack-backend.herokuapp.com/sms").then(res => {
    //   console.log(res);
    // });
    // setLoading(true);
    // const facId = user.currentEmployee.facilityDetail._id;
    // const resp = await smsServer.find({
    //   query: {
    //     //organizationId: facId,
    //     $sort: {
    //       createdAt: -1,
    //     },
    //   },
    // });
    // console.log(resp.data);
    // //setEmails(resp.data);
    // setLoading(false);
  }, []);

  useEffect(() => {
    getSMS();
  }, [getSMS]);

  const handleSearch = val => {};

  const handleCreateNew = () => {
    showCreate();
  };

  const returnStatus = status => {
    switch (status?.toLowerCase()) {
      case "sent":
        return (
          <span style={{color: "#17935C", textTransform: "capitalize"}}>
            {status}
          </span>
        );

      case "pending":
        return (
          <span style={{color: "orange", textTransform: "capitalize"}}>
            {status}
          </span>
        );

      case "failed":
        return (
          <span style={{color: "red", textTransform: "capitalize"}}>
            {status}
          </span>
        );

      default:
        break;
    }
  };

  const emailColumns = [
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
      name: "Sent By",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          John Doe
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
      },
    },
    {
      name: "Sent From",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.from}
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
      name: "Sent To",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.to}
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
      name: "Sent At",
      key: "sn",
      description: "Enter name of Company",
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
      name: "Subject",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.subject}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
      },
    },

    {
      name: "Status",
      key: "sn",
      description: "SN",
      selector: (row, i) => returnStatus(row.status),
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
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
          <EmailIcon fontSize="small" sx={{marginRight: "5px"}} />
          Send New SMS
        </GlobalCustomButton>
      </TableMenu>
      <Box>
        <CustomTable
          title={""}
          columns={emailColumns}
          data={emails}
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
