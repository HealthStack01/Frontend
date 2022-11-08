/* eslint-disable */
import React, {  useState, useContext, useEffect, useRef  } from "react";
import {} from "react-router-dom"; //Route, Switch,Link, NavLink,
import client from "../../feathers";
import {  DebounceInput  } from "react-debounce-input";
import {  useForm  } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {  UserContext, ObjectContext  } from "../../context";
import {  toast  } from "bulma-toast";
import {  formatDistanceToNowStrict  } from "date-fns";
import ClientFinInfo from "./ClientFinInfo";
import BillServiceCreate from "../Finance/BillServiceCreate";
import InfiniteScroll from "react-infinite-scroll-component";
import ClientBilledPrescription from "../Finance/ClientBill";
import ClientGroup from "./ClientGroup";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { OrgFacilitySearch, SponsorSearch } from "../helpers/FacilitySearch";
var random = require("random-string-generator");
// eslint-disable-next-line
const searchfacility = {};

export default function Beneficiary() {
  const {  state  } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      <div className="columns ">
        <div className="column is-6 ">
          <ClientList />
        </div>
        <div className="column is-6 ">
          {state.ClientModule.show === "List" && <ClientList />}
          {state.ClientModule.show === "create" && <BeneficiaryCreate />}
          {state.ClientModule.show === "detail" && <ClientDetail />}
          {state.ClientModule.show === "modify" && (
            <ClientModify Client={selectedClient} />
          )}
        </div>
      </div>
    </section>
  );
}

