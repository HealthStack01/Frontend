/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom'; //Route, Switch,Link, NavLink,
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { formatDistanceToNowStrict } from 'date-fns';
import ClientFinInfo from './ClientFinInfo';
import BillServiceCreate from '../Finance/BillServiceCreate';
import { AppointmentCreate } from '../Appointment/generalAppointment';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClientBilledPrescription from '../Finance/ClientBill';
import ClientGroup from './ClientGroup';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { OrgFacilitySearch, SponsorSearch } from '../helpers/FacilitySearch';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import { Button } from '@mui/material';
import CustomTable from '../../components/customtable';
import ModalBox from '../../components/modal';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { Grid } from '@mui/material';
import Input from '../../components/inputs/basic/Input/index';
import ToggleButton from '../../components/toggleButton';
import RadioButton from '../../components/inputs/basic/Radio';
import BasicDatePicker from '../../components/inputs/Date';
import BasicDateTimePicker from '../../components/inputs/DateTime';
import CustomSelect from '../../components/inputs/basic/Select';
import Textarea from '../../components/inputs/basic/Textarea';
import { MdCancel, MdAddCircle } from 'react-icons/md';
import { EnrolleSchema } from './schema';
import ClientForm from '../Client/ClientForm';
import {
  BottomWrapper,
  GridWrapper,
  HeadWrapper,
  ViewBox,
} from '../app/styles';
import ClinicAppointments from '../Appointment/clinicAppointments';
import PharmacyBillService from '../Finance/BillService';
var random = require('random-string-generator');
// eslint-disable-next-line
const searchfacility = {};

