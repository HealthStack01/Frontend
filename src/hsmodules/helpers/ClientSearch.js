import React, {useState, useContext, useEffect, useRef} from "react";
//import {Route, Switch,   Link, NavLink, } from 'react-router-dom'
import client from "../../feathers";
//import {DebounceInput} from "react-debounce-input";
import DebouncedInput from "./ui-components/inputs/DebouncedInput";
//import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict, format} from "date-fns";
import TextField from "@mui/material/TextField";
import CustomTable from "../../components/customtable";
// eslint-disable-next-line
//const searchfacility={};
import {Collapse} from "@mui/material";
import ModalBox from "./ui-components/modal";

export function ClientSearch({getSearchfacility, clear}) {
  const ClientServ = client.service("client");
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
    console.log(obj);
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(
      obj.firstname +
        " " +
        obj.middlename +
        " " +
        obj.lastname +
        " " +
        obj.gender +
        " " +
        obj.phone
    );

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

    if (val.length >= 3) {
      ClientServ.find({
        query: {
          $or: [
            {
              firstname: {
                $regex: val,
                $options: "i",
              },
            },
            {
              lastname: {
                $regex: val,
                $options: "i",
              },
            },
            {
              middlename: {
                $regex: val,
                $options: "i",
              },
            },
            {
              phone: {
                $regex: val,
                $options: "i",
              },
            },
            {
              clientTags: {
                $regex: val,
                $options: "i",
              },
            },
            {
              mrn: {
                $regex: val,
                $options: "i",
              },
            },
            {
              specificDetails: {
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

  const tableSchema = [
    {
      name: "S/NO",
      key: "sn",
      description: "Enter name of Disease",
      selector: row => row.sn,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Name",
      //width: "200px",
      key: "clientname",
      description: "Enter Name",
      selector: row => `${row.firstname} ${row.middlename} ${row.lastname}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "DOB",
      key: "dob",
      selector: row =>
        row.dob ? formatDistanceToNowStrict(new Date(row.dob)) : "------",
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Gender",
      key: "gender",
      selector: row => row.gender,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Profession",
      key: "profession",
      selector: row => row.profession,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Phone NO",
      key: "phone",
      selector: row => row.phone,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <div className="control has-icons-left  ">
          <div className="dropdown-trigger" style={{width: "100%"}}>
            <DebouncedInput
              type="text"
              id="outlined-basic"
              label="Search for Client"
              variant="outlined"
              minLength={3}
              onBlur={handleBlur}
              onChangeValue={handleSearch}
              inputRef={inputEl}
            />
          </div>

          <div className="dropdown-menu expanded" style={{width: "100%"}}>
            <Collapse in={val !== "" && facilities.length < 1}>
              <p
              //   onClick={handleAddproduct}
              >
                Couldn't find client with name {val}
              </p>
            </Collapse>

            <Collapse in={val !== "" && facilities.length > 0}>
              <CustomTable
                title={""}
                columns={tableSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                progressPending={false}
                noHeader={true}
              />
            </Collapse>
          </div>
        </div>
      </div>

      <ModalBox open={productModal} onClose={handlecloseModal}>
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
              {/* <ProductCreate /> */}
            </section>
            {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
          </div>
        </div>
      </ModalBox>
    </div>
  );
}