export function ClientCreate({  closeModal  }) {
  const {  register, handleSubmit, setValue, getValues, reset  } = useForm(); //, watch, errors, reset
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("client");
  const mpiServ = client.service("mpi");
  //const navigate=useNavigate()
  const {  user  } = useContext(UserContext); //,setUser
  const [billModal, setBillModal] = useState(false);
  const [patList, setPatList] = useState([]);
  const [dependant, setDependant] = useState(false);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();
  const {  state, setState  } = useContext(ObjectContext);

  // eslint-disable-next-line
  const getSearchfacility = ((obj)) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDate = async ((date)) => {
    setDate(date);
  };
  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const checkClient = () => {
    const data = getValues();
    data.dob = date;
    const obj = {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
    };
    /* find if there is a match with the paramters entered
          run search if 
            1.phone no alone or  
            2.email alone or 
            3.both is entered
            4. all other 5 parameters

        */
    let query = {};

    if (!!data.phone) {
      query.phone = data.phone;
      checkQuery(query);
    }

    if (!!data.email) {
      query.email = data.email;
      checkQuery(query);
    }

    if (!!data.firstname && !!data.lastname && !!data.gender && !!data.dob) {
      // console.log("simpa")
      data.middlename = data.middlename || "";
      (query.gender = data.gender),
        (query.dob = data.dob),
        (query.$or = [
          {
            firstname: data.firstname,
            lastname: data.lastname,
            middlename: data.middlename,
          },
          {
            firstname: data.firstname,
            lastname: data.middlename,
            middlename: data.lastname,
          },
          {
            firstname: data.middlename,
            lastname: data.lastname,
            middlename: data.firstname,
          },
          {
            firstname: data.middlename,
            lastname: data.firstname,
            middlename: data.lastname,
          },
          {
            firstname: data.lastname,
            lastname: data.firstname,
            middlename: data.middlename,
          },
          {
            firstname: data.lastname,
            lastname: data.middlename,
            middlename: data.firstname,
          },
        ]);
      checkQuery(query);
    }
  };

  const checkQuery = ((query)) => {
    setPatList([]);
    if (
      !(
        query &&
        Object.keys(query).length === 0 &&
        query.constructor === Object
      )
    ) {
      ClientServ.find({  query: query  })
        .then(((res)) => {
          console.log(res);
          if (res.total > 0) {
            // alert(res.total)
            setPatList(res.data);
            setBillModal(true);
            return;
          }
        })
        .catch(((err)) => {
          console.log(err);
        });
    }
  };

  const handleBill = () => {
    setBillModal(true);
  };
  const handlecloseModal3 = () => {
    setBillModal(false);
  };

  const choosen = async ((client)) => {
    //update client with facilities
    /*   if (client.facility !== user.currentEmployee.facilityDetail._id ){ //check taht it is not in list of related facilities
           
        
        //create mpi record
        const newPat = {
            client: client._id,
            facility:user.currentEmployee.facilityDetail._id,
            mrn:client.mrn,
            clientTags:client.clientTags,
            relfacilities:client.relatedfacilites
           }
           await mpiServ.create(newPat)
        } */
    //reset form
    //toast niotification
    //cash payment
  };
  const dupl = ((client)) => {
    toast({
      message: "Client previously registered in this facility",
      type: "is-danger",
      dismissible: true,
      pauseOnHover: true,
    });
    reset();
    setPatList([]);
  };
  const reg = async ((client)) => {
    if (
      client.relatedfacilities.findIndex(
        (el) => el.facility === user.currentEmployee.facilityDetail._id
      ) === -1
    ) {
      //create mpi record
      const newPat = {
        client: client._id,
        facility: user.currentEmployee.facilityDetail._id,
        mrn: client.mrn,
        clientTags: client.clientTags,
        relfacilities: client.relatedfacilities,
      };
      //console.log(newPat)
      await mpiServ
        .create(newPat)
        .then(((resp)) => {
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch(((err)) => {
          toast({
            message: "Error creating Client " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    //reset form
    reset();
    setPatList([]);
    //cash payment
  };
  const depen = ((client)) => {
    setDependant(true);
  };
  const onSubmit = async (data, e) => {
    if (!date) {
      toast({
        message: "Please enter Date of Birth! ",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });

      return;
    }
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    checkClient();
    if (patList.length > 0) {
      if (!dependant) {
        return;
      }
      //alert("something"+","+ patList.length)
      //let confirm = window.confirm("Is this person a dependant with parent phone number?")
      // setOption(confirm)
      setPatList([]);
    }
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }

    let confirm = window.confirm(
      `You are about to register a new client ${data.firstname}  ${data.middlename} ${data.lastname} ?`
    );
    if (confirm) {
      data.dob = date;
      await ClientServ.create(data)
        .then(((res)) => {
          console.log(res);
          //console.log(JSON.stringify(res))
          e.target.reset();
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          setPatList([]);
          setDependant(false);
          setDate();
          let newClientModule = {};
          //add to context
          // if principal
          if (state.currBeneficiary === "principal") {
            newClientModule = {
              principal: res,
              dependent: state.Beneficiary.dependent,
              others: state.Beneficiary.others,
              show: "create",
            };
          }
          if (state.currBeneficiary === "dependent") {
            newClientModule = {
              principal: state.Beneficiary.principal,
              dependent: [...state.Beneficiary.dependent, res],
              others: state.Beneficiary.others,
              show: "create",
            };
          }

          // if dependent
          /*   const newClientModule={
                    principal:principal,
                    dependent:dependents,
                    others:{},
                    show:'create'
                    }          */
          setState(((prevstate)) => ({
            ...prevstate,
            Beneficiary: newClientModule,
          }));
          closeModal();
        })
        .catch(((err)) => {
          toast({
            message: "Error creating Client " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
          setPatList([]);
          setDependant(false);
        });
    }
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Create Client</p>
        </div>
        <div className="card-content vscrollable remPad1">
          {/*  <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className=" is-small">Names</p>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small is-danger"
                      {...register("x", {  required: true  })}
                      name="firstname"
                      type="text"
                      placeholder="First Name"
                      onBlur={checkClient}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="middlename"
                      type="text"
                      placeholder="Middle Name"
                      onBlur={checkClient}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small is-danger"
                      {...register("x", {  required: true  })}
                      name="lastname"
                      type="text"
                      placeholder="Last Name"
                      onBlur={checkClient}
                    />
                    <span className="icon is-small is-left">
                      <i className=" fas fa-user-md "></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <p className=" is-small">Biodata</p>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left is-danger">
                    {/*   <input className="input is-small is-danger" {...register("x",{required: true})} name="dob" type="text" placeholder="Date of Birth"  onBlur={checkClient}/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span> */}
                    <DatePicker
                      className="is-danger"
                      selected={date}
                      onChange={((date)) => handleDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Enter date with dd/MM/yyyy format "
                      //isClearable
                      // className="red-border is-small"
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="gender"
                      type="text"
                      placeholder="Gender"
                      onBlur={checkClient}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="maritalstatus"
                      type="text"
                      placeholder="Marital Status"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="mrn"
                      type="text"
                      placeholder="Medical Records Number"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="religion"
                      type="text"
                      placeholder="Religion"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="profession"
                      type="text"
                      placeholder="Profession"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small is-danger"
                      {...register("x", {  required: true  })}
                      name="phone"
                      type="text"
                      placeholder=" Phone No"
                      onBlur={checkClient}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-phone-alt"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small "
                      {...register("x")}
                      name="email"
                      type="email"
                      placeholder="Email"
                      onBlur={checkClient}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="clientTags"
                  type="text"
                  placeholder="Tags"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <p className=" is-small">Address</p>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="address"
                  type="text"
                  placeholder="Residential Address"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="city"
                      type="text"
                      placeholder="Town/City"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="lga"
                      type="text"
                      placeholder="Local Govt Area"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="state"
                      type="text"
                      placeholder="State"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="country"
                      type="text"
                      placeholder="Country"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <p className=" is-small">Medical Data</p>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="bloodgroup"
                      type="text"
                      placeholder="Blood Group"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="genotype"
                      type="text"
                      placeholder="Genotype"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="disabilities"
                      type="text"
                      placeholder="Disabilities"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="allergies"
                      type="text"
                      placeholder="Allergies"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="comorbidities"
                      type="text"
                      placeholder="Co-mobidities"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="specificDetails"
                  type="text"
                  placeholder="Specific Details about patient"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <p className=" is-small">Next of Kin Information</p>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_name"
                      type="text"
                      placeholder="Next of Kin Full Name"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-clinic-medical"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_phoneno"
                      type="text"
                      placeholder="Next of Kin Phone Number"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-clinic-medical"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_email"
                      type="email"
                      placeholder="Next of Kin Email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_relationship"
                      type="text"
                      placeholder="Next of Kin Relationship"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field  is-grouped mt-2">
              <p className="control">
                <button type="submit" className="button is-success is-small">
                  Save
                </button>
              </p>
              <p className="control">
                <button
                  type="reset"
                  className="button is-warning is-small" /* onClick={(e)=>e.target.reset()} */
                >
                  Reset
                </button>
              </p>
              {/*  <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
            </div>
          </form>
        </div>
      </div>
      <div className={`modal ${billModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card modalbkgrnd z10">
          <header className="modal-card-head selectadd">
            <p className="modal-card-title redu">
              Similar Client Already Exist?
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal3}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <ClientGroup
              list={patList}
              closeModal={handlecloseModal3}
              choosen={choosen}
              dupl={dupl}
              reg={reg}
              depen={depen}
            />
          </section>
          {/* <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                    </footer> */}
        </div>
      </div>
      <div className={`modal ${billModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card modalbkgrnd z10">
          <header className="modal-card-head selectadd">
            <p className="modal-card-title redu">
              Similar Client Already Exist?
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal3}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <ClientGroup
              list={patList}
              closeModal={handlecloseModal3}
              choosen={choosen}
              dupl={dupl}
              reg={reg}
              depen={depen}
            />
          </section>
          {/* <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                    </footer> */}
        </div>
      </div>
    </>
  );
}

export function BeneficiaryCreate() {
  const {  register, handleSubmit, setValue, getValues, reset  } = useForm(); //, watch, errors, reset
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("client");
  const policyServ = client.service("policy");
  //const navigate=useNavigate()
  const [chosen, setChosen] = useState("");
  const {  user  } = useContext(UserContext); //,setUser
  const [billModal, setBillModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [showCorp, setShowCorp] = useState(false);
  const [planHMO, setPlanHMO] = useState("");
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");
  const [patient, setPatient] = useState("");
  const [patList, setPatList] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [dependant, setDependant] = useState(false);
  const [selectedClient, setSelectedClient] = useState();
  const [productItem, setProductItem] = useState([]);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();
  const [type, setType] = useState("Sales ");
  const [chosenPlan, setChosenPlan] = useState();
  const {  state, setState  } = useContext(ObjectContext);
  const [documentNo, setDocumentNo] = useState("");
  const hMO = ["simpa", "dania"];
  const [benefittingPlans1, setBenefittingPlans1] = useState([]);
  const ServicesServ = client.service("billing");
  const [productEntry, setProductEntry] = useState();
  const sponsorlist = ["Self", "SME", "Corporate", "Government", "others"];

  // eslint-disable-next-line
  /*   const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
  const handleDate = async ((date)) => {
    setDate(date);
  };

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      console.log(state.Beneficiary);
    }
    getBenfittingPlans();
    //load plan
    //load sponsor
    //load primary provider
    //load premium
    return () => {};
  }, []);

  const getSearchfacility = ((obj)) => {
    setChosen(obj);
    if (!obj) {
    }
  };

  const getSearchfacility1 = ((obj)) => {
    setPlanHMO(obj);
    if (!obj) {
    }
  };

  const getBenfittingPlans = async () => {
    setBenefittingPlans1([]);
    if (user.currentEmployee) {
      const findServices = await ServicesServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          "contracts.source_org": user.currentEmployee.facilityDetail._id,
          "contracts.dest_org": user.currentEmployee.facilityDetail._id,
          category: "Managed Care",
          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });
      console.log(findServices);
      if (findServices.total > 0) {
        findServices.groupedOrder[0].services.forEach(async (c) => {
          const newPlan = {
            name: c.name,
            // checked:false
          };
          await setBenefittingPlans1(((prev)) => prev.concat(c));
        });
      }
    }
  };

  const handleChangeMode = ((mode)) => {
    setMessage(mode);
    if (mode == "Corporate") {
      setShowCorp(true);
    }
  };

  const handleChangePlan = async ((value)) => {
    console.log(value);
    if (value == "") {
      setPrice("");
      return;
    }
    console.log(benefittingPlans1);
    let cplan = benefittingPlans1.filter((el) => el.name === value);
    console.log(cplan);
    setChosenPlan(cplan[0]);
    let contract = cplan[0].contracts.filter(
      (el) => el.source_org === el.dest_org
    );
    setPrice(contract[0]);
  };
  const handleBill = () => {
    setBillModal(true);
  };
  const handlecloseModal3 = () => {
    setBillModal(false);
  };
  const handleClient = () => {
    setClientModal(true);
  };
  const handlecloseModal4 = () => {
    setClientModal(false);
    console.log(state.Beneficiary);
  };

  const choosen = async ((client)) => {
    //update client with facilities
    /*   if (client.facility !== user.currentEmployee.facilityDetail._id ){ //check taht it is not in list of related facilities
           
        
        //create mpi record
        const newPat = {
            client: client._id,
            facility:user.currentEmployee.facilityDetail._id,
            mrn:client.mrn,
            clientTags:client.clientTags,
            relfacilities:client.relatedfacilites
           }
           await mpiServ.create(newPat)
        } */
    //reset form
    //toast niotification
    //cash payment
  };
  const dupl = ((client)) => {
    toast({
      message: "Client previously registered in this facility",
      type: "is-danger",
      dismissible: true,
      pauseOnHover: true,
    });
    reset();
    setPatList([]);
  };
  const reg = async ((client)) => {
    if (
      client.relatedfacilities.findIndex(
        (el) => el.facility === user.currentEmployee.facilityDetail._id
      ) === -1
    ) {
      //create mpi record
      const newPat = {
        client: client._id,
        facility: user.currentEmployee.facilityDetail._id,
        mrn: client.mrn,
        clientTags: client.clientTags,
        relfacilities: client.relatedfacilities,
      };
      //console.log(newPat)
      await mpiServ
        .create(newPat)
        .then(((resp)) => {
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch(((err)) => {
          toast({
            message: "Error creating Client " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    //reset form
    reset();
    setPatList([]);
    //cash payment
  };
  const depen = ((client)) => {
    setDependant(true);
  };
  //create productitem
  const createProductItem = async () => {
    setProductItem([
      {
        //productId:,
        name: chosenPlan.name,
        quantity: "1",
        sellingprice: price.price,
        amount: price.price, //||qamount
        baseunit: "",
        costprice: "",
        category: chosenPlan.category,
        billingId: chosenPlan._id,
        billingContract: price,
        billMode: state.Beneficiary.principal.paymentinfo[0],
      },
    ]);
  };

  const createProductEntry = () => {
    const [productEntry, setProductEntry] = useState({
      productitems: productItem,
      date,
      documentNo,
      type,
      totalamount: price.priceso,
      // source,
    });
  };

  //create billfor policy
  const handleCreateBill = async () => {
    //handle selected single order

    //documentation
    let serviceList = [];
    let document = {};

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = productItem;
    console.log(document.documentdetail);
    document.documentname = "Billed Orders"; //state.DocumentClassModule.selectedDocumentClass.name
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = patient._id;
    document.clientname =
      patient.firstname + " " + patient.middlename + " " + patient.lastname;
    document.clientobj = patient;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = "completed";
    console.log(document);

    //order
    document.documentdetail.forEach(async ((element)) => {
      let orderinfo = {
        //for reach document
        documentationId: "", //tbf
        order_category: element.category, //category
        order: element.name, //name
        instruction: "",
        destination_name: document.facilityname, //facilityname
        destination: document.facility, //facility id
        order_status: "Billed",
        payer: element.billMode.organizationName,
        paymentmode: element.billMode.paymentmode,

        requestingdoctor_Id: document.createdBy,
        requestingdoctor_Name: document.createdByname,
        requestingdoctor_locationid: document.locationId,
        requestingdoctor_locationName: document.location,
        requestingdoctor_facilityId: document.facility,
        requestingdoctor_facilityname: document.facilityname,

        clientId: document.client,
        clientname: document.clientname,
        client: document.clientobj,

        order_action: [],
        medication_action: [],
        treatment_action: [],
      };

      let billInfo = {
        orderInfo: {
          orderId: "", //tbf
          orderObj: orderinfo,
        },
        serviceInfo: {
          price: element.sellingprice,
          quantity: element.quantity,
          productId: element.productId,
          name: element.name,
          baseunit: element.baseunit,
          amount: element.amount,
          billingId: element.billingId,
          billingContract: element.billingContract,
          createdby: user._id,
        },
        paymentInfo: {
          amountDue: element.amount,
          paidup: 0,
          balance: element.amount,
          paymentDetails: [],
        },
        participantInfo: {
          billingFacility: orderinfo.destination,
          billingFacilityName: orderinfo.destination_name,
          locationId: document.locationId, //selected location,
          clientId: orderinfo.clientId,
          client: orderinfo.client,
          paymentmode: element.billMode,
        },
        createdBy: user._id,
        billing_status: "Unpaid",
      };
      let items = {
        orderinfo,
        billInfo,
      };

      serviceList.push(items);
    });

    console.log("==================");
    console.log(document, serviceList);

    let confirm = window.confirm(
      `You are about to bill ${document.clientname} for ${serviceList.length} service(s)?`
    );
    if (confirm) {
      await BillCreateServ.create({
        document,
        serviceList,
      })
        .then(((res)) => {
          setSuccess(true);
          toast({
            message: "Billed Orders created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          setProductItem([]);
          setCalcAmount(0);
          const today = new Date().toLocaleString();
          //console.log(today)
          setDate(today);
          const invoiceNo = random(6, "uppernumeric");
          setDocumentNo(invoiceNo);
        })
        .catch(((err)) => {
          toast({
            message: "Error creating Billed Orders " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    /*  const    newProductEntryModule={
         selectedMedication:{},
         show :'create'
     }
   await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule})) */
    //console.log(state)
    // ProductEntry.show=!ProductEntry.show
  };

  //create policy
  const onSubmit = async (data, e) => {
    e.preventDefault();
    /*  if(!chosenPlan||!message){
            toast({
                message: 'Please choose plan and/or sponsor! ' ,
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })

            return
        } */

    setMessage("");
    setError(false);
    setSuccess(false);
    //state.Beneficiary?.principal._id
    if (!state.Beneficiary.principal._id) {
      toast({
        message: "Please add principal! ",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });

      return;
    }

    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }

    let confirm = window.confirm(`You are about to register a new policy ?`);
    if (confirm) {
      let policy = {
        policyNo: "CVGBH/2022/098",
        organizationType: user.currentEmployee.facilityDetail.facilityType,
        organizationId: user.currentEmployee.facilityDetail._id,
        organizationName: user.currentEmployee.facilityDetail.facilityName,
        organization: user.currentEmployee.facilityDetail,
        principal: state.Beneficiary.principal, //
        dependantBeneficiaries: state.Beneficiary.dependent,
        provider: chosen, //mixed
        // sponsor:                                                                                                                         sponsor:state.Beneficiary.principal,  //mixed
        sponsorshipType: data.sponsortype,
        plan: chosenPlan,
        premium: price.price,
        premiumContract: price,
        active: false,
        isPaid: false,
        // paymentmode:{ type: String,  default:"Cash"}, //company
        // ??clientId:{ type: String,  },
        // agent"":,"" // if sales is made on behalf of a state programme
        //  agentName:{ type: String,  },
        // bill:{},
        // billId:"",
        // validityPeriods:[ { type: String,  }],
        //  validityEnds:{ type: Schema.Types.Date,},
        //  validitystarts:{ type: Schema.Types.Date,},

        // lastCapitationPaidDate: { type: Schema.Types.Date, required: false },
        // premiumPaymentRef: { type: Schema.Types.Mixed, required: false },
      };

      await policyServ
        .create(policy)
        .then(((res)) => {
          //console.log(JSON.stringify(res))
          e.target.reset();
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          /*  setPatList([])
                  setDependant(false)
                  setDate() */
        })
        .then(async ((res)) => {
          //  await setType("Sales")
          //    const today=new Date().toLocaleString()
          // await setDate(today)
          //    const invoiceNo=random(6,'uppernumeric')
          //   await setDocumentNo(invoiceNo)
          // await setPatient(state.Beneficiary.principal)
          // await createProductItem()
          // await createProductEntry()
          // await handleCreateBill()
        })
        .catch(((err)) => {
          toast({
            message: "Error creating Client " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
          setPatList([]);
          setDependant(false);
        });
    }
  };

  const handleClickProd = () => {
    setState(((prevstate)) => ({  ...prevstate, currBeneficiary: "principal"  }));
    setDependant("principal");
    console.log(state.Beneficiary);
    setClientModal(true);
  };
  const handleClickProd2 = () => {
    setState(((prevstate)) => ({  ...prevstate, currBeneficiary: "dependent"  }));
    setDependant("dependent");
    setClientModal(true);
  };
  const handleHMO = (e) => {
    console.log(e);
  };

  const handlePlan = (e) => {
    console.log(e);
  };

  const handleRow = ((Client)) => {
    //domething o
  };
  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Create Beneficiary</p>
        </div>
        <div className="card-content vscrollable remPad1">
          <div>
            <div className="field is-horizontal">
              <div className="field ">
                <label className="label is-size-7 my-0">Principal </label>
              </div>
              <div className="field ml-2">
                {!state.Beneficiary?.principal._id && (
                  <p className="control">
                    <button className="button is-info is-small btnheight ">
                      <span className="is-small" onClick={handleClickProd}>
                        {" "}
                        +
                      </span>
                    </button>
                  </p>
                )}
              </div>
            </div>
            {!!state.Beneficiary?.principal._id && (
              <table className="table is-striped is-narrow is-hoverable is-fullwidth  ">
                <thead>
                  <tr>
                    <th>
                      <abbr title="Serial No">S/No</abbr>
                    </th>
                    <th>
                      <abbr title="Last Name">Last Name</abbr>
                    </th>
                    <th>First Name</th>
                    <th>
                      <abbr title="Middle Name">Middle Name</abbr>
                    </th>
                    {/* <th><abbr title="Age">Payment Mode</abbr></th> */}
                    <th>
                      <abbr title="Age">Age</abbr>
                    </th>
                    <th>
                      <abbr title="Gender">Gender</abbr>
                    </th>
                    <th>
                      <abbr title="Phone">Phone</abbr>
                    </th>
                    <th>
                      <abbr title="Email">Email</abbr>
                    </th>
                    <th>
                      <abbr title="Tags">Tags</abbr>
                    </th>
                    {/* <th><abbr title="Actions">Actions</abbr></th> */}
                  </tr>
                </thead>
                <tfoot></tfoot>
                <tbody>
                  {/* {facilities.map((Client, i)=>( */}

                  <tr
                    key={state.Beneficiary?.principal._id}
                    onClick={() => handleRow(state.Beneficiary?.principal)}
                    className={
                      state.Beneficiary?.principal._id ===
                      (selectedClient?._id || null)
                        ? "is-selected"
                        : ""
                    }
                  >
                    <td>{1}</td>
                    <th>{state.Beneficiary?.principal.lastname}</th>
                    <td>{state.Beneficiary?.principal.firstname}</td>
                    <td>{state.Beneficiary?.principal.middlename}</td>
                    {/* <td>{state.Beneficiary?.principal.paymentinfo.map((pay,i)=>(
                                                <>
                                                {pay.paymentmode} {pay.paymentmode==="Cash"?"":":" } {pay.organizationName}<br></br>
                                                </>
                                            ))}</td> */}
                    <td>
                      {state.Beneficiary?.principal.dob && (
                        <>
                          {formatDistanceToNowStrict(
                            new Date(state.Beneficiary?.principal.dob)
                          )}
                        </>
                      )}
                    </td>
                    <td>{state.Beneficiary?.principal.gender}</td>
                    <td>{state.Beneficiary?.principal.phone}</td>
                    <td>{state.Beneficiary?.principal.email}</td>
                    <td>{state.Beneficiary?.principal.clientTags}</td>
                    {/*  <td><span   className="showAction"  >...</span></td> */}
                  </tr>
                  {/*   ))} */}
                </tbody>
              </table>
            )}
          </div>
          <div className="field is-horizontal">
            <div className="field ">
              <label className="label is-size-7 my-0">Dependents </label>
            </div>
            <div className="field ml-2">
              <p className="control">
                <button className="button is-info is-small btnheight ">
                  <span className="is-small" onClick={handleClickProd2}>
                    {" "}
                    +
                  </span>
                </button>
              </p>
            </div>
          </div>
          <div>
            {state.Beneficiary.dependent.length > 0 && (
              <table className="table is-striped is-narrow is-hoverable is-fullwidth  ">
                <thead>
                  <tr>
                    <th>
                      <abbr title="Serial No">S/No</abbr>
                    </th>
                    <th>
                      <abbr title="Last Name">Last Name</abbr>
                    </th>
                    <th>First Name</th>
                    <th>
                      <abbr title="Middle Name">Middle Name</abbr>
                    </th>
                    <th>
                      <abbr title="Age">Payment Mode</abbr>
                    </th>
                    <th>
                      <abbr title="Age">Age</abbr>
                    </th>
                    <th>
                      <abbr title="Gender">Gender</abbr>
                    </th>
                    <th>
                      <abbr title="Phone">Phone</abbr>
                    </th>
                    <th>
                      <abbr title="Email">Email</abbr>
                    </th>
                    <th>
                      <abbr title="Tags">Tags</abbr>
                    </th>
                    {/* <th><abbr title="Actions">Actions</abbr></th> */}
                  </tr>
                </thead>
                <tfoot></tfoot>
                <tbody>
                  {state.Beneficiary.dependent.map((Client, i) => (
                    <tr
                      key={Client._id}
                      onClick={() => handleRow(Client)}
                      className={
                        Client._id === (selectedClient?._id || null)
                          ? "is-selected"
                          : ""
                      }
                    >
                      <td>{i + 1}</td>
                      <th>{Client.lastname}</th>
                      <td>{Client.firstname}</td>
                      <td>{Client.middlename}</td>
                      <td>
                        {Client.paymentinfo.map((pay, i) => (
                          <>
                            {pay.paymentmode}{" "}
                            {pay.paymentmode === "Cash" ? "" : ":"}{" "}
                            {pay.organizationName}
                            <br></br>
                          </>
                        ))}
                      </td>
                      <td>
                        {Client.dob && (
                          <>{formatDistanceToNowStrict(new Date(Client.dob))}</>
                        )}
                      </td>
                      <td>{Client.gender}</td>
                      <td>{Client.phone}</td>
                      <td>{Client.email}</td>
                      <td>{Client.clientTags}</td>
                      {/*  <td><span   className="showAction"  >...</span></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label is-size-7 my-0" name="dob" type="text">
              Primary Provider{" "}
            </label>
            <div
              className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
            >
              <OrgFacilitySearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
              <p
                className="control has-icons-left "
                style={{ display: "none" }}
              >
                <input
                  className="input is-small" /* ref={register ({ required: true }) }  */ /* add array no */ /* value={facilityId} name="facilityId" type="text" onChange={e=>setFacilityId(e.target.value)} placeholder="Product Id" */
                />
                <span className="icon is-small is-left">
                  <i className="fas  fa-map-marker-alt"></i>
                </span>
              </p>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label
                    className="label is-size-7 my-0"
                    name="dob"
                    type="text"
                  >
                    Sponsor{" "}
                  </label>
                  <div className="control">
                    <div className="select is-small ">
                      <select
                        name="sponsortype"
                        {...register("x", { required: true })}
                        onChange={(e) => handleChangeMode(e.target.value)}
                        className="selectadd"
                      >
                        <option value=""> Choose Sponsor </option>
                        <option value="Self">Self</option>
                        <option value="Corporate">Corporate</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="field"
                  style={!showCorp ? {  display: "none"  } : {}}
                >
                  <label
                    className="label is-size-7 my-0"
                    name="dob"
                    type="text"
                  >
                    Corporate Sponsor{" "}
                  </label>
                  <div
                    className="field is-expanded" /* style={ !user.stacker?{display:"none"}:{}} */
                  >
                    <SponsorSearch
                      getSearchfacility={getSearchfacility1}
                      clear={success}
                    />
                    <p
                      className="control has-icons-left "
                      style={{  display: "none"  }}
                    >
                      <input
                        className="input is-small" /* ref={register ({ required: true }) }  */ /* add array no */ /* value={facilityId} name="facilityId" type="text" onChange={e=>setFacilityId(e.target.value)} placeholder="Product Id" */
                      />
                      <span className="icon is-small is-left">
                        <i className="fas  fa-map-marker-alt"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <label className="label is-size-7 my-0" name="dob" type="text">
              Plan{" "}
            </label>

            <div className="field">
              <div className="control">
                <div className="select is-small ">
                  <select
                    name="plan"
                    {...register("x", {  required: true  })}
                    onChange={(e, i) => handleChangePlan(e.target.value)}
                    className="selectadd"
                  >
                    <option value=""> Choose Plan </option>
                    {benefittingPlans1.map((option, i) => (
                      <option key={i} value={option.name}>
                        {" "}
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <label className="label is-size-7 my-0" name="dob" type="text">
              Premium:{price.price}
            </label>

            <div className="field">
              <p className="control has-icons-left">
                <label className="is-size-7 my-0"></label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>

            <div className="field  is-grouped mt-2">
              <p className="control">
                <button type="submit" className="button is-success is-small">
                  Save
                </button>
              </p>
              <p className="control">
                <button
                  type="reset"
                  className="button is-warning is-small" /* onClick={(e)=>e.target.reset()} */
                >
                  Reset
                </button>
              </p>
              {/*  <p className="control">
                        <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                        Delete
                        </button>
                    </p> */}
            </div>
          </form>
        </div>
      </div>
      <div className={`modal ${clientModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card modalbkgrnd z10">
          <header className="modal-card-head selectadd">
            <p className="modal-card-title redu">Create Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal4}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            {/*  <ClientGroup  list={patList}  closeModal={handlecloseModal3} choosen={choosen} dupl ={dupl} reg={reg} depen={depen}/>  */}
            <ClientCreate closeModal={handlecloseModal4} />
          </section>
          {/* <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                    </footer> */}
        </div>
      </div>
    </>
  );
}
const BeneficiarySchema = [
  {
    name: "S/N",
    key: "sn",
    description: "SN",
    selector: (row) => row.sn,
    sortable: true,
    inputType: "HIDDEN",
  },
  {
    name: "First Name",
    key: "firstname",
    description: "First Name",
    selector: (row) => row.firstname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Midlle Name",
    key: "middlename",
    description: "Midlle Name",
    selector: (row) => row.middlename,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Last Name",
    key: "lastname",
    description: "Last Name",
    selector: (row) => row.lastname,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Date of Birth",
    key: "dob",
    description: "Date of Birth",
    selector: (row) => row.dob,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Gender",
    key: "gender",
    description: "Male",
    selector: (row) => row.gender,
    sortable: true,
    required: true,
    inputType: "SELECT_LIST",
    options: ["Male", "Female"],
  },

  {
    name: "Marital Status",
    key: "maritalstatus",
    description: "Single",
    selector: (row) => row.maritalstatus,
    sortable: true,
    required: true,
    inputType: "SELECT_LIST",
    options: ["Single", "Married"],
  },

  {
    name: "Email",
    key: "email",
    description: "johndoe@mail.com",
    selector: (row) => row.email,
    sortable: true,
    required: true,
    inputType: "EMAIL",
  },

  {
    name: "Phone Number",
    key: "phone",
    description: "0806478263",
    selector: (row) => row.phone,
    sortable: true,
    required: true,
    inputType: "PHONE",
  },

  {
    name: "Residential Address",
    key: "residentialaddress",
    description: "Ozumba Mbadiwe",
    selector: (row) => row.residentialaddress,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Town",
    key: "town",
    description: "Ikate Elegushi",
    selector: (row) => row.town,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "State",
    key: "state",
    description: "Lagos",
    selector: (row) => row.state,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Country",
    key: "country",
    description: "Nigeria",
    selector: (row) => row.country,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Next of Kin",
    key: "nextofkin",
    description: "Next of Kin",
    selector: (row) => row.nextofkin,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },

  {
    name: "Next of kin Phone",
    key: "nextofkinphone",
    description: "Next of Kin",
    selector: (row) => row.nextofkinphone,
    sortable: true,
    required: true,
    inputType: "TEXT",
  },
];

export function ClientList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("client");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const {  state, setState  } = useContext(ObjectContext);
  // eslint-disable-next-line
  const {  user, setUser  } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState(((prevstate)) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
  };

  const handleRow = async ((Client)) => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(((prevstate)) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
  };

  const handleSearch = ((val)) => {
    // eslint-disable-next-line
    const field = "firstname";
    console.log(val);
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
            email: {
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
          {  gender: val  },
        ],

        "relatedfacilities.facility": user.currentEmployee.facilityDetail._id, // || "",
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(((res)) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch(((err)) => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      // const findClient= await ClientServ.find()
      const findClient = await ClientServ.find({
        query: {
          // "relatedfacilities.facility":user.currentEmployee.facilityDetail._id,
          // $limit:limit,
          // $skip:page * limit,
          $sort: {
            createdAt: -1,
          },
        },
      });
      /*  if (page===0){ */
      await setFacilities(findClient.data);
      /* }else{
            await setFacilities(prevstate=>prevstate.concat(findClient.data))
        } */

      await setTotal(findClient.total);
      //console.log(user.currentEmployee.facilityDetail._id, state)
      //console.log(facilities)
      setPage(((page)) => page + 1);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      //getFacilities()
      rest();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    ClientServ.on("created", ((obj)) => rest());
    ClientServ.on("updated", ((obj)) => rest());
    ClientServ.on("patched", ((obj)) => rest());
    ClientServ.on("removed", ((obj)) => rest());
    return () => {};
    // eslint-disable-next-line
  }, []);
  const rest = async () => {
    // console.log("starting rest")
    // await setRestful(true)
    await setPage(0);
    //await  setLimit(2)
    await setTotal(0);
    await setFacilities([]);
    await getFacilities();
    //await  setPage(0)
    //  await setRestful(false)
  };

  useEffect(() => {
    //console.log(facilities)
    return () => {};
  }, [facilities]);
  //todo: pagination and vertical scroll bar

  return (
    <>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="field">
              <p className="control has-icons-left  ">
                <DebounceInput
                  className="input is-small "
                  type="text"
                  placeholder="Search Clients"
                  minLength={3}
                  debounceTimeout={400}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="level-item">
          {" "}
          <span className="is-size-6 has-text-weight-medium">
            List of Clients{" "}
          </span>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="level-item">
              <div
                className="button is-success is-small"
                onClick={handleCreateNew}
              >
                New
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-container pullup  vscrola" id="scrollableDiv">
        <InfiniteScroll
          dataLength={facilities.length}
          next={getFacilities}
          hasMore={total > facilities.length}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <table className="table is-striped is-narrow is-hoverable is-fullwidth  ">
            <thead>
              <tr>
                <th>
                  <abbr title="Serial No">S/No</abbr>
                </th>
                <th>
                  <abbr title="Last Name">Last Name</abbr>
                </th>
                <th>First Name</th>
                <th>
                  <abbr title="Middle Name">Middle Name</abbr>
                </th>
                <th>
                  <abbr title="Age">Payment Mode</abbr>
                </th>
                <th>
                  <abbr title="Age">Age</abbr>
                </th>
                <th>
                  <abbr title="Gender">Gender</abbr>
                </th>
                <th>
                  <abbr title="Phone">Phone</abbr>
                </th>
                <th>
                  <abbr title="Email">Email</abbr>
                </th>
                <th>
                  <abbr title="Tags">Tags</abbr>
                </th>
                {/* <th><abbr title="Actions">Actions</abbr></th> */}
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {facilities.map((Client, i) => (
                <tr
                  key={Client._id}
                  onClick={() => handleRow(Client)}
                  className={
                    Client._id === (selectedClient?._id || null)
                      ? "is-selected"
                      : ""
                  }
                >
                  <td>{i + 1}</td>
                  <th>{Client.lastname}</th>
                  <td>{Client.firstname}</td>
                  <td>{Client.middlename}</td>
                  <td>
                    {Client.paymentinfo.map((pay, i) => (
                      <>
                        {pay.paymentmode}{" "}
                        {pay.paymentmode === "Cash" ? "" : ":"}{" "}
                        {pay.organizationName}
                        <br></br>
                      </>
                    ))}
                  </td>
                  <td>
                    {Client.dob && (
                      <>{formatDistanceToNowStrict(new Date(Client.dob))}</>
                    )}
                  </td>
                  <td>{Client.gender}</td>
                  <td>{Client.phone}</td>
                  <td>{Client.email}</td>
                  <td>{Client.clientTags}</td>
                  {/*  <td><span   className="showAction"  >...</span></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </>
  );
}

export function ClientDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const navigate = useNavigate();
  // eslint-disable-next-line

  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  const [finacialInfoModal, setFinacialInfoModal] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ClientServ=client.service('/Client')
  //const navigate=useNavigate()
  const {  user, setUser  } = useContext(UserContext);
  const {  state, setState  } = useContext(ObjectContext);

  let Client = state.ClientModule.selectedClient;
  // eslint-disable-next-line
  const client = Client;
  const handleEdit = async () => {
    const newClientModule = {
      selectedClient: Client,
      show: "modify",
    };
    await setState(((prevstate)) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
  };

  const handleFinancialInfo = () => {
    setFinacialInfoModal(true);
  };
  const handlecloseModal = () => {
    setFinacialInfoModal(false);
  };

  const handlecloseModal1 = () => {
    setBillingModal(false);
  };

  const handlecloseModal2 = () => {
    setAppointmentModal(false);
  };

  const showBilling = () => {
    setBillingModal(true);
    //navigate('/app/finance/billservice')
  };

  const handleSchedule = () => {
    setAppointmentModal(true);
  };
  const handleBill = () => {
    setBillModal(true);
  };
  const handlecloseModal3 = () => {
    setBillModal(false);
  };

  /*  useEffect(() => {
        Client =state.ClientModule.selectedClient
        return () => {
           
        }
    }, [billingModal]) */
  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Client Details</p>
          {(user.currentEmployee?.roles.includes("Bill Client") ||
            user.currentEmployee?.roles.length === 0 ||
            user.stacker) && (
            <button
              className="button is-success is-small btnheight mt-2"
              onClick={showBilling}
            >
              Bill Client
            </button>
          )}
        </div>
        <div className="card-content vscrollable">
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.firstname && (
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label
                      className="label is-size-7 my-0 "
                      name="firstname"
                      type="text"
                    >
                      First Name{" "}
                    </label>
                    <label className="is-size-7 my-0 ">
                      {Client.firstname}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-hospital"></i>
                    </span>
                  </p>
                </div>
              )}

              {Client.middlename && (
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label
                      className="label is-size-7 my-0"
                      name="middlename"
                      type="text"
                    >
                      {" "}
                      Middle Name{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.middlename}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-map-signs"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.lastname && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="lastname"
                      type="text"
                    >
                      Last Name
                    </label>
                    <label className="is-size-7 my-0">{Client.lastname}</label>
                    <span className="icon is-small is-left">
                      <i className=" nop-user-md "></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.dob && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="dob"
                      type="text"
                    >
                      Date of Birth{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {new Date(Client.dob).toLocaleDateString("en-GB")}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.gender && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="gender"
                      type="text"
                    >
                      Gender{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.gender}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.maritalstatus && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="maritalstatus"
                      type="text"
                    >
                      Marital Status{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.maritalstatus}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.mrn && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="mrn"
                      type="text"
                    >
                      Medical Records Number{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.mrn}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.religion && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="religion"
                      type="text"
                    >
                      Religion{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.religion}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.profession && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="profession"
                      type="text"
                    >
                      Profession{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.profession}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.phone && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="phone"
                      type="text"
                    >
                      {" "}
                      Phone No
                    </label>
                    <label className="is-size-7 my-0">{Client.phone}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-phone-alt"></i>
                    </span>
                  </p>
                </div>
              )}

              {Client.email && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="email"
                      type="email"
                    >
                      Email{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.email}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {Client.address && (
            <div className="field">
              <p className="control has-icons-left">
                <label
                  className="label is-size-7 my-0"
                  name="address"
                  type="text"
                >
                  Residential Address{" "}
                </label>
                <label className="is-size-7 my-0">{Client.address}</label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
          )}
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.city && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="city"
                      type="text"
                    >
                      Town/City{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.city}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.lga && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="lga"
                      type="text"
                    >
                      Local Govt Area{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.lga}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.state && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="state"
                      type="text"
                    >
                      State{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.state}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.country && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="country"
                      type="text"
                    >
                      Country{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.country}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.bloodgroup && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="bloodgroup"
                      type="text"
                    >
                      Blood Group{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.bloodgroup}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}

              {Client.genotype && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="genotype"
                      type="text"
                    >
                      Genotype{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.genotype}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.disabilities && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="disabilities"
                      type="text"
                    >
                      Disabilities{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.disabilities}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-body">
              {Client.allergies && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="allergies"
                      type="text"
                    >
                      Allergies{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.allergies}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.comorbidities && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="comorbidities"
                      type="text"
                    >
                      Co-mobidities{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.comorbidities}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          {Client.clientTags && (
            <div className="field">
              <p className="control has-icons-left">
                <label
                  className="label is-size-7 my-0"
                  name="clientTags"
                  type="text"
                >
                  Tags{" "}
                </label>
                <label className="is-size-7 my-0">{Client.clientTags}</label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
          )}
          {Client.specificDetails && (
            <div className="field">
              <p className="control has-icons-left">
                <label
                  className="label is-size-7 my-0"
                  name="specificDetails"
                  type="text"
                >
                  Specific Details about Client{" "}
                </label>
                <label className="is-size-7 my-0">
                  {Client.specificDetails}
                </label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
          )}
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.nok_name && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_name"
                      type="text"
                    >
                      Next of Kin Full Name
                    </label>
                    <label className="is-size-7 my-0">{Client.nok_name}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.nok_phoneno && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_phoneno"
                      type="text"
                    >
                      Next of Kin Phone Number
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.nok_phoneno}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.nok_email && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_email"
                      type="email"
                    >
                      Next of Kin Email{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.nok_email}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.nok_relationship && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_relationship"
                      type="text"
                    >
                      Next of Kin Relationship"{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.nok_relationship}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-grouped  mt-2">
            <p className="control">
              <button
                className="button is-success is-small"
                onClick={handleEdit}
              >
                Edit Details
              </button>
            </p>
            <p className="control">
              <button
                className="button is-info is-small"
                onClick={handleFinancialInfo}
              >
                Payment Info
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small"
                onClick={handleSchedule}
              >
                Schedule appointment
              </button>
            </p>
            {/*  <p className="control">
                    <button className="button is-danger is-small" >
                        Check into Clinic 
                    </button>
                </p> */}
            <p className="control">
              <button
                className="button is-link is-small"
                onClick={() => {
                  navigate("/app/clinic/encounter");
                }}
              >
                Attend to Client
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className={`modal ${finacialInfoModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Financial Information</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <ClientFinInfo closeModal={handlecloseModal} />
          </section>
          {/* <footer className="modal-card-foot">
                <button className="button is-success">Save changes</button>
                <button className="button">Cancel</button>
                </footer> */}
        </div>
      </div>

      <div className={`modal ${billingModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Bill Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal1}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <BillServiceCreate closeModal={handlecloseModal1} />
          </section>
          {/* <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                    </footer> */}
        </div>
      </div>
      <div className={`modal ${appointmentModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Set Appointment</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal2}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <AppointmentCreate closeModal={handlecloseModal2} />
          </section>
          {/* <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                    </footer> */}
        </div>
      </div>
      <div className={`modal ${billModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Set Appointment</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal3}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <ClientBilledPrescription
              selectedClient={Client._id}
              closeModal={handlecloseModal3}
            />
          </section>
          {/* <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                    </footer> */}
        </div>
      </div>
    </>
  );
}

export function ClientModify() {
  const {  register, handleSubmit, setValue, reset  } = useForm(); //watch, errors,, errors
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("client");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {  user  } = useContext(UserContext);
  const {  state, setState  } = useContext(ObjectContext);

  const Client = state.ClientModule.selectedClient;

  useEffect(() => {
    setValue("firstname", Client.firstname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("middlename", Client.middlename, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("lastname", Client.lastname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("phone", Client.phone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("email", Client.email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("dob", Client.dob, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("gender", Client.gender, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("profession", Client.profession, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("address", Client.address, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("city", Client.city, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("state", Client.state, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("country", Client.country, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("nok_name", Client.nok_name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("nok_email", Client.nok_email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("nok_phoneno", Client.nokphoneno, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("lga", Client.lga, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("bloodgroup", Client.bloodgroup, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("genotype", Client.genotype, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("disabilities", Client.disabilities, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("specificDetails", Client.specificDetails, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("clientTags", Client.clientTags, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("mrn", Client.mrn, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("comorbidities", Client.comorbidities, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("allergies", Client.allergies, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(((prevstate)) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    setState(((prevstate)) => ({  ...prevstate, ClientModule: newClientModule  }));
  };
  // eslint-disable-next-line
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Client._id;
    if (conf) {
      ClientServ.remove(dleteId)
        .then(((res)) => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Client successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Client deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(((err)) => {
          // setMessage("Error deleting Client, probable network issues "+ err )
          // setError(true)
          toast({
            message: "Error deleting Client, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    // console.log(data)
    //  data.facility=Client.facility
    //console.log(data);

    ClientServ.patch(Client._id, data)
      .then(((res)) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Client successfully")
        toast({
          message: "Client updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(((err)) => {
        //setMessage("Error creating Client, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Client, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Client Details-Modify</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label className="label is-size-7">First Name </label>{" "}
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="firstname"
                      type="text"
                      placeholder="First Name "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-hospital"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label className="label is-size-7"> Middle Name </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="middlename"
                      type="text"
                      placeholder="Middle Name "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-map-signs"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Last Name</label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="lastname"
                      type="text"
                      placeholder="Last Name "
                    />
                    <span className="icon is-small is-left">
                      <i className=" nop-user-md "></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Date of Birth </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="dob"
                      type="text"
                      placeholder="Date of Birth "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Gender </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="gender"
                      type="text"
                      placeholder="Gender  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Marital Status </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="maritalstatus"
                      type="text"
                      placeholder="Marital Status  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7"> Records Number </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="mrn"
                      type="text"
                      placeholder="Records Number  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Religion</label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="religion"
                      type="text"
                      placeholder="Religion "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Profession </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="profession"
                      type="text"
                      placeholder="Profession"
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7"> Phone No</label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="phone"
                      type="text"
                      placeholder=" Phone No "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-phone-alt"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Email </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="email"
                      type="email"
                      placeholder="Email  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <label className="label is-size-7">Residential Address </label>
                <input
                  className="input is-small"
                  {...register("x")}
                  name="address"
                  type="text"
                  placeholder="Residential Address  "
                />
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Town/City </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="city"
                      type="text"
                      placeholder="Town/City  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Local Govt Area </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="lga"
                      type="text"
                      placeholder="Local Govt Area  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">State </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="state"
                      type="text"
                      placeholder="State"
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Country </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="country"
                      type="text"
                      placeholder="Country  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Blood Group </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="bloodgroup"
                      type="text"
                      placeholder="Blood Group "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Genotype </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="genotype"
                      type="text"
                      placeholder="Genotype "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Disabilities </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="disabilities"
                      type="text"
                      placeholder="Disabilities  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Allergies </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="allergies"
                      type="text"
                      placeholder="Allergies  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Co-mobidities </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="comorbidities"
                      type="text"
                      placeholder="Co-mobidities "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <label className="label is-size-7">Tags </label>
                <input
                  className="input is-small"
                  {...register("x")}
                  name="clientTags"
                  type="text"
                  placeholder="Tags "
                />
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <label className="label is-size-7">
                  Specific Details about client{" "}
                </label>
                <input
                  className="input is-small"
                  {...register("x")}
                  name="specificDetails"
                  type="text"
                  placeholder="Specific Details about client "
                />
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">
                      Next of Kin Full Name
                    </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_name"
                      type="text"
                      placeholder="Next of Kin Full Name "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Phone Number</label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_phoneno"
                      type="text"
                      placeholder=" "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">
                      Next of Kin Email{" "}
                    </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_email"
                      type="email"
                      placeholder="Next of Kin Email  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7"> Relationship </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_relationship"
                      type="text"
                      placeholder="Next of Kin Relationship"
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </form>

          <div className="field  is-grouped mt-2">
            <p className="control">
              <button
                type="submit"
                className="button is-success is-small"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </p>
            <p className="control">
              <button
                className="button is-danger is-small"
                onClick={() => handleDelete()}
                type="delete"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function InputSearch({  getSearchfacility, clear  }) {
  const ClientServ = client.service("client");
  // const facilityServ=client.service('facility')
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

  const handleRow = async ((obj)) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

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
  const handleBlur = async (e) => {
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
  const handleSearch = async ((val)) => {
    const field = "facilityName"; //field variable

    if (val.length >= 3) {
      ClientServ.find({
        query: {
          //service
          [field]: {
            $regex: val,
            $options: "i",
          },
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then(((res)) => {
          console.log("facility  fetched successfully");
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch(((err)) => {
          console.log(err);
          setSearchMessage(
            "Error searching facility, probable network issues " + err
          );
          setSearchError(true);
        });
    } else {
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Facilities"
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
