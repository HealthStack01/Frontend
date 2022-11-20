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

import {getContactColumns, getStaffColumns} from "../colums/columns";

const LeadsCreate = ({closeModal}) => {
  const {register, handleSubmit, control} = useForm();
  const [contactModal, setContactModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleAddContact = contact => {
    setContacts(prev => [contact, ...prev]);
  };

  const handleRemoveContact = contact => {
    setContacts(prev =>
      prev.filter(item => item.contact_name !== contact.contact_name)
    );
  };

  const handleSelectedStaff = staff => {
    setSelectedStaff(staff);
  };

  const handleAddStaff = () => {
    setStaffs(prev => [selectedStaff, ...prev]);
    setSelectedStaff(null);
  };

  const handleRemoveStaff = staff => {
    setStaffs(prev => prev.filter(item => item._id !== staff._id));
  };

  const staffColumns = getStaffColumns(handleRemoveStaff);

  const contactColumns = getContactColumns(handleRemoveContact);

  const onSubmit = data => {
    console.log(data);
  };

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

          {/* ***************************************************************************************** */}

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
              register={register("deal_probability", {required: true})}
              label="Probability of deal"
              //placeholder="Enter customer name"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              register={register("deal_size", {required: true})}
              label="Size of deal"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>

        {/* ***************************************************************************************** */}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              register={register("deal_status", {required: true})}
              label="Deal Status"
              options={["Open", "Closed", "Pending"]}
              defaultValue="Open"
              // placeholder="Enter customer name"
            />
          </Grid>

          <Grid item xs={6}>
            <CustomSelect
              register={register("deal_next_action", {required: true})}
              label="Next Action"
              options={["First", "Second", "Third", "Fourth"]}
              defaultValue="First"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Input
              register={register("weight_forcast", {required: true})}
              label="Weight Forcast"
              //placeholder="Enter customer number"
            />
          </Grid>
          <Grid item xs={4}>
            <MuiCustomDatePicker
              label="Closing Date"
              name="closing_date"
              control={control}
            />
          </Grid>

          <Grid item xs={4}>
            <MuiCustomDatePicker
              label="Submission Date"
              name="submission_date"
              control={control}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Textarea
              label="Additional Information"
              placeholder="Write here..."
              register={register("additional_info")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormsHeaderText text="Staff Details" />
          <Button
            sx={{textTransform: "capitalize"}}
            variant="contained"
            onClick={handleAddStaff}
            size="small"
            disabled={!selectedStaff}
          >
            <AddCircleOutlineOutlinedIcon />
            Add Staff
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EmployeeSearch getSearchfacility={handleSelectedStaff} />
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
          size="small"
          sx={{
            textTransform: "capitalize",
            marginRight: "15px",
          }}
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{textTransform: "capitalize"}}
          onClick={handleSubmit(onSubmit)}
          size="small"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default LeadsCreate;
