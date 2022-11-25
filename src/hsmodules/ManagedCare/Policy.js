import React, { useState, useContext, useEffect, useRef } from 'react';
import {} from 'react-router-dom'; //Route, Switch,Link, NavLink,
import client from '../../feathers';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext, ObjectContext } from '../../context';
import { toast, ToastContainer } from 'react-toastify';
import CustomTable from '../../components/customtable';
import { OrgFacilitySearch, SponsorSearch } from '../helpers/FacilitySearch';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import { Button } from '@mui/material';
import moment from 'moment';
import ModalBox from '../../components/modal/';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { Box, Grid, Typography } from '@mui/material';
import Input from '../../components/inputs/basic/Input/index';
import BasicDatePicker from '../../components/inputs/Date';
import CustomSelect from '../../components/inputs/basic/Select';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  EnrolleSchema,
  EnrolleSchema2,
  EnrolleSchema3,
  principalData,
} from './schema';
import ClientForm from '../Client/ClientForm';
import { HeadWrapper } from '../app/styles';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import Provider, { OrganizationCreate, ProviderList } from './Providers';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { FormsHeaderText } from '../../components/texts';
import { G } from '@react-pdf/renderer';
import Claims from './Claims';
import PremiumPayment from './PremiumPayment';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { createClientSchema } from '../Client/schema';
import SaveIcon from '@mui/icons-material/Save';

var random = require('random-string-generator');
// eslint-disable-next-line
const searchfacility = {};

export default function Policy() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [showModal, setShowModal] = useState(0);
  const [showModal2, setShowModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <section className="section remPadTop">
      <PolicyList showModal={showModal} setShowModal={setShowModal} />
      {showModal === 1 && (
        <ModalBox
          open={state.ManagedCareModule.show === 'create'}
          onClose={() => setShowModal(false)}
        >
          <PolicyCreate
            showModal={showModal}
            setShowModal={setShowModal}
            setOpenCreate={setShowModal2}
          />
        </ModalBox>
      )}
      {showModal2 && (
        <ModalBox open={showModal2} onClose={() => setShowModal2(false)}>
          <ClientCreate />
        </ModalBox>
      )}
      {showModal === 2 && (
        <ModalBox open={showModal} onClose={() => setShowModal(false)}>
          <Grid container>
            <Grid item md={6}>
              <PolicyDetail />
            </Grid>
            <Grid item md={6}>
              <FormsHeaderText text="Principal Details" />
              <CustomTable
                title={''}
                columns={EnrolleSchema3}
                data={principalData}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={() => {}}
                progressPending={loading}
              />
              <FormsHeaderText text="Dependant Details" />
              <CustomTable
                title={''}
                columns={EnrolleSchema3}
                data={principalData}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={() => {}}
                progressPending={loading}
              />
              <FormsHeaderText text="Provider List" />
              <Provider standAlone />
            </Grid>
          </Grid>
        </ModalBox>
      )}
    </section>
  );
}

export function PolicyList({ showModal, setShowModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const ClientServ = client.service('policy');
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

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ManagedCareModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(1);
    console.log('test');
  };

  const handleRow = async (Client) => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ManagedCareModule: newClientModule,
    }));
    setShowModal(2);
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
  const PolicySchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: 'HIDDEN',
      width: '80px',
    },
    {
      name: 'Date Created',
      key: 'createdAt',
      description: 'Date Created',
      selector: (row) => moment(row.date).format('YYYY-MM-DD HH:mm'),
      sortable: true,
      required: true,
      inputType: 'DATE',
    },
    {
      name: 'Sponsorship Type',
      key: 'sponsorshipType',
      description: 'Sponsorship Type',
      selector: (row) => row.sponsorshipType,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Plan',
      key: 'plan',
      description: 'Plan',
      selector: (row) => row.plan.name,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Premium',
      key: 'premium',
      description: 'Premium',
      selector: (row) => row.premium,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Paid',
      key: 'isPaid',
      description: 'Paid',
      selector: (row) => row.isPaid,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Active',
      key: 'active',
      description: 'Active',
      selector: (row) => row.active,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Pricipal Last Name',
      key: 'principal',
      description: 'Principal Last Name',
      selector: (row) => row.principal.lastname,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'First Name',
      key: 'firstname',
      description: 'First Name',
      selector: (row) => row.principal.firstname,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Middle Name',
      key: 'middlename',
      description: 'Middle Name',
      selector: (row) => row.principal.middlename,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: 'Phone',
      key: 'phone',
      description: 'Phone Number',
      selector: (row) => row.principal.phone,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },

    {
      name: 'Email',
      key: 'email',
      description: 'simpa@email.com',
      selector: (row) => row.principal.email,
      sortable: true,
      required: true,
      inputType: 'EMAIL',
    },

    {
      name: 'Tags',
      key: 'tags',
      description: 'Tags',
      selector: (row) => row.principal.clientTags,
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
                List of Policies
              </h2>
            </div>

            {handleCreateNew && (
              <Button
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                }}
                color="primary"
                variant="contained"
                size="small"
                sx={{ textTransform: 'capitalize' }}
                onClick={handleCreateNew}
                showicon={true}
              >
                {' '}
                Add New
              </Button>
            )}
          </TableMenu>
          <div
            style={{
              width: '100%',
              height: 'calc(100vh - 90px)',
              overflow: 'auto',
            }}
          >
            <CustomTable
              title={''}
              columns={PolicySchema}
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

