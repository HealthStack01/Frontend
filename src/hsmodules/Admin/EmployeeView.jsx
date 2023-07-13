import React, {useContext, useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
// import Button from '../../components/buttons/Button';
import GlobalCustomButton from "../../components/buttons/CustomButton";
import Input from "../../components/inputs/basic/Input";
import ViewText from "../../components/viewtext";
// import { UserContext } from '../../context';
import {UserContext, ObjectContext} from "../../context";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import BadgeIcon from "@mui/icons-material/Badge";
import client from "../../feathers";
import {yupResolver} from "@hookform/resolvers/yup";
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
  GridBox,
} from "../app/styles";
import dayjs, {Dayjs} from "dayjs";
import {Box} from "@mui/system";
import {createEmployeeSchema} from "./ui-components/schema";
import CustomSelect from "../../components/inputs/basic/Select";
import {bandTypeOptions} from "../../dummy-data";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalBox from "../../components/modal";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import ModuleList from "./ModuleList";
import EmployeeLocation from "./EmployeeLocation";
import {Avatar, IconButton} from "@mui/material";

// import { createClientSchema } from "./schema";

const EmployeeView = ({open, setOpen, employee}) => {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  // eslint-disable-next-line
  const EmployeeServ = client.service("employee");
  const [confirmDialog, setConfirmDialog] = useState(false);
  //const history = useHistory()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [updatingEmployee, setUpatingEmployee] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [locationModal, setLocationModal] = useState(false);

  // const Employee =state.EmployeeModule.selectedEmployee

  useEffect(() => {
    setValue("firstname", employee.firstname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("lastname", employee.lastname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("position", employee?.position, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("profession", employee.profession, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("phone", employee.phone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("email", employee.email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("department", employee.department, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("deptunit", employee.deptunit, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /*   setValue("EmployeeCategory", Employee.EmployeeCategory,  {
              shouldValidate: true,
              shouldDirty: true
          }) */

    return () => {};
  }, []);

  const handleCancel = async () => {
    const newEmployeeModule = {
      selectedEmployee: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      EmployeeModule: newEmployeeModule,
    }));
    //console.log(state)
  };

  const changeState = employee => {
    const newEmployeeModule = {
      selectedEmployee: employee,
      show: "create",
    };
    setState(prevstate => ({...prevstate, EmployeeModule: newEmployeeModule}));
  };

  const handleDelete = async () => {
    showActionLoader();
    //let conf=window.confirm("Are you sure you want to delete this data?")

    const dleteId = employee._id;
    //if (conf){

    EmployeeServ.remove(dleteId)
      .then(res => {
        //console.log(JSON.stringify(res))
        hideActionLoader();
        reset();
        setConfirmDialog(false);
        toast.success("Employee deleted succesfully");
        changeState({});
      })
      .catch(err => {
        // setMessage("Error deleting Employee, probable network issues "+ err )
        // setError(true)
        hideActionLoader();
        setConfirmDialog(false);
        toast.error(
          "Error deleting Employee, probable network issues or " + err
        );
      });
    // }
  };

  /* ()=> setValue("firstName", "Bill", , {
          shouldValidate: true,
          shouldDirty: true
        })) */
  const onSubmit = (data, e) => {
    e.preventDefault();
    setUpatingEmployee(true);

    setSuccess(false);
    console.log(data);
    data.facility = employee.facility;
    //console.log(data);

    EmployeeServ.patch(employee._id, data)
      .then(res => {
        setUpatingEmployee(false);
        toast.success("Employee Data succesfully updated");

        changeState(res);
      })
      .catch(err => {
        setUpatingEmployee(false);
        toast.error(
          "Error updating Employee, probable network issues or " + err
        );
      });
  };

  return (
    <PageWrapper>
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={handleDelete}
        type="danger"
        message={`Are you sure you want to delete this employee ${employee.firstname} ${employee.lastname}?`}
      />

      <ModalBox
        open={showRoles}
        onClose={() => setShowRoles(false)}
        header={`Roles for ${employee.firstname} ${employee.lastname}`}
      >
        <ModuleList handlecloseModal={() => setShowRoles(false)} />
      </ModalBox>

      <ModalBox
        open={locationModal}
        onClose={() => setLocationModal(false)}
        header={`Locations for ${employee.firstname} ${employee.lastname}`}
      >
        <EmployeeLocation handlecloseModal={() => setLocationModal(false)} />
      </ModalBox>

      <GrayWrapper>
        <ToastContainer theme="colored" />
        <Box>
          <h6 style={{fontSize: "14px"}}>Employee Detail</h6>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <IconButton>
            <Avatar
              sx={{width: 80, height: 80}}
              src={employee?.imageurl}
              //src={facility?.facilitylogo}
            />
          </IconButton>

          <Box sx={{display: "flex"}} gap={1}>
            {!editing ? (
              <>
                <GlobalCustomButton
                  disabled={editing}
                  onClick={() => {
                    setEditing(!editing);
                  }}
                >
                  <CreateIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Edit Employee
                </GlobalCustomButton>
                <GlobalCustomButton
                  color="secondary"
                  onClick={() => setShowRoles(true)}
                >
                  <BadgeIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Set Employee Roles
                </GlobalCustomButton>

                <GlobalCustomButton
                  color="secondary"
                  onClick={() => setLocationModal(true)}
                >
                  <BadgeIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Set Employee Locations
                </GlobalCustomButton>
              </>
            ) : (
              <>
                <GlobalCustomButton
                  color="warning"
                  onClick={() => setEditing(false)}
                >
                  Cancel Update
                </GlobalCustomButton>

                <GlobalCustomButton
                  onClick={handleSubmit(onSubmit)}
                  color="success"
                  type="submit"
                  loading={updatingEmployee}
                >
                  <SecurityUpdateIcon
                    fontSize="small"
                    sx={{marginRight: "5px"}}
                  />
                  Update Employee Detail
                </GlobalCustomButton>

                <GlobalCustomButton
                  onClick={() => setConfirmDialog(true)}
                  color="error"
                >
                  <DeleteIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Delete Employee
                </GlobalCustomButton>
              </>
            )}
          </Box>
        </Box>
        <form>
          <ToastContainer theme="colored" />
          <GridBox>
            {!editing ? (
              <Input
                label="First Name"
                defaultValue={employee?.firstname}
                disabled={!editing}
              />
            ) : (
              <Input
                label="First Name"
                register={register("firstname")}
                errorText={errors?.firstname?.message}
              />
            )}

            {!editing ? (
              <Input
                label="Last Name"
                defaultValue={employee?.lastname}
                disabled={!editing}
              />
            ) : (
              <Input
                label="Last Name"
                register={register("lastname")}
                errorText={errors?.lastname?.message}
              />
            )}

            {!editing ? (
              <Input
                label="Position"
                register={register("position")}
                //defaultValue={employee?.middlename}
                disabled={!editing}
              />
            ) : (
              <Input
                label="Position"
                register={register("position")}
                errorText={errors?.middlename?.message}
              />
            )}
          </GridBox>
          <GridBox>
            {!editing ? (
              <Input
                label="Profession"
                defaultValue={employee?.profession}
                disabled={!editing}
              />
            ) : (
              <Input
                label="Profession"
                register={register("profession")}
                errorText={errors?.profession?.message}
              />
            )}
            {!editing ? (
              <Input
                label="Phone Number"
                defaultValue={employee?.phone}
                disabled={!editing}
              />
            ) : (
              <Input
                label="Phone Number"
                register={register("phone")}
                errorText={errors?.phone?.message}
              />
            )}
            {!editing ? (
              <Input
                label="Email"
                defaultValue={employee?.email}
                disabled={!editing}
              />
            ) : (
              <Input
                label="Email"
                register={register("email")}
                type="email"
                errorText={errors?.email?.message}
              />
            )}
          </GridBox>
          <GridBox>
            {!editing ? (
              <Input
                label="Department"
                defaultValue={employee?.department}
                disabled={!editing}
              />
            ) : (
              <Input
                label="Department"
                register={register("department")}
                errorText={errors?.department?.message}
              />
            )}
            {!editing ? (
              <Input
                label="Department Unit"
                defaultValue={employee?.deptunit}
                disabled={!editing}
              />
            ) : (
              <Input
                label="Department Unit"
                register={register("deptunit")}
                errorText={errors?.deptunit?.message}
              />
            )}
          </GridBox>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default EmployeeView;
