/* eslint-disable */
<<<<<<< HEAD
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; //Route, Switch,Link, NavLink,
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { formatDistanceToNowStrict } from 'date-fns';
import ClientFinInfo from './ClientFinInfo';
import BillServiceCreate from '../Finance/BillServiceCreate';
// import { AppointmentCreate } from '../Appointment/Appointments';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClientBilledPrescription from '../Finance/ClientBill';
import ClientGroup from './ClientGroup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import { ClientMiniSchema } from './schema';
// eslint-disable-next-line
const searchfacility = {};
export default function Client() {
  const { state } = useContext(ObjectContext); //,setState
=======
import React, {useState, useContext, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom"; //Route, Switch,Link, NavLink,
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict} from "date-fns";
import ClientFinInfo from "./ClientFinInfo";
import BillServiceCreate from "../Finance/BillServiceCreate";
import {AppointmentCreate} from "../Clinic/Appointments";
import InfiniteScroll from "react-infinite-scroll-component";
import ClientBilledPrescription from "../Finance/ClientBill";
import ClientGroup from "./ClientGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import {ClientMiniSchema} from "./schema";
// eslint-disable-next-line
const searchfacility = {};

export default function Client() {
  const {state} = useContext(ObjectContext); //,setState
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
          {state.ClientModule.show === 'List' && <ClientList />}
          {/*   {(state.ClientModule.show ==='create')&&<ClientCreate />} */}
          {state.ClientModule.show === 'detail' && <ClientDetail />}
          {state.ClientModule.show === 'modify' && (
=======
          {state.ClientModule.show === "List" && <ClientList />}
          {/*   {(state.ClientModule.show ==='create')&&<ClientCreate />} */}
          {state.ClientModule.show === "detail" && <ClientDetail />}
          {state.ClientModule.show === "modify" && (
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            <ClientModify Client={selectedClient} />
          )}
        </div>
      </div>
    </section>
  );
}

export function ClientCreate() {
<<<<<<< HEAD
  const { register, handleSubmit, setValue, getValues, reset } = useForm(); //, watch, errors, reset
=======
  const {register, handleSubmit, setValue, getValues, reset} = useForm(); //, watch, errors, reset
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
<<<<<<< HEAD
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service('client');
  const mpiServ = client.service('mpi');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
=======
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("client");
  const mpiServ = client.service("mpi");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
  const [billModal, setBillModal] = useState(false);
  const [patList, setPatList] = useState([]);
  const [dependant, setDependant] = useState(false);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();

  // eslint-disable-next-line
<<<<<<< HEAD
  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
=======
  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
      shouldValidate: true,
      shouldDirty: true,
    });
  };

