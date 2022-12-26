import {useContext, useEffect, useState} from "react";
import {Box, Button, Chip, Grid} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {FacilitySearch} from "../../../helpers/FacilitySearch";
import {useForm} from "react-hook-form";
import Textarea from "../../../../components/inputs/basic/Textarea";
import MuiCustomTimePicker from "../../../../components/inputs/Date/MuiTimePicker";
import MuiDateTimePicker from "../../../../components/inputs/DateTime/MuiDateTimePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";
import {toast} from "react-toastify";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EditScheduledAppointment = ({closeModal}) => {
  const dealServer = client.service("deal");
  const {control, register, handleSubmit, reset} = useForm();
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [contactIds, setContactIds] = useState([]);

  const contacts = state.DealModule.selectedDeal.contacts || [];

  useEffect(() => {
    const resetData = state.CRMAppointmentModule.selectedAppointment;
    const defaultContactIds = resetData.contacts.map(item => item._id);

    reset(resetData);
    setContactIds(defaultContactIds);
  }, []);

  const handleContactChange = event => {
    const {value} = event.target;
    setContactIds(value);
  };

  const updateAppointment = async data => {
    return toast.error(
      "You can't currently update an appointment, work in progress"
    );
    showActionLoader();

    const currentDeal = state.DealModule.selectedDeal;
    const employee = user.currentEmployee;

    let document = {
      ...state.CRMAppointmentModule.selectedAppointment,
      ...data,
      updatedBy: employee.userId,
      updatedByName: `${employee.firstname} ${employee.lastname}`,
      updatedAt: new Date(),
      //status: "Pending",
    };

    const selectedContacts = contactIds.map(id => {
      const contact = contacts.find(item => item._id === id);
      return contact;
    });

    document.contacts = selectedContacts;

    const prevAppointments = currentDeal.appointments || [];

    const newAppointments = [document, ...prevAppointments];

    const documentId = currentDeal._id;
    await dealServer
      .patch(documentId, {appointments: newAppointments})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        closeModal();
        toast.success(
          `You have successfully Scheduled appointment for ${currentDeal.name}`
        );

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to Schedule Appointment. ${err}`);
      });
  };

  //console.log(contacts);

  return (
    <Box sx={{width: "550px", maxHeight: "80vh"}}>
      <Grid container spacing={2} pt={1}>
        <Grid item xs={12}>
          <Input
            label="Appointment Title"
            register={register("title", {required: true})}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl sx={{width: "100%"}}>
            <InputLabel id="demo-multiple-checkbox-label">
              Select Contacts
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={contactIds}
              onChange={handleContactChange}
              input={<OutlinedInput label="Select Contacts" />}
              renderValue={selected => (
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                  {selected.map(contactId => (
                    <Chip
                      size="small"
                      sx={{fontSize: "0.7rem"}}
                      key={contactId}
                      label={
                        contacts?.find(item => item._id === contactId).name
                      }
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {contacts.map(contact => (
                <MenuItem
                  key={contact._id}
                  value={contact._id}
                  sx={{fontSize: "0.8rem"}}
                >
                  <Checkbox
                    checked={contactIds.includes(contact._id)}
                    size="small"
                  />
                  <ListItemText
                    primaryTypographyProps={{fontSize: "0.8rem"}}
                    primary={`${contact.name} - ${contact.position}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <MuiDateTimePicker
            label="Date and Time"
            name="date"
            control={control}
            required
            important
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Reason for Appointment"
            placeholder="Write here..."
            register={register("information")}
          />
        </Grid>
      </Grid>

      <Box sx={{display: "flex", alignItems: "center"}} mt={2}>
        <GlobalCustomButton
          color="error"
          size="small"
          sx={{
            marginRight: "15px",
          }}
          onClick={closeModal}
        >
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleSubmit(updateAppointment)}>
          Update Appointment
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default EditScheduledAppointment;
