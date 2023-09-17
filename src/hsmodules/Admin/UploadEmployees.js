import {Avatar, Box} from "@mui/material";
import {useEffect, useState} from "react";
import ExcelEmployeeUpload from "../../components/excel-upload/Employee-Upload";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../components/texts";
import CustomTable from "../../components/customtable";
import {toast} from "react-toastify";
import {returnAvatarString} from "../helpers/returnAvatarString";

const UploadEmployeesComponent = ({createEmployees}) => {
  const [uploads, setUploads] = useState([]);

  const handleCreateClients = () => {
    if (uploads.length === 0)
      return toast.error("Can't create empty list of Clients");
    createEmployees(uploads);
  };

  const employeeColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "Enter name of employee",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Image",
      key: "sn",
      description: "Enter name of employee",
      selector: row => (
        <Avatar
          src={row.imageurl}
          {...returnAvatarString(
            `${row.firstname.toUpperCase()} ${row.lastname.toUpperCase()}`
          )}
        />
      ),
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "Firstname",
      key: "firstname",
      description: "Enter firstname",
      selector: row => row.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Last Name",
      key: "lastname",
      description: "Enter lastname",
      selector: row => row.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Profession",
      key: "profession",
      description: "Enter profession",
      selector: row => row.profession,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Phone number",
      key: "phone",
      description: "Enter phone number",
      selector: row => row.phone,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Email",
      key: "email",
      description: "Enter Email",
      selector: row => row.email,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Department",
      key: "facility",
      description: "Select facility",
      selector: row => row.department,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      //   defaultValue: facilityId,
    },
    {
      name: "Department",
      key: "department",
      description: "Enter department",
      selector: row => row.department,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Department Unit",
      key: "deptunit",
      description: "Enter department",
      selector: row => row.deptunit,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];
  return (
    <Box
      sx={{
        width: "90vw",
        height: "85vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={2}
      >
        <FormsHeaderText text="List of Uploaded Employees" />
        <ExcelEmployeeUpload updateState={setUploads} />
      </Box>

      <Box
        sx={{
          height: "calc(85vh - 80px)",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <CustomTable
          title={""}
          columns={employeeColumns}
          data={uploads && uploads}
          pointerOnHover
          highlightOnHover
          striped
          // onRowClicked={handleRow}
          //conditionalRowStyles={conditionalRowStyles}
          progressPending={false}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <GlobalCustomButton color="warning" onClick={() => setUploads([])}>
          Clear Table
        </GlobalCustomButton>
        <GlobalCustomButton onClick={handleCreateClients}>
          Create Employee(s)
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default UploadEmployeesComponent;
