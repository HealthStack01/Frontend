/* eslint-disable */
<<<<<<< HEAD
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {ClientCreate, ClientDetail, ClientList} from "../Client/Client";
=======
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { ClientCreate, ClientDetail, ClientList } from "../Client/Client";
>>>>>>> refs/remotes/origin/frontend

import EncounterMain from "./DispensaryMain";
import EncounterRight from "./EncounterRight";
import PatientProfile from "../Client/PatientProfile";
var random = require("random-string-generator");
// eslint-disable-next-line
const searchfacility = {};

export default function Encounter() {
<<<<<<< HEAD
  const {state} = useContext(ObjectContext); //,setState
=======
  const { state } = useContext(ObjectContext); //,setState
>>>>>>> refs/remotes/origin/frontend
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
    //check if selected client is an object
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
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-2 ">
          <PatientProfile />
        </div>
        <div
          className={
            state.DocumentClassModule.show === "detail"
              ? "column is-6"
              : "column is-10 "
          }
        >
          <EncounterMain client={selectedClient} />
        </div>
        <div className="column is-4 ">
          {state.DocumentClassModule.show === "detail" && (
            <EncounterRight client={selectedClient} />
          )}
          {/*  <DocumentClassCreate /> */}
        </div>
      </div>
      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Choose Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setShowModal(false)}
            ></button>
          </header>
          <section className="modal-card-body">
            <ClientList standalone="true" />
          </section>
          {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
        </div>
      </div>
    </section>
  );
}

<<<<<<< HEAD
export function InventorySearch({getSearchfacility, clear}) {
=======
export function InventorySearch({ getSearchfacility, clear }) {
>>>>>>> refs/remotes/origin/frontend
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
<<<<<<< HEAD
  const {user} = useContext(UserContext);
  const {state} = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);

  const handleRow = async obj => {
=======
  const { user } = useContext(UserContext);
  const { state } = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);

  const handleRow = async (obj) => {
>>>>>>> refs/remotes/origin/frontend
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
<<<<<<< HEAD
  const handleBlur = async e => {
=======
  const handleBlur = async (e) => {
>>>>>>> refs/remotes/origin/frontend
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
<<<<<<< HEAD
  const handleSearch = async value => {
=======
  const handleSearch = async (value) => {
>>>>>>> refs/remotes/origin/frontend
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
<<<<<<< HEAD
        .then(res => {
=======
        .then((res) => {
>>>>>>> refs/remotes/origin/frontend
          console.log("product  fetched successfully");
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
<<<<<<< HEAD
        .catch(err => {
=======
        .catch((err) => {
>>>>>>> refs/remotes/origin/frontend
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
<<<<<<< HEAD
            style={{width: "100%"}}
          >
            <div className="dropdown-trigger" style={{width: "100%"}}>
=======
            style={{ width: "100%" }}
          >
            <div className="dropdown-trigger" style={{ width: "100%" }}>
>>>>>>> refs/remotes/origin/frontend
              <DebounceInput
                className="input is-small  is-expanded"
                type="text"
                placeholder="Search Product"
                value={simpa}
                minLength={3}
                debounceTimeout={400}
<<<<<<< HEAD
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
=======
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSearch(e.target.value)}
>>>>>>> refs/remotes/origin/frontend
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {/* {searchError&&<div>{searchMessage}</div>} */}
<<<<<<< HEAD
            <div className="dropdown-menu expanded" style={{width: "100%"}}>
=======
            <div className="dropdown-menu expanded" style={{ width: "100%" }}>
>>>>>>> refs/remotes/origin/frontend
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
