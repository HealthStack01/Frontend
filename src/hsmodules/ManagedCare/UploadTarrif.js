import {Avatar, Box} from "@mui/material";
import {useEffect, useState} from "react";
import TarrifUpload from "../../components/excel-upload/Tarrif-Upload";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../components/texts";
import CustomTable from "../../components/customtable";
import {toast} from "react-toastify";
import {returnAvatarString} from "../helpers/returnAvatarString";

const UploadTarrifComponent = ({ setServices, closeModal}) => {
  const [uploads, setUploads] = useState([]);

  const handleImportTarrif = () => {
    if (uploads.length === 0)
      return toast.error("Can't create empty list of Clients");
      setServices(uploads);
      closeModal()
  };

  const serviceColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "Enter name of employee",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
   /*  {
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
    }, */
    {
      name: "Service",
      key: "firstname",
      description: "Enter firstname",
      selector: row => row.serviceName,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Service Code",
      key: "lastname",
      description: "Enter lastname",
      selector: row => row.serviceId,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Price",
      key: "profession",
      description: "Enter profession",
      selector: row => row.price,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Fee for Service",
      key: "phone",
      description: "Enter phone number",
      selector: row => row.feeForService?  "TRUE":"FALSE",
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Capitation",
      key: "email",
      description: "Enter Email",
      selector: row => row.capitation? "TRUE":"FALSE",
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Copay",
      key: "facility",
      description: "Select facility",
      selector: row => row.coPay?  "TRUE":"FALSE",
      sortable: true,
      required: true,
      inputType: "TEXT",
      //   defaultValue: facilityId,
    },
    /* {
      name: "Department",
      key: "department",
      description: "Enter department",
      selector: row => row.department,
      sortable: true,
      required: true,
      inputType: "TEXT",
    }, */
    {
      name: "Copay Details",
      key: "deptunit",
      description: "Enter department",
      selector: row => row.copayDetail,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "PA Required",
      key: "deptunit",
      description: "Enter department",
      selector: row => row.reqPA? "TRUE":"FALSE",
      sortable: true,
      required: true,
      inputType:"TEXT",
    },
    {
      name: "Comments",
      key: "email",
      description: "Enter Email",
      selector: row => row.comments,
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
        <FormsHeaderText text="List of Uploaded Services" />
        <TarrifUpload updateState={setUploads} />
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
          columns={serviceColumns}
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
        <GlobalCustomButton onClick={handleImportTarrif}>
         Import Services
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default UploadTarrifComponent;
