import React, {useState, useContext, useEffect, useRef} from "react";
import "./modules-list.scss";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
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
  ]; //"Frontdesk",
  //state.DocumentClassModule.selectedDocumentClass.name

  const modulesList = [
    {module_name: "Bill Client"},
    {module_name: "Adjust Price"},
    {module_name: "Delete Notes"},
    {
      module_name: "Client",
      module_pages: ["Appointment", "Client", "Dashboard"],
    },

    {
      module_name: "Clinic",
      module_pages: ["Appointment", "Checkin", "Dashboard"],
    },

    {
      module_name: "Appointments",
      module_pages: [""],
    },

    {
      module_name: "Laboratory",
      module_pages: [
        "Bill Client",
        "Bill Lab Orders",
        "Lab Result",
        "Dashboard",
      ],
    },

    {
      module_name: "Pharmacy",
      module_pages: [
        "Bill Client",
        "Bill Prescription Sent",
        "Dispensary",
        "Store Inventory",
        "Product Entry",
        "Issue Out",
        "Requisition",
        "Transfer",
        "Dashboard",
      ],
    },

    {
      module_name: "Finance",
      module_pages: [
        "Bill Service",
        "Payment",
        "Revenue",
        "Collections",
        "Transactions",
        "Services",
        "HMO Authorization",
        "Dashboard",
      ],
    },

    {
      module_name: "Radiology",
      module_pages: [
        "Bill Client",
        "Checked-In",
        "Appointment",
        "Bill Lab Orders",
        "Radiology Result",
      ],
    },

    {
      module_name: "Admin",
      module_pages: ["Bands", "Employees", "Location", "Dashboard"],
    },

    {
      module_name: "Inventory",
      module_pages: [
        "Bill Client",
        "Bill Prescription Sent",
        "Dispensary",
        "Store Inventory",
        "Product Entry",
        "Issue Out",
        "Requisition",
        "Transfer",
        "Dashboard",
      ],
    },

    {
      module_name: "Epidemiology",
      module_pages: ["Dashboard", "Case Definition", "Signals", "Map"],
    },

    {
      module_name: "Ward",
      module_pages: ["Admission", "In-Patient", "Discharge", "Dashboard"],
    },

    {
      module_name: "Theatre",
      module_pages: [
        "Appointment",
        "Check In",
        "Bill Client",
        "Bill Order Sent",
      ],
    },

    {
      module_name: "Managed Care",
      module_pages: [
        "Policy",
        "Beneficiary",
        "Check In",
        "Provider",
        "Corporate",
        "Complaints",
        "HIA",
        "Premiums",
        "Organization",
        "Referrals",
        "Tarrif",
        "Claims",
        "Dashbaord",
        "Accreditation",
        "Fund Management",
        "Health Plan",
        "Preauthorization",
        "Provider Payment",
        "Report",
        "Dashboard",
      ],
    },

    {
      module_name: "CRM",
      module_pages: [
        "Lead",
        "Deal",
        "Proposal",
        "Invoice",
        "SLA",
        "Dashboard",
        "Appointment",
      ],
    },

    // {
    //   module_name: "",
    //   module_pages: [""],
    // },

    // {
    //   module_name: "",
    //   module_pages: [""],
    // },

    // {
    //   module_name: "",
    //   module_pages: [""],
    // },

    // {
    //   module_name: "",
    //   module_pages: [""],
    // },

    // {
    //   module_name: "",
    //   module_pages: [""],
    // },

    // {
    //   module_name: "",
    //   module_pages: [""],
    // },

    // {
    //   module_name: "",
    //   module_pages: [""],
    // },

    // {
    //   module_name: "",
    //   module_pages: [""],
    // },

    // {
    //   module_name: "",
    //   module_pages: [""],
    // },
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

  return (
    <>
      <Box
        sx={{
          width: "750px",
        }}
      >
        <CustomConfirmationDialog
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
        </Box>

        <Box sx={{display: "flex", justifyContent: "flex-end"}} gap={1}>
          <GlobalCustomButton onClick={() => setConfirmDialog(true)}>
            Confirm Roles
          </GlobalCustomButton>

          <GlobalCustomButton color="error" onClick={handlecloseModal}>
            Cancel
          </GlobalCustomButton>
        </Box>
      </Box>
      {/* <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Choose Modules</p>
        </div>
        <div className="card-content vscrollable remPad1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
              <div className="field ml-3 ">
                <label className="mr-2 ">
                  {" "}
                  <b>Modules:</b>
                </label>
                {mList.map((c, i) => (
                  <label className=" is-small" key={c}>
                    <input
                      type="checkbox"
                      value={c}
                      name="roles"
                      {...register("roles")}
                    />
                    {c + " "}
                  </label>
                ))}
              </div>
            </div>
            <div style={{display: "flex"}}>
              <GlobalCustomButton
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </GlobalCustomButton>

              <GlobalCustomButton type="submit" onClick={handleCancel}>
                Cancel
              </GlobalCustomButton>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
}
