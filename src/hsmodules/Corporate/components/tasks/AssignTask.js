import {useState, useContext} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import AssignmentIcon from "@mui/icons-material/Assignment";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";
//import uuid from "uuid"

const CRMAssignTask = ({closeModal}) => {
  const dealServer = client.service("deal");
  const {register, handleSubmit, reset, control} = useForm();
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const hangleGetSearchFacility = employee => {
    setSelectedEmployee(employee);
  };

  const onSubmit = async data => {
    if (selectedEmployee === null)
      return toast.error("Please search and add an Employee");

    showActionLoader();
    const employee = user.currentEmployee;

    const prevTasks = [...state.DealModule.selectedDeal.tasks];

    const taskData = {
      employee: selectedEmployee,
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
      ...data,
      createdAt: new Date(),
      taskId: uuidv4(),
    };

    const newTasks = [taskData, ...prevTasks];

    const documentId = state.DealModule.selectedDeal._id;
    await dealServer
      .patch(documentId, {tasks: newTasks})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));
        closeModal();
        toast.success(
          `You have successfully Assigned a new Task to ${selectedEmployee.firstname} ${selectedEmployee.lastname}`
        );
        //setSuccess(true);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, You weren't able to Assign a new Task!. ${err}`);
      });
  };

  return (
    <Box
      sx={{
        width: "600px",
        maxHeight: "80vh",
      }}
    >
      <Grid container spacing={2} pt={1}>
        <Grid item xs={12}>
          <EmployeeSearch getSearchfacility={hangleGetSearchFacility} />
        </Grid>

        <Grid item xs={12}>
          <Input
            important
            register={register("title", {required: true})}
            label="Title"
          />
        </Grid>

        <Grid item xs={6}>
          <CustomSelect
            //register={register("status", {required: true})}
            label="Status"
            control={control}
            name="status"
            required
            options={["Open", "Closed", "Pending"]}
            important
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={6}>
          <CustomSelect
            //register={register("priority", {required: true})}
            label="Priority"
            name="priority"
            control={control}
            options={["High", "Medium", "Low", "Urgent", "Non-Urgent"]}
            important
            required
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Additional Information"
            placeholder="Write here..."
            register={register("information", {required: true})}
            important
          />
        </Grid>
      </Grid>

      <Box mt={1}>
        <GlobalCustomButton
          sx={{
            marginRight: "10px",
          }}
          color="success"
          onClick={handleSubmit(onSubmit)}
        >
          <AssignmentIcon fontSize="small" sx={{marginRight: "5px"}} />
          Complete Assignment
        </GlobalCustomButton>

        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default CRMAssignTask;
