import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
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

import "react-checkbox-tree/lib/react-checkbox-tree.css";

const EmployeeLocation = ({handlecloseModal}) => {
  const locationServer = client.service("location");
  const {register, handleSubmit, setValue} = useForm();
  const [locations, setLocations] = useState([]);
  const EmployeeServ = client.service("employee");
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const {user} = useContext(UserContext); //,setUser
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  //const prevRoles = state.EmployeeModule.selectedEmployee.locations || [];

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  let draftDoc = {};
  const currentEmployee = state.EmployeeModule.selectedEmployee;
  const prevRoles = state.EmployeeModule.selectedEmployee.locations || [];
  const prevRolesIds = prevRoles.map(item => {
    return item._id;
  });

  const getFacilityLocations = useCallback(async () => {
    const resp = await locationServer.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        $limit: 200,
        $sort: {
          createdAt: -1,
        },
      },
    });
    //console.log(resp.data);
    setLocations(resp.data);
    setChecked(prevRolesIds);
  }, [user.currentEmployee]);

  useEffect(() => {
    getFacilityLocations();
  }, [getFacilityLocations]);

  useEffect(() => {
    Object.entries(draftDoc).map(([keys, value], i) =>
      setValue(keys, value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    );

    return () => {};
  }, []);

  const updateEmployeeLocations = () => {
    showActionLoader();
    const employee = state.EmployeeModule.selectedEmployee;

    const locationsId = [...checked, ...expanded];

    const locationsObject = locationsId.map(item => {
      const location = locations.find(loc => loc._id === item);
      if (!location) return;
      return location;
    });

    const newLocations = locationsObject.filter(item => item !== undefined);

    //return console.log(newLocations);

    EmployeeServ.patch(employee._id, {locaitons: newLocations})
      .then(res => {
        setConfirmDialog(false);
        hideActionLoader();
        toast.success("Employee Locations updated succesfully");
        console.log(res);
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
        toast.error("Error updating Employee Locations" + err);
      });
  };

  const resetEmployeeLocations = () => {
    showActionLoader();

    const employee = state.EmployeeModule.selectedEmployee;

    EmployeeServ.patch(employee._id, {locations: []})
      .then(res => {
        setConfirmDialog(false);
        hideActionLoader();
        toast.success("Employee Locations Reset succesfully");

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
        toast.error("Error Reseting Employee Locations" + err);
      });
  };

  ////////GET VARIOUS TYPES OF LOCATIONS ONLY
  const filteredArray = locations.filter(
    (v, i, a) => a.findIndex(v2 => v2.locationType === v.locationType) === i
  );

  ////////GENERATE AN OBJECT THAT WORKS WITH CHECKBOX TREE COMPONENT
  const convertedFilterArray = filteredArray.map(item => {
    const children = locations.filter(
      location => location.locationType === item.locationType
    );

    const newChildren = children.map(child => {
      return {
        ...child,
        label: child.name,
        value: child._id,
      };
    });

    return {
      locationType: item.locationType,
      label: item.locationType,
      value: item.locationType,
      children: newChildren,
    };
  });

  return (
    <>
      <Box
        sx={{
          width: "400px",
        }}
      >
        <Box
          sx={{display: "flex", justifyContent: "flex-end"}}
          gap={1}
          mb={1.5}
        >
          <GlobalCustomButton onClick={() => setConfirmDialog(true)}>
            Update Employee Location
          </GlobalCustomButton>

          <GlobalCustomButton
            color="warning"
            onClick={() => setConfirmReset(true)}
          >
            Reset Employee Location
          </GlobalCustomButton>
        </Box>

        <Box>
          <CheckboxTree
            nodes={convertedFilterArray}
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
          confirmationAction={updateEmployeeLocations}
        />

        <CustomConfirmationDialog
          open={confirmReset}
          cancelAction={() => setConfirmReset(false)}
          type="warning"
          message="You are about to Reset roles for the employee? This will clear all the Employee roles."
          confirmationAction={resetEmployeeLocations}
        />
      </Box>
    </>
  );
};

export default EmployeeLocation;