export default function Beneficiary() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  return (
    <section className="section remPadTop">
      <ClientList showModal={showModal} setShowModal={setShowModal} />
      {/* {state.ClientModule.show === 'create' && <BeneficiaryCreate />} */}
      {showModal === 1 && (
        <ModalBox open onClose={() => setShowModal(false)}>
          <ClientDetail setShowModal={setShowModal3} />
        </ModalBox>
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
      {showModal3 && (
        <ModalBox open={showModal3} onClose={() => setShowModal3(false)}>
          <ClientModify showModal={showModal3} setShowModal={setShowModal3} />
        </ModalBox>
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
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service('client');
  const mpiServ = client.service('mpi');
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
    setValue('facility', obj._id, {
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
      data.middlename = data.middlename || '';
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
      message: 'Client previously registered in this facility',
      type: 'is-danger',
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
        message: 'Please enter Date of Birth! ',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });

      return;
    }
    e.preventDefault();
    setMessage('');
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
            message: 'Client created succesfully',
            type: 'is-success',
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
          if (state.currBeneficiary === 'principal') {
            newClientModule = {
              principal: res,
              dependent: state.Beneficiary.dependent,
              others: state.Beneficiary.others,
              show: 'create',
            };
          }
          if (state.currBeneficiary === 'dependent') {
            newClientModule = {
              principal: state.Beneficiary.principal,
              dependent: [...state.Beneficiary.dependent, res],
              others: state.Beneficiary.others,
              show: 'create',
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
            message: 'Error creating Client ' + err,
            type: 'is-danger',
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
          height: '80vh',
          overflowY: 'scroll',
          width: '40vw',
          margin: '0 auto',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Names Section */}

          <ViewBox>
            <h2>Names</h2>

            <GridWrapper>
              <Input
                label="First Name"
                register={register('firstname')}
                // errorText={errors?.firstname?.message}
              />
              <Input
                label="Middle Name"
                register={register('middlename')}
                // errorText={errors?.middlename?.message}
              />
              <Input
                label="Last Name"
                register={register('lastname')}
                // errorText={errors?.lastname?.message}
              />
              <BasicDatePicker
                label="Date of Birth"
                register={register('dob')}
                onChange={(date) => handleDate(date)}
                // errorText={errors?.dob?.message}
              />
            </GridWrapper>
          </ViewBox>
          {/* Biodata Section */}

          <ViewBox>
            <h2>Biodata</h2>

            <GridWrapper>
              <CustomSelect
                label="Gender"
                register={register('gender')}
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ]}
              />
              <CustomSelect
                label="Marital Status"
                register={register('maritalstatus')}
                options={[
                  { label: 'Single', value: 'Single' },
                  { label: 'Married', value: 'Married' },
                ]}
              />
              <Input label="Medical record Number" register={register('mrn')} />
              <Input label="Religion" register={register('religion')} />
              <Input label="Profession" register={register('profession')} />
              <Input
                label="Phone No"
                register={register('phone')}
                // errorText={errors?.phone?.message}
              />
              <Input
                label="Email"
                register={register('email')}
                // errorText={errors?.email?.message}
              />
              <Input label="Tags" register={register('clientTags')} />
            </GridWrapper>
          </ViewBox>
          {/* Address */}
          <ViewBox>
            <h2>Addresses</h2>

            <GridWrapper>
              <Input
                label="Residential Address"
                register={register('address')}
              />
              <Input label="Town/City" register={register('city')} />
              <Input label="Local Govt Area" register={register('lga')} />
              <Input label="State" register={register('state')} />
              <Input label="Country" register={register('country')} />
            </GridWrapper>
          </ViewBox>
          {/* Medical Data */}
          <ViewBox>
            <h2>Medical Data</h2>

            <GridWrapper>
              <Input label="Blood Group" register={register('bloodgroup')} />
              <Input label="Genotype" register={register('genotype')} />
              <Input label="Disabilities" register={register('disabilities')} />
              <Input label="Allergies" register={register('allergies')} />
              <Input
                label="Co-mobidities"
                register={register('comorbidities')}
              />
              <Input
                label="Specific Details "
                register={register('specificDetails')}
              />
            </GridWrapper>
          </ViewBox>
          {/* Next of Kin Information */}
          <ViewBox>
            <h2>Next of Kin Information</h2>

            <GridWrapper>
              <Input label="Full Name" register={register('nok_name')} />
              <Input label="Phone Number" register={register('nok_phoneno')} />
              <Input label=" Email" register={register('nok_email')} />
              <Input
                label="Relationship"
                register={register('nok_relationship')}
              />
              <Input
                label="Co-mobidities"
                register={register('comorbidities')}
              />
              <Input
                label="Specific Details "
                register={register('specificDetails')}
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
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service('client');
  const policyServ = client.service('policy');
  //const history = useHistory()
  const [chosen, setChosen] = useState('');
  const { user } = useContext(UserContext); //,setUser
  const [billModal, setBillModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [showCorp, setShowCorp] = useState(false);
  const [planHMO, setPlanHMO] = useState('');
  const [plan, setPlan] = useState('');
  const [price, setPrice] = useState('');
  const [patient, setPatient] = useState('');
  const [patList, setPatList] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [dependant, setDependant] = useState(false);
  const [selectedClient, setSelectedClient] = useState();
  const [productItem, setProductItem] = useState([]);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();
  const [type, setType] = useState('Sales ');
  const [chosenPlan, setChosenPlan] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [documentNo, setDocumentNo] = useState('');
  const hMO = ['simpa', 'dania'];
  const [benefittingPlans1, setBenefittingPlans1] = useState([]);
  const ServicesServ = client.service('billing');
  const [productEntry, setProductEntry] = useState();
  const sponsorlist = ['Self', 'SME', 'Corporate', 'Government', 'others'];

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
          'contracts.source_org': user.currentEmployee.facilityDetail._id,
          'contracts.dest_org': user.currentEmployee.facilityDetail._id,
          category: 'Managed Care',
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
    if (mode == 'Corporate') {
      setShowCorp(true);
    }
  };

  const handleChangePlan = async (value) => {
    console.log(value);
    if (value == '') {
      setPrice('');
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
      message: 'Client previously registered in this facility',
      type: 'is-danger',
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
        quantity: '1',
        sellingprice: price.price,
        amount: price.price, //||qamount
        baseunit: '',
        costprice: '',
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
    document.documentname = 'Billed Orders'; //state.DocumentClassModule.selectedDocumentClass.name
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      ' ' +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = patient._id;
    document.clientname =
      patient.firstname + ' ' + patient.middlename + ' ' + patient.lastname;
    document.clientobj = patient;
    document.createdBy = user._id;
    document.createdByname = user.firstname + ' ' + user.lastname;
    document.status = 'completed';
    console.log(document);

    //order
    document.documentdetail.forEach(async (element) => {
      let orderinfo = {
        //for reach document
        documentationId: '', //tbf
        order_category: element.category, //category
        order: element.name, //name
        instruction: '',
        destination_name: document.facilityname, //facilityname
        destination: document.facility, //facility id
        order_status: 'Billed',
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
          orderId: '', //tbf
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
        billing_status: 'Unpaid',
      };
      let items = {
        orderinfo,
        billInfo,
      };

      serviceList.push(items);
    });

    console.log('==================');
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
            message: 'Billed Orders created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          setProductItem([]);
          setCalcAmount(0);
          const today = new Date().toLocaleString();
          //console.log(today)
          setDate(today);
          const invoiceNo = random(6, 'uppernumeric');
          setDocumentNo(invoiceNo);
        })
        .catch((err) => {
          toast({
            message: 'Error creating Billed Orders ' + err,
            type: 'is-danger',
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

    setMessage('');
    setError(false);
    setSuccess(false);
    //state.Beneficiary?.principal._id
    if (!state.Beneficiary.principal._id) {
      toast({
        message: 'Please add principal! ',
        type: 'is-danger',
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
        policyNo: 'CVGBH/2022/098',
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
            message: 'Client created succesfully',
            type: 'is-success',
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
            message: 'Error creating Client ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
          setPatList([]);
          setDependant(false);
        });
    }
  };

  const handleClickProd = () => {
    setState((prevstate) => ({ ...prevstate, currBeneficiary: 'principal' }));
    setDependant('principal');
    console.log(state.Beneficiary);
    setClientModal(true);
    setOpenCreate(true);
  };
  const handleClickProd2 = () => {
    setState((prevstate) => ({ ...prevstate, currBeneficiary: 'dependent' }));
    setDependant('dependent');
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
          height: 'auto',
          overflowY: 'scroll',
          width: '30vw',
          margin: '0 auto',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader text={'Policy'} />

          <Grid container spacing={2} mt={2}>
            <Grid item md={12}>
              <select
                name="plan"
                {...register('plan', { required: true })}
                onChange={(e, i) => handleChangePlan(e.target.value)}
                className="selectadd"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '1px solid rgba(0, 0, 0, 0.6)',
                }}
              >
                <option value=""> Choose Plan </option>
                {benefittingPlans1.map((option, i) => (
                  <option key={i} value={option.name}>
                    {' '}
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
                {...register('sponsortype', { required: true })}
                onChange={(e) => handleChangeMode(e.target.value)}
                className="selectadd"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '1px solid rgba(0, 0, 0, 0.6)',
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
          <p style={{ display: 'flex' }}>
            Add Principal
            <button
              onClick={handleClickProd}
              style={{
                border: 'none',
                backgroundColor: '#E8F1FF',
                padding: ' .5rem 1rem',
                marginLeft: '.5rem',
                cursor: 'pointer',
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
                border: 'none',
                backgroundColor: '#E8F1FF',
                padding: ' .5rem 1rem',
                marginLeft: '.5rem',
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </p>
          {!!state.Beneficiary?.principal._id && (
            <CustomTable
              title={''}
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
              title={''}
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

export function ClientList({ showModal, setShowModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const ClientServ = client.service('client');
  // const history = useHistory();
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

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(2);
  };

  const handleRow = async (Client) => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    setShowModal(1);
  };

  const handleSearch = (val) => {
    // eslint-disable-next-line
    const field = 'firstname';
    console.log(val);
    ClientServ.find({
      query: {
        $or: [
          {
            firstname: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            lastname: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            middlename: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            phone: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            clientTags: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            mrn: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            email: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            specificDetails: {
              $regex: val,
              $options: 'i',
            },
          },
          { gender: val },
        ],

        'relatedfacilities.facility': user.currentEmployee.facilityDetail._id, // || "",
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(' Client  fetched successfully');
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage('Error fetching Client, probable network issues ' + err);
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
    ClientServ.on('created', (obj) => rest());
    ClientServ.on('updated', (obj) => rest());
    ClientServ.on('patched', (obj) => rest());
    ClientServ.on('removed', (obj) => rest());
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

  const BeneficiarySchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'First Name',
      key: 'firstname',
      description: 'First Name',
      selector: (row) => row.firstname,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Last Name',
      key: 'lastname',
      description: 'Last Name',
      selector: (row) => row.lastname,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Midlle Name',
      key: 'middlename',
      description: 'Midlle Name',
      selector: (row) => row.middlename,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Payment Mode',
      key: 'paymentmode',
      description: 'Payment Mode',
      selector: (row) => row.paymentmode,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Age',
      key: 'dob',
      description: 'Age',
      selector: (row) => row.dob,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Gender',
      key: 'gender',
      description: 'Male',
      selector: (row) => row.gender,
      sortable: true,
      required: true,
      inputType: 'SELECT_LIST',
      options: ['Male', 'Female'],
    },

    {
      name: 'Email',
      key: 'email',
      description: 'johndoe@mail.com',
      selector: (row) => row.email,
      sortable: true,
      required: true,
      inputType: 'EMAIL',
    },

    {
      name: 'Tags',
      key: 'clientTags',
      description: 'Tags',
      selector: (row) => row.clientTags,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  return (
    <>
      <div className="level">
        <PageWrapper
          style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
        >
          <TableMenu>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                List of Beneficiary
              </h2>
            </div>
            {handleCreateNew && (
              <Button
                style={{ fontSize: '14px', fontWeight: '600px' }}
                label="Add New"
                onClick={handleCreateNew}
                showicon={true}
              />
            )}
          </TableMenu>

          <div
            style={{
              width: '100%',
              height: 'calc(100vh-90px)',
              overflow: 'auto',
            }}
          >
            <CustomTable
              title={''}
              columns={BeneficiarySchema}
              data={facilities}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
}

export function ClientDetail({ showModal, setShowModal }) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  // const history = useHistory();
  // eslint-disable-next-line
  // let { path, url } = useRouteMatch();
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  const [finacialInfoModal, setFinacialInfoModal] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const ClientServ=client.service('/Client')
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  let Client = state.ClientModule.selectedClient;

  console.log(Client);
  // eslint-disable-next-line
  const client = Client;
  const handleEdit = async () => {
    const newClientModule = {
      selectedClient: Client,
      show: 'modify',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(true);
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
      <div
        className="card "
        style={{
          height: 'auto',
          overflowY: 'scroll',
          width: '50vw',
          margin: '0 auto',
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={4}>
            <ModalHeader text={'Beneficiary Details'} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
            my={1}
          >
            <Button
              onClick={handleEdit}
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="secondary"
            >
              Edit Details
            </Button>
            <Button
              onClick={handleFinancialInfo}
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="info"
            >
              Payment Info
            </Button>
            <Button
              onClick={handleSchedule}
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="success"
            >
              Schedule Appointment
            </Button>
            <Button
              onClick={() => navigate('/app/beneficiary/documentation')}
              variant="outlined"
              size="small"
              sx={{ textTransform: 'capitalize' }}
            >
              View History
            </Button>

            {(user.currentEmployee?.roles.includes('Bill Client') ||
              user.currentEmployee?.roles.length === 0 ||
              user.stacker) && (
              <button
                className="button is-success is-small btnheight mt-2"
                onClick={showBilling}
                style={{
                  border: 'none',
                  backgroundColor: '#48c774',
                  padding: ' .5rem 1rem',
                  marginLeft: '.5rem',
                  cursor: 'pointer',
                  color: 'white',
                  float: 'right',
                }}
              >
                Bill Client
              </button>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={4}>
            <p>First Name:{Client?.firstname}</p>
          </Grid>
          <Grid item md={4}>
            <p>Middle Name: {Client?.middlename}</p>
          </Grid>
          <Grid item md={4}>
            <p>Last Name: {Client?.lastname}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>
              Date of Birth: {new Date(Client?.dob).toLocaleDateString('en-GB')}
            </p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Gender: {Client?.gender}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Marital Status: {Client?.maritalstatus}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Medical Records Number: {Client?.mrn}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Religion: {Client?.religion}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Profession: {Client?.profession}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Phone Number: {Client?.phone}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Email: {Client?.email}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Address: {Client?.address}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Town/City: {Client?.city}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>LGA: {Client?.lga}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>State: {Client?.state}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Country: {Client?.country}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Blood Group: {Client?.bloodgroup}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Genotype: {Client?.genotype}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Disabilities: {Client?.disabilities}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Allergies: {Client?.allergies}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Co-morbidities: {Client?.comorbidities}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Tags: {Client?.clientTags}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Specific Details: {Client?.specificDetails}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Next of Kin Name: {Client?.nok_name}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Next of Kin Phone: {Client?.nok_phoneno}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>Next of Kin Email: {Client?.nok_email}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <p>NOK Relationship: {Client?.nok_relationship}</p>
          </Grid>
        </Grid>

        {finacialInfoModal && (
          <>
            <ModalBox open onClose={() => setFinacialInfoModal(false)}>
              <ModalHeader text="Financial Information" />
              <ClientFinInfo />
            </ModalBox>
          </>
        )}
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
      </div>
    </>
  );
}

export function ClientModify({ showModal, setShowModal }) {
  const { register, handleSubmit, setValue, reset } = useForm(); //watch, errors,, errors
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const ClientServ = client.service('client');
  //const history = useHistory()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const Client = state.ClientModule.selectedClient;

  useEffect(() => {
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
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newClientModule = {
      selectedClient: Client,
      show: 'detail',
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
      show: 'create',
    };
    setState((prevstate) => ({ ...prevstate, ClientModule: newClientModule }));
  };
  // eslint-disable-next-line
  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');

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
            message: 'Client deleted succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch((err) => {
          // setMessage("Error deleting Client, probable network issues "+ err )
          // setError(true)
          toast({
            message: 'Error deleting Client, probable network issues or ' + err,
            type: 'is-danger',
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
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Client successfully")
        toast({
          message: 'Client updated succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch((err) => {
        //setMessage("Error creating Client, probable network issues "+ err )
        // setError(true)
        toast({
          message: 'Error updating Client, probable network issues or ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div
        style={{
          height: '80vh',
          overflowY: 'scroll',
          width: '40vw',
          margin: '0 auto',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Names Section */}
          <ModalHeader text={'Modify Beneficiary'} />

          <ViewBox>
            <h2>Names</h2>

            <GridWrapper>
              <Input
                label="First Name"
                register={register('firstname')}
                // errorText={errors?.firstname?.message}
              />
              <Input
                label="Middle Name"
                register={register('middlename')}
                // errorText={errors?.middlename?.message}
              />
              <Input
                label="Last Name"
                register={register('lastname')}
                // errorText={errors?.lastname?.message}
              />
              <BasicDatePicker
                label="Date of Birth"
                register={register('dob')}
                onChange={(date) => handleDate(date)}
                // errorText={errors?.dob?.message}
              />
            </GridWrapper>
          </ViewBox>
          {/* Biodata Section */}

          <ViewBox>
            <h2>Biodata</h2>

            <GridWrapper>
              <CustomSelect
                label="Gender"
                register={register('gender')}
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ]}
              />
              <CustomSelect
                label="Marital Status"
                register={register('maritalstatus')}
                options={[
                  { label: 'Single', value: 'Single' },
                  { label: 'Married', value: 'Married' },
                ]}
              />
              <Input label="Medical record Number" register={register('mrn')} />
              <Input label="Religion" register={register('religion')} />
              <Input label="Profession" register={register('profession')} />
              <Input
                label="Phone No"
                register={register('phone')}
                // errorText={errors?.phone?.message}
              />
              <Input
                label="Email"
                register={register('email')}
                // errorText={errors?.email?.message}
              />
              <Input label="Tags" register={register('clientTags')} />
            </GridWrapper>
          </ViewBox>
          {/* Address */}
          <ViewBox>
            <h2>Addresses</h2>

            <GridWrapper>
              <Input
                label="Residential Address"
                register={register('address')}
              />
              <Input label="Town/City" register={register('city')} />
              <Input label="Local Govt Area" register={register('lga')} />
              <Input label="State" register={register('state')} />
              <Input label="Country" register={register('country')} />
            </GridWrapper>
          </ViewBox>
          {/* Medical Data */}
          <ViewBox>
            <h2>Medical Data</h2>

            <GridWrapper>
              <Input label="Blood Group" register={register('bloodgroup')} />
              <Input label="Genotype" register={register('genotype')} />
              <Input label="Disabilities" register={register('disabilities')} />
              <Input label="Allergies" register={register('allergies')} />
              <Input
                label="Co-mobidities"
                register={register('comorbidities')}
              />
              <Input
                label="Specific Details "
                register={register('specificDetails')}
              />
            </GridWrapper>
          </ViewBox>
          {/* Next of Kin Information */}
          <ViewBox>
            <h2>Next of Kin Information</h2>

            <GridWrapper>
              <Input label="Full Name" register={register('nok_name')} />
              <Input label="Phone Number" register={register('nok_phoneno')} />
              <Input label=" Email" register={register('nok_email')} />
              <Input
                label="Relationship"
                register={register('nok_relationship')}
              />
              <Input
                label="Co-mobidities"
                register={register('comorbidities')}
              />
              <Input
                label="Specific Details "
                register={register('specificDetails')}
              />
            </GridWrapper>
          </ViewBox>

          <BottomWrapper>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="error"
              onClick={() => setShowModal(false)}
            >
              {' '}
              Close{' '}
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="success"
            >
              {' '}
              Save{' '}
            </Button>
            <Button
              onClick={() => handleDelete()}
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="warning"
            >
              {' '}
              Delete{' '}
            </Button>
          </BottomWrapper>
        </form>
      </div>
    </>
  );
}

export function InputSearch({ getSearchfacility, clear }) {
  const ClientServ = client.service('client');
  // const facilityServ=client.service('facility')
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState('');
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState('');
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);

  const handleRow = async (obj) => {
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
      console.log('stuff was chosen');
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
    const field = 'facilityName'; //field variable

    if (val.length >= 3) {
      ClientServ.find({
        query: {
          //service
          [field]: {
            $regex: val,
            $options: 'i',
          },
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
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
          );
          setSearchError(true);
        });
    } else {
      console.log('less than 3 ');
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa('');
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? 'is-active' : ''}`}>
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