<<<<<<< HEAD
  const handleDate = async (date) => {
=======
  const handleDate = async date => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
      data.middlename = data.middlename || '';
=======
      data.middlename = data.middlename || "";
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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

<<<<<<< HEAD
  const checkQuery = (query) => {
=======
  const checkQuery = query => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
    setPatList([]);
    if (
      !(
        query &&
        Object.keys(query).length === 0 &&
        query.constructor === Object
      )
    ) {
<<<<<<< HEAD
      ClientServ.find({ query: query })
        .then((res) => {
=======
      ClientServ.find({query: query})
        .then(res => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
          console.log(res);
          if (res.total > 0) {
            // alert(res.total)
            setPatList(res.data);
            setBillModal(true);
            return;
          }
        })
<<<<<<< HEAD
        .catch((err) => {
=======
        .catch(err => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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

<<<<<<< HEAD
  const choosen = async (client) => {
=======
  const choosen = async client => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
  const dupl = (client) => {
    toast({
      message: 'Client previously registered in this facility',
      type: 'is-danger',
=======
  const dupl = client => {
    toast({
      message: "Client previously registered in this facility",
      type: "is-danger",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
      dismissible: true,
      pauseOnHover: true,
    });
    reset();
    setPatList([]);
  };
<<<<<<< HEAD
  const reg = async (client) => {
    if (
      client.relatedfacilities.findIndex(
        (el) => el.facility === user.currentEmployee.facilityDetail._id
=======
  const reg = async client => {
    if (
      client.relatedfacilities.findIndex(
        el => el.facility === user.currentEmployee.facilityDetail._id
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
        .then((resp) => {
          toast({
            message: 'Client created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((err) => {
          toast({
            message: 'Error creating Client ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
=======
        .then(resp => {
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch(err => {
          toast({
            message: "Error creating Client " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
        });
    }
    //reset form
    reset();
    setPatList([]);
    //cash payment
  };
<<<<<<< HEAD
  const depen = (client) => {
=======
  const depen = client => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
    setDependant(true);
  };
  const onSubmit = async (data, e) => {
    if (!date) {
      toast({
<<<<<<< HEAD
        message: 'Please enter Date of Birth! ',
        type: 'is-danger',
=======
        message: "Please enter Date of Birth! ",
        type: "is-danger",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
        dismissible: true,
        pauseOnHover: true,
      });

      return;
    }
    e.preventDefault();
<<<<<<< HEAD
    setMessage('');
=======
    setMessage("");
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
      `You are about to register a new patient ${data.firstname}  ${data.middlename} ${data.lastname} ?`
    );
    if (confirm) {
      data.dob = date;
      await ClientServ.create(data)
<<<<<<< HEAD
        .then((res) => {
=======
        .then(res => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
          //console.log(JSON.stringify(res))
          e.target.reset();
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          toast({
<<<<<<< HEAD
            message: 'Client created succesfully',
            type: 'is-success',
=======
            message: "Client created succesfully",
            type: "is-success",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          setPatList([]);
          setDependant(false);
          setDate();
        })
<<<<<<< HEAD
        .catch((err) => {
          toast({
            message: 'Error creating Client ' + err,
            type: 'is-danger',
=======
        .catch(err => {
          toast({
            message: "Error creating Client " + err,
            type: "is-danger",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      ref={register({ required: true })}
=======
                      ref={register({required: true})}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
                      ref={register()}
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

<<<<<<< HEAD
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small is-danger"
                      ref={register({ required: true })}
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
=======
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small is-danger"
                      ref={register({required: true})}
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
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                  <p className="control has-icons-left is-danger">
                    {/*   <input className="input is-small is-danger" ref={register({ required: true })} name="dob" type="text" placeholder="Date of Birth"  onBlur={checkClient}/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span> */}
                    <DatePicker
                      className="is-danger red-border is-small"
                      selected={date}
<<<<<<< HEAD
                      onChange={(date) => handleDate(date)}
=======
                      onChange={date => handleDate(date)}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Enter date with dd/MM/yyyy format "
                      //isClearable
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
<<<<<<< HEAD
                      ref={register({ required: true })}
=======
                      ref={register({required: true})}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
                      ref={register()}
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
                  ref={register()}
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
                  ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
                      name="genotype"
                      type="text"
                      placeholder="Genotype"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
<<<<<<< HEAD
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      ref={register()}
                      name="disabilities"
                      type="text"
                      placeholder="Disabilities"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
=======
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      ref={register()}
                      name="disabilities"
                      type="text"
                      placeholder="Disabilities"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      ref={register()}
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
                      ref={register()}
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
                  ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
<<<<<<< HEAD
      <div className={`modal ${billModal ? 'is-active' : ''}`}>
=======
      <div className={`modal ${billModal ? "is-active" : ""}`}>
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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

export function ClientList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
<<<<<<< HEAD
  const [message, setMessage] = useState('');
  const ClientServ = client.service('client');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
=======
  const [message, setMessage] = useState("");
  const ClientServ = client.service("client");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
<<<<<<< HEAD
      show: 'create',
    };
    await setState((prevstate) => ({
=======
      show: "create",
    };
    await setState(prevstate => ({
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
  };

<<<<<<< HEAD
  const handleRow = async (Client) => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: 'detail',
    };
    await setState((prevstate) => ({
=======
  const handleRow = async Client => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(prevstate => ({
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
      ...prevstate,
      ClientModule: newClientModule,
    }));
  };

<<<<<<< HEAD
  const handleSearch = (val) => {
    // eslint-disable-next-line
    const field = 'firstname';
=======
  const handleSearch = val => {
    // eslint-disable-next-line
    const field = "firstname";
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
    console.log(val);
    ClientServ.find({
      query: {
        $or: [
          {
            firstname: {
              $regex: val,
<<<<<<< HEAD
              $options: 'i',
=======
              $options: "i",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            },
          },
          {
            lastname: {
              $regex: val,
<<<<<<< HEAD
              $options: 'i',
=======
              $options: "i",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            },
          },
          {
            middlename: {
              $regex: val,
<<<<<<< HEAD
              $options: 'i',
=======
              $options: "i",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            },
          },
          {
            phone: {
              $regex: val,
<<<<<<< HEAD
              $options: 'i',
=======
              $options: "i",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            },
          },
          {
            clientTags: {
              $regex: val,
<<<<<<< HEAD
              $options: 'i',
=======
              $options: "i",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            },
          },
          {
            mrn: {
              $regex: val,
<<<<<<< HEAD
              $options: 'i',
=======
              $options: "i",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            },
          },
          {
            email: {
              $regex: val,
<<<<<<< HEAD
              $options: 'i',
=======
              $options: "i",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            },
          },
          {
            specificDetails: {
              $regex: val,
<<<<<<< HEAD
              $options: 'i',
            },
          },
          { gender: val },
        ],

        'relatedfacilities.facility': user.currentEmployee.facilityDetail._id, // || "",
=======
              $options: "i",
            },
          },
          {gender: val},
        ],

        "relatedfacilities.facility": user.currentEmployee.facilityDetail._id, // || "",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
      },
    })
<<<<<<< HEAD
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(' Client  fetched successfully');
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage('Error fetching Client, probable network issues ' + err);
=======
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findClient = await ClientServ.find({
        query: {
<<<<<<< HEAD
          'relatedfacilities.facility': user.currentEmployee.facilityDetail._id,
=======
          "relatedfacilities.facility": user.currentEmployee.facilityDetail._id,
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
          $limit: limit,
          $skip: page * limit,
          $sort: {
            createdAt: -1,
          },
        },
      });
      if (page === 0) {
        await setFacilities(findClient.data);
      } else {
<<<<<<< HEAD
        await setFacilities((prevstate) => prevstate.concat(findClient.data));
=======
        await setFacilities(prevstate => prevstate.concat(findClient.data));
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
      }

      await setTotal(findClient.total);
      //console.log(user.currentEmployee.facilityDetail._id, state)
      //console.log(facilities)
<<<<<<< HEAD
      setPage((page) => page + 1);
=======
      setPage(page => page + 1);
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
    ClientServ.on('created', (obj) => rest());
    ClientServ.on('updated', (obj) => rest());
    ClientServ.on('patched', (obj) => rest());
    ClientServ.on('removed', (obj) => rest());
=======
    ClientServ.on("created", obj => rest());
    ClientServ.on("updated", obj => rest());
    ClientServ.on("patched", obj => rest());
    ClientServ.on("removed", obj => rest());
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
    console.log(facilities);
    return () => {};
  }, [facilities]);
  //todo: pagination and vertical scroll bar
  const handleCreate = () => {};
=======
    //console.log(facilities)
    return () => {};
  }, [facilities]);
  //todo: pagination and vertical scroll bar

  const handleCreate = () => {};

>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
  const onRowClicked = () => {};

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <PageWrapper
<<<<<<< HEAD
              style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
            >
              <TableMenu>
                <div style={{ display: 'flex', alignItems: 'center' }}>
=======
              style={{flexDirection: "column", padding: "0.6rem 1rem"}}
            >
              <TableMenu>
                <div style={{display: "flex", alignItems: "center"}}>
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
<<<<<<< HEAD
                  <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                    List of Clients
                  </h2>
                </div>
                {handleCreate && (
                  <Button
                    style={{ fontSize: '14px', fontWeight: '600' }}
                    label="Add new "
                    onClick={handleCreate}
                  />
                )}
              </TableMenu>
              <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
                <CustomTable
                  title={''}
=======
                  <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                    List of Clients
                  </h2>
                </div>

                {handleCreate && (
                  <Button
                    style={{fontSize: "14px", fontWeight: "600"}}
                    label="Add new "
                    onClick={handleCreate}
                    showicon={true}
                  />
                )}
              </TableMenu>

              <div style={{width: "100%", height: "600px", overflow: "auto"}}>
                <CustomTable
                  title={""}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                  columns={ClientMiniSchema}
                  data={facilities}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={onRowClicked}
                  progressPending={loading}
                />
              </div>
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function ClientDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const navigate = useNaviagate();
  // eslint-disable-next-line

  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  const [finacialInfoModal, setFinacialInfoModal] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  // eslint-disable-next-line
<<<<<<< HEAD
  const [message, setMessage] = useState(''); //,
  //const ClientServ=client.service('/Client')
  //const navigate=useNavigate()
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
=======
  const [message, setMessage] = useState(""); //,
  //const ClientServ=client.service('/Client')
  //const navigate=useNavigate()
  const {user, setUser} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255

  let Client = state.ClientModule.selectedClient;
  // eslint-disable-next-line
  const client = Client;
  const handleEdit = async () => {
    const newClientModule = {
      selectedClient: Client,
<<<<<<< HEAD
      show: 'modify',
    };
    await setState((prevstate) => ({
=======
      show: "modify",
    };
    await setState(prevstate => ({
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
    //history.push('/app/finance/billservice')
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
<<<<<<< HEAD
          {(user.currentEmployee?.roles.includes('Bill Client') ||
=======
          {(user.currentEmployee?.roles.includes("Bill Client") ||
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      First Name{' '}
=======
                      First Name{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      {' '}
                      Middle Name{' '}
=======
                      {" "}
                      Middle Name{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Date of Birth{' '}
                    </label>
                    <label className="is-size-7 my-0">
                      {new Date(Client.dob).toLocaleDateString('en-GB')}
=======
                      Date of Birth{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {new Date(Client.dob).toLocaleDateString("en-GB")}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Gender{' '}
=======
                      Gender{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                    </label>
                    <label className="is-size-7 my-0">{Client.gender}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
<<<<<<< HEAD
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
                      Marital Status{' '}
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
                      Medical Records Number{' '}
                    </label>
                    <label className="is-size-7 my-0">{Client.mrn}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
=======
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
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Religion{' '}
=======
                      Religion{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Profession{' '}
=======
                      Profession{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      {' '}
=======
                      {" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Email{' '}
=======
                      Email{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                  Residential Address{' '}
=======
                  Residential Address{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Town/City{' '}
=======
                      Town/City{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Local Govt Area{' '}
=======
                      Local Govt Area{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      State{' '}
=======
                      State{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Country{' '}
=======
                      Country{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Blood Group{' '}
=======
                      Blood Group{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.bloodgroup}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
<<<<<<< HEAD
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
                      Genotype{' '}
                    </label>
                    <label className="is-size-7 my-0">{Client.genotype}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
=======
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
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
              {Client.disabilities && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="disabilities"
                      type="text"
                    >
<<<<<<< HEAD
                      Disabilities{' '}
=======
                      Disabilities{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Allergies{' '}
=======
                      Allergies{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Co-mobidities{' '}
=======
                      Co-mobidities{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                  Tags{' '}
=======
                  Tags{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                  Specific Details about Client{' '}
=======
                  Specific Details about Client{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Next of Kin Email{' '}
=======
                      Next of Kin Email{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                      Next of Kin Relationship"{' '}
=======
                      Next of Kin Relationship"{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                  history.push('/app/clinic/encounter');
=======
                  history.push("/app/clinic/encounter");
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                }}
              >
                Attend to Client
              </button>
            </p>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div className={`modal ${finacialInfoModal ? 'is-active' : ''}`}>
=======
      <div className={`modal ${finacialInfoModal ? "is-active" : ""}`}>
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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

<<<<<<< HEAD
      <div className={`modal ${billingModal ? 'is-active' : ''}`}>
=======
      <div className={`modal ${billingModal ? "is-active" : ""}`}>
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
      <div className={`modal ${appointmentModal ? 'is-active' : ''}`}>
=======
      <div className={`modal ${appointmentModal ? "is-active" : ""}`}>
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
      <div className={`modal ${billModal ? 'is-active' : ''}`}>
=======
      <div className={`modal ${billModal ? "is-active" : ""}`}>
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
  const { register, handleSubmit, setValue, reset } = useForm(); //watch, errors,, errors
=======
  const {register, handleSubmit, setValue, reset} = useForm(); //watch, errors,, errors
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
<<<<<<< HEAD
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const ClientServ = client.service('client');
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
=======
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("client");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255

  const Client = state.ClientModule.selectedClient;

  useEffect(() => {
<<<<<<< HEAD
    setValue('firstname', Client.firstname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('middlename', Client.middlename, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('lastname', Client.lastname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('phone', Client.phone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('email', Client.email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('dob', Client.dob, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('gender', Client.gender, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('profession', Client.profession, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('address', Client.address, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('city', Client.city, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('state', Client.state, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('country', Client.country, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('nok_name', Client.nok_name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('nok_email', Client.nok_email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('nok_phoneno', Client.nokphoneno, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('lga', Client.lga, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('bloodgroup', Client.bloodgroup, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('genotype', Client.genotype, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('disabilities', Client.disabilities, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('specificDetails', Client.specificDetails, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('clientTags', Client.clientTags, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('mrn', Client.mrn, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('comorbidities', Client.comorbidities, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('allergies', Client.allergies, {
=======
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
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newClientModule = {
      selectedClient: Client,
<<<<<<< HEAD
      show: 'detail',
    };
    await setState((prevstate) => ({
=======
      show: "detail",
    };
    await setState(prevstate => ({
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newClientModule = {
      selectedClient: {},
<<<<<<< HEAD
      show: 'create',
    };
    setState((prevstate) => ({ ...prevstate, ClientModule: newClientModule }));
  };
  // eslint-disable-next-line
  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');
=======
      show: "create",
    };
    setState(prevstate => ({...prevstate, ClientModule: newClientModule}));
  };
  // eslint-disable-next-line
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255

    const dleteId = Client._id;
    if (conf) {
      ClientServ.remove(dleteId)
<<<<<<< HEAD
        .then((res) => {
=======
        .then(res => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Client successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
<<<<<<< HEAD
            message: 'Client deleted succesfully',
            type: 'is-success',
=======
            message: "Client deleted succesfully",
            type: "is-success",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
<<<<<<< HEAD
        .catch((err) => {
          // setMessage("Error deleting Client, probable network issues "+ err )
          // setError(true)
          toast({
            message: 'Error deleting Client, probable network issues or ' + err,
            type: 'is-danger',
=======
        .catch(err => {
          // setMessage("Error deleting Client, probable network issues "+ err )
          // setError(true)
          toast({
            message: "Error deleting Client, probable network issues or " + err,
            type: "is-danger",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
      .then((res) => {
=======
      .then(res => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Client successfully")
        toast({
<<<<<<< HEAD
          message: 'Client updated succesfully',
          type: 'is-success',
=======
          message: "Client updated succesfully",
          type: "is-success",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
<<<<<<< HEAD
      .catch((err) => {
        //setMessage("Error creating Client, probable network issues "+ err )
        // setError(true)
        toast({
          message: 'Error updating Client, probable network issues or ' + err,
          type: 'is-danger',
=======
      .catch(err => {
        //setMessage("Error creating Client, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Client, probable network issues or " + err,
          type: "is-danger",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
                    <label className="label is-size-7">First Name </label>{' '}
=======
                    <label className="label is-size-7">First Name </label>{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                    <input
                      className="input is-small"
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
                      name="dob"
                      type="text"
                      placeholder="Date of Birth "
                    />
<<<<<<< HEAD
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
                      ref={register()}
                      name="gender"
                      type="text"
                      placeholder="Gender  "
                    />
=======
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
<<<<<<< HEAD
=======
                    <label className="label is-size-7">Gender </label>
                    <input
                      className="input is-small"
                      ref={register()}
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
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                    <label className="label is-size-7">Marital Status </label>
                    <input
                      className="input is-small"
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                  ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
                  ref={register()}
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
<<<<<<< HEAD
                  Specific Details about client{' '}
=======
                  Specific Details about client{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                </label>
                <input
                  className="input is-small"
                  ref={register()}
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
                      ref={register()}
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
                      ref={register()}
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
<<<<<<< HEAD
                      Next of Kin Email{' '}
=======
                      Next of Kin Email{" "}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
                    </label>
                    <input
                      className="input is-small"
                      ref={register()}
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
                      ref={register()}
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

<<<<<<< HEAD
export function InputSearch({ getSearchfacility, clear }) {
  const ClientServ = client.service('client');
=======
export function InputSearch({getSearchfacility, clear}) {
  const ClientServ = client.service("client");
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
  // const facilityServ=client.service('facility')
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
<<<<<<< HEAD
  const [searchMessage, setSearchMessage] = useState('');
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState('');
=======
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);

<<<<<<< HEAD
  const handleRow = async (obj) => {
=======
  const handleRow = async obj => {
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
  const handleBlur = async (e) => {
    if (count === 2) {
      console.log('stuff was chosen');
=======
  const handleBlur = async e => {
    if (count === 2) {
      console.log("stuff was chosen");
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
  const handleSearch = async (val) => {
    const field = 'facilityName'; //field variable
=======
  const handleSearch = async val => {
    const field = "facilityName"; //field variable
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255

    if (val.length >= 3) {
      ClientServ.find({
        query: {
          //service
          [field]: {
            $regex: val,
<<<<<<< HEAD
            $options: 'i',
=======
            $options: "i",
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
          },
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
<<<<<<< HEAD
        .then((res) => {
          console.log('facility  fetched successfully');
          setFacilities(res.data);
          setSearchMessage(' facility  fetched successfully');
          setShowPanel(true);
        })
        .catch((err) => {
          console.log(err);
          setSearchMessage(
            'Error searching facility, probable network issues ' + err
=======
        .then(res => {
          console.log("facility  fetched successfully");
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          console.log(err);
          setSearchMessage(
            "Error searching facility, probable network issues " + err
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
          );
          setSearchError(true);
        });
    } else {
<<<<<<< HEAD
      console.log('less than 3 ');
=======
      console.log("less than 3 ");
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
<<<<<<< HEAD
      setSimpa('');
=======
      setSimpa("");
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
<<<<<<< HEAD
          <div className={`dropdown ${showPanel ? 'is-active' : ''}`}>
=======
          <div className={`dropdown ${showPanel ? "is-active" : ""}`}>
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
            <div className="dropdown-trigger">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Facilities"
                value={simpa}
                minLength={1}
                debounceTimeout={400}
<<<<<<< HEAD
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSearch(e.target.value)}
=======
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
