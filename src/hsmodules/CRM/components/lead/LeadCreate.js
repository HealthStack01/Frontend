import {forwardRef, useState} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import DeleteIcon from "@mui/icons-material/Delete";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ModalBox from "../../../../components/modal";
import LeadAddContact from "./AddContact";
import CustomTable from "../../../../components/customtable";
import EmployeeSearch from "../../../helpers/EmployeeSearch";

const DatePickerCustomInput = forwardRef(({value, onClick}, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    style={{
      width: "100%",
      height: "48px",
      border: "1.5px solid #BBBBBB",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      margin: "0.75rem 0",
      fontSize: "0.85rem",
      padding: "0 15px",
      color: "#000000",
      backgroundColor: "#fff",
    }}
  >
    {value === "" ? "Pick Date" : value}
  </div>
));

const LeadsCreate = ({closeModal}) => {
  const {register} = useForm();
  const [contactModal, setContactModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const handleAddContact = contact => {
    setContacts(prev => [contact, ...prev]);
  };

  const handleRemoveContact = contact => {
    setContacts(prev =>
      prev.filter(item => item.contact_name !== contact.contact_name)
    );
  };

  const handleAddStaff = staff => {
    setStaffs(prev => [staff, ...prev]);
    console.log(staff);
  };

  const handleRemoveStaff = staff => {
    setStaffs(prev => prev.filter(item => item._id !== staff._id));
  };

  const staffColumns = [
    {
      name: "Name",
      key: "contact_name",
      description: "Enter Date",
      selector: row => `${row.firstname} ${row.lastname}`,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Profession",
      style: {color: "#0364FF"},
      key: "contact_position",
      description: "Enter Date",
      selector: row => row.profession,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Email",
      style: {color: "#0364FF"},
      key: "contact_phone",
      description: "Enter Date",
      selector: row => row.email,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Phone NO",
      key: "contact_email",
      description: "Enter Date",
      selector: row => row.phone,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Del",
      width: "50px",
      center: true,
      key: "contact_email",
      description: "Enter Date",
      selector: row => (
        <DeleteIcon
          onClick={() => handleRemoveStaff(row)}
          sx={{color: "#D12A0B"}}
          fontSize="small"
        />
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  const contactColumns = [
    // {
    //   name: "S/N",
    //   key: "sn",
    //   description: "SN",
    //   selector: row => row.sn,
    //   sortable: true,
    //   inputType: "HIDDEN",
    //   width: "60px",
    //   center: true,
    // },
    {
      name: "Name",
      key: "contact_name",
      description: "Enter Date",
      selector: row => row.contact_name,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Position",
      style: {color: "#0364FF"},
      key: "contact_position",
      description: "Enter Date",
      selector: row => row.contact_position,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Phone No",
      style: {color: "#0364FF"},
      key: "contact_phone",
      description: "Enter Date",
      selector: row => row.contact_phone,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Email",
      key: "contact_email",
      description: "Enter Date",
      selector: row => row.contact_email,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Del",
      width: "50px",
      center: true,
      key: "contact_email",
      description: "Enter Date",
      selector: row => (
        <DeleteIcon
          onClick={() => handleRemoveContact(row)}
          sx={{color: "#D12A0B"}}
          fontSize="small"
        />
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  return (
    <Box
      container
      sx={{
        width: "800px",
        height: "80vh",
      }}
    >
      {/* ********************************************USER DETAILS SECTION FOR FORM********************************************* */}
      <Box item>
        <FormsHeaderText text="Customer Details" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              register={register("customer_name", {required: true})}
              label="Customer Name"
              //placeholder="Enter customer name"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              register={register("customer_number", {required: true})}
              label="Customer Number"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>

      {/* ********************************************ADDRESS SECTION FOR FORM********************************************* */}

      <Box>
        <FormsHeaderText text="Address" />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              register={register("address", {required: true})}
              label="Residential Address"
              //placeholder="Enter customer name"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              register={register("local_govt", {required: true})}
              label="Local Government"
              //placeholder="Enter customer number"
            />
          </Grid>
          {/* </Grid> */}

          {/* ***************************************************************************************** */}

          {/* <Grid container spacing={2}> */}
          <Grid item xs={4}>
            <Input
              register={register("city", {required: true})}
              label="City"
              // placeholder="Enter customer name"
            />
          </Grid>

          <Grid item xs={4}>
            <Input
              register={register("state", {required: true})}
              label="State"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>

      <Box mb={2}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text="Contact Details" />
          <Button
            sx={{textTransform: "capitalize"}}
            variant="contained"
            onClick={() => setContactModal(true)}
            size="small"
          >
            <AddCircleOutlineOutlinedIcon fontSize="small" /> Add Contact
          </Button>
        </Box>

        <Box mt={1} mb={1}>
          <CustomTable
            title={"Contact List"}
            columns={contactColumns}
            data={contacts}
            pointerOnHover
            highlightOnHover
            striped
            //onRowClicked={handleRow}
            CustomEmptyData="You haven't added any contact yet..."
            progressPending={false}
          />
        </Box>
        <ModalBox
          open={contactModal}
          onClose={() => setContactModal(false)}
          header="Add Contact"
        >
          <LeadAddContact
            closeModal={() => setContactModal(false)}
            addContact={handleAddContact}
          />
        </ModalBox>
      </Box>

      <Box>
        <FormsHeaderText text="Lead Details" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              register={register("address", {required: true})}
              label="Probability of deal"
              //placeholder="Enter customer name"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              register={register("local_govt", {required: true})}
              label="Size of deal"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>

        {/* ***************************************************************************************** */}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              register={register("city", {required: true})}
              label="Deal Status"
              options={["Open", "Closed", "Pending"]}
              // placeholder="Enter customer name"
            />
          </Grid>

          <Grid item xs={6}>
            <CustomSelect
              register={register("state", {required: true})}
              label="Next Action"
              options={["First", "Second", "Third", "Fourth"]}
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Input
              register={register("local_govt", {required: true})}
              label="Weight Forcast"
              //placeholder="Enter customer number"
            />
          </Grid>
          <Grid item xs={4}>
            <MuiCustomDatePicker
              //format="dd/MM/yyyy"
              label="Closing Date"
            />
          </Grid>

          <Grid item xs={4}>
            <MuiCustomDatePicker
              //format="dd/MM/yyyy"
              label="Submission Date"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Textarea
              label="Additional Information"
              placeholder="Write here..."
            />
          </Grid>
        </Grid>
      </Box>

      <Box container>
        <FormsHeaderText text="Staff Details" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EmployeeSearch getSearchfacility={handleAddStaff} />
          </Grid>
        </Grid>

        <Box mt={1} mb={1}>
          <CustomTable
            title={"Contact List"}
            columns={staffColumns}
            data={staffs}
            pointerOnHover
            highlightOnHover
            striped
            //onRowClicked={handleRow}
            CustomEmptyData="You haven't added any Staffs yet..."
            progressPending={false}
          />
        </Box>
      </Box>

      <Box sx={{display: "flex", alignItems: "center"}}>
        <Button
          variant="outlined"
          color="error"
          sx={{
            width: "150px",
            height: "40px",
            textTransform: "capitalize",
            marginRight: "15px",
          }}
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{width: "150px", height: "40px", textTransform: "capitalize"}}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default LeadsCreate;
