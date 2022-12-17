/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";

import DebouncedInput from "./ui-components/inputs/DebouncedInput";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
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

export default function ServiceSearch({getSearchfacility, clear, mode, label}) {
  const {user} = useContext(UserContext);
  const productServ = client.service("billing");
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
  const [productModal, setProductModal] = useState(false);

  const dropDownRef = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    await setSimpa(obj.name);
    getSearchfacility(obj);

    // setSelectedFacility(obj)
    setShowPanel(false);
  };
  const handleBlur = async e => {};
  const handleSearch = async value => {
    console.log(mode);
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility(false);
      await setFacilities([]);
      return;
    }
    const field = "name"; //field variable

    if (value.length >= 3) {
      if (mode.value === "Cash" || mode.value === "Family Cover") {
        productServ
          .find({
            query: {
              //service
              name: {
                $regex: value,
                $options: "i",
              },
              facility: user.currentEmployee.facilityDetail._id,
              $limit: 10,
              $sort: {
                createdAt: -1,
              },
            },
          })
          .then(res => {
            // console.log("product  fetched successfully")
            //console.log(res.data)
            setFacilities(res.data);
            setSearchMessage(" product  fetched successfully");
            setShowPanel(true);
          })
          .catch(err => {
            toast({
              message: "Error creating Services " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      }
      if (mode.value === "CompanyCover") {
        //if it is hmo or company cover
        //band of hospital
        //hmo facility Id
        productServ
          .find({
            query: {
              //service
              name: {
                $regex: value,
                $options: "i",
              },
              facility: user.currentEmployee.facilityDetail._id,
              $limit: 10,
              $sort: {
                createdAt: -1,
              },
            },
          })
          .then(res => {
            // console.log("product  fetched successfully")
            //console.log(res.data)
            setFacilities(res.data);
            setSearchMessage(" product  fetched successfully");
            setShowPanel(true);
          })
          .catch(err => {
            toast({
              message: "Error creating Services " + err,
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
            });
          });
      }
      if (mode.value === "HMOCover") {
        //if it is hmo or company cover
        //band of hospital
        //hmo facility Id
        //check if the hmo is a state hmo or not
        console.log(mode);
        if (true) {
          productServ
            .find({
              query: {
                //service
                name: {
                  $regex: value,
                  $options: "i",
                },
                facility: mode.detail.organizationId,
                mode: "HMOCover",
                dest_org: user.currentEmployee.facilityDetail._id,
                $limit: 10,
                $sort: {
                  createdAt: -1,
                },
              },
            })
            .then(res => {
              // console.log("product  fetched successfully")
              //console.log(res.data)
              setFacilities(res.data);
              setSearchMessage(" product  fetched successfully");
              setShowPanel(true);
            })
            .catch(err => {
              toast({
                message: "Error creating Services " + err,
                type: "is-danger",
                dismissible: true,
                pauseOnHover: true,
              });
            });
        }
      }
    } else {
      // console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities)
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
      //console.log("success has changed",clear)
      setSimpa("");
    }
    return () => {};
  }, [clear]);

  useOnClickOutside(dropDownRef, () => setShowPanel(false));

  return (
    <div>
      <Autocomplete
        size="small"
        value={simpa}
        //loading={loading}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              handleAddproduct();
            });
          } else if (newValue && newValue.inputValue) {
            handleAddproduct();
          } else {
            handleRow(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue} to Services"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={facilities}
        getOptionLabel={option => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option._id === value._id
        }
        onInputChange={(event, newInputValue, reason) => {
          if (reason === "reset") {
            setVal("");
            setSimpa("");
            return;
          } else {
            handleSearch(newInputValue);
          }
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props} style={{fontSize: "0.75rem"}}>
            {option.name} - {option.category}
          </li>
        )}
        sx={{width: "100%"}}
        freeSolo
        //size="small"
        renderInput={params => (
          <TextField
            {...params}
            label={label ? label : "Search for Service"}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem !important",
              backgroundColor: "#ffffff !important",
              "& .MuiInputBase-input": {
                height: "0.9rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      <ModalBox
        open={productModal}
        onClose={handlecloseModal}
        header="Create Service"
      >
        <ServicesCreate />
      </ModalBox>
    </div>
  );
}
