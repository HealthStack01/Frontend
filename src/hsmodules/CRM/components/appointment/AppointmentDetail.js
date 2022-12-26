import {useState, useContext} from "react";
import {Box, Button, Grid} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {FacilitySearch} from "../../../helpers/FacilitySearch";
import {useForm} from "react-hook-form";
import Textarea from "../../../../components/inputs/basic/Textarea";
import MuiCustomTimePicker from "../../../../components/inputs/Date/MuiTimePicker";

import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {ObjectContext} from "../../../../context";
import CustomTable from "../../../../components/customtable";
import {FormsHeaderText} from "../../../../components/texts";
import ModalBox from "../../../../components/modal";
import EditScheduledAppointment from "./EditAppointment";
import EditIcon from "@mui/icons-material/Edit";

const AppointmentDetail = ({closeModal}) => {
  const {state} = useContext(ObjectContext);
  const {control, register, handleSubmit} = useForm();
  const [edit, setEdit] = useState(false);

  const detail = state?.CRMAppointmentModule?.selectedAppointment;

  console.log(detail);

  const onSubmit = data => {
    console.log(data);
  };

  const appointmentContactColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "50px",
    },
    {
      name: "Name",
      key: "contact_name",
      description: "Enter Date",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Position",
      style: {color: "#0364FF"},
      key: "contact_position",
      description: "Enter Date",
      selector: row => row.position,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Phone No",
      style: {color: "#0364FF"},
      key: "contact_phone",
      description: "Enter Date",
      selector: row => row.phoneno,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Email",
      key: "contact_email",
      description: "Enter Date",
      selector: row => row.email,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Status",
      key: "contact_email",
      description: "Enter Date",
      selector: row => (row.active ? "Active" : "Inactive"),
      sortable: true,
      required: true,
      inputType: "STRING",
    },
  ];

  return (
    <Box sx={{width: "70vw", maxHeight: "80vh"}}>
      <ModalBox
        open={edit}
        onClose={() => setEdit(false)}
        header={`Edit Appointment for ${detail.customerName}`}
      >
        <EditScheduledAppointment closeModal={() => setEdit(false)} />
      </ModalBox>
      <Box
        sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}
        gap={1.5}
      >
        {/* {!edit ? (
          <GlobalCustomButton onClick={() => setEdit(true)} color="secondary">
            Edit Appointment
          </GlobalCustomButton>
        ) : (
          <>
            {" "}
            <GlobalCustomButton color="warning" onClick={closeModal}>
              Cancel
            </GlobalCustomButton>
            <GlobalCustomButton onClick={handleSubmit(onSubmit)}>
              Update
            </GlobalCustomButton>
          </>
        )} */}
        <GlobalCustomButton onClick={() => setEdit(true)} color="secondary">
          <EditIcon fontSize="small" sx={{marginRight: "5px"}} />
          Edit Appointment
        </GlobalCustomButton>
      </Box>
      <Grid container spacing={1} pt={1}>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input label="Customer Name" defaultValue={detail.customerName} />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            label="Customer Email"
            register={register("email")}
            defaultValue={detail.customerEmail}
            disabled={true}
          />
        </Grid>

        <Grid item lg={2} md={6} sm={6} xs={12}>
          <MuiCustomDatePicker
            label="Date"
            name="date"
            control={control}
            defaultValue={detail.date}
            disabled={true}
          />
        </Grid>

        <Grid item lg={2} md={6} sm={6} xs={12}>
          <MuiCustomDatePicker
            label="Time"
            name="time"
            control={control}
            disabled={true}
            format="hh:mm A	"
            defaultValue={detail.date}
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            disabled={true}
            label="Apppointment Information"
            placeholder="Write here..."
            register={register("information")}
            defaultValue={detail.information}
          />
        </Grid>
      </Grid>
      <Box>
        <FormsHeaderText text="Contacts List" />
        <CustomTable
          title={""}
          columns={appointmentContactColumns}
          data={detail.contacts || []}
          pointerOnHover
          highlightOnHover
          striped
          // onRowClicked={handleRow}
          progressPending={false}
        />
      </Box>
    </Box>
  );
};

export default AppointmentDetail;
