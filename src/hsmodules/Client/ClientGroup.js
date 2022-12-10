import React, {useState} from "react";
import {formatDistanceToNowStrict} from "date-fns";
import {Box} from "@mui/material";
import CustomTable from "../../components/customtable";
import GlobalCustomButton from "../../components/buttons/CustomButton";

export default function ClientGroup({list, closeModal, dupl, reg, depen}) {
  const [selectedClient, setSelectedClient] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRow = async Client => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    closeModal();
  };

  const dupClientColumns = [
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
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: row => row.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Middlle Name",
      key: "middlename",
      description: "Midlle Name",
      selector: row => (row.middlename ? row.middlename : "----------"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Last Name",
      key: "lastname",
      description: "Last Name",
      selector: row => row.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Age",
      key: "dob",
      description: "Date of Birth",
      selector: row => formatDistanceToNowStrict(new Date(row.dob)),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Gender",
      key: "gender",
      description: "Male",
      selector: row => (row.gender ? row.gender : "----------"),
      sortable: true,
      required: true,
      inputType: "SELECT_LIST",
      options: ["Male", "Female"],
    },

    {
      name: "Email",
      key: "email",
      description: "johndoe@mail.com",
      selector: row => (row.email ? row.email : "----------"),
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Phone Number",
      key: "phone",
      description: "0806478263",
      selector: row => row.phone,
      sortable: true,
      required: true,
      inputType: "PHONE",
    },

    {
      name: "Actions",
      key: "phone",
      description: "0806478263",
      selector: row => (
        <Box sx={{display: "flex"}} gap={0.5}>
          <GlobalCustomButton color="secondary" onClick={() => dupl(row)}>
            Duplicate
          </GlobalCustomButton>

          <GlobalCustomButton color="success" onClick={() => reg(row)}>
            Register
          </GlobalCustomButton>

          <GlobalCustomButton color="warning" onClick={() => depen(row)}>
            Dependent
          </GlobalCustomButton>
        </Box>
      ),
      sortable: true,
      required: true,
      inputType: "PHONE",
      width: "300px",
      center: true,
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "85vw",
          maxHeight: "80vh",
        }}
      >
        <Box>
          <CustomTable
            title={""}
            columns={dupClientColumns}
            data={list}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={loading}
          />
        </Box>
      </Box>
    </>
  );
}
