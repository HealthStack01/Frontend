/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import "./styles/documentation.scss";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {ClientCreate, ClientDetail, ClientList} from "../Client/Client";
import Slide from "@mui/material/Slide";

import EncounterMain from "./EncounterMain";
import EncounterRight from "./EncounterRight";
import PatientProfile from "../Client/PatientProfile";
import ModalBox from "../../components/modal";
import {Grid} from "@mui/material";
var random = require("random-string-generator");
// eslint-disable-next-line
const searchfacility = {};

export default function Documentation({standalone}) {
  const {state, setState} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  //const [selectedProductEntry,setSelectedProductEntry]=useState()
  //const [showState,setShowState]=useState() //create|modify|detail
  //const {state,setState}=useContext(ObjectContext) //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [showModal, setShowModal] = useState(false);

  //let { path, url } = useRouteMatch();

  useEffect(() => {
    console.log("starting up Encounter module");
    console.log(state.ClientModule.selectedClient);
    const newDocumentClassModule = {
      selectedDocumentClass: {},
      //state.DocumentClassModule.selectedDocumentClass.name
      show: "detail",
    };
    setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));

    if (
      Object.keys(state.ClientModule.selectedClient).length === 0 &&
      state.ClientModule.selectedClient.constructor === Object
    ) {
      handleChangeClient();
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedClient(state.ClientModule.selectedClient);
  }, [state.ClientModule]);

  const handleChangeClient = async () => {
    await setShowModal(true);
    console.log(showModal);
  };

  return (
    <section className="section remPadTop" style={{padding: "15px"}}>
      {!standalone && (
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <PatientProfile />
          </Grid>

          <Grid item xs={9}>
            <EncounterMain chosenClient={selectedClient} />
          </Grid>

          {/* <Grid item xs={4.5}>
            <EncounterRight client={selectedClient} />
          </Grid> */}
        </Grid>
      )}

      {standalone && (
        <div>
          <EncounterMain chosenClient={selectedClient} nopresc={standalone} />
        </div>
      )}
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div> //10
            </div> */}
      {/* <div className="columns "> */}
      {/* {!standalone && <PatientProfile />} */}

      {/* {!standalone && <EncounterMain client={selectedClient} />} */}

      {/* {standalone && (
          <div
            className={
              state.DocumentClassModule.show === "detail"
                ? "column is-8"
                : "column is-12 "
            }
          > */}
      {/* <EncounterMain client={selectedClient} nopresc={standalone} /> */}
      {/* </div>
        )}
        <div className="column is-4 "> */}
      {/* {state.DocumentClassModule.show === "detail" && (
            <EncounterRight client={selectedClient} />
          )} */}
      {/*  <DocumentClassCreate /> */}
      {/* </div>
      </div> */}

      <ModalBox
        open={showModal}
        onClose={() => setShowModal(false)}
        header="Choose Client"
      >
        <ClientList standalone="true" />
      </ModalBox>
    </section>
  );
}

export function InventorySearch({getSearchfacility, clear}) {
  const productServ = client.service("inventory");
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

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.name);

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
    if (count === 2) {
      console.log("stuff was chosen");
    }

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
      console.log("success has changed", clear);
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div
            className={`dropdown ${showPanel ? "is-active" : ""}`}
            style={{width: "100%"}}
          >
            <div className="dropdown-trigger" style={{width: "100%"}}>
              <DebounceInput
                className="input is-small  is-expanded"
                type="text"
                placeholder="Search Product"
                value={simpa}
                minLength={3}
                debounceTimeout={400}
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {/* {searchError&&<div>{searchMessage}</div>} */}
            <div className="dropdown-menu expanded" style={{width: "100%"}}>
              <div className="dropdown-content">
                {facilities.length > 0 ? (
                  ""
                ) : (
                  <div
                    className="dropdown-item" /* onClick={handleAddproduct} */
                  >
                    {" "}
                    <span> {val} is not in your inventory</span>{" "}
                  </div>
                )}

                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <div>
                      <span>{facility.name}</span>
                    </div>
                    <div>
                      <span>
                        <strong>{facility.quantity}</strong>
                      </span>
                      <span>{facility.baseunit}(s) remaining</span>
                      <span className="padleft">
                        <strong>Price:</strong> N{facility.sellingprice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal ${productModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Choose Store</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <ClientCreate />
          </section>
          {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
        </div>
      </div>
    </div>
  );
}
