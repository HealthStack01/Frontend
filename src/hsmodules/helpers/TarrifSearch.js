/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";

import DebouncedInput from "./ui-components/inputs/DebouncedInput";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {ServicesCreate} from "../Finance/Services";

import {Box, Card, Collapse, Grow} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import ModalBox from "../../components/modal";

import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";

import Stack from "@mui/material/Stack";

const filter = createFilterOptions();

// eslint-disable-next-line
const searchfacility = {};

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default function TarrifSearch({getSearchfacility, clear, mode, label,disabled, }) {
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
  useContext(ObjectContext);
  const tariffServ = client.service("tariff");
  const OrgServ = client.service("organizationclient");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [band, setBand]= useState("NHIS")
  const [productModal, setProductModal] = useState(false);

  const dropDownRef = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    await setSimpa(obj.serviceName);
    getSearchfacility(obj);

    // setSelectedFacility(obj)
    setShowPanel(false);
  };
  const handleBlur = async e => {};

 const  findband=async()=>{
  let facid=user.currentEmployee.facilityDetail._id
  let client=state.ClientModule.selectedClient
  const hmopolicy = client.paymentinfo.filter(
    item => item.paymentmode.toLowerCase() === "hmo"
  );
  let policy=hmopolicy[0].policy
  let hmoid=hmopolicy[0].organizationId
  console.log("policy",hmopolicy)
  console.log(policy.plan.planName)
  if (policy.plan.planName==="NHIS"){
    setBand("NHIS")
  }else{
    const bandx = await OrgServ.find({
      query:{
        facility:hmoid,
        organization:facid, 
        relationshiptype:"managedcare",
        active:true
      }
    })
    console.log("band",bandx.data[0])
    console.log("actualband",bandx.data[0].band)
    if (bandx.data[0].band==""){
      setBand("NHIS") 
    }else{
      setBand(bandx.data[0].band)
  }}
  }

  const handleSearch = async value => {
    let facid=user.currentEmployee.facilityDetail._id
    let client=state.ClientModule.selectedClient
    const hmopolicy = client.paymentinfo.filter(
      item => item.paymentmode.toLowerCase() === "hmo"
    );
    let policy=hmopolicy[0] //check for current policy
    let hmoid=hmopolicy[0].organizationId

    const isHMO = user.currentEmployee.facilityDetail.facilityType === "HMO";
    if (isHMO){

      facid=state.OrganizationModule.selectedOrganization._id
    }

    findband()
    console.log("facid",facid);
    console.log(facid,policy);
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility(false);
      await setFacilities([]);
      return;
    }
    const field = "name"; //field variable
    console.log("status", isHMO)
    console.log("hmo id", hmoid)
    console.log("fac id", facid)
    if (!facid){
      toast.error("Facility is not selected")
    }
    if (!hmoid){
      toast.error("HMO is not avialable! Kindly login again")
    }
  /*   if (!organizationa){
      toast.error("Facility is not selected")
    } */

    if (value.length >= 3) {
      
        //if it is hmo or company cover
        //band of hospital
        //hmo facility Id
        //check if the hmo is a state hmo or not
        //console.log(mode);

console.log("band", band)
      let query={
               
        organizationId:hmoid ,
       'providers.dest_org':facid,
        $limit: 10,
     
      }
      if (band==="NHIS"){
       // query.band="NHIS"
      }
        
        tariffServ
            .find({
              query,
            })
            .then(res => {
              // console.log("product  fetched successfully")
              let resultarray=[]
              console.log("result1",res)
              let contracts=  res.data[0].contracts
              if (contracts.length>0){
              contracts.forEach(el=>{
                if(el.serviceName.toLowerCase().includes(val.toLowerCase())){
                  resultarray=[...resultarray, el]
                }
              })
            }
              console.log("result", resultarray)
              setFacilities(resultarray);
              setSearchMessage(" product  fetched successfully");
              setShowPanel(true);
            })
            .catch(err => {
              toast.error("Error creating Services " + err)
             /*  toast({
                message: "Error creating Services " + err,
                type: "is-danger",
                dismissible: true,
                pauseOnHover: true,
              }); */
            });
        
      }
   /*  } else {
      // console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities)
    } */
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      //console.log("success has changed",clear)
      setSimpa("");
    }
    return () => {};
  }, [clear]);

  useEffect(() => {
  
    return () => {};
  }, []);
  

  useOnClickOutside(dropDownRef, () => setShowPanel(false));

  return (
    <div>
    <Autocomplete
      size="small"
      value={simpa}
      disabled={disabled}
      onChange={(event, newValue, reason) => {
        if (reason === "clear") {
          setSimpa("");
        } else {
          handleRow(newValue);
        }
      }}
      id="free-solo-dialog-demo"
      options={facilities}
      getOptionLabel={option => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.serviceName;
      }}
      //isOptionEqualToValue={(option, value) => option.id === value.id}
      isOptionEqualToValue={(option, value) =>
        value === undefined || value === "" || option.serviceName === value.serviceName
      }
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      noOptionsText={
        val === "" ? "Type something..." : `${val} was not found`
      }
      rende
      renderOption={(props, option) => (
        <li {...props} style={{fontSize: "0.75rem"}}>
          {option.serviceName}-{option.price}
        </li>
      )}
      freeSolo={false}
      sx={{
        width: "100%",
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "#000000",
          color: "black",
        },
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label || "Search for Service"}
          onChange={e => handleSearch(e.target.value)}
          ref={inputEl}
          sx={{
            fontSize: "0.75rem",
            backgroundColor: "#ffffff",
            "& .MuiInputBase-input": {
              height: "0.9rem",
              fontSize: "0.75rem",
            },
          }}
          InputLabelProps={{
            shrink: true,
            style: {color: "#2d2d2d"},
          }}
        />
      )}
    />
  </div>
  );
}
