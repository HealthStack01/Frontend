/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {toast} from "react-toastify";
import {ProductCreate} from "../../hsmodules/Pharmacy/Products";
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

export default function ProductSearchHelper({getSearchfacility, clear}) {
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

  useOnClickOutside(dropDownRef, () => setShowPanel(false));

  const newData =
    facilities.length > 0
      ? facilities.map(item => {
          const data = {...item, label: `${item.name} - ${item.baseunit}`};
          return data;
        })
      : [];

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {/* <div
        style={{
          width: "100%",
        }}
      >
        <div style={{width: "100%", position: "relative"}}>
          <div className="dropdown-trigger wt100">
            <DebounceInput
              className="input is-small "
              type="text"
              placeholder="Search Product"
              value={simpa}
              minLength={3}
              debounceTimeout={400}
              onBlur={e => handleBlur(e)}
              onChange={e => handleSearch(e.target.value)}
              inputRef={inputEl}
              element={Input}
            />
          </div>

          <Grow in={showPanel}>
            <Card>
              <Box
                ref={dropDownRef}
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "150px",
                  overflowY: "scroll",
                  zIndex: "5",
                  position: "absolute",
                  background: "#ffffff",
                  width: "100%",
                  border: "1px solid lightgray",
                  zIndex: "500",
                }}
              >
                {facilities.length > 0 ? (
                  facilities.map((facility, i) => (
                    <Box
                      item
                      key={i}
                      onClick={() => handleRow(facility)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        width: "100%",
                        minHeight: "50px",
                        borderTop: i !== 0 ? "1px solid gray" : "",
                        cursor: "pointer",
                        zIndex: "100",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                        }}
                      >
                        {facility.name} - {facility.baseunit}
                      </span>
                    </Box>
                  ))
                ) : (
                  <Box
                    className="dropdown-item"
                    onClick={handleAddproduct}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0 8px",
                      width: "100%",
                      minHeight: "50px",
                      borderTop: "1px solid gray",
                      cursor: "pointer",
                      zIndex: "100",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                      }}
                    >
                      Add {val} to service list
                    </span>{" "}
                  </Box>
                )}
              </Box>
            </Card>
          </Grow>

        </div>
      </div> */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={newData}
        onChange={(e, value) => handleRow(value)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={params => (
          <TextField
            {...params}
            label="Products"
            onBlur={e => handleBlur(e)}
            onChange={e => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem",
            }}
          />
        )}
      />

      <ModalBox
        open={productModal}
        onClose={handlecloseModal}
        header="Create New Product"
      >
        <ProductCreate />
      </ModalBox>
    </div>
  );
}
