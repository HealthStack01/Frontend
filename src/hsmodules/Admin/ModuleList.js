import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {DocumentClassList} from './DocumentClass'
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";

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

  const { state } = useContext(ObjectContext);

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

            <div className="field  is-grouped mt-2">
              <p className="control">
                <button type="submit" className="button is-success is-small">
                  Save
                </button>
              </p>
              <p className="control">
                <button type="reset" className="button is-warning is-small">
                  Cancel
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