export function PolicyCreate({ showModal, setShowModal, setOpenCreate }) {
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const [clientModal, setClientModal] = useState(false);
  const [dependant, setDependant] = useState(false);
  const [selectedClient, setSelectedClient] = useState();
  //const [productItem,setProductItem] = useState([])
  const productItem = useRef([]);
  const [showCorp, setShowCorp] = useState(false);
  const [message, setMessage] = useState('');
  const [benefittingPlans1, setBenefittingPlans1] = useState([]);
  const [price, setPrice] = useState('');
  const [chosenPlan, setChosenPlan] = useState();
  const [success, setSuccess] = useState(false);
  const [chosen, setChosen] = useState('');
  const [planHMO, setPlanHMO] = useState('');
  const [error, setError] = useState(false);
  //const [documentNo,setDocumentNo] = useState("")
  const documentNo = useRef();
  //const [date,setDate] = useState()
  const date = useRef();
  //const [patient, setPatient] =useState("")
  const patient = useRef();
  //const [productEntry,setProductEntry]=useState()
  const productEntry = useRef();
  //const [type,setType] = useState("Bill")
  const type = useRef('Bill');
  const ServicesServ = client.service('billing');
  const policyServ = client.service('policy');
  const BillCreateServ = client.service('createbilldirect');
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [billMode, setBillMode] = useState('');
  const [obj, setObj] = useState('');
  const [paymentmode, setPaymentMode] = useState('');
  const [loading, setLoading] = useState(false);
  const [createOrg, setCreateOrg] = useState(false);

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

  const handleChangeMode = async (mode) => {
    setMessage(mode);
    if (mode === 'Company') {
      setShowCorp(true);
    } else {
      setShowCorp(false);
    }
    let billm = paymentOptions.filter((el) => el.name === mode);
    await setBillMode(billm[0]);
    console.log(billm);
  };

  const handleChangePlan = async (value) => {
    console.log(value);
    if (value === '') {
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

  const handleRow = (Client) => {
    //domething o
  };

  const handlecloseModal4 = () => {
    setClientModal(false);
    console.log(state.Beneficiary);
  };

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
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }

    let confirm = window.confirm(
      `You are about to register a new policy CVGBH/2022/098 ?`
    );
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
        })
        .then(async (res) => {
          //await setType("Sales")
          type.current = 'Sales';
          const today = new Date().toLocaleString();
          //await setDate(today)
          date.current = today;
          const invoiceNo = random(6, 'uppernumeric');
          // await setDocumentNo(invoiceNo)
          documentNo.current = invoiceNo;
          //await setPatient(state.Beneficiary.principal)
          patient.current = state.Beneficiary.principal;
          // await createBillmode()
          await createProductItem();
          await createProductEntry();

          await handleCreateBill();
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
          };
          await setBenefittingPlans1((prev) => prev.concat(c));
        });
      }
    }
  };

  const createPaymentOption = () => {
    const paymentoptions = [];
    // const info = client.paymentinfo
    let billme;
    let obj;
    //ideally this should be based on whether self or corporate
    let patient = state.Beneficiary.principal;
    if (!!patient.paymentinfo) {
      patient.paymentinfo.forEach((pay, i) => {
        if (pay.active) {
          switch (pay.paymentmode) {
            case 'Cash':
              // code block
              obj = createObj(pay, 'Cash', 'Cash', 'Cash');

              paymentoptions.push(obj);
              setPaymentMode('Cash');
              billme = obj;
              console.log('billme', billme);
              break;
            case 'Family':
              // code block
              obj = createObj(
                pay,
                'Family Cover',
                'familyCover',
                'Family Cover'
              );
              paymentoptions.push(obj);
              setPaymentMode('Family Cover');
              billme = obj;
              // console.log("billme",billme)
              break;
            case 'Company':
              // code block
              let name =
                'Company: ' + pay.organizationName + '(' + pay.plan + ')';

              obj = createObj(pay, name, 'CompanyCover', 'Company Cover');
              paymentoptions.push(obj);
              setPaymentMode(
                'Company: ' + pay.organizationName + '(' + pay.plan + ')'
              );
              billme = obj;
              // console.log("billme",billme)
              break;
            case 'HMO':
              // code block
              console.log(pay);
              let sname = 'HMO: ' + pay.organizationName + '(' + pay.plan + ')';

              obj = createObj(pay, sname, 'HMOCover', 'HMO Cover');
              paymentoptions.push(obj);
              setPaymentMode(
                'HMO: ' + pay.organizationName + '(' + pay.plan + ')'
              );
              billme = obj;
              //  console.log("billme",billme)

              break;
            default:
            // code block
          }
        }
      });
    }
    setPaymentOptions(paymentoptions);
    setBillMode(billme);
  };

  /* const pay={paymentinfo:
    {
      paymentmode:{ type: String,  default:"Cash"},
      organizationId:{ type: Schema.Types.ObjectId },
      organizationName:{ type: String,  },
      principalId:{ type: String,  },
      clientId:{ type: String,  },
      principalName:{ type: String,  },
      plan:{ type: String,  },
      active:{ type: Boolean,default:true},
      principal:{ type: String},
      organizationType: { type: String,  },
      agent:{ type: Schema.Types.ObjectId },
      agentName:{ type: String,  }

    }
    }
   */

  const createObj = (pay, name, cover, type) => {
    let details = {};
    details = { ...pay };
    details.type = type;

    return {
      name,
      value: cover,
      detail: details,
      type,
    };
  };
  //create productitem
  const createProductItem = async () => {
    productItem.current = [
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
        billMode: billMode, // state.Beneficiary.principal.paymentinfo[0]
      },
    ];
    console.log(chosenPlan.name);
  };

  const createProductEntry = () => {
    productEntry.current = {
      productitems: productItem.current,
      date: date.current,
      documentNo: documentNo.current,
      type: type.current,
      totalamount: price.price,
      createdby: user._id,
      transactioncategory: 'debit',
      source: patient.current.firstname + ' ' + patient.current.lastname,
      facility: user.currentEmployee.facilityDetail._id,
    };
  };

  //create billfor policy
  const handleCreateBill = async () => {
    //handle selected single order
    //documentation

    console.log(productEntry.current, productItem.current);
    let serviceList = [];
    let document = {};

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = productItem.current;
    console.log(document.documentdetail);
    document.documentname = 'Billed Orders'; //state.DocumentClassModule.selectedDocumentClass.name
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      ' ' +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = patient.current._id;
    document.clientname =
      patient.current.firstname +
      ' ' +
      patient.current.middlename +
      ' ' +
      patient.current.lastname;
    document.clientobj = patient.current;
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
        order: element.name + ' Plan', //name
        instruction: '',
        destination_name: document.facilityname, //facilityname
        destination: document.facility, //facility id
        order_status: 'Billed',
        payer: '', //!!element.billMode.organizationName?element.billMode.organizationName:"",
        paymentmode: '', //element.billMode.paymentmode?element.billMode.paymentmode:"",

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
          name: element.name + ' Plan',
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
      alert('aboutto create bill ' + items.orderinfo.name);
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
          productItem.current = [];
          //setCalcAmount(0);
          const today = new Date().toLocaleString();
          //console.log(today)
          date.current = today;
          const invoiceNo = random(6, 'uppernumeric');
          documentNo.current = invoiceNo;
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
  };

  useEffect(() => {
    getBenfittingPlans();
    createPaymentOption();

    return () => {};
  }, []);

  console.log('==================', state.Beneficiary?.principal);

  return (
    <>
      <div
        className="card "
        style={{
          height: 'auto',
          overflowY: 'scroll',
          width: '70vw',
          margin: '0 auto',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader text={'Policy'} />

          <Grid container spacing={2} mt={2}>
            <Grid item md={12} sx={{ display: 'flex' }}>
              <Box style={{ marginRight: '1rem', fontSize: '.8rem' }}>
                <input
                  type="radio"
                  name="sponsortype"
                  {...register('sponsortype', { required: true })}
                  value="Self"
                  onChange={(e) => handleChangeMode(e.target.value)}
                />
                <label>Self</label>
              </Box>
              <Box style={{ fontSize: '.8rem' }}>
                <input
                  type="radio"
                  name="sponsortype"
                  {...register('sponsortype', { required: true })}
                  value="Company"
                  onChange={(e) => handleChangeMode(e.target.value)}
                />
                <label>Company</label>
              </Box>
            </Grid>
            {showCorp && (
              <Grid item md={6}>
                <SponsorSearch
                  getSearchfacility={getSearchfacility1}
                  clear={success}
                />
              </Grid>
            )}
            <Grid item md={6}>
              <OrgFacilitySearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
            </Grid>
            <Grid item md={6}>
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
            <Grid item md={6}>
              <Input value={price.price} disabled label="Price" />
            </Grid>
          </Grid>
          <Box sx={{ float: 'right' }}>
            <p>
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
          </Box>
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
              columns={EnrolleSchema2}
              data={state.Beneficiary.dependent}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={() => handleRow()}
              progressPending={loading}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            {' '}
            Save{' '}
          </Button>
        </form>
        <ModalBox
          open={createOrg}
          onClose={() => setCreateOrg(false)}
          header="Add Organization"
        >
          <OrganizationCreate />
        </ModalBox>
      </div>
    </>
  );
}

export function ClientCreate({ closeModal }) {
  //, watch, errors, reset
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
  const [billModal, setBillModal] = useState(false);
  const [patList, setPatList] = useState([]);
  const [dependant, setDependant] = useState(false);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const { state, setState } = useContext(ObjectContext);
  const [showdept, setShowdept] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  const data = localStorage.getItem('user');
  const user = JSON.parse(data);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    resolver: yupResolver(createClientSchema),

    defaultValues: {
      firstname: '',
      lastname: '',
      middlename: '',
      dob: '',
      phone: '',
      email: '',
      facility: user.currentEmployee.facility,
    },
  });

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
      query.gender = data.gender;
      query.dob = data.dob;

      query.$or = [
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
      ];
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
      toast.error('Please enter Date of Birth! ');

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
          toast.success('Client created succesfully');
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
          toast.error('Error creating Client ' + err);
          setPatList([]);
          setDependant(false);
        });
    }
  };
  const CustomSelectData = [
    {
      label: 'Today',
      value: 'today',
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer theme="colored" />

        {/* Start form */}
        <PageWrapper>
          <div>
            <HeadWrapper>
              <div>
                <h2>{`${
                  isFullRegistration
                    ? 'Complete Client Registeration'
                    : 'Quick Client Registeration'
                }`}</h2>
                <span>
                  Create a New client by filling out the form below to get
                  started.
                </span>
              </div>
              {isFullRegistration ? (
                <GlobalCustomButton onClick={() => setFullRegistration(false)}>
                  <ElectricBoltIcon
                    fontSize="small"
                    sx={{ marginRight: '5px' }}
                  />
                  Quick Registration
                </GlobalCustomButton>
              ) : (
                <GlobalCustomButton onClick={() => setFullRegistration(true)}>
                  <OpenInFullIcon
                    fontSize="small"
                    sx={{ marginRight: '5px' }}
                  />
                  Complete Registration
                </GlobalCustomButton>
              )}
            </HeadWrapper>

            <ToastContainer theme="colored" />

            {!isFullRegistration ? (
              <>
                <Box sx={{ width: '80vw', maxHeight: '80vh' }}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="First Name"
                        register={register('firstname')}
                        errorText={errors?.firstname?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Middle Name"
                        register={register('middlename')}
                        errorText={errors?.middlename?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Last Name"
                        register={register('lastname')}
                        errorText={errors?.lastname?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Phone"
                        register={register('phone')}
                        type="tel"
                        errorText={errors?.phone?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Email"
                        register={register('email')}
                        type="email"
                        errorText={errors?.email?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <BasicDatePicker
                        label="dob"
                        register={register('dob')}
                        errorText={errors?.dob?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Gender"
                        register={register('gender', { required: true })}
                        options={[
                          { label: 'Male', value: 'Male' },
                          { label: 'Female', value: 'Memale' },
                        ]}
                        errorText={errors?.gender?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Marital Status"
                        register={register('maritalstatus')}
                        options={[
                          { label: 'Single', value: 'Single' },
                          { label: 'Married', value: 'Married' },
                        ]}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                      <Input
                        label="Residential Address"
                        register={register('residentialaddress')}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Town"
                        register={register('town')}
                        type="text"
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="State"
                        register={register('state')}
                        type="text"
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Country"
                        register={register('country')}
                        type="text"
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Next of Kin"
                        register={register('nextofkin')}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Next of Kin Phone"
                        register={register('nextofkinphone')}
                        type="tel"
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <GlobalCustomButton
                      color="warning"
                      onClick={() => closeModal(true)}
                      sx={{ marginRight: '15px' }}
                    >
                      Cancel
                    </GlobalCustomButton>

                    <GlobalCustomButton
                      type="submit"
                      loading={loading}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <SaveIcon fontSize="small" sx={{ marginRight: '5px' }} />
                      Register Client
                    </GlobalCustomButton>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ width: '80vw', maxHeight: '80vh' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Names" />
                    </Grid>
                    <Grid item lg={3} md={4} sm={4}>
                      <Input
                        label="First Name"
                        register={register('firstname')}
                        errorText={errors?.firstname?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={4}>
                      <Input
                        label="Middle Name"
                        register={register('middlename')}
                        errorText={errors?.middlename?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={4}>
                      <Input
                        label="Last Name"
                        register={register('lastname')}
                        errorText={errors?.lastname?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Biodata" />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <BasicDatePicker
                        label="Date of Birth"
                        register={register('dob')}
                        errorText={errors?.dob?.message}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Gender"
                        register={register('gender')}
                        options={[
                          { label: 'Male', value: 'male' },
                          { label: 'Female', value: 'female' },
                        ]}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Marital Status"
                        register={register('maritalstatus')}
                        options={[
                          { label: 'Single', value: 'Single' },
                          { label: 'Married', value: 'Married' },
                        ]}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Medical record Number"
                        register={register('mrn')}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input label="Religion" register={register('religion')} />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Profession"
                        register={register('profession')}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Phone No"
                        register={register('phone')}
                        errorText={errors?.phone?.message}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Email"
                        register={register('email')}
                        errorText={errors?.email?.message}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12}>
                      <Input label="Tags" register={register('clientTags')} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Address" />
                    </Grid>
                    <Grid item lg={4} md={6} sm={8}>
                      <Input
                        label="Residential Address"
                        register={register('address')}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4}>
                      <Input label="Town/City" register={register('city')} />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4}>
                      <Input label="LGA" register={register('lga')} />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4}>
                      <Input label="State" register={register('state')} />
                    </Grid>
                    <Grid item lg={2} md={4} sm={4}>
                      <Input label="Country" register={register('country')} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Medical Data" />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Blood Group"
                        register={register('bloodgroup')}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input label="Genotype" register={register('genotype')} />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Disabilities"
                        register={register('disabilities')}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Allergies"
                        register={register('allergies')}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Co-mobidities"
                        register={register('comorbidities')}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Specific Details "
                        register={register('specificDetails')}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Next of Kin Information" />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                      <Input
                        label="Full Name"
                        register={register('nok_name')}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Phone Number"
                        register={register('nok_phoneno')}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label=" Email"
                        register={register('nok_email')}
                        type="email"
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Relationship"
                        register={register('nok_relationship')}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                      <Input
                        label="Co-mobidities"
                        register={register('comorbidities')}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <GlobalCustomButton
                      color="warning"
                      onClick={() => closeModal(true)}
                      sx={{ marginRight: '15px' }}
                    >
                      Cancel
                    </GlobalCustomButton>

                    <GlobalCustomButton
                      type="submit"
                      loading={loading}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <SaveIcon fontSize="small" sx={{ marginRight: '5px' }} />
                      Register Client
                    </GlobalCustomButton>
                  </Box>
                </Box>
              </>
            )}
          </div>
        </PageWrapper>
      </form>
    </>
  );
}

export function PolicyDetail({ showModal, setShowModal }) {
  const { register, reset, control, handleSubmit } = useForm();
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
  const [display, setDisplay] = useState(1);
  const [editPolicy, setEditPolicy] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const updateDetail = (data) => {
    toast.success('Customer Detail Updated');
    setEditCustomer(false);
  };
  const initFormState = {
    policy_no: '19834780',
    phone: '08074567832',
    start_date: moment().subtract(100, 'days').calendar(),
    end_date: moment().add(3, 'years').calendar(),
    status: 'Active',
    policy_type: 'Individual',
    policy_tag: '5365',
    premium: 'N100,000',
    sponsor_name: 'Leadway Assurance',
    sponsor_phone: '08074567832',
    sponsor_email: 'test@lead.com',
    sponsor_address: 'No 1, Ogunlana Drive, Surulere, Lagos',
  };
  useEffect(() => {
    reset(initFormState);
  }, []);

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
          margin: '0 auto',
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <ModalHeader text={'Policy Details'} />
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
              onClick={() => setDisplay(1)}
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="secondary"
            >
              Details
            </Button>
            {/* <Button
              onClick={() => setDisplay(2)}
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="success"
            >
              Provider
            </Button> */}
            {/* <Button
              onClick={() => setDisplay(3)}
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="info"
            >
              Principals
            </Button>
            <Button
              onClick={() => setDisplay(4)}
              variant="contained"
              size="small"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
              color="success"
            >
              Dependants
            </Button> */}
            <Button
              onClick={() => setDisplay(5)}
              variant="contained"
              size="small"
              color="info"
              sx={{ textTransform: 'capitalize', marginRight: '10px' }}
            >
              Claims
            </Button>
            <Button
              onClick={() => setDisplay(6)}
              variant="outlined"
              size="small"
              sx={{ textTransform: 'capitalize' }}
            >
              Premium
            </Button>
          </Grid>
        </Grid>
        <Box>
          {display === 1 && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItem: 'center',
                  justifyContent: 'space-between',
                }}
                mb={1}
              >
                <FormsHeaderText text="Policy Details" />

                {editPolicy ? (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                    color="success"
                    onClick={handleSubmit(updateDetail)}
                  >
                    <UpgradeOutlinedIcon fontSize="small" />
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                    onClick={() => setEditPolicy(true)}
                  >
                    <ModeEditOutlineOutlinedIcon fontSize="small" /> Edit
                  </Button>
                )}
              </Box>

              <Grid container spacing={1}>
                <Grid item md={3}>
                  <Input
                    register={register('policy_no', { required: true })}
                    label="Policy No."
                    disabled={!editPolicy}
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register('phone', { required: true })}
                    label="Phone"
                    disabled={!editPolicy}
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register('start_date', { required: true })}
                    label="Start Date"
                    disabled={!editPolicy}
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item md={3}>
                  <Input
                    register={register('end_date', { required: true })}
                    label="End Date"
                    disabled={!editPolicy}
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register('status', { required: true })}
                    label="Status"
                    disabled={!editPolicy}
                    //placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register('policy_type', { required: true })}
                    label="Policy Type"
                    disabled={!editPolicy}
                    //placeholder="Enter customer number"
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register('policy_tag', { required: true })}
                    label="Policy Tag"
                    disabled={!editPolicy}
                    // placeholder="Enter customer name"
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register('premium', { required: true })}
                    label="Premium"
                    disabled={!editPolicy}
                    //placeholder="Enter customer number"
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  alignItem: 'center',
                  justifyContent: 'space-between',
                }}
                mb={1}
              >
                <FormsHeaderText text="Sponsor Details" />
              </Box>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6}>
                  <Input
                    register={register('sponsor_name', { required: true })}
                    label="Sponsor Name"
                    disabled={!editPolicy}
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6}>
                  <Input
                    register={register('sponsor_phone', { required: true })}
                    label="Sponsor Phone"
                    disabled={!editPolicy}
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6}>
                  <Input
                    register={register('sponsor_email', { required: true })}
                    label="Sponsor Email"
                    disabled={!editPolicy}
                    //placeholder="Enter customer number"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6}>
                  <Input
                    register={register('sponsor_address', { required: true })}
                    label="Sponsor Address"
                    disabled={!editPolicy}
                    //placeholder="Enter customer number"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          {display === 3 && (
            <>
              <CustomTable
                title={''}
                columns={EnrolleSchema3}
                data={principalData}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={() => {}}
                progressPending={loading}
              />
            </>
          )}
          {display === 4 && (
            <CustomTable
              title={''}
              columns={EnrolleSchema3}
              data={principalData}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={() => {}}
              progressPending={loading}
            />
          )}
          {display === 5 && <Claims />}
          {display === 6 && <PremiumPayment />}
        </Box>
      </div>
    </>
  );
}
