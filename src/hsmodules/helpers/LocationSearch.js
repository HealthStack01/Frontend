import React, {useState, useContext, useEffect, useRef} from "react";
//import {Route, Switch,   Link, NavLink, } from 'react-router-dom'
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
//import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {formatDistanceToNowStrict, format} from "date-fns";
import DebouncedInput from "../Appointment/ui-components/inputs/DebouncedInput";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";

// eslint-disable-next-line
//const searchfacility={};

export default function LocationSearch({
  id,
  getSearchfacility,
  clear,
  label,
  disabled,
}) {
  const ClientServ = client.service("location");
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
  const {user} = useContext(UserContext);
  const {state} = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);
  const [closeDropdown, setCloseDropdown] = useState(false);

  const getInitial = async id => {
    if (!!id) {
      await ClientServ.get(id)
        .then(resp => {
          handleRow(resp);
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    getInitial(id);
    return () => {};
  }, []);

  const handleRow = async obj => {
   setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.name + " " + obj.locationType);

    // setSelectedFacility(obj)
    setShowPanel(false);
    setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };

 
  const handleSearch = async val => {
    setVal(val);
    if (val === "") {
      setShowPanel(false);
      getSearchfacility(false);
      return;
    }

    if (val.length >= 3) {
      ClientServ.find({
        query: {
          $or: [
            {
              name: {
                $regex: val,
                $options: "i",
              },
            },
            {
              locationType: {
                $regex: val,
                $options: "i",
              },
            },
           
          ],

          facility: user.currentEmployee.facilityDetail._id,
          //storeId: state.StoreModule.selectedStore._id,
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then(res => {
          console.log("product  fetched successfully");
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          toast.error("Error fetching Location " + err);
        });
    } else {
      // console.log("less than 3 ");
      // console.log(val);
      setShowPanel(false);
       setFacilities([]);
      // console.log(facilities);
    }
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
      console.log("success has changed", clear);
      setSimpa("");
    }
    return () => {};
  }, [clear]);
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
          return option.name;
        }}
        //isOptionEqualToValue={(option, value) => option.id === value.id}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option._id === value._id
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
            {option.name}, {option.locationType}
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
            label={label || "Search for Location"}
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
