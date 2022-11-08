import React, { useState, useContext, useEffect, useRef } from "react";
import {} from "react-router-dom"; //Route, Switch,Link, NavLink,
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { formatDistanceToNowStrict, format } from "date-fns";
import ClientFinInfo from "./ClientFinInfo";
import BillServiceCreate from "../Finance/BillServiceCreate";
import InfiniteScroll from "react-infinite-scroll-component";
import ClientBilledPrescription from "../Finance/ClientBill";
import ClientGroup from "./ClientGroup";
import DatePicker from "react-datepicker";
import CustomTable from "../../components/customtable";
import "react-datepicker/dist/react-datepicker.css";
import { OrgFacilitySearch, SponsorSearch } from "../helpers/FacilitySearch";
import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
var random = require("random-string-generator");
// eslint-disable-next-line
const searchfacility = {};

export default function Policy() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      <div className="columns ">
        <div className="column is-6 ">
          <PolicyList />
        </div>
        <div className="column is-6 ">
          {/*   {(state.ManagedCareModule.show ==='List')&&<PolicyList />} */}
          {state.ManagedCareModule.show === "create" && <PolicyCreate />}
          {/*  {(state.ClientModule.show ==='detail')&&<ClientDetail  />}
                {(state.ClientModule.show ==='modify')&&<ClientModify Client={selectedClient} />}  */}
        </div>
      </div>
    </section>
  );
}

