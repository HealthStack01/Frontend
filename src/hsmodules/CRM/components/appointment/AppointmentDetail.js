import {useState, useContext, useEffect} from "react";
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
  const {control, register, reset} = useForm();
  const [edit, setEdit] = useState(false);
  const [detail, setDetail] = useState({});

  // console.log(detail);

  useEffect(() => {
    const appointmentDetail = state?.CRMAppointmentModule?.selectedAppointment;
    setDetail(appointmentDetail);
    //console.log(appointmentDetail);
    reset(appointmentDetail);
  }, [state.CRMAppointmentModule]);

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

  const appointmentStaffColumns = [
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
      selector: row => (row.position ? row.position : "---------"),
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
        <GlobalCustomButton onClick={() => setEdit(true)} color="secondary">
          <EditIcon fontSize="small" sx={{marginRight: "5px"}} />
          Edit Appointment
        </GlobalCustomButton>
      </Box>
      <Grid container spacing={1} pt={1}>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            label="Customer Name"
            disabled={true}
            register={register("customerName")}
            //defaultValue={detail.customerName && detail.customerName}
          />
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Input
            label="Customer Email"
            register={register("customerEmail")}
            //defaultValue={detail.customerEmail}
            disabled={true}
          />
        </Grid>

        <Grid item lg={2} md={6} sm={6} xs={12}>
          <MuiCustomDatePicker
            label="Date & Time"
            name="date"
            control={control}
            defaultValue={detail.date}
            disabled={true}
            format="DD/MM/YYYY hh:mm A	"
          />
        </Grid>

        <Grid item lg={2} md={6} sm={6} xs={12}>
          <Input
            label="Status"
            name="status"
            control={control}
            disabled={true}
            register={register("status")}
            //defaultValue={detail.status ? detail.status : "Not Specified"}
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
        <FormsHeaderText text="Staffs List" />
        <CustomTable
          title={""}
          columns={appointmentStaffColumns}
          data={detail.staffs || []}
          pointerOnHover
          highlightOnHover
          striped
          CustomEmptyData="There are no Staff assigned to this appointment yet"
          // onRowClicked={handleRow}
          progressPending={false}
        />
      </Box>

      <Box>
        <FormsHeaderText text="Contacts List" />
        <CustomTable
          title={""}
          columns={appointmentContactColumns}
          data={detail.contacts || []}
          pointerOnHover
          highlightOnHover
          striped
          CustomEmptyData="There are no contact assigned to this appointment yet"
          // onRowClicked={handleRow}
          progressPending={false}
        />
      </Box>
    </Box>
  );
};

export default AppointmentDetail;
