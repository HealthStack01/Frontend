/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom"; //Route, Switch,Link, NavLink,
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext, ObjectContext } from "../../context";
import { toast } from "react-toastify";
import { formatDistanceToNowStrict } from "date-fns";
import ClientFinInfo from "./ClientFinInfo";
import BillServiceCreate from "../Finance/BillServiceCreate";
import { AppointmentCreate } from "../Appointment/generalAppointment";
import InfiniteScroll from "react-infinite-scroll-component";
import ClientBilledPrescription from "../Finance/ClientBill";
import ClientGroup from "./ClientGroup";
import DatePicker from "react-datepicker";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import {
  EnrolleSchema,
  EnrolleSchema2,
  EnrolleSchema3,
  EnrolleSchema4,
  EnrolleSchema5,
  EnrolleSchemaProvider,
  principalData,
} from "./schema";
import "react-datepicker/dist/react-datepicker.css";
import { OrgFacilitySearch, SponsorSearch } from "../helpers/FacilitySearch";
import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import { Avatar, Box, Button } from "@mui/material";
import CustomTable from "../../components/customtable";
import ModalBox from "../../components/modal";
import ModalHeader from "../Appointment/ui-components/Heading/modalHeader";
import { Grid } from "@mui/material";
import Input from "../../components/inputs/basic/Input/index";
import ToggleButton from "../../components/toggleButton";
import RadioButton from "../../components/inputs/basic/Radio";
import BasicDatePicker from "../../components/inputs/Date";
import BasicDateTimePicker from "../../components/inputs/DateTime";
import CustomSelect from "../../components/inputs/basic/Select";
import Textarea from "../../components/inputs/basic/Textarea";
import { MdCancel, MdAddCircle } from "react-icons/md";
import ClientForm from "../Client/ClientForm";
import {
  BottomWrapper,
  GridWrapper,
  HeadWrapper,
  ViewBox,
} from "../app/styles";
import ClinicAppointments from "../Appointment/clinicAppointments";
import PharmacyBillService from "../Finance/BillService";
import Claims from "./Claims";
import GeneralAppointments from "./Referral";
import HealthPlan from "./HealthPlan";
var random = require("random-string-generator");
import { yupResolver } from "@hookform/resolvers/yup";
import { createClientSchema } from "../Client/schema";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import SaveIcon from "@mui/icons-material/Save";
import Policy from "./Policy";
import { FormsHeaderText } from "../../components/texts";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { getBase64 } from "../helpers/getBase64";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import MuiDateTimePicker from "../../components/inputs/DateTime/MuiDateTimePicker";
import { ProviderPrintId } from "./components/PrintId";
//import {PolicyDetail} from "./Policy";
// eslint-disable-next-line
const searchfacility = {};

export default function Beneficiary({ standalone = false }) {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  return (
    <section className="section remPadTop">
      {showModal === 0 && (
        <ClientList showModal={showModal} setShowModal={setShowModal} />
      )}
      {/* {state.ClientModule.show === 'create' && <BeneficiaryCreate />} */}
      {showModal === 1 && (
        <ClientDetail setShowModal={setShowModal} showModal={showModal} />
      )}
      {showModal === 2 && (
        <ModalBox open onClose={() => setShowModal(false)}>
          <BeneficiaryCreate openCreate={setShowModal2} />
        </ModalBox>
      )}
      {showModal2 && (
        <ModalBox open={showModal2} onClose={() => setShowModal2(false)}>
          <ClientCreate />
        </ModalBox>
      )}
      {showModal === 3 && (
        <ClientModify showModal={showModal3} setShowModal={setShowModal} />
      )}
    </section>
  );
}

