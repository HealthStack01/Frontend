import {useEffect, useState, useContext} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import BasicDatePicker from "../../../../components/inputs/Date";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../../components/inputs/basic/Textarea";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {ObjectContext, UserContext} from "../../../../context";
import {toast} from "react-toastify";
import client from "../../../../feathers";

const CRMTaskDetail = ({closeModal, updateTask}) => {
  const dealServer = client.service("deal");
  const {register, handleSubmit, reset, control} = useForm();
  const {state, setState, hideActionLoader, showActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [edit, setEdit] = useState(false);

  const onSubmit = data => {
    updateTask(data);
    closeModal();
    //reset(formDefaultValues);
  };

  useEffect(() => {
    const task = state.TaskModule.selectedTask;
    //console.log(task);

    reset(task);
    setSelectedEmployee(task.employee);
  }, []);

  const handeGetSearchFacility = data => {
    setSelectedEmployee(data);
  };

  const handleUpdateTask = async data => {
    if (selectedEmployee === null)
      return toast.error("Please search and add an Employee");

    showActionLoader();
    const employee = user.currentEmployee;

    const prevTasks = [...state.DealModule.selectedDeal.tasks];
    const currentTask = state.TaskModule.selectedTask;

    const udpateInfo = {
      updatedAt: new Date(),
      updatedBy: employee.userId,
      updatedByName: `${employee.firstname} ${employee.lastname}`,
    };
    //{...item, ...data, ...selectedEmployee, ...udpateInfo};

    const newTasks = prevTasks.map(item => {
      if (item.taskId === currentTask.taskId) {
        return {
          ...item,
          ...data,
          employee: {...selectedEmployee},
          ...udpateInfo,
        };
      } else {
        return item;
      }
    });

    // return console.log(newTasks);

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
        toast.success(`You have successfully Updated Task`);
        //setSuccess(true);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, You weren't able to Update Task!. ${err}`);
      });
  };

  return (
    <Box
      sx={{
        width: "600px",
        maxHeight: "80vh",
      }}
      pb={1}
    >
      <Box
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!edit ? (
          <GlobalCustomButton onClick={() => setEdit(true)}>
            Edit Details
          </GlobalCustomButton>
        ) : (
          <>
            {" "}
            <GlobalCustomButton
              sx={{
                marginRight: "10px",
              }}
              color="success"
              onClick={handleSubmit(handleUpdateTask)}
            >
              Update
            </GlobalCustomButton>
            <GlobalCustomButton
              variant="outlined"
              color="error"
              onClick={() => setEdit(false)}
            >
              Cancel
            </GlobalCustomButton>
          </>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EmployeeSearch
            id={state.TaskModule.selectedTask.employee._id}
            getSearchfacility={handeGetSearchFacility}
            setParentState={setSelectedEmployee}
            disabled={!edit}
            //disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            register={register("title", {required: true})}
            label="Title"
            disabled={!edit}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomSelect
            //register={register("type", {required: true})}
            label="Status"
            options={["Open", "Closed", "Pending"]}
            disabled={!edit}
            control={control}
            name="status"
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={6}>
          <CustomSelect
            //register={register("priority", {required: true})}
            label="Priority"
            options={["High", "Medium", "Low", "Urgent", "Non-Urgent"]}
            disabled={!edit}
            control={control}
            name="priority"
            required
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={12}>
          <Textarea
            label="Additional Information"
            placeholder="Write here..."
            register={register("information", {required: true})}
            disabled={!edit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CRMTaskDetail;