export function PolicyList() {
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
  };

  const handleRow = async (Client) => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
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

        "relatedfacilities.facility": user.currentEmployee.facilityDetail._id, // || "",
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
    },
    {
      name: "Date Created",
      key: "createdAt",
      description: "Date Created",
      selector: (row) => row.createdAt,
      sortable: true,
      required: true,
      inputType: "DATE",
    },

    {
      name: "Sponsorship Type",
      key: "sponsorshipType",
      description: "Sponsorship Type",
      selector: (row) => row.sponsorshipType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Plan",
      key: "plan",
      description: "Plan",
      selector: (row) => row.plan.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Premium",
      key: "premium",
      description: "Premium",
      selector: (row) => row.premium,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Paid",
      key: "isPaid",
      description: "Paid",
      selector: (row) => row.isPaid,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Active",
      key: "active",
      description: "Active",
      selector: (row) => row.active,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Pricipal Last Name",
      key: "principal",
      description: "Principal Last Name",
      selector: (row) => row.principal.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: (row) => row.principal.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Middle Name",
      key: "middlename",
      description: "Middle Name",
      selector: (row) => row.principal.middlename,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Phone",
      key: "phone",
      description: "Phone Number",
      selector: (row) => row.principal.phone,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Email",
      key: "email",
      description: "simpa@email.com",
      selector: (row) => row.principal.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Tags",
      key: "tags",
      description: "Tags",
      selector: (row) => row.principal.clientTags,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <div className="level">
        <PageWrapper
          style={{ flexDirection: "column", padding: "0.6rem 1rem" }}
        >
          <TableMenu>
            <div style={{ display: "flex", alignItems: "center" }}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
                List of Clients
              </h2>
            </div>

            {handleCreateNew && (
              <Button
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
                label="Add new"
                onClick={handleCreateNew}
                showicon={true}
              />
            )}
          </TableMenu>
          <div
            style={{
              width: "100%",
              height: "calc(100vh - 90px)",
              overflow: "auto",
            }}
          >
            <CustomTable
              title={""}
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

export function PolicyCreate() {
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const [clientModal, setClientModal] = useState(false);
  const [dependant, setDependant] = useState(false);
  const [selectedClient, setSelectedClient] = useState();
  //const [productItem,setProductItem] = useState([])
  const productItem = useRef([]);
  const [showCorp, setShowCorp] = useState(false);
  const [message, setMessage] = useState("");
  const [benefittingPlans1, setBenefittingPlans1] = useState([]);
  const [price, setPrice] = useState("");
  const [chosenPlan, setChosenPlan] = useState();
  const [success, setSuccess] = useState(false);
  const [chosen, setChosen] = useState("");
  const [planHMO, setPlanHMO] = useState("");
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
  const type = useRef("Bill");
  const ServicesServ = client.service("billing");
  const policyServ = client.service("policy");
  const BillCreateServ = client.service("createbilldirect");
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [billMode, setBillMode] = useState("");
  const [obj, setObj] = useState("");
  const [paymentmode, setPaymentMode] = useState("");

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
    if (mode === "Company") {
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
    if (value === "") {
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

  const handleClickProd = () => {
    setState((prevstate) => ({ ...prevstate, currBeneficiary: "principal" }));
    setDependant("principal");
    console.log(state.Beneficiary);
    setClientModal(true);
  };
  const handleClickProd2 = () => {
    setState((prevstate) => ({ ...prevstate, currBeneficiary: "dependent" }));
    setDependant("dependent");
    setClientModal(true);
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
        message: "Please add principal! ",
        type: "is-danger",
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
        })
        .then(async (res) => {
          //await setType("Sales")
          type.current = "Sales";
          const today = new Date().toLocaleString();
          //await setDate(today)
          date.current = today;
          const invoiceNo = random(6, "uppernumeric");
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
            message: "Error creating Client " + err,
            type: "is-danger",
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
          "contracts.source_org": user.currentEmployee.facilityDetail._id,
          "contracts.dest_org": user.currentEmployee.facilityDetail._id,
          category: "Managed Care",

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
            case "Cash":
              // code block
              obj = createObj(pay, "Cash", "Cash", "Cash");

              paymentoptions.push(obj);
              setPaymentMode("Cash");
              billme = obj;
              console.log("billme", billme);
              break;
            case "Family":
              // code block
              obj = createObj(
                pay,
                "Family Cover",
                "familyCover",
                "Family Cover"
              );
              paymentoptions.push(obj);
              setPaymentMode("Family Cover");
              billme = obj;
              // console.log("billme",billme)
              break;
            case "Company":
              // code block
              let name =
                "Company: " + pay.organizationName + "(" + pay.plan + ")";

              obj = createObj(pay, name, "CompanyCover", "Company Cover");
              paymentoptions.push(obj);
              setPaymentMode(
                "Company: " + pay.organizationName + "(" + pay.plan + ")"
              );
              billme = obj;
              // console.log("billme",billme)
              break;
            case "HMO":
              // code block
              console.log(pay);
              let sname = "HMO: " + pay.organizationName + "(" + pay.plan + ")";

              obj = createObj(pay, sname, "HMOCover", "HMO Cover");
              paymentoptions.push(obj);
              setPaymentMode(
                "HMO: " + pay.organizationName + "(" + pay.plan + ")"
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
        quantity: "1",
        sellingprice: price.price,
        amount: price.price, //||qamount
        baseunit: "",
        costprice: "",
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
      transactioncategory: "debit",
      source: patient.current.firstname + " " + patient.current.lastname,
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
    document.documentname = "Billed Orders"; //state.DocumentClassModule.selectedDocumentClass.name
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = patient.current._id;
    document.clientname =
      patient.current.firstname +
      " " +
      patient.current.middlename +
      " " +
      patient.current.lastname;
    document.clientobj = patient.current;
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
        order: element.name + " Plan", //name
        instruction: "",
        destination_name: document.facilityname, //facilityname
        destination: document.facility, //facility id
        order_status: "Billed",
        payer: "", //!!element.billMode.organizationName?element.billMode.organizationName:"",
        paymentmode: "", //element.billMode.paymentmode?element.billMode.paymentmode:"",

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
          name: element.name + " Plan",
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
      alert("aboutto create bill " + items.orderinfo.name);
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
          productItem.current = [];
          //setCalcAmount(0);
          const today = new Date().toLocaleString();
          //console.log(today)
          date.current = today;
          const invoiceNo = random(6, "uppernumeric");
          documentNo.current = invoiceNo;
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
  };

  useEffect(() => {
    getBenfittingPlans();
    createPaymentOption();

    return () => {};
  }, []);

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
                        <option value="Company">Company</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="field"
                  style={!showCorp ? { display: "none" } : {}}
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
                    {...register("x", { required: true })}
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
                      {...register("x", { required: true })}
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
                      {...register("x", { required: true })}
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
                      className="is-danger red-border is-small"
                      selected={date}
                      onChange={(date) => handleDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Enter date with dd/MM/yyyy format "
                      //isClearable
                      /* className="" */
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
                      {...register("x", { required: true })}
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
