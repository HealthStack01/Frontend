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

export default function ServiceSearch({getSearchfacility, clear, mode}) {
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
    /*   await setCount(2) */
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };
  const handleBlur = async e => {
    /*  if (count===2){
             console.log("stuff was chosen")
         }
        */
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
      <div className="field">
        <div className="control has-icons-left  ">
          <div
            className={`dropdown ${showPanel ? "is-active" : ""}`}
            style={{width: "100%"}}
          >
            <div
              className="dropdown-trigger"
              style={{width: "100%", position: "relative"}}
            >
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Services"
                value={simpa}
                minLength={3}
                debounceTimeout={400}
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
                element={Input}
              />

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
                            {facility.name} - {facility.category}
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
          </div>
        </div>
      </div>

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
