/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {toast} from "react-toastify";
import {ProductCreate} from "../../hsmodules/Pharmacy/Products";
import Input from "../../components/inputs/basic/Input";
import "react-datepicker/dist/react-datepicker.css";
import ModalBox from "../../components/modal";
import {UserContext, ObjectContext} from "../../context";

import {Box, Card, Grow} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";

//import MuiButton from "@mui/material/Button";
// eslint-disable-next-line
const searchfacility = {};

const filter = createFilterOptions();

export default function InventorySearchHelper({getSearchfacility, clear}) {
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

  const {user} = useContext(UserContext);
  const {state} = useContext(ObjectContext);

  const dropDownRef = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.name);
    setShowPanel(false);
    await setCount(2);
  };
  const handleBlur = async e => {};

  const handleSearch = async value => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility(false);
      return;
    }
    const field = "name"; //field variable

    if (value.length >= 3) {
      productServ
        .find({
          query: {
            //service
            [field]: {
              $regex: value,
              $options: "i",
            },
            facility: user.currentEmployee.facilityDetail._id,
            storeId: state.StoreModule.selectedStore._id,
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
          toast({
            message: "Error creating ProductEntry " + err,
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
        value={simpa}
        loading={loading}
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
              name: `Add "${params.inputValue} to your products"`,
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
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <div {...props} style={{fontSize: "0.75rem"}}>
            {option.name} {option.baseunit}
            <div>
              <span>{option.name}</span>
            </div>
            <div>
              <span>
                <strong>{option.quantity}</strong>
              </span>
              <span>{option.baseunit}(s) remaining</span>
              <span className="padleft">
                <strong>Price:</strong> N{option.sellingprice}
              </span>
            </div>
          </div>
        )}
        sx={{width: "100%"}}
        freeSolo
        //size="small"
        renderInput={params => (
          <TextField
            {...params}
            label="Search your Inventory"
            onChange={e => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem !important",
            }}
            size="small"
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
        header="Create New Product"
      >
        <ProductCreate closeModal={handlecloseModal} />
      </ModalBox>
    </div>
  );
}