export function ClientCreate({ closeModal }) {
  const { register, handleSubmit, setValue, getValues, reset } = useForm(); //, watch, errors, reset
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
  const { user } = useContext(UserContext); //,setUser
  const [billModal, setBillModal] = useState(false);
  const [patList, setPatList] = useState([]);
  const [dependant, setDependant] = useState(false);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();
  const { state, setState } = useContext(ObjectContext);

  // eslint-disable-next-line
  const getSearchfacility = (obj) => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDate = async (date) => {
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

  const checkQuery = (query) => {
    setPatList([]);
    if (
      !(
        query &&
        Object.keys(query).length === 0 &&
        query.constructor === Object
      )
    ) {
      ClientServ.find({ query: query })
        .then((res) => {
          console.log(res);
          if (res.total > 0) {
            // alert(res.total)
            setPatList(res.data);
            setBillModal(true);
            return;
          }
        })
        .catch((err) => {
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

  const choosen = async (client) => {
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
  const dupl = (client) => {
    toast({
      message: "Client previously registered in this facility",
      type: "is-danger",
      dismissible: true,
      pauseOnHover: true,
    });
    reset();
    setPatList([]);
  };
  const reg = async (client) => {
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
        .then((resp) => {
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((err) => {
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
  const depen = (client) => {
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
        .then((res) => {
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
          setState((prevstate) => ({
            ...prevstate,
            Beneficiary: newClientModule,
          }));
          closeModal();
        })
        .catch((err) => {
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
      <div
        style={{
          height: "80vh",
          overflowY: "scroll",
          width: "40vw",
          margin: "0 auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Names Section */}

          <ViewBox>
            <h2>Names</h2>

            <GridWrapper>
              <Input
                label="First Name"
                register={register("firstname")}
                errorText={errors?.firstname?.message}
              />
              <Input
                label="Middle Name"
                register={register("middlename")}
                errorText={errors?.middlename?.message}
              />
              <Input
                label="Last Name"
                register={register("lastname")}
                errorText={errors?.lastname?.message}
              />
              <BasicDatePicker
                label="Date of Birth"
                register={register("dob")}
                onChange={(date) => handleDate(date)}
                errorText={errors?.dob?.message}
              />
            </GridWrapper>
          </ViewBox>
          {/* Biodata Section */}

          <ViewBox>
            <h2>Biodata</h2>

            <GridWrapper>
              <CustomSelect
                label="Gender"
                register={register("gender")}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
              <CustomSelect
                label="Marital Status"
                register={register("maritalstatus")}
                options={[
                  { label: "Single", value: "Single" },
                  { label: "Married", value: "Married" },
                ]}
              />
              <Input label="Medical record Number" register={register("mrn")} />
              <Input label="Religion" register={register("religion")} />
              <Input label="Profession" register={register("profession")} />
              <Input
                label="Phone No"
                register={register("phone")}
                errorText={errors?.phone?.message}
              />
              <Input
                label="Email"
                register={register("email")}
                errorText={errors?.email?.message}
              />
              <Input label="Tags" register={register("clientTags")} />
            </GridWrapper>
          </ViewBox>
          {/* Address */}
          <ViewBox>
            <h2>Addresses</h2>

            <GridWrapper>
              <Input
                label="Residential Address"
                register={register("address")}
              />
              <Input label="Town/City" register={register("city")} />
              <Input label="Local Govt Area" register={register("lga")} />
              <Input label="State" register={register("state")} />
              <Input label="Country" register={register("country")} />
            </GridWrapper>
          </ViewBox>
          {/* Medical Data */}
          <ViewBox>
            <h2>Medical Data</h2>

            <GridWrapper>
              <Input label="Blood Group" register={register("bloodgroup")} />
              <Input label="Genotype" register={register("genotype")} />
              <Input label="Disabilities" register={register("disabilities")} />
              <Input label="Allergies" register={register("allergies")} />
              <Input
                label="Co-mobidities"
                register={register("comorbidities")}
              />
              <Input
                label="Specific Details "
                register={register("specificDetails")}
              />
            </GridWrapper>
          </ViewBox>
          {/* Next of Kin Information */}
          <ViewBox>
            <h2>Next of Kin Information</h2>

            <GridWrapper>
              <Input label="Full Name" register={register("nok_name")} />
              <Input label="Phone Number" register={register("nok_phoneno")} />
              <Input label=" Email" register={register("nok_email")} />
              <Input
                label="Relationship"
                register={register("nok_relationship")}
              />
              <Input
                label="Co-mobidities"
                register={register("comorbidities")}
              />
              <Input
                label="Specific Details "
                register={register("specificDetails")}
              />
            </GridWrapper>
          </ViewBox>

          <BottomWrapper>
            <Button
              label="Close"
              background="#FFE9E9"
              color="#ED0423"
              onClick={() => setOpen(false)}
            />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </div>
    </>
  );
}

export function BeneficiaryCreate({ openCreate }) {
  const { register, handleSubmit, setValue, getValues, reset } = useForm(); //, watch, errors, reset
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
  //const history = useHistory()
  const [chosen, setChosen] = useState("");
  const { user } = useContext(UserContext); //,setUser
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
  const { state, setState } = useContext(ObjectContext);
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
  const handleDate = async (date) => {
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

  const getSearchfacility = (obj) => {
    setChosen(obj);
    if (!obj) {
    }
  };

  const getSearchfacility1 = (obj) => {
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
          await setBenefittingPlans1((prev) => prev.concat(c));
        });
      }
    }
  };

  const handleChangeMode = (mode) => {
    setMessage(mode);
    if (mode == "Corporate") {
      setShowCorp(true);
    }
  };

  const handleChangePlan = async (value) => {
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

  const choosen = async (client) => {
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
  const dupl = (client) => {
    toast({
      message: "Client previously registered in this facility",
      type: "is-danger",
      dismissible: true,
      pauseOnHover: true,
    });
    reset();
    setPatList([]);
  };
  const reg = async (client) => {
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
        .then((resp) => {
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((err) => {
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
  const depen = (client) => {
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
    document.documentdetail.forEach(async (element) => {
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
        .then((res) => {
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
        .catch((err) => {
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
        .then((res) => {
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
        .then(async (res) => {
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
        .catch((err) => {
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
    setState((prevstate) => ({ ...prevstate, currBeneficiary: "principal" }));
    setDependant("principal");
    console.log(state.Beneficiary);
    setClientModal(true);
    setOpenCreate(true);
  };
  const handleClickProd2 = () => {
    setState((prevstate) => ({ ...prevstate, currBeneficiary: "dependent" }));
    setDependant("dependent");
    setClientModal(true);
    setOpenCreate(true);
  };
  const handleHMO = (e) => {
    console.log(e);
  };

  const handlePlan = (e) => {
    console.log(e);
  };

  const handleRow = (Client) => {
    //domething o
  };
  return (
    <>
      <div
        className="card "
        style={{
          height: "auto",
          overflowY: "scroll",
          width: "30vw",
          margin: "0 auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader text={"Policy"} />

          <Grid container spacing={2} mt={2}>
            <Grid item md={12}>
              <select
                name="plan"
                {...register("plan", { required: true })}
                onChange={(e, i) => handleChangePlan(e.target.value)}
                className="selectadd"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  border: "1px solid rgba(0, 0, 0, 0.6)",
                }}
              >
                <option value=""> Choose Plan </option>
                {benefittingPlans1.map((option, i) => (
                  <option key={i} value={option.name}>
                    {" "}
                    {option.name}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item md={12}>
              <Input value={price.price} disabled label="Price" />
            </Grid>
            <Grid item md={12}>
              <select
                name="sponsortype"
                {...register("sponsortype", { required: true })}
                onChange={(e) => handleChangeMode(e.target.value)}
                className="selectadd"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  border: "1px solid rgba(0, 0, 0, 0.6)",
                }}
              >
                <option value=""> Choose Sponsor </option>
                <option value="Self">Self</option>
                <option value="Company">Company</option>
              </select>
            </Grid>
            <Grid item md={12}>
              {showCorp && (
                <SponsorSearch
                  getSearchfacility={getSearchfacility1}
                  clear={success}
                />
              )}
            </Grid>
            <Grid item md={12}>
              <OrgFacilitySearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
            </Grid>
          </Grid>
          <p style={{ display: "flex" }}>
            Add Principal
            <button
              onClick={handleClickProd}
              style={{
                border: "none",
                backgroundColor: "#E8F1FF",
                padding: " .5rem 1rem",
                marginLeft: ".5rem",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </p>
          <p>
            Add Dependant
            <button
              onClick={handleClickProd2}
              style={{
                border: "none",
                backgroundColor: "#E8F1FF",
                padding: " .5rem 1rem",
                marginLeft: ".5rem",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </p>
          {!!state.Beneficiary?.principal._id && (
            <CustomTable
              title={""}
              columns={EnrolleSchema}
              data={state.Beneficiary?.principal}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={() => handleRow(state.Beneficiary?.principal)}
              progressPending={loading}
            />
          )}
          {state.Beneficiary.dependent.length > 0 && (
            <CustomTable
              title={""}
              columns={EnrolleSchema}
              data={state.Beneficiary.dependent}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={() => handleRow()}
              progressPending={loading}
            />
          )}

          <Button label="submit" text="Save" />
        </form>
      </div>
    </>
  );
}

export function ClientList({ showModal, setShowModal, standAlone }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("policy");
  // const history = useHistory();
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [policyFacilities, setPolicyFacilities] = useState([]);
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

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(2);
  };

  const handleRow = async (Client) => {
     setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    setShowModal(1);
  };

  const handleSearch = (val) => {
    // eslint-disable-next-line
if (val.length<3){
  return
}
    const field = "firstname";
    console.log(val);
    const findClient= ClientServ.find({
      query: {
        $or: [
          {policyNo:{
            $regex: val,
            $options: "i",
          }},
          {'principal.lastname':{
            $regex: val,
            $options: "i",
          }},
          {status:{
            $regex: val,
            $options: "i",
          }},
    
            {'principal.firstname':{
              $regex: val,
              $options: "i",
            }},
          {           
            'dependantBeneficiaries.type': {
              $regex: val,
              $options: "i",
            }},
            {           
              'principal.type': {
                $regex: val,
                $options: "i",
              }},
            {           
              'dependantBeneficiaries.firstname': {
                  $regex: val,
                  $options: "i",
                }},
            {           
              'dependantBeneficiaries.lastname': {
                  $regex: val,
                  $options: "i",
                  }},

            {        
            'sponsor.facilityName': {
              $regex: val,
              $options: "i",
            }}, 
            {       
            sponsorshipType: {
              $regex: val,
              $options: "i",
            }},
            {        
            planType: {
              $regex: val,
              $options: "i",
            }},        
            { 'plan.planName':{
              $regex: val,
              $options: "i",
            }},
            {
              'providers.facilityName':{
                  $regex: val,
                  $options: "i",
                }},
          { 'principal.gender': val },
          { 'dependantBeneficiaries.gender': val }, 
        ],

        organizationId: user.currentEmployee.facilityDetail._id, // || "",
      
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        let data = res.data;
        console.log("policies",data)
       

    
  
        let list = [];
        if (data.length>0){
        data.map((item) => {
          item.principal.principal = item.principal;
          item.principal.organizationName = item.organizationName;
          // item.principal.dependantBeneficiaries = item.dependantBeneficiaries;
          item.principal.plan = item.plan;
          item.principal.detail = {
            policyNo: item?.policyNo,
            sponsor: item?.sponsor,
            plan: item?.plan,
            clientType: "Principal",
            sponsortype: item?.sponsorshipType,
            approved: item?.approved,
          };
  
          item.principal.organization = {
            ...item?.sponsor?.facilityDetail,
          };
  
          list.push(item.principal);
  
          item.dependantBeneficiaries.map((benf) => {
            benf.detail = {
              policyNo: item.policyNo,
              sponsor: item.sponsor,
              plan: item.plan,
              clientType: "Dependant",
              sponsortype: item?.sponsorshipType,
              approved: item?.approved,
            };
            benf.organizationName = item.organizationName;
  
            benf.plan = item.plan;
            benf.facilityDetail = {
              ...item?.sponsor?.facilityDetail,
            };
            benf.principal = benf;
            list.push(benf);
          });
        });
      }
        setFacilities(list);
  
       setTotal(findClient.total);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getPolicyFacilities = async () => {
    if (user.currentEmployee) {
      // const findClient= await ClientServ.find()
      const findClient = await ClientServ.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          // organization: user.currentEmployee.facilityDetail,
          $sort: {
            createdAt: -1,
          },
        },
      });
      /*  if (page===0){ */
     setPolicyFacilities(findClient.data);
      console.log(findClient.data, user);
      /* }else{
             await setFacilities(prevstate=>prevstate.concat(findClient.data))
         } */

      // await setTotal(findClient.total);
      //console.log(user.currentEmployee.facilityDetail._id, state)
      //console.log(facilities)
      setPage((page) => page + 1);
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

       setPolicyFacilities(findClient.data);
      }
    }
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      // const findClient= await ClientServ.find()
      const findClient = await ClientServ.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $sort: {
            createdAt: -1,
          },
        },
      });

      let data = findClient.data;
      console.log("policies",data)

      let list = [];
      data.map((item) => {
        console.log(item)
        item.principal.principal = item.principal;
        item.principal.organizationName = item.organizationName;
        // item.principal.dependantBeneficiaries = item.dependantBeneficiaries;
        item.principal.plan = item.plan;
        item.principal.detail = {
          policyNo: item?.policyNo,
          sponsor: item?.sponsor,
          plan: item?.plan,
          clientType: "Principal",
          sponsortype: item?.sponsorshipType,
          approved: item?.approved,
        };

        item.principal.organization = {
          ...item?.sponsor?.facilityDetail,
        };

        list.push(item.principal);

        item.dependantBeneficiaries.map((benf) => {
          benf.detail = {
            policyNo: item.policyNo,
            sponsor: item.sponsor,
            plan: item.plan,
            clientType: "Dependent",
            sponsortype: item?.sponsorshipType,
            approved: item?.approved,
          };
          benf.organizationName = item.organizationName;

          benf.plan = item.plan;
          benf.facilityDetail = {
            ...item?.sponsor?.facilityDetail,
          };
          benf.principal = benf;
          list.push(benf);
        });
      });

      setFacilities(list);

     setTotal(findClient.total);

      setPage((page) => page + 1);
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

       setFacilities(findClient.data);
      }
    }
  };

  useEffect(() => {
    getFacilities()
    ClientServ.on("created", (obj) => getFacilities());
    ClientServ.on("updated", (obj) => getFacilities());
    ClientServ.on("patched", (obj) =>getFacilities());
    ClientServ.on("removed", (obj) =>getFacilities());
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
    await getPolicyFacilities();

    //await  setPage(0)
    //  await setRestful(false)
  };

  /* useEffect(() => {
    return () => {};
  }, [facilities]); */
  //todo: pagination and vertical scroll bar

  const BeneficiarySchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Image",
      key: "sn",
      description: "Enter name of employee",
      selector: (row) => <Avatar src={row?.imageurl} />,
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
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
      name: "Last Name",
      key: "lastname",
      description: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    // {
    // 	name: 'Midlle Name',
    // 	key: 'middlename',
    // 	description: 'Midlle Name',
    // 	selector: (row) => row.middlename,
    // 	sortable: true,
    // 	required: true,
    // 	inputType: 'TEXT',
    // },
    {
      name: "Age",
      key: "dob",
      description: "Age",
      selector: (row) =>
        row.dob ? formatDistanceToNowStrict(new Date(row?.dob)) : "",
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
      name: "Email",
      key: "email",
      description: "johndoe@mail.com",
      selector: (row) => row.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },
    {
      name: "Policy No",
      key: "policyNo",
      description: "Policy No",
      selector: (row) => row.detail?.policyNo,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Client Type",
      key: "clientType",
      description: "Client Type",
      selector: (row) => row.detail?.clientType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Sponsor Type",
      key: "sponsorType",
      description: "Sponsor Type",
      selector: (row) => row.detail?.sponsortype,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Policy Status",
      key: "policyStatus",
      description: "Policy Status",
      selector: (row) => (row.detail?.approved ? "Approved" : "Pending"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  

  return (
    <>
      <div
        className="level"
        style={{
          width: "98%",
          margin: "0 1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {handleSearch && (
            <div className="inner-table">
              <FilterMenu onSearch={handleSearch} />
            </div>
          )}
          <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
            List of Beneficiary
          </h2>
        </div>
        {handleCreateNew && (
          <Button
            style={{ fontSize: "14px", fontWeight: "600px" }}
            label="Add New"
            onClick={handleCreateNew}
            showicon={true}
          />
        )}
        <div
          className="level"
          style={{
            height: "80vh",
            overflow: "scroll",
          }}
        >
          <CustomTable
            title={""}
            columns={BeneficiarySchema}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={loading}
          />
        </div>
      </div>
    </>
  );
}


export function ClientDetail({ showModal, setShowModal, selectedPlan}) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,

  const [error, setError] = useState(false); //,
  const [finacialInfoModal, setFinacialInfoModal] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [generateIdCardModal, setGenerateIdCardModal] = useState(false);
  const [benefitState, setBenefitState] = useState(selectedPlan);
  const [display, setDisplay] = useState(1);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ClientServ=client.service('/Client')
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const [imgSrc, setImgSrc] = useState(
    "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
  );
  const [editing, setEditing] = useState(false);
  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  let Client = state.ClientModule.selectedClient;

  // console.log('User', user);

  // eslint-disable-next-line
  const client = Client;
  const handleEdit = async () => {
    const newClientModule = {
      selectedClient: Client,
      show: "modify",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(3);
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

  const handlecloseModalIdCard = () => {
    setGenerateIdCardModal(false);
  };

  const showBilling = () => {
    setBillingModal(true);
    //history.push('/app/finance/billservice')
  };

  const handleSchedule = () => {
    setAppointmentModal(true);
  };

  const handleGenegrateIdCard = () => {
    setGenerateIdCardModal(true);
  };

  const handleBill = () => {
    setBillModal(true);
  };
  const handlecloseModal3 = () => {
    setBillModal(false);
  };

  const ImgStyled = styled("img")(({ theme }) => ({
    width: 150,
    height: 150,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius,
  }));
  const productItemSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "S/N",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Service Name",
      key: "service",
      description: "Service Name",
      selector: (row) => row?.serviceName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Plan",
      key: "plan",
      description: "Plan",
      selector: (row) =>
        row?.plans.map((plan, i) => (
          <Typography
            sx={{ fontSize: "0.8rem", whiteSpace: "normal" }}
            data-tag="allowRowEvents"
            key={i}
          >
            <b>{plan.name}</b>: {plan.serviceClass}
            <br />
            <b>PreAuth?</b>: {plan.reqAuthCode === true ? "Yes" : "No"}
            <br />
            <b>Co-Pay</b>: {plan.copay.length > 0 ? `₦${plan.copay}` : "N/A"}
          </Typography>
        )),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Band",
      key: "band",
      description: "Band",
      selector: (row) => row?.band,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Category",
      key: "category",
      description: "Category",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row?.category}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Duration",
      key: "duration",
      description: "Duration",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row?.duration}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Frequency",
      key: "frequency",
      description: "Frequency",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row?.frequency}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Limit",
      key: "limit",
      description: "Limit",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row?.limit}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "status",
      description: "Status",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row?.status}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    //  {
    //    name: 'Amount',
    //    key: 'price',
    //    description: 'Amount',
    //    selector: (row) => row?.price,
    //    sortable: true,
    //    required: true,
    //    inputType: 'TEXT',
    //  },
    {
      name: "Billing type",
      key: "billingtype",
      description: "Billing type",
      selector: (row) => row?.billing_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <div
        className="card "
        style={{
          height: "auto",
          overflowY: "scroll",
          width: "98%",
          margin: "0 1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormsHeaderText
            text={`
          ${Client?.firstname}  ${Client?.lastname} 
           Details
          `}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => setShowModal(0)}
                variant="contained"
                size="small"
                sx={{ textTransform: "capitalize", marginRight: "10px" }}
                color="warning"
              >
                Back
              </Button>
              <Button
                onClick={handleEdit}
                variant={showModal === 3 ? "outlined" : "contained"}
                size="small"
                sx={{ textTransform: "capitalize", marginRight: "10px" }}
                color="secondary"
              >
                Edit Details
              </Button>
              <Button
                onClick={() => setDisplay(5)}
                variant={display === 5 ? "outlined" : "contained"}
                size="small"
                sx={{ textTransform: "capitalize", marginRight: "10px" }}
                color="success"
              >
                Policy
              </Button>
              <Button
                onClick={() => setDisplay(2)}
                variant={display === 2 ? "outlined" : "contained"}
                size="small"
                sx={{ textTransform: "capitalize", marginRight: "10px" }}
                color="info"
              >
                Claims
              </Button>
              <Button
                onClick={() => setDisplay(3)}
                variant={display === 3 ? "outlined" : "contained"}
                size="small"
                sx={{ textTransform: "capitalize", marginRight: "10px" }}
                color="secondary"
              >
                Referrals
              </Button>
              <Button
                onClick={() => setDisplay(4)}
                variant={display === 4 ? "outlined" : "contained"}
                size="small"
                sx={{ textTransform: "capitalize", marginRight: "10px" }}
              >
                Benefits
              </Button>
              {/* <Button
                onClick={handleSchedule}
                variant={appointmentModal ? "outlined" : "contained"}
                size="small"
                sx={{ textTransform: "capitalize", marginRight: "10px" }}
                color="success"
              >
                Schedule Appointment
              </Button> */}
            </Box>
          </Box>
          {/* <Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}>
						<Button
							onClick={handleGenegrateIdCard}
							variant={generateIdCardModal ? 'outlined' : 'contained'}
							size='small'
							sx={{ textTransform: 'capitalize', marginRight: '10px' }}
							color='success'>
							Generate Id-Card
						</Button>
					</Box> */}
        </Box>

        {display === 1 && (
          <>
            <Box sx={{ position: "relative" }}>
              <ImgStyled
                src={Client?.imageurl ? Client?.imageurl : imgSrc}
                alt="Profile Pic"
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  float: "right",
                  marginTop: "4rem",
                }}
              >
                <Button
                  onClick={handleGenegrateIdCard}
                  variant={generateIdCardModal ? "outlined" : "contained"}
                  size="small"
                  sx={{ textTransform: "capitalize", marginRight: "10px" }}
                  color="success"
                >
                  Generate Id-Card
                </Button>
              </Box>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item md={4}>
                <Input label="First Name" value={Client?.firstname} disabled />
              </Grid>
              <Grid item md={4}>
                <Input
                  label="Middle Name"
                  value={Client?.middlename}
                  disabled
                />
              </Grid>
              <Grid item md={4}>
                <Input label="Last Name" value={Client?.lastname} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="Date of Birth"
                  value={new Date(Client?.dob).toLocaleDateString("en-GB")}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Gender" value={Client?.gender} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="Marital Status"
                  value={Client?.maritalstatus}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="Medical Records Number"
                  value={Client?.mrn}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Religion" value={Client?.religion} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Profession" value={Client?.profession} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Phone Number" value={Client?.phone} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Email" value={Client?.email} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Address" value={Client?.address} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Town/City" value={Client?.city} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="LGA" value={Client?.lga} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="State" value={Client?.state} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Country" value={Client?.country} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="Blood Group"
                  value={Client?.bloodgroup}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Genotype" value={Client?.genotype} disable d />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="Disabilities"
                  value={Client?.disabilities}
                  disable
                  d
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Allergies" value={Client?.allergies} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input label="Tags" value={Client?.clientTags} disabled />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="Specific Details"
                  value={Client?.specificDetails}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="Next of Kin Name"
                  value={Client?.nok_name}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="Next of Kin Phone"
                  value={Client?.nok_phoneno}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="Next of Kin Email"
                  value={Client?.nok_email}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  label="NOK Relationship"
                  value={Client?.nok_relationship}
                  disabled
                />
              </Grid>
            </Grid>
          </>
        )}
        {display === 2 && <Claims />}
        {display === 3 && <GeneralAppointments />}
        {display === 4 && (
          <>
            <div
              className="card"
              style={{
                height: "88vh",
                overflowY: "scroll",
              }}
            >
              <FormsHeaderText
                text={`${Client?.detail?.plan?.planName} Benefits`}
              />
              {/* <CustomTable
                tableData={""}
                columns={productItemSchema}
                 data={Client?.detail?.plan?.contracts}
                 data={benefitState}
                pointerOnHover
                highlightOnHover
                striped
              /> */}
            </div>
          </>
        )}
        {display === 5 && (
          <PolicyList standAlone={Client?._id} setShowModal={setDisplay} />
        )}
        {display === 6 && <PolicyDetail />}

        {/* {finacialInfoModal && (
          <>
            <ModalBox open onClose={() => setFinacialInfoModal(false)}>
              <ModalHeader text="Policy" />
              <ClientFinInfo />
              <Policy />
            </ModalBox>
          </>
        )} */}
        {appointmentModal && (
          <>
            <ModalBox open onClose={() => setAppointmentModal(false)}>
              <AppointmentCreate />
            </ModalBox>
          </>
        )}
        {billingModal && (
          <>
            <ModalBox open onClose={() => setBillingModal(false)}>
              <ModalHeader text="Bill Beneficiary" />
              <BillServiceCreate />
            </ModalBox>
          </>
        )}
        {generateIdCardModal && (
          <>
            <ModalBox open onClose={() => setGenerateIdCardModal(false)}>
              <ProviderPrintId data={Client} />
            </ModalBox>
          </>
        )}
      </div>
    </>
  );
}

export function ClientModify({ showModal, setShowModal }) {
  const { register, handleSubmit, setValue, reset, control } = useForm(); //watch, errors,, errors
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("client");
  //const history = useHistory()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const [imgSrc, setImgSrc] = useState("");
  const [editing, setEditing] = useState(false);
  const onChange = (file) => {
    getBase64(file)
      .then((res) => {
        setImgSrc(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Client = state.ClientModule.selectedClient;
  console.log("Client", Client);

  useEffect(() => {
    let details = state.ClientModule.selectedClient;
    const initFormValues = {
      firstname: Client?.firstname,
      middlename: Client?.middlename,
      lastname: Client?.lastname,
      phone: Client?.phone,
      email: Client?.email,
      dob: Client?.dob,
      gender: Client?.gender,
      profession: Client?.profession,
      address: Client?.address,
      city: Client?.city,
      state: Client?.state,
      country: Client?.country,
      nok_name: Client?.nok_name,
      nok_email: Client?.nok_email,
      nok_phoneno: Client?.nokphoneno,
      lga: Client?.lga,
      bloodgroup: Client?.bloodgroup,
      genotype: Client?.genotype,
      disabilities: Client?.disabilities,
      specificDetails: Client?.specificDetails,
      clientTags: Client?.clientTags,
      mrn: Client?.mrn,
      comorbidities: Client?.comorbidities,
      allergies: Client?.allergies,
    };
    reset(initFormValues);
  }, []);

  const handleCancel = async () => {
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(false);
  };

  const changeState = () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    setState((prevstate) => ({ ...prevstate, ClientModule: newClientModule }));
  };
  // eslint-disable-next-line
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Client._id;
    if (conf) {
      ClientServ.remove(dleteId)
        .then((res) => {
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
        .catch((err) => {
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
  const onSubmit = async (data) => {
    setSuccess(false);
    const token = localStorage.getItem("feathers-jwt");
    if (imgSrc !== "") {
      axios
        .post(
          "https://healthstack-backend.herokuapp.com/upload",
          { uri: imgSrc },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(async (res) => {
          data.imageurl = res.data.url;
          console.log(data);
          await ClientServ.patch(Client._id, data)
            .then((res) => {
              console.log(res);
              // e.target.reset();
              // setMessage("updated Client successfully")
              toast("Client updated succesfully");

              changeState();
            })
            .catch((err) => {
              //setMessage("Error creating Client, probable network issues "+ err )
              // setError(true)
              toast("Error updating Client, probable network issues or " + err);
            });
        });
    } else {
      await ClientServ.patch(Client._id, data)
        .then((res) => {
          console.log(res);
          // e.target.reset();
          // setMessage("updated Client successfully")
          toast("Client updated succesfully");

          changeState();
        })
        .catch((err) => {
          //setMessage("Error creating Client, probable network issues "+ err )
          // setError(true)
          toast("Error updating Client, probable network issues or " + err);
        });
    }
  };

  const ImgStyled = styled("img")(({ theme }) => ({
    width: 150,
    height: 150,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius,
  }));

  return (
    <>
      <div style={{ width: "98%", margin: "0 1rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Names Section */}
          <ModalHeader text={"Modify Beneficiary"} />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <GlobalCustomButton
                color="warning"
                onClick={() => setShowModal(0)}
                sx={{ marginRight: "15px" }}
              >
                Back
              </GlobalCustomButton>

              <GlobalCustomButton
                type="submit"
                loading={loading}
                onClick={handleSubmit(onSubmit)}
              >
                <SaveIcon fontSize="small" sx={{ marginRight: "5px" }} />
                Save
              </GlobalCustomButton>
            </Box>
          </Box>

          <Box sx={{ width: "80vw", maxHeight: "80vh" }} mt={1}>
            <Box sx={{ position: "relative" }} mb={2}>
              <ImgStyled
                src={imgSrc ? imgSrc : Client?.imageurl}
                alt="Profile Pic"
              />
              <FileUploader
                multiple={false}
                handleChange={onChange}
                name="upload"
                types={["jpeg", "png", "jpg"]}
                children={
                  <Box
                    sx={{
                      position: "absolute",
                      left: "-5rem",
                      bottom: "-4px",
                      backgroundColor: "#0E214D",
                      padding: "2px",
                      borderRadius: "100%",
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <ModeEditOutlineIcon />
                    </IconButton>
                  </Box>
                }
              />
            </Box>
            <Grid container spacing={1}>
              <Grid item lg={3} md={4} sm={6}>
                <Input
                  label="First Name"
                  register={register("firstname")}
                  // errorText={errors?.firstname?.message}
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Input
                  label="Middle Name"
                  register={register("middlename")}
                  // errorText={errors?.middlename?.message}
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Input
                  label="Last Name"
                  register={register("lastname")}
                  // errorText={errors?.lastname?.message}
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Input
                  label="Phone"
                  register={register("phone")}
                  type="tel"
                  // errorText={errors?.phone?.message}
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Input
                  label="Email"
                  register={register("email")}
                  type="email"
                  // errorText={errors?.email?.message}
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <MuiDateTimePicker
                  label="Dob"
                  name="dob"
                  control={control}
                  // errorText={errors?.dob?.message}
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <CustomSelect
                  label="Gender"
                  register={register("gender", { required: true })}
                  options={[
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" },
                  ]}
                  // errorText={errors?.gender?.message}
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <CustomSelect
                  label="Marital Status"
                  register={register("maritalstatus")}
                  options={[
                    { label: "Single", value: "SINGLE" },
                    { label: "Married", value: "MARRRIED" },
                    { label: "Divorced", value: "DIVORCED" },
                    { label: "Widowed", value: "WIDOWED" },
                  ]}
                />
              </Grid>
              <Grid item lg={2} md={4} sm={6}>
                <Input
                  label="Medical record Number"
                  register={register("mrn")}
                />
              </Grid>
              <Grid item lg={2} md={4} sm={6}>
                <Input label="Religion" register={register("religion")} />
              </Grid>
              <Grid item lg={2} md={4} sm={6}>
                <Input label="Profession" register={register("profession")} />
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <Input label="Tags" register={register("clientTags")} />
              </Grid>

              <Grid item lg={6} md={6} sm={12}>
                <Input
                  label="Residential Address"
                  register={register("address")}
                />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Input label="Town" register={register("city")} />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Input label="State" register={register("state")} />
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Input label="Country" register={register("country")} />
              </Grid>
              <Grid item xs={12}>
                <FormsHeaderText text="Client Medical Data" />
              </Grid>
              <Grid item lg={2} md={4} sm={6}>
                <Input label="Blood Group" register={register("bloodgroup")} />
              </Grid>
              <Grid item lg={2} md={4} sm={6}>
                <Input label="Genotype" register={register("genotype")} />
              </Grid>

              <Grid item lg={2} md={4} sm={6}>
                <Input
                  label="Disabilities"
                  register={register("disabilities")}
                />
              </Grid>

              <Grid item lg={2} md={4} sm={6}>
                <Input label="Allergies" register={register("allergies")} />
              </Grid>
              <Grid item xs={12}>
                <FormsHeaderText text="Client Next of Kin Information" />
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <Input label="Full Name" register={register("nok_name")} />
              </Grid>
              <Grid item lg={2} md={4} sm={6}>
                <Input
                  label="Phone Number"
                  register={register("nok_phoneno")}
                />
              </Grid>
              <Grid item lg={2} md={4} sm={6}>
                <Input
                  label=" Email"
                  register={register("nok_email")}
                  type="email"
                />
              </Grid>
              <Grid item lg={2} md={4} sm={6}>
                <Input
                  label="Relationship"
                  register={register("nok_relationship")}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <Input
                  label="Co-mobidities"
                  register={register("comorbidities")}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </>
  );
}

export function InputSearch({ getSearchfacility, clear }) {
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

  const handleRow = async (obj) => {
     setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

     setSimpa(obj.facilityName);

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
  const handleSearch = async (val) => {
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
        .then((res) => {
          console.log("facility  fetched successfully");
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
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
     setFacilities([]);
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
export function PolicyList({ showModal, setShowModal, standAlone }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("policy");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [display, setDisplay] = useState("approve");

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ManagedCareModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(1);
    console.log("test");
  };

  const handleRow = async (Client) => {
    setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
     setState((prevstate) => ({
      ...prevstate,
      ManagedCareModule: newClientModule,
    }));
    setShowModal(6);
  };

  const handleSearch = (val) => {
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
          { gender: val },
        ],

        organizationId: user.currentEmployee.facilityDetail._id, // || "",
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
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
          organization: user.currentEmployee.facilityDetail,
          $sort: {
            createdAt: -1,
          },
        },
      });
      /*  if (page===0){ */
      await setFacilities(findClient.data);
      console.log(findClient.data);
      /* }else{
             await setFacilities(prevstate=>prevstate.concat(findClient.data))
         } */

      await setTotal(findClient.total);
      //console.log(user.currentEmployee.facilityDetail._id, state)
      //console.log(facilities)
      setPage((page) => page + 1);
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
    ClientServ.on("created", (obj) => rest());
    ClientServ.on("updated", (obj) => rest());
    ClientServ.on("patched", (obj) => rest());
    ClientServ.on("removed", (obj) => rest());
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
  const PolicySchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Date Created",
      key: "createdAt",
      description: "Date Created",
      selector: (row) => moment(row?.createdAt).format("YYYY-MM-DD"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: (row) => row?.principal?.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Last Name",
      key: "principal",
      description: "Principal Last Name",
      selector: (row) => row?.principal?.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Phone",
      key: "phone",
      description: "Phone Number",
      selector: (row) => row?.principal?.phone,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Email",
      key: "email",
      description: "simpa@email.com",
      selector: (row) => row?.principal?.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },
    {
      name: "Sponsorship Type",
      key: "sponsorshipType",
      description: "Sponsorship Type",
      selector: (row) => row?.sponsorshipType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Plan",
      key: "plan",
      description: "Plan",
      selector: (row) => row?.plan?.planName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Family Premium",
      key: "familyPremium",
      description: "Family Premium",
      selector: (row) => row?.plan?.premiums?.[0]?.familyPremium,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Individual Premium",
      key: "individualPremium",
      description: "Individual Premium",
      selector: (row) => row?.plan?.premiums?.[0]?.individualPremium,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Paid",
      key: "isPaid",
      description: "Paid",
      selector: (row) => (row?.isPaid ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Active",
      key: "active",
      description: "Active",
      selector: (row) => (row?.active ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  // const approvedFacilities = facilities.filter(
  //   (facility) => facility.approved === true
  // );
  // const pendingFacilities = facilities.filter(
  //   (facility) => facility.approved === false
  // );
  const Selectedpol = facilities.filter(
    (item) =>
      item?.principal._id === standAlone ||
      item?.dependantBeneficiaries?.some((item) => item._id === standAlone)
  );
  // const pendingSelectedpol = pendingFacilities.filter(
  //   (item) =>
  //     item?.principal._id === standAlone ||
  //     (item?.dependantBeneficiaries.length > 0 &&
  //       item?.dependantBeneficiaries?.map((item) => item._id === standAlone))
  // );
  console.log(Selectedpol, standAlone);
  return (
    <>
      <div className="level">
        <PageWrapper
          style={{ flexDirection: "column", padding: "0.6rem 1rem" }}
        >
          <div
            className="level"
            style={{
              height: "80vh",
              overflowY: "scroll",
            }}
          >
            <CustomTable
              title={""}
              columns={PolicySchema}
              data={Selectedpol}
              pointerOnHover
              highlightOnHover
              onRowClicked={handleRow}
              striped
              progressPending={loading}
              CustomEmptyData={"No Policy found"}
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
}

export function PolicyDetail({ showModal, setShowModal }) {
  const { register, reset, control, handleSubmit } = useForm();
  const policyServ = client.service("policy");
  const [error, setError] = useState(false); //,
  const [finacialInfoModal, setFinacialInfoModal] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [message, setMessage] = useState(""); //,
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const [display, setDisplay] = useState(1);
  const [editPolicy, setEditPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editCustomer, setEditCustomer] = useState(false);
  const [facility, setFacility] = useState([]);

  useEffect(() => {
    let Client = state.ManagedCareModule.selectedClient;
    setFacility(Client);

    const initFormValue = {
      policyNo: Client?.policyNo,
      phone: Client?.principal?.phone,
      start_date: Client?.validitystarts,
      end_date: Client?.validityEnds,
      status: Client?.approved ? "Approved" : "Pending",
      sponsorship_type: Client?.sponsorshipType,
      plan_type: Client?.plan?.planName,
      policy_tag: Client?.principal?.clientTags,
      familyPremium: Client.plan?.premiums?.[0]?.familyPremium,
      individualPremium: Client.plan?.premiums?.[0]?.individualPremium,
      sponsor_name: Client.sponsor?.facilityName,
      sponsor_phone: Client.sponsor?.facilityContactPhone,
      sponsor_email: Client.sponsor?.facilityEmail,
      sponsor_address: Client.sponsor?.facilityAddress,
    };
    reset(initFormValue);
  }, [state.ManagedCareModule.selectedClient]);

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
  const updateDetail = async (data) => {
    const docId = state.ManagedCareModule.selectedClient._id;
    console.log(data, docId);
    const policyDetails = {
      policyNo: data.policyNo,
      phone: data.phone,
      validitystarts: data.start_date,
      validityEnds: data.end_date,
      status: data.active,
      sponsorship_type: data.sponsorshipType,
      plan_type: data.plan_type,
      policy_tag: data.policy_tag,
      premium: data.premium,
      sponsor_name: data.sponsor_name,
      sponsor_phone: data.sponsor_phone,
      sponsor_email: data.sponsor_email,
      sponsor_address: data.sponsor_address,
    };
    await policyServ
      .patch(docId, policyDetails)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          ManagedCareModule: { ...prev.ManagedCareModule, selectedClient: res },
        }));
        toast.success("Policy Detail Updated");
        setEditPolicy(false);
      })
      .catch((err) => {
        toast.error("Error Updating Policy Detail");
        setEditPolicy(false);
      });
  };

  const approvePolicy = async () => {
    const docId = state.ManagedCareModule.selectedClient._id;
    const policyDetails = {
      approved: true,
      approvalDate: new Date(),
      approvedby: {
        employeename: user.currentEmployee.facilityDetail.facilityName,
        employeeId: user.currentEmployee.facilityDetail._id,
      },
    };
    console.log(policyDetails);
    await policyServ
      .patch(docId, policyDetails)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          ManagedCareModule: { ...prev.ManagedCareModule, selectedClient: res },
        }));
        toast.success("Policy Approved");
        setEditPolicy(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Approving Policy" + err);
        setEditPolicy(false);
      });
  };

  console.log(facility);
  return (
    <>
      <div
        className="card "
        style={{
          height: "auto",
          overflowY: "scroll",
          // width: '98%',
        }}
      >
        <Box>
          {display === 1 && (
            <Box
              sx={{
                height: "80vh",
                overflowY: "scroll",
              }}
            >
              <Grid container spacing={1} mt={1}>
                <Grid item md={3}>
                  <Input
                    register={register("policyNo", { required: true })}
                    label="Policy No."
                    disabled
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register("phone", { required: true })}
                    label="Phone"
                    disabled
                  />
                </Grid>
                <Grid item md={3}>
                  <Input
                    register={register("sponsorship_type", { required: true })}
                    label="Sponsorship Type"
                    disabled
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item md={3}>
                  <Input
                    register={register("plan_type", { required: true })}
                    label="Plan Type"
                    disabled
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item md={3}>
                  <Input
                    register={register("status", { required: true })}
                    label="Status"
                    disabled
                    important
                    //placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register("policy_tag")}
                    label="Policy Tag"
                    disabled
                    // placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register("familyPremium", { required: true })}
                    label="Family Premium"
                    disabled
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item md={3}>
                  <Input
                    register={register("individualPremium", { required: true })}
                    label="Individual Premium"
                    disabled
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item md={3}>
                  <MuiCustomDatePicker
                    label="Start Date"
                    name="start_date"
                    control={control}
                    disabled={!editPolicy}
                  />
                </Grid>
                <Grid item md={3}>
                  <MuiCustomDatePicker
                    label="End Date"
                    name="end_date"
                    control={control}
                    disabled={!editPolicy}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "space-between",
                }}
                mb={1}
              ></Box>
              {facility.sponsorshipType === "Company" && (
                <>
                  <FormsHeaderText text="Sponsor Details" />
                  <Grid container spacing={1}>
                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        register={register("sponsor_name")}
                        label="Sponsor Name"
                        disabled

                        //placeholder="Enter customer number"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        register={register("sponsor_phone")}
                        label="Sponsor Phone"
                        disabled

                        //placeholder="Enter customer number"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        register={register("sponsor_email")}
                        label="Sponsor Email"
                        disabled

                        //placeholder="Enter customer numbe"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        register={register("sponsor_address")}
                        label="Sponsor Address"
                        disabled

                        //placeholder="Enter customer number"
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid item md={12}>
                <FormsHeaderText text="Principal Details" />
                <CustomTable
                  title={""}
                  columns={EnrolleSchema3}
                  data={[facility?.principal]}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={() => {}}
                  progressPending={loading}
                  CustomEmptyData="You have no Principal yet."
                />
                <FormsHeaderText text="Dependant Details" />
                <CustomTable
                  title={""}
                  columns={EnrolleSchema3}
                  data={facility?.dependantBeneficiaries}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={() => {}}
                  progressPending={loading}
                  CustomEmptyData="You have no Dependant yet"
                />
                <FormsHeaderText text="HMO" />
                <CustomTable
                  title={""}
                  columns={EnrolleSchema5}
                  data={[facility?.organization]}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={() => {}}
                  progressPending={loading}
                  CustomEmptyData="You have no HMO yet."
                />
                <FormsHeaderText text="Provider List" />
                <CustomTable
                  title={""}
                  columns={EnrolleSchemaProvider}
                  data={facility?.providers}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={() => {}}
                  progressPending={loading}
                  CustomEmptyData="You have no Provider yet."
                />
              </Grid>
            </Box>
          )}

          {display === 5 && <Claims standAlone />}
          {display === 6 && <PremiumPayment />}
        </Box>
      </div>
    </>
  );
}
