import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {DocumentClassList} from './DocumentClass'
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { Checkbox } from "../../components/switch/styles";
import Button from "./ui-components/buttons/Button";

export default function ModuleList({ handlecloseModal }) {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const EmployeeServ = client.service("employee");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line

  const { state, setState } = useContext(ObjectContext);

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

  useEffect(() => {
    //  console.log(draftDoc.roles,"loading")

    Object.entries(draftDoc).map(([keys, value], i) =>
      setValue(keys, value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    );

    return () => {};
  });

  useEffect(() => {
    draftDoc = state.EmployeeModule.selectedEmployee;
    return () => {};
  }, [state.EmployeeModule.selectedEmployee]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    console.log(data);

    let confirm = window.confirm(
      `You are about to update roles for the employee ?`
    );
    if (confirm) {
      EmployeeServ.patch(draftDoc._id, data) // draftDoc._id
        .then((res) => {
          //console.log(JSON.stringify(res))
          e.target.reset();

          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast({
            message: "Roles updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          draftDoc = {};
          handlecloseModal();
        })
        .catch((err) => {
          console.log(err);
          toast({
            message: "Error updating Roles" + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };
  const handleCancel = async () => {
    const newModuleList = {
      selectedBand: {},
      show: "list",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ModuleList: newModuleList,
    }));
    console.log(state);
  };
  return (
    <>
      <div className="card ">
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
            <div style={{ display: "flex" }}>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                style={{
                  backgroundColor: "#48c774",
                  width: "100px",
                  position: "relative",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Save
              </Button>

              <Button
                type="submit"
                onClick={handleCancel}
                style={{
                  backgroundColor: "#ffdd57",
                  width: "100px",
                  position: "relative",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}