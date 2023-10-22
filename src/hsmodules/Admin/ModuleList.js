import React, {useState, useContext, useEffect, useRef} from "react";
import "./modules-list.scss";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import CheckboxTree from "react-checkbox-tree";
import {useForm} from "react-hook-form";
//import {DocumentClassList} from './DocumentClass'
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {Checkbox} from "../../components/switch/styles";
import Input from "../../components/inputs/basic/Input";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {Box, Typography} from "@mui/material";
import CheckboxInput from "../../components/inputs/basic/Checkbox";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import {modulesList, actionRoles} from "./modulelist-data";

import "react-checkbox-tree/lib/react-checkbox-tree.css";

export default function ModuleList({handlecloseModal}) {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const EmployeeServ = client.service("employee");
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const prevRoles = state.EmployeeModule.selectedEmployee.roles;

  //console.log(prevRoles);

  const [checked, setChecked] = useState([...prevRoles]);
  const [expanded, setExpanded] = useState([]);
  // eslint-disable-next-line
  const mList = [
    "Client",
    "Clinic",
    "Ward",
    "Laboratory",
    "Pharmacy",
    "Radiology",
    "Inventory",
    "Finance",
    "Managed Care",
    "Theatre",
    "Epidemiology",
    "Admin",
    "Bill Client",
    "Adjust Price",
    "Delete Notes",
    /*  "Membership" */
  ];

  let draftDoc = {};
  draftDoc = state.EmployeeModule.selectedEmployee;
  // console.log(draftDoc)

  useEffect(() => {
    //  console.log(draftDoc.roles,"loading")
    //console.log(draftDoc);
    //console.log(prevRoles);

    Object.entries(draftDoc).map(([keys, value], i) =>
      setValue(keys, value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    );

    return () => {};
  }, []);

  useEffect(() => {
    draftDoc = state.EmployeeModule.selectedEmployee;

    return () => {};
  }, [state.EmployeeModule.selectedEmployee]);

  const updateEmployeeRoles = () => {
    //e.preventDefault();
    showActionLoader();
    setMessage("");
    setError(false);
    setSuccess(false);

    const newRoles = [...checked, ...expanded];

    //return console.log(checked, expanded);

    const oldEmployeeData = state.EmployeeModule.selectedEmployee;

    const newEmployeeData = {...oldEmployeeData, roles: newRoles};

    //return console.log(newEmployeeData);

    // if (confirm) {
    EmployeeServ.patch(draftDoc._id, newEmployeeData) // draftDoc._id
      .then(res => {
        setSuccess(true);
        setConfirmDialog(false);
        hideActionLoader();
        toast.success("Employee Roles updated succesfully");
        setSuccess(false);
        draftDoc = {};

        const newEmployeeModule = {
          selectedEmployee: res,
          show: "detail",
        };
        setState(prevstate => ({
          ...prevstate,
          EmployeeModule: newEmployeeModule,
        }));

        handlecloseModal();
      })
      .catch(err => {
        setConfirmDialog(false);
        hideActionLoader();
        console.log(err);
        toast.error("Error updating Employee Roles" + err);
      });
    // }
  };

  const resetEmployeeRoles = () => {
    //e.preventDefault();
    showActionLoader();
    setMessage("");
    setError(false);
    setSuccess(false);

    const oldEmployeeData = state.EmployeeModule.selectedEmployee;

    const newEmployeeData = {...oldEmployeeData, roles: []};

    EmployeeServ.patch(draftDoc._id, newEmployeeData)
      .then(res => {
        setSuccess(true);
        setConfirmDialog(false);
        hideActionLoader();
        toast.success("Employee Roles Reset succesfully");
        setSuccess(false);
        draftDoc = {};

        const newEmployeeModule = {
          selectedEmployee: res,
          show: "detail",
        };
        setState(prevstate => ({
          ...prevstate,
          EmployeeModule: newEmployeeModule,
        }));

        handlecloseModal();
      })
      .catch(err => {
        setConfirmDialog(false);
        hideActionLoader();
        console.log(err);
        toast.error("Error Reseting Employee Roles" + err);
      });
    // }
  };

  const handleCancel = async () => {
    const newModuleList = {
      selectedBand: {},
      show: "list",
    };
    await setState(prevstate => ({
      ...prevstate,
      ModuleList: newModuleList,
    }));
    console.log(state);
  };

  //console.log(selectedEmployee);

  const sortedModulesList = modulesList.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const facilityModules = user.currentEmployee?.facilityDetail?.facilityModules;

  const facilityModulesList =
    facilityModules &&
    modulesList.filter(
      item =>
        item.value === "Documentation" || facilityModules.includes(item.value)
    );

  return (
    <>
      <Box
        sx={{
          width: "400px",
        }}
      >
        <Box sx={{display: "flex", justifyContent: "flex-end"}} gap={1}>
          <GlobalCustomButton onClick={() => setConfirmDialog(true)}>
            Confirm Roles
          </GlobalCustomButton>

          <GlobalCustomButton
            color="warning"
            onClick={() => setConfirmReset(true)}
          >
            Reset Roles
          </GlobalCustomButton>
        </Box>

        <Box>
          <CheckboxTree
            nodes={facilityModulesList.concat(actionRoles) || modulesList}
            checked={checked}
            expanded={expanded}
            onCheck={checked => setChecked(checked)}
            onExpand={expanded => setExpanded(expanded)}
            checkModel="all"
            //iconsClass="fa5"
          />
        </Box>

        <CustomConfirmationDialog
          open={confirmDialog}
          cancelAction={() => setConfirmDialog(false)}
          type="update"
          message="You are about to Update roles for the employee?"
          confirmationAction={updateEmployeeRoles}
        />

        <CustomConfirmationDialog
          open={confirmReset}
          cancelAction={() => setConfirmReset(false)}
          type="warning"
          message="You are about to Reset roles for the employee? This will clear all the Employee roles."
          confirmationAction={resetEmployeeRoles}
        />
      </Box>
    </>
  );
}
