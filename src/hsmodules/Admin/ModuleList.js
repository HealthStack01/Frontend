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
import {modulesList} from "./modulelist-data";

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
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line

  const {state, setState} = useContext(ObjectContext);

  let draftDoc = {};
  draftDoc = state.EmployeeModule.selectedEmployee;
  // console.log(draftDoc)

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
  ];

  useEffect(() => {
    //  console.log(draftDoc.roles,"loading")
    console.log(draftDoc);

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

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    //console.log(data);

    // if (confirm) {
    EmployeeServ.patch(draftDoc._id, data) // draftDoc._id
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();

        /*  setMessage("Created Client successfully") */
        setSuccess(true);
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
        console.log(err);
        toast.error("Error updating Employee Roles" + err);
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

  const selectedEmployee = state.EmployeeModule.selectedEmployee;

  //console.log(selectedEmployee);

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  return (
    <>
      <Box
        sx={{
          width: "400px",
        }}
      >
        <Box sx={{display: "flex", justifyContent: "flex-end"}} gap={1}>
          <GlobalCustomButton
            //onClick={() => setConfirmDialog(true)}
            onClick={() => {
              console.log(checked);
              console.log(expanded);
            }}
          >
            Confirm Roles
          </GlobalCustomButton>

          <GlobalCustomButton color="error" onClick={handlecloseModal}>
            Cancel
          </GlobalCustomButton>
        </Box>

        <Box>
          <CheckboxTree
            nodes={modulesList}
            checked={checked}
            expanded={expanded}
            onCheck={checked => setChecked(checked)}
            onExpand={expanded => setExpanded(expanded)}
            //iconsClass="fa5"
          />
        </Box>
        {/* <CustomConfirmationDialog
          open={confirmDialog}
          cancelAction={() => setConfirmDialog()}
          type="update"
          message="You are about to update roles for the employee?"
          confirmationAction={handleSubmit(onSubmit)}
        />
        <Box mb={1}>
          <Box>
            <Typography>Modules:</Typography>
          </Box>
          <div className="module-lists-checkboxes">
            {mList.map((c, i) => (
              <label className=" is-small" key={c}>
                <input type="checkbox" value={c} {...register("roles")} />
                {c + " "}
              </label>
            ))}
          </div>
        </Box> */}
      </Box>
    </>
  );
}
