import {useState, useContext} from "react";
import {Box, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import GroupedRadio from "../../../../components/inputs/basic/Radio/GroupedRadio";
import EmployeeSearch from "../../../helpers/EmployeeSearch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {ObjectContext, UserContext} from "../../../../context";
import {toast} from "react-toastify";
import Textarea from "../../../../components/inputs/basic/Textarea";
import client from "../../../../feathers";
import {v4 as uuidv4} from "uuid";

const AssignClaimGroup = ({closeModal,claims, assigncomplete}) => {
  const claimsServer = client.service("claims");
  const [selectedUser, setSelectedUser] = useState(null);
  const {control, register, handleSubmit} = useForm();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);

  const handleGetSearchFacility = employee => {
    setSelectedEmployee(employee);
  };

  const onSubmit = async data => {
    if (selectedEmployee === null)
      return toast.warning("Please search and add an Employee");

      if (claims.length=0)
      return toast.warning("Please select claims to assign to employee");

    showActionLoader();
    const employee = user.currentEmployee;

    claims.forEach( async(  claim)=>{




    const prevTasks = claim.task || [];

    const taskData = {
      employee: selectedEmployee,
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
      priority: "Medium",
      status: "Open",
      title:
        data.type.toLowerCase() === "vetting" ? "Vet Claim" : "Audit Claim",
      ...data,
      createdAt: new Date(),
      taskId: uuidv4(),
    };

    const newTasks = [taskData, ...prevTasks];

    const documentId = claim._id;
    await claimsServer
      .patch(documentId, {task: newTasks})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          ClaimsModule: {...prev.ClaimsModule, selectedClaim: res},
        }));
        closeModal();
        toast.success(
          `You have successfully assigned a new task to ${selectedEmployee.firstname} ${selectedEmployee.lastname}`
        );
        //setSuccess(true);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, You weren't able to Assign a new Task!. ${err}`);
      });
    })
    toast.success("Completed assignment")
    assigncomplete()
  };

  return (
    <Box
      sx={{
        width: "600px",
      }}
    >
      <Grid container spacing={0.5} mb={2}>

        <Grid item xs={12}>
          <h2>No of Claims: {claims.length}</h2>
          <GroupedRadio
            control={control}
            label="Task Type"
            name="type"
            options={["Vetting", "Auditing"]}
          />
        </Grid>

        <Grid item xs={12}>
          <EmployeeSearch getSearchfacility={handleGetSearchFacility} />
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

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <GlobalCustomButton color="success" onClick={handleSubmit(onSubmit)}>
          Assign Claim
        </GlobalCustomButton>

        <GlobalCustomButton color="error">Cancel</GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default AssignClaimGroup;
