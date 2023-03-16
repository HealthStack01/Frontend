/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {toast} from "react-toastify";
import {ProductCreate} from "../Pharmacy/Products";
import Input from "../../components/inputs/basic/Input";
import "react-datepicker/dist/react-datepicker.css";
import ModalBox from "../../components/modal";

import {Box, Card, Grow} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";

//import MuiButton from "@mui/material/Button";
// eslint-disable-next-line
const searchfacility = {};

const filter = createFilterOptions();

export default function ProductSearchHelper({getSearchfacility, clear, label}) {
  const productServ = client.service("products");
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
  const [loading, setLoading] = useState(false);

  const dropDownRef = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj?.name);
    setShowPanel(false);
    await setCount(2);
  };
  const handleBlur = async e => {};

  const handleSearch = async value => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      return;
    }
    const field = "name"; //field variable

    if (value.length >= 3) {
      setLoading(true);
      productServ
        .find({
          query: {
            //service
            [field]: {
              $regex: value,
              $options: "i",
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then(res => {
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          toast.error("Error creating ProductEntry " + err);
        });
    } else {
      setShowPanel(false);
      await setFacilities([]);
      // console.log(facilities)
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
      setSimpa("");
    }
    return () => {};
  }, [clear]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Autocomplete
        size="small"
        value={simpa}
        key={"somehting"}
        //loading={loading}
        onChange={(event, newValue, reason) => {
          if (reason === "clear") {
            setSimpa("");
            //setSimpa("");
            return;
          } else {
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
            //setSimpa("");
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
            label={label ? label : "Search for Product"}
            //onChange={e => handleSearch(e.target.value)}
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
        header="Create New Product"
      >
        <ProductCreate closeModal={handlecloseModal} />
      </ModalBox>
    </div>
  );
}
