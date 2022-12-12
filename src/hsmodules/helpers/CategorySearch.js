import React, {useState, useContext, useEffect, useRef} from "react";
//import {Route, Switch,   Link, NavLink, } from 'react-router-dom'
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
//import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict, format} from "date-fns";
import ModalBox from "../../components/modal";
import Input from "../../components/inputs/basic/Input";
import {Box, Card, Grow} from "@mui/material";
// eslint-disable-next-line
//const searchfacility={};
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";

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

export default function CategorySearch({
  id,
  getSearchfacility,
  clear,
  disable = false,
  label,
}) {
  const ClientServ = client.service("billing");
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

  const dropDownRef = useRef(null);

  const getInitial = async id => {
    console.log(id);
    if (!!id) {
      let obj = {
        categoryname: id,
      };
      console.log(obj);
      handleRow(obj);
    }
  };

  useEffect(() => {
    getInitial(id);
    return () => {};
  }, []);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")

    await setSimpa(obj.categoryname);
    getSearchfacility(obj);
    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };

  const handleBlur = async e => {
    /*   if (count===2){
             console.log("stuff was chosen")
         } */
    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };
  const handleSearch = async val => {
    setVal(val);
    if (val === "") {
      setShowPanel(false);
      getSearchfacility(false);
      return;
    }
    const field = "name"; //field variable
    /* name: { type: String, required: true },
        locationType: { type: String }, */

    if (val.length >= 3) {
      ClientServ.find({
        query: {
          category: {
            $regex: val,
            $options: "i",
          },
          /*  $or:[   { lastname: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { profession: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { department: {
                        $regex:val,
                        $options:'i' 
                    }},
                   { clientTags: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { mrn: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { specificDetails: {
                        $regex:val,
                        $options:'i' 
                    }}, 
                ],*/

          //facility: user.currentEmployee.facilityDetail._id,
          //storeId: state.StoreModule.selectedStore._id,
          $limit: 1000,
          $sort: {
            category: 1,
          },
        },
      })
        .then(res => {
          //console.log("Service category  fetched successfully")
          //console.log(res.data)
          // console.log(res.groupedOrder)
          setFacilities(res.groupedOrder);
          setSearchMessage("Service category fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          toast({
            message: "Error searching Service category  " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } else {
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };

  const handleAddproduct = () => {
    let obj = {
      categoryname: val,
    };
    console.log(obj);
    handleRow(obj);

    // setProductModal(true)
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

  useOnClickOutside(dropDownRef, () => setShowPanel(false));

  return (
    <div>
      <Autocomplete
        size="small"
        value={simpa}
        onChange={(event, newValue) => {
          handleRow(newValue);
          setSimpa("");
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
          return option.categoryname;
        }}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option._id === value._id
        }
        //isOptionEqualToValue={(option, value) => option.id === value.id}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        noOptionsText={val !== "" ? `${val} Not Found` : "Type something"}
        renderOption={(props, option) => (
          <li {...props} style={{fontSize: "0.75rem"}}>
            {option.categoryname}
          </li>
        )}
        sx={{
          width: "100%",
        }}
        freeSolo={false}
        renderInput={params => (
          <TextField
            {...params}
            label={label || "Search for Category"}
            onChange={e => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem",
              backgroundColor: "#ffffff",
              "& .MuiInputBase-input": {
                height: "0.9rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
              style: {color: "#2d2d2d"},
            }}
          />
        )}
      />

      <ModalBox
        open={productModal}
        onClose={handlecloseModal}
        header="Choose Store"
      >
        {/* <StoreList standalone="true" /> */}
        {/* <ProductCreate /> */}
      </ModalBox>
    </div>
  );
}
