import {yupResolver} from "@hookform/resolvers/yup";
import {FileUpload} from "@mui/icons-material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SaveIcon from "@mui/icons-material/Save";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import {Avatar, Box, Button, Grid, IconButton, Typography} from "@mui/material";
import axios from "axios";
import moment from "moment";
import {useContext, useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom"; //Route, Switch,Link, NavLink,
import {toast, ToastContainer} from "react-toastify";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CustomTable from "../../components/customtable";
import Input from "../../components/inputs/basic/Input/index";
import CustomSelect from "../../components/inputs/basic/Select";
import BasicDatePicker from "../../components/inputs/Date";
import MuiClearDatePicker from "../../components/inputs/Date/MuiClearDatePicker";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import ModalBox from "../../components/modal/";
import {FormsHeaderText} from "../../components/texts";
import FilterMenu from "../../components/utilities/FilterMenu";
import {ObjectContext, UserContext} from "../../context";
import client from "../../feathers";
import {TableMenu} from "../../ui/styled/global";
import {PageWrapper} from "../../ui/styled/styles";
import {HeadWrapper} from "../app/styles";
import ModalHeader from "../Appointment/ui-components/Heading/modalHeader";
import ClientGroup from "../Client/ClientGroup";
import {createClientSchema2} from "../Client/schema";
import {FileUploader} from "react-drag-drop-files";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PeopleIcon from "@mui/icons-material/People";

import {
  HmoFacilitySearch,
  OrgFacilitySearch,
  SponsorSearch,
} from "../helpers/FacilitySearch";
import {getBase64} from "../helpers/getBase64";
import Claims from "./ClientClaims";
import PremiumPayment from "./Premium";
import Provider, {OrganizationCreate} from "./Providers";
import {
  EnrolleSchema,
  EnrolleSchema2,
  EnrolleSchema3,
  EnrolleSchema4,
  EnrolleSchema5,
  principalData,
} from "./schema";
import {ProviderPrintout} from "./components/Printout";
import dayjs from "dayjs";
import {ClientSearch} from "../helpers/ClientSearch";
import {Nigeria} from "../app/Nigeria";
import {generateRandomString} from "../helpers/generateString";
const random = generateRandomString;
// eslint-disable-next-line
const searchfacility = {};

export default function ClientPolicy({standAlone}) {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [showModal, setShowModal] = useState(2);
  const [showModal2, setShowModal2] = useState(true);
  const [loading, setLoading] = useState(false);
  return (
    <section className="section remPadTop">
      {/*  {standAlone
        ? showModal === 0 && (
            <PolicyList
              showModal={showModal}
              setShowModal={setShowModal}
              standAlone={standAlone}
            />
          )
        : showModal === 0 && (
            <PolicyList showModal={showModal} setShowModal={setShowModal} />
          )}
      {showModal === 1 && (
        <PolicyCreate
          showModal={showModal}
          setShowModal={setShowModal}
          setOpenCreate={setShowModal2}
        />
      )}
      {showModal2 && (
        <ModalBox
          open={showModal2}
          onClose={() => {
            setShowModal(1);
            setShowModal2(false);
          }}
        >
          <ClientCreate
            closeModal={() => {
              console.log("hello world");
              setShowModal2(false);
              setShowModal(1);
            }}
          />
        </ModalBox>
      )}
      {showModal === 2 && <PolicyDetail setShowModal={setShowModal} />} */}
      <PolicyDetail setShowModal={setShowModal} />
    </section>
  );
}

export function PolicyList({showModal, setShowModal, standAlone}) {
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
  const {state, setState} = useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [display, setDisplay] = useState("approve");

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ManagedCareModule: newClientModule,
    }));
    //console.log(state)
    setShowModal(1);
    console.log("test");
  };

  const handleRow = async Client => {
    console.log(Client);
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ManagedCareModule: newClientModule,
    }));
    setShowModal(2);
  };

  const handleSearch = val => {
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
          {gender: val},
        ],

        organizationId: user.currentEmployee.facilityDetail._id, // || "",
        organization: user.currentEmployee.facilityDetail,
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    setLoading(true);
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
      await setFacilities(findClient.data);
      setLoading(false);
      console.log(findClient.data, user);
      /* }else{
             await setFacilities(prevstate=>prevstate.concat(findClient.data))
         } */

      await setTotal(findClient.total);
      //console.log(user.currentEmployee.facilityDetail._id, state)
      //console.log(facilities)
      setPage(page => page + 1);
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
        setLoading(false);
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
    ClientServ.on("created", obj => rest());
    ClientServ.on("updated", obj => rest());
    ClientServ.on("patched", obj => rest());
    ClientServ.on("removed", obj => rest());
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
      width: "60px",
    },
    {
      name: "Date Created",
      key: "createdAt",
      description: "Date Created",
      selector: row => dayjs(row.createdAt).format("DD-MM-YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: row => row.principal.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Middle Name",
      key: "middlename",
      description: "Middle Name",
      selector: row =>
        row.principal.middlename ? row.principal.middlename : "_______",
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Last Name",
      key: "principal",
      description: "Principal Last Name",
      selector: row => row.principal.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Phone",
      key: "phone",
      description: "Phone Number",
      selector: row => row.principal.phone,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },

    {
      name: "Email",
      key: "email",
      description: "simpa@email.com",
      selector: row => row.principal.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Policy Number",
      key: "policyNo",
      description: "Phone Number",
      selector: row => row.policyNo,
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    {
      name: "Sponsor Type",
      key: "sponsorshipType",
      description: "Sponsorship Type",
      selector: row => row.sponsorshipType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Plan",
      key: "plan",
      description: "Plan",
      selector: row => row?.plan?.planName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Premium",
      key: "premium",
      description: "Premium",
      selector: row =>
        row?.plan?.premiums?.map(p => {
          if (row?.planType === "Individual" && p.planType === "Individual") {
            return p?.premiumAmount;
          } else if (row?.planType === "Family" && p.planType === "Family") {
            return p?.premiumAmount;
          }
        }),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Paid",
      key: "isPaid",
      description: "Paid",
      selector: row => (row.isPaid ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Active",
      key: "active",
      description: "Active",
      selector: row => (row.active ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const approvedFacilities = facilities.filter(
    facility => facility.approved === true
  );
  const pendingFacilities = facilities.filter(
    facility => facility.approved === false
  );

  // const approvedSelectedpol = approvedFacilities.filter(
  //   (item) =>
  //     item?.principal._id === standAlone ||
  //     (item?.dependantBeneficiaries.length > 0 &&
  //       item?.dependantBeneficiaries?.map((item) => item._id === standAlone))
  // );
  // const pendingSelectedpol = pendingFacilities.filter(
  //   (item) =>
  //     item?.principal._id === standAlone ||
  //     (item?.dependantBeneficiaries.length > 0 &&
  //       item?.dependantBeneficiaries?.map((item) => item._id === standAlone))
  // );

  // const renderFAcilities = () => {
  //   switch (display) {
  //     case 'approve':
  //       if (standAlone) {
  //         return approvedSelectedpol;
  //       } else {
  //         return approvedFacilities;
  //       }
  //     case 'pending':
  //       if (standAlone) {
  //         return pendingSelectedpol;
  //       } else {
  //         return pendingFacilities;
  //       }
  //     default:
  //       return [];
  //   }
  // };

  console.log(user, "ID", standAlone);
  return (
    <>
      <div className="level">
        <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
          <TableMenu>
            <div style={{display: "flex", alignItems: "center"}}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                List of {display === "approve" ? "Approved" : "Pending"}{" "}
                Policies
              </h2>
            </div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <GlobalCustomButton
                text={
                  display === "approve"
                    ? "Pending Policies"
                    : "Approved Policies"
                }
                onClick={() =>
                  setDisplay(display === "approve" ? "pending" : "approve")
                }
                customStyles={{
                  marginRight: "10px",
                }}
                color={display === "approve" ? "warning" : "success"}
              />

              {!standAlone && (
                <Button
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{textTransform: "capitalize"}}
                  onClick={handleCreateNew}
                  showicon={true}
                >
                  {" "}
                  Add New
                </Button>
              )}
            </Box>
          </TableMenu>
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
              data={
                display === "approve" ? approvedFacilities : pendingFacilities
              }
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
              CustomEmptyData={
                display === "approve"
                  ? "No Approved Policies"
                  : "No Pending Policies"
              }
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
}

export function PolicyCreate({showModal, setShowModal, setOpenCreate}) {
  const {register, handleSubmit, setValue, getValues, reset, control} =
    useForm();
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
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
  const [chosen, setChosen] = useState([]);
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
  const ServicesServ = client.service("healthplan");
  const policyServ = client.service("policy");
  const BillCreateServ = client.service("createbilldirect");
  const orgServ = client.service("organizationclient");
  const [facilities, setFacilities] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [billMode, setBillMode] = useState("");
  const [obj, setObj] = useState("");
  const [paymentmode, setPaymentMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [createOrg, setCreateOrg] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hmo, setHmo] = useState({});
  const [subSponsor, setSubSponsor] = useState("");
  const [healthplan, setHealthplan] = useState([]);
  const [planType, setPlanType] = useState("");
  const [indiPremium, setIndiPremium] = useState("");
  const [famPremium, setFamPremium] = useState("");
  const [indiDuration, setIndiDuration] = useState("");
  const [famDuration, setFamDuration] = useState("");
  const [familyModal, setFamilyModal] = useState(false);
  const [multipleModal, setMultipleModal] = useState(false); //Multiple Individuals
  const [providers, setProviders] = useState([]);
  // const [organizationName, setOrganizationName] = useState('');
  // const [organizationId, setOrganizationId] = useState('');

  const getSearchfacility = async obj => {
    if (
      // check if obj is an object
      obj && // check if obj is not null
      Object.keys(obj).length > 0 && // check if obj is not empty
      obj.constructor === Object &&
      // check if the obj is already present in the array
      !chosen.some(el => el._id === obj._id)
    ) {
      await setChosen([...chosen, obj]);
      await console.log("OBJ", chosen);
    }
  };

  const getSearchfacility1 = obj => {
    setPlanHMO(obj);
    if (!obj) {
    }
  };
  const getSearchHmo = obj => {
    setHmo(obj[0]);
    if (!obj) {
    }
  };

  const handleChangeMode = async mode => {
    setMessage(mode);
    if (mode === "Company") {
      setShowCorp(true);
    } else {
      setShowCorp(false);
    }
    let billm = paymentOptions.filter(el => el.name === mode);
    await setBillMode(billm[0]);
    console.log(billm);
  };

  const handleChangePlan = async value => {
    console.log(value);
    setSelectedPlan(value);
    if (value === "") {
      setPrice("");
      return;
    }
    console.log(benefittingPlans1);
    let cplan = healthplan.filter(el => el.planName === value);
    console.log(cplan);
    setChosenPlan(cplan[0]);
    let contract = cplan[0]?.premiums[0]?.familyPremium;
    cplan[0]?.premiums.map(el => {
      if (el.planType === "Individual") {
        setIndiPremium(el?.premiumAmount);
        setIndiDuration(el?.premiumDuration);
      }
      if (el.planType === "Family") {
        setFamPremium(el?.premiumAmount);
        setFamDuration(el?.premiumDuration);
      }
    });
  };
  console.log("price", price);
  const handleClickProd = () => {
    setState(prevstate => ({...prevstate, currBeneficiary: "principal"}));
    setDependant("principal");
    console.log(state.Beneficiary);
    //setClientModal(true);
    setOpenCreate(true);
  };
  const handleClickProd2 = () => {
    setState(prevstate => ({...prevstate, currBeneficiary: "dependent"}));
    setDependant("dependent");
    setOpenCreate(true);
  };

  //FOR MULTIPLE INDIVIDUALS
  const handleClickProd3 = () => {
    setState(prev => ({
      ...prev,
      currBeneficiary: "multiple_individuals",
    }));
    setOpenCreate(true);
  };

  const handleRow = Client => {
    //domething o
  };

  const handlecloseModal4 = () => {
    setClientModal(false);
    console.log(state.Beneficiary);
  };

  const onSubmit = async (data, doc) => {
    //return console.log
    // e.preventDefault();
    if (!state.Beneficiary.principal._id) {
      toast.warning("Please add principal! ");

      return;
    }
    showActionLoader();
    // generate a unique policy number where the year is the lat 2 digits of the year, plan type is a single digit, organization type is a single digit,
    //organizationId is a system generated 6 digit that should not be repeated, and the last 1 digit is the sponsor type
    // 1 - individual, 2 - corporate, 3 - group
    // 1 - HMO, 2 - PPO, 3 - EPO
    const year = new Date().getFullYear().toString().slice(-2);
    const planType1 = selectedPlan?.charAt(0);
    const orgType = data?.sponsortype === "Self" ? 1 : 2;
    const orgId = Math.floor(100000 + Math.random() * 900000);
    const familyCode =
      state.Beneficiary.principal._id && !state.Beneficiary.dependent._id
        ? "-1"
        : state.Beneficiary.dependent.length + 1;
    const policyNo = `${year}${planType1}${orgType}${orgId}${familyCode}`;
    console.log(policyNo);

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }

    let confirm = window.confirm(
      `You are about to register a new policy ${policyNo} ?`
    );
    console.log(user);
    if (confirm) {
      let policy = {
        policyNo: policyNo,
        organizationType:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail.facilityType
            : hmo.facilityType,
        organizationId:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail._id
            : hmo._id,
        organizationName:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail.facilityName
            : hmo.facilityName,
        organization:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail
            : hmo,
        principal: state.Beneficiary.principal, //
        dependantBeneficiaries: state.Beneficiary.dependent,
        providers: chosen,
        sponsorshipType: data.sponsortype,
        sponsor: planHMO,
        plan: chosenPlan,
        planType: planType,
        premium: price.price,
        premiumContract: price,
        active: false,
        isPaid: false,
        approved: false,
        statushx: [
          {
            date: new Date(),
            employeename: `${user.currentEmployee.firstname} ${user.currentEmployee.lastname}`,
            employeeId: user.currentEmployee._id,
            status: "Policy Created",
          },
        ],
      };
      console.log("POLICY", policy);
      await policyServ
        .create(policy)
        .then(res => {
          hideActionLoader();
          console.log(
            "facilityId",
            user.currentEmployee.facilityDetail._id,
            "response",
            res
          );
          setSuccess(true);
          toast.success("Client created succesfully");
          setSuccess(false);
          setState(prev => ({
            ...prev,
            Beneficiary: {
              ...prev.Beneficiary,
              principal: {},
              dependant: [],
            },
          }));
        })
        .then(async res => {
          await setShowModal(0);
        })
        .catch(err => {
          hideActionLoader();
          toast.error("Error creating Client " + err);
        });
    }
  };
  const getBenfittingPlans = async () => {
    setBenefittingPlans1([]);
    if (user.currentEmployee?.facilityDetail.facilityType === "HMO") {
      const findServices = await ServicesServ.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          // 'contracts.source_org': user.currentEmployee.facilityDetail._id,
          // 'contracts.dest_org': user.currentEmployee.facilityDetail._id,
          // category: 'Managed Care',
          $sort: {
            category: 1,
          },
        },
      });
      console.log(findServices.data);
      const data = findServices.data;
      if (data.length > 0) {
        setHealthplan(data);
        // map the array for all the planName
        const planName = data.map(plan => plan.planName);
        console.log("test", planName);
        setBenefittingPlans1(planName);
      }
    } else if (hmo) {
      const findServices = await ServicesServ.find({
        query: {
          organizationId: hmo?._id,
          $sort: {
            category: 1,
          },
        },
      });
      console.log(findServices.data);
      const data = findServices.data;
      if (findServices.length > 0) {
        // map the array for all the planName
        const planName = data.map(plan => plan.planName);
        setBenefittingPlans1(planName);
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
  const createObj = (pay, name, cover, type) => {
    let details = {};
    details = {...pay};
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
  const handleSearch = async value => {
    if (value === "") {
      await setFacilities([]);
      return;
    }
    if (value.length >= 3) {
      orgServ
        .find({
          query: {
            $search: value,
            relationshiptype: "managedcare",
            facility: user.currentEmployee.facilityDetail._id,
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then(res => {
          setFacilities(res.data);
        })
        .catch(err => {
          toast.error(`Error creating Service due to ${err}`);
        });
    } else {
      await setFacilities([]);
    }
  };

  useEffect(() => {
    getBenfittingPlans();
    createPaymentOption();

    // getFacility();

    return () => {};
  }, [hmo, user]);

  const providerColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Facility Name",
      key: "facilityname",
      description: "Facility Name",
      selector: row => row?.organizationDetail?.facilityName,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Facility Address",
      key: "facilityaddress",
      description: "Facility Address",
      selector: row => row?.organizationDetail?.facilityAddress,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Facility City",
      key: "facilitycity",
      description: "Facility City",
      selector: row => row?.organizationDetail?.facilityCity,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Facility Phone",
      key: "facilityphone",
      description: "Facility Phone",
      selector: row => row?.organizationDetail?.facilityContactPhone,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Facility Type",
      key: "facilitytype",
      description: "Facility Type",
      selector: row => row?.organizationDetail?.facilityType,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Facility Category",
      key: "facilitycategory",
      description: "Facility Category",
      selector: row => row?.organizationDetail?.facilityCategory,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Del",
      width: "50px",
      center: true,
      key: "contact_email",
      description: "Enter Date",
      selector: row => (
        <IconButton
          onClick={() => {
            setProviders(providers.filter(item => item._id !== row._id));
          }}
          color="error"
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];

  console.log("==================", benefittingPlans1);

  useEffect(() => {
    hideActionLoader();
  }, []);

  const handleFamilyCreate = async data => {
    //return console.log(providers);

    if (!state.Beneficiary.principal._id)
      return toast.warning("Please add principal! ");

    //showActionLoader();
    //e.preventDefault();
    // generate a unique policy number where the year is the lat 2 digits of the year, plan type is a single digit, organization type is a single digit,
    //organizationId is a system generated 6 digit that should not be repeated, and the last 1 digit is the sponsor type
    // 1 - individual, 2 - corporate, 3 - group
    // 1 - HMO, 2 - PPO, 3 - EPO
    const year = new Date().getFullYear().toString().slice(-2);
    const planType1 = selectedPlan?.charAt(0);
    const orgType = data?.sponsortype === "Self" ? 1 : 2;
    const orgId = Math.floor(100000 + Math.random() * 900000);
    const familyCode =
      state.Beneficiary.principal._id && !state.Beneficiary.dependent._id
        ? "-1"
        : state.Beneficiary.dependent.length + 1;
    const policyNo = `${year}${planType1}${orgType}${orgId}`;
    console.log(policyNo);

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }

    let confirm = window.confirm(
      `You are about to register a new policy ${policyNo} ?`
    );
    console.log(user);
    if (confirm) {
      let policy = {
        policyNo: policyNo,
        organizationType:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail.facilityType
            : hmo.facilityType,
        organizationId:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail._id
            : hmo._id,
        organizationName:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail.facilityName
            : hmo.facilityName,
        organization:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail
            : hmo,
        principal: {...state.Beneficiary.principal, policyNo: policyNo}, //
        dependantBeneficiaries: state.Beneficiary.dependent.map((item, i) => {
          return {
            ...item,
            policyNo: `${policyNo}-${i + 1}`,
          };
        }),
        providers: providers,
        sponsorshipType: data.sponsortype,
        sponsor: planHMO,
        plan: chosenPlan,
        planType: planType,
        premium: price.price,
        premiumContract: price,
        active: false,
        isPaid: false,
        approved: false,
        statushx: [
          {
            date: new Date(),
            employeename: `${user.currentEmployee.firstname} ${user.currentEmployee.lastname}`,
            employeeId: user.currentEmployee._id,
            status: "Policy Created",
          },
        ],
      };
      // console.log("POLICY", policy);

      //return console.log(policy);

      setState(prev => ({
        ...prev,
        Beneficiary: {
          ...prev.Beneficiary,
          familyPolicies: [policy, ...prev.Beneficiary.familyPolicies],
          principal: {},
          dependent: [],
        },
      }));

      setProviders([]);

      return toast.success(
        `Policy with Policy Number - ${policyNo} added to list`
      );
    }
  };

  const handleAddIndividualPolicy = async data => {
    //return console.log(providers);

    if (!state.Beneficiary.principal._id)
      return toast.warning("Please add principal! ");

    //showActionLoader();
    //e.preventDefault();
    // generate a unique policy number where the year is the lat 2 digits of the year, plan type is a single digit, organization type is a single digit,
    //organizationId is a system generated 6 digit that should not be repeated, and the last 1 digit is the sponsor type
    // 1 - individual, 2 - corporate, 3 - group
    // 1 - HMO, 2 - PPO, 3 - EPO
    const year = new Date().getFullYear().toString().slice(-2);
    const planType1 = selectedPlan?.charAt(0);
    const orgType = data?.sponsortype === "Self" ? 1 : 2;
    const orgId = Math.floor(100000 + Math.random() * 900000);
    const familyCode =
      state.Beneficiary.principal._id && !state.Beneficiary.dependent._id
        ? "-1"
        : state.Beneficiary.dependent.length + 1;
    const policyNo = `${year}${planType1}${orgType}${orgId}`;
    console.log(policyNo);

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }

    let confirm = window.confirm(
      `You are about to register a new policy ${policyNo} ?`
    );
    console.log(user);
    if (confirm) {
      let policy = {
        policyNo: policyNo,
        organizationType:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail.facilityType
            : hmo.facilityType,
        organizationId:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail._id
            : hmo._id,
        organizationName:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail.facilityName
            : hmo.facilityName,
        organization:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? user.currentEmployee.facilityDetail
            : hmo,
        principal: {...state.Beneficiary.principal, policyNo: policyNo}, //
        dependantBeneficiaries: state.Beneficiary.dependent.map((item, i) => {
          return {
            ...item,
            policyNo: `${policyNo}-${i + 1}`,
          };
        }),
        providers: providers,
        sponsorshipType: data.sponsortype,
        sponsor: planHMO,
        plan: chosenPlan,
        planType: planType,
        premium: price.price,
        premiumContract: price,
        active: false,
        isPaid: false,
        approved: false,
        statushx: [
          {
            date: new Date(),
            employeename: `${user.currentEmployee.firstname} ${user.currentEmployee.lastname}`,
            employeeId: user.currentEmployee._id,
            status: "Policy Created",
          },
        ],
      };
      // console.log("POLICY", policy);

      //return console.log(policy);

      setState(prev => ({
        ...prev,
        Beneficiary: {
          ...prev.Beneficiary,
          individualPolicies: [policy, ...prev.Beneficiary.individualPolicies],
          principal: {},
          dependent: [],
        },
      }));

      setProviders([]);

      return toast.success(
        `Policy with Policy Number - ${policyNo} added to list`
      );
    }
  };

  // console.log(
  //   "hello world from the other side",
  //   state.Beneficiary.familyPolicies
  // );

  const createPolicy = async policy => {
    await policyServ.create(policy);
  };

  const handleSave = async () => {
    showActionLoader();
    const familyPolicies = state.Beneficiary.familyPolicies;
    const individualPolicies = state.Beneficiary.individualPolicies;

    const allPolicies = [...familyPolicies, ...individualPolicies];

    const promises = allPolicies.map(async doc => {
      await createPolicy(doc);
    });

    await Promise.all(promises);

    hideActionLoader();

    toast.success(
      `You have successfully created ${allPolicies.length} Policies`
    );

    setState(prev => ({
      ...prev,
      Beneficiary: {
        ...prev.Beneficiary,
        familyPolicies: [],
        individualPolicies: [],
      },
    }));
  };

  return (
    <>
      <div
        className="card "
        style={{
          height: "88vh",
          overflowY: "scroll",
          width: "98%",
          margin: "0 1rem",
        }}
      >
        <ModalBox
          open={familyModal}
          onClose={() => {
            setFamilyModal(false);
            setProviders([]);
            setState(prev => ({
              ...prev,
              Beneficiary: {
                ...prev.Beneficiary,
                principal: {},
                dependent: [],
              },
            }));
          }}
          header="Create Policy For Family"
        >
          <AddFamilyToPolicy
            addPrincipal={handleClickProd}
            addDependent={handleClickProd2}
            createPolicy={handleSubmit(handleFamilyCreate)}
            providers={providers}
            setProviders={setProviders}
            providerColumns={providerColumns}
          />
        </ModalBox>

        <ModalBox
          open={multipleModal}
          onClose={() => setMultipleModal(false)}
          header="Create Policy For Individuals"
        >
          <AddMulipleIndividualPolicy
            addIndividual={handleClickProd}
            providers={providers}
            setProviders={setProviders}
            providerColumns={providerColumns}
            createPolicy={handleSubmit(handleAddIndividualPolicy)}
          />
        </ModalBox>
        <form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormsHeaderText text={"Policy Create"} />
            <Box sx={{display: "flex", alignItems: "center"}}>
              <GlobalCustomButton
                text={"Back"}
                color="warning"
                onClick={() => {
                  setShowModal(0);
                  setState(prev => ({
                    ...prev,
                    Beneficiary: {
                      ...prev.Beneficiary,
                      principal: {},
                      dependent: [],
                      individuals: [],
                      familyPolicies: [],
                      individualPolicies: [],
                    },
                  }));
                }}
                customStyles={{marginRight: ".5rem"}}
              />
              <GlobalCustomButton
                text={"Save"}
                color="success"
                customStyles={{marginRight: ".5rem"}}
                onClick={handleSave}
              />
            </Box>
          </Box>

          <Grid container spacing={2} mt={2}>
            <Grid item md={12} sx={{display: "flex"}}>
              <Box style={{marginRight: "1rem", fontSize: ".8rem"}}>
                <input
                  type="radio"
                  name="sponsortype"
                  {...register("sponsortype", {required: true})}
                  value="Self"
                  onChange={e => handleChangeMode(e.target.value)}
                  style={{marginRight: ".5rem"}}
                />
                <label>Self</label>
              </Box>
              <Box style={{fontSize: ".8rem"}}>
                <input
                  type="radio"
                  name="sponsortype"
                  {...register("sponsortype", {required: true})}
                  value="Company"
                  onChange={e => handleChangeMode(e.target.value)}
                  style={{marginRight: ".5rem"}}
                />
                <label>Company</label>
              </Box>
            </Grid>

            <Grid item md={4}>
              <CustomSelect
                name="plan"
                label="Plan Type"
                options={[
                  {value: "Individual", label: "Individual"},
                  {value: "Family", label: "Family"},
                ]}
                required
                important
                // control={control}
                onChange={e => setPlanType(e.target.value)}
              />
            </Grid>

            {showCorp && (
              <Grid item md={4}>
                <CustomSelect
                  name="plan"
                  label="Sponsor Type"
                  options={[
                    {
                      value: "Large Enterprise",
                      label: "Large Enterprise",
                    },
                    {
                      value: "Medium Enterprise",
                      label: "Medium Enterprise",
                    },
                    {value: "SME", label: "SME"},
                    {value: "Association", label: "Association"},
                    {value: "Multinational", label: "Multinational"},
                  ]}
                  required
                  important
                  // control={control}
                  onChange={e => setSubSponsor(e.target.value)}
                />
              </Grid>
            )}

            {showCorp && (
              <Grid item md={4}>
                <SponsorSearch
                  getSearchfacility={getSearchfacility1}
                  clear={success}
                />
              </Grid>
            )}
            {user.currentEmployee.facilityDetail.facilityType !== "HMO" && (
              <Grid item md={4}>
                <HmoFacilitySearch
                  getSearchfacility={getSearchHmo}
                  clear={success}
                />
              </Grid>
            )}
            <Grid item md={4}>
              <CustomSelect
                name="plan"
                label="Choose Plan"
                options={benefittingPlans1}
                required
                important
                // control={control}
                onChange={(e, i) => handleChangePlan(e.target.value)}
              />
            </Grid>
            {planType === "Individual" && (
              <>
                <Grid item md={4}>
                  <Input
                    value={indiPremium}
                    disabled
                    label="Individual Price"
                  />
                </Grid>
                <Grid item md={4}>
                  <Input
                    value={indiDuration}
                    disabled
                    label="Individual Premium Duration"
                  />
                </Grid>
              </>
            )}
            {planType === "Family" && (
              <>
                <Grid item md={4}>
                  <Input value={famPremium} disabled label="Family Price" />
                </Grid>
                <Grid item md={4}>
                  <Input
                    value={famDuration}
                    disabled
                    label="Family Premium Duration"
                  />
                </Grid>
              </>
            )}
            {/* <Grid item md={6}>
              <MuiCustomDatePicker
                label="Start Date"
                control={control}
                name="start_date"
              />
            </Grid>
            <Grid item md={6}>
              <MuiCustomDatePicker
                name="end_date"
                label="End Date"
                control={control}
              />
            </Grid> */}
          </Grid>

          <Box
            style={{
              // height: '50vh',
              overflowY: "scroll",
              width: "100%",
            }}
          >
            {/* <Grid container spacing={2} my={1}>
              <Grid item md={3}>
                <FormsHeaderText text={"Selected Provider"} />
              </Grid>
              <Grid item md={4}>
                <OrgFacilitySearch
                  getSearchfacility={getSearchfacility}
                  clear={success}
                />
              </Grid>
            </Grid> */}

            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              mt={2}
              gap={2}
            >
              <FormsHeaderText text={"Search and Select Provider(s)"} />
              <Box>
                <OrgFacilitySearch
                  getSearchfacility={getSearchfacility}
                  clear={success}
                />
              </Box>

              <Box>
                {" "}
                <CustomTable
                  title={""}
                  columns={OrgFacilitySchema}
                  data={chosen?.filter(item => item !== null)}
                  pointerOnHover
                  highlightOnHover
                  striped
                  CustomEmptyData={
                    <Typography sx={{fontSize: "0.85rem"}}>
                      No provider added yet...
                    </Typography>
                  }
                  progressPending={loading}
                />
              </Box>
            </Box> */}

            {/* {chosen?.length > 0 && ( */}

            {/* )} */}
          </Box>

          <Box sx={{float: "left", width: "100%"}} mt={2} mb={2}>
            {planType && planType.toLowerCase() === "individual" && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                }}
              >
                <GlobalCustomButton onClick={() => setMultipleModal(true)}>
                  <AddIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Add An Individual
                </GlobalCustomButton>

                {/* <GlobalCustomButton
                  onClick={() => setMultipleModal(true)}
                  color="secondary"
                >
                  <AddIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Add Multiple Individuals
                </GlobalCustomButton> */}
              </Box>
            )}

            {planType && planType.toLowerCase() !== "individual" && (
              <GlobalCustomButton onClick={() => setFamilyModal(true)}>
                <AddIcon fontSize="small" sx={{marginRight: "5px"}} /> Add
                Family
              </GlobalCustomButton>
            )}

            {/* {!state.Beneficiary?.principal._id && (
              <p>
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
                  type="button"
                >
                  +
                </button>
              </p>
            )}
            {planType !== "Individual" && (
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
                  type="button"
                >
                  +
                </button>
								dependantBeneficiaries
              </p>
            )} */}
          </Box>

          <Box>
            {state.Beneficiary.familyPolicies.length > 0 && (
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormsHeaderText text="List of Family Policies" />
                </Box>

                {state.Beneficiary.familyPolicies.map(policy => {
                  return (
                    <Box>
                      <Box>
                        <FormsHeaderText text={"Principal"} />
                        <CustomTable
                          title={""}
                          columns={EnrolleSchema}
                          data={[policy.principal]}
                          pointerOnHover
                          highlightOnHover
                          striped
                          // onRowClicked={() =>
                          //   handleRow(state.Beneficiary?.principal)
                          // }
                          progressPending={false}
                        />
                      </Box>

                      {policy.dependantBeneficiaries.length > 0 && (
                        <Box>
                          <FormsHeaderText text={"Dependant(s)"} />
                          <CustomTable
                            title={""}
                            columns={EnrolleSchema2}
                            data={policy.dependantBeneficiaries}
                            pointerOnHover
                            highlightOnHover
                            striped
                            onRowClicked={() => handleRow()}
                            progressPending={loading}
                          />
                        </Box>
                      )}

                      {policy.providers.length > 0 && (
                        <Box>
                          <FormsHeaderText text={"Provider(s)"} />
                          <CustomTable
                            title={""}
                            columns={providerColumns}
                            data={policy.providers?.filter(
                              item => item !== null
                            )}
                            pointerOnHover
                            highlightOnHover
                            striped
                            CustomEmptyData={
                              <Typography sx={{fontSize: "0.85rem"}}>
                                No provider added yet...
                              </Typography>
                            }
                            progressPending={loading}
                          />
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>

          <Box>
            {state.Beneficiary.individualPolicies.length > 0 && (
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormsHeaderText text="List of Individual Policies" />
                </Box>

                {state.Beneficiary.individualPolicies.map(policy => {
                  return (
                    <Box>
                      <Box>
                        <FormsHeaderText text={"Principal"} />
                        <CustomTable
                          title={""}
                          columns={EnrolleSchema}
                          data={[policy.principal]}
                          pointerOnHover
                          highlightOnHover
                          striped
                          // onRowClicked={() =>
                          //   handleRow(state.Beneficiary?.principal)
                          // }
                          progressPending={false}
                        />
                      </Box>

                      {policy.providers.length > 0 && (
                        <Box>
                          <FormsHeaderText text={"Provider(s)"} />
                          <CustomTable
                            title={""}
                            columns={providerColumns}
                            data={policy.providers?.filter(
                              item => item !== null
                            )}
                            pointerOnHover
                            highlightOnHover
                            striped
                            CustomEmptyData={
                              <Typography sx={{fontSize: "0.85rem"}}>
                                No provider added yet...
                              </Typography>
                            }
                            progressPending={loading}
                          />
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* <Grid container spacing={2} mt={2}>
            <Grid item md={12}>
              {state?.Beneficiary?.principal?._id && (
                <>
                  <FormsHeaderText text={"Principal"} />
                  <CustomTable
                    title={""}
                    columns={EnrolleSchema}
                    data={[state?.Beneficiary?.principal]}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={() => handleRow(state.Beneficiary?.principal)}
                    progressPending={loading}
                  />
                </>
              )}
            </Grid>

            <Grid item md={12}>
              {state?.Beneficiary?.dependent?.length > 0 && (
                <>
                  <FormsHeaderText text={"Dependant"} />
                  <CustomTable
                    title={""}
                    columns={EnrolleSchema2}
                    data={state?.Beneficiary?.dependent}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={() => handleRow()}
                    progressPending={loading}
                  />
                </>
              )}
            </Grid>
          </Grid> */}
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
const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px dashed gray",
        cursor: "pointer",
      }}
    >
      <FileUploadOutlinedIcon />
      <Typography
        sx={{
          fontSize: "10px",
        }}
      >
        Select Logo Image or Drag and Drop here
      </Typography>
    </Box>
  );
};

export function ClientCreate({closeModal}) {
  //, watch, errors, reset
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
  const [billModal, setBillModal] = useState(false);
  const [patList, setPatList] = useState([]);
  const [dependant, setDependant] = useState(false);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [showdept, setShowdept] = useState(false);
  const [isFullRegistration, setFullRegistration] = useState(false);
  const data = localStorage.getItem("user");
  const [duplicateModal, setDuplicateModal] = useState(false);
  const [file, setFile] = useState(null);
  const [openDp, setOpenDp] = useState(false);
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const user = JSON.parse(data);
  const [organizationName, setOrganizationName] = useState();
  const [addType, setAddType] = useState(false);
  const [clearClientSearch, setClearClientSearch] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    watch,
    formState: {isSubmitSuccessful, errors},
  } = useForm({
    resolver: yupResolver(createClientSchema2),

    defaultValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      dob: "",
      phone: "",
      email: "",
      facility: user.currentEmployee.facility,
    },
  });

  const [selectedState, setSelectedState] = useState(null);

  const states = Nigeria.map(obj => obj.state);

  //alphabetically arrange state
  const sortedStates = states.sort((a, b) => a.localeCompare(b));

  const watchedState = watch("state");

  useEffect(() => {
    setSelectedState(Nigeria.find(item => item.state === watchedState));
    setValue("facilityCity", "");
    setValue("facilityLGA", "");
  }, [watchedState]);

  // eslint-disable-next-line
  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDate = async date => {
    setDate(date);
  };
  // useEffect(() => {
  //   setCurrentUser(user);
  //   return () => {};
  // }, [user]);

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

  const checkQuery = query => {
    setPatList([]);
    if (
      !(
        query &&
        Object.keys(query).length === 0 &&
        query.constructor === Object
      )
    ) {
      ClientServ.find({query: query})
        .then(res => {
          console.log(res);
          if (res.total > 0) {
            // alert(res.total)
            setPatList(res.data);
            setBillModal(true);
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const dupl = client => {
    toast({
      message: "Client previously registered in this facility",
      type: "is-danger",
      dismissible: true,
      pauseOnHover: true,
    });
    reset();
    setPatList([]);
  };
  const reg = async client => {
    if (
      client.relatedfacilities.findIndex(
        el => el.facility === user.currentEmployee.facilityDetail._id
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
        });
    }
    //reset form
    reset();
    setPatList([]);
    //cash payment
  };
  const depen = client => {
    setDependant(true);
  };

  const handleChange = file => {
    //console.log(file);
    getBase64(file)
      .then(res => {
        //console.log(res);
        setFile(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // ****************************************************************************
  const onSubmit = async (data, e) => {
    // if (!date) {
    //   toast.warning("Please enter Date of Birth!");
    //   return;
    // }

    showActionLoader();

    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    checkClient();
    if (patList.length > 0) {
      if (!dependant) {
        return;
      }
      setPatList([]);
    }
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    let confirm = window.confirm(
      `You are about to register a new client ${data.firstname}  ${data.middlename} ${data.lastname} ?`
    );
    if (confirm) {
      const token = localStorage.getItem("feathers-jwt");
      if (file) {
        axios
          .post(
            "https://hsbackend.azurewebsites.net/upload",
            {uri: file},
            {headers: {Authorization: `Bearer ${token}`}}
          )
          .then(async res => {
            const imageUrl = res.data.url;
            //data.dob = date;
            const defaultEmail = `${data.firstname}-${data.lastname}-${dayjs(
              data.dob
            ).format("DD/MM/YYY")}@healthstack.africa`;

            const clientData = {
              ...data,
              email: data.email || defaultEmail,
              imageurl: imageUrl,
            };

            // data.imageurl = imageUrl;

            await ClientServ.create(clientData)
              .then(res => {
                hideActionLoader();
                setSuccess(true);
                toast.success("Client created succesfully");
                setSuccess(false);
                setPatList([]);
                setDependant(false);
                setDate();
                reset();
                // let newBeneficiaryModule = {};
                if (state.currBeneficiary === "principal") {
                  res.type = "principal";
                  setState(prev => ({
                    ...prev,
                    Beneficiary: {
                      ...prev.Beneficiary,
                      principal: res,
                    },
                  }));
                }
                if (state.currBeneficiary === "dependent") {
                  res.type = "dependent";
                  setState(prev => ({
                    ...prev,
                    Beneficiary: {
                      ...prev.Beneficiary,
                      dependent: [...state.Beneficiary.dependent, res],
                    },
                  }));
                }
                // if (state.currBeneficiary === "multiple_individuals") {
                //   res.type = "principal";
                //   newBeneficiaryModule = {
                //     principal: state.Beneficiary.principal,
                //     dependent: state.Beneficiary.dependent,
                //     others: state.Beneficiary.others,
                //     individuals: [...state.Beneficiary.individuals, res],
                //     show: "create",
                //   };
                // }
                // setState(prevstate => ({
                //   ...prevstate,
                //   Beneficiary: newBeneficiaryModule,
                // }));
              })
              .catch(err => {
                hideActionLoader();
                toast.error("Error creating Client " + err);
                setPatList([]);
                setDependant(false);
              });
          });
      } else {
        //data.dob = date;
        const defaultEmail = `${data.firstname}-${data.lastname}-${dayjs(
          data.dob
        ).format("DD/MM/YYY")}@healthstack.africa`;

        const clientData = {
          ...data,
          email: data.email || defaultEmail,
        };

        await ClientServ.create(clientData)
          .then(res => {
            hideActionLoader();
            setSuccess(true);
            toast.success("Client created succesfully");
            setSuccess(false);
            setPatList([]);
            setDependant(false);
            setDate();
            reset();

            if (state.currBeneficiary === "principal") {
              res.type = "principal";
              setState(prev => ({
                ...prev,
                Beneficiary: {
                  ...prev.Beneficiary,
                  principal: res,
                },
              }));
            }
            if (state.currBeneficiary === "dependent") {
              res.type = "dependent";
              setState(prev => ({
                ...prev,
                Beneficiary: {
                  ...prev.Beneficiary,
                  dependent: [...state.Beneficiary.dependent, res],
                },
              }));
            }
          })
          .catch(err => {
            hideActionLoader();
            toast.error("Error creating Client " + err);
            setPatList([]);
            setDependant(false);
          });
      }
    }
  };

  const handleSelectClient = client => {
    //let newBeneficiaryModule = {};
    if (state.currBeneficiary === "principal") {
      client.type = "principal";
      setState(prev => ({
        ...prev,
        Beneficiary: {
          ...prev.Beneficiary,
          principal: client,
        },
      }));
    }
    if (state.currBeneficiary === "dependent") {
      client.type = "dependent";
      setState(prev => ({
        ...prev,
        Beneficiary: {
          ...prev.Beneficiary,
          dependent: [...state.Beneficiary.dependent, client],
        },
      }));
    }

    setClearClientSearch(true);
    setClearClientSearch(false);
    closeModal();
  };

  return (
    <>
      <ModalBox
        open={duplicateModal}
        onClose={() => setDuplicateModal(false)}
        header="Client With Similar Information already Exist"
      >
        <ClientGroup
          list={patList}
          closeModal={() => setDuplicateModal(false)}
          //choosen={choosen}
          dupl={dupl}
          reg={reg}
          depen={depen}
        />
      </ModalBox>

      <Box mb={2}>
        <PageWrapper>
          <ClientSearch
            getSearchfacility={handleSelectClient}
            clear={setClearClientSearch}
          />
        </PageWrapper>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer theme="colored" />
        <PageWrapper>
          <div>
            <HeadWrapper>
              <div>
                <h2>{`${
                  isFullRegistration
                    ? "Full Client Registeration"
                    : "Quick Client Registeration"
                }`}</h2>
                {/* <span>
                Create a New client by filling out the form below to get
                started.
              </span> */}
              </div>

              {isFullRegistration ? (
                <GlobalCustomButton onClick={() => setFullRegistration(false)}>
                  <ElectricBoltIcon
                    fontSize="small"
                    sx={{marginRight: "5px"}}
                  />
                  Quick Registration
                </GlobalCustomButton>
              ) : (
                <GlobalCustomButton onClick={() => setFullRegistration(true)}>
                  <OpenInFullIcon fontSize="small" sx={{marginRight: "5px"}} />
                  Full Registration
                </GlobalCustomButton>
              )}
            </HeadWrapper>

            <ToastContainer theme="colored" />

            {!isFullRegistration ? (
              <>
                <Box sx={{width: "85vw", maxHeight: "80vh"}}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="First Name"
                        register={register("firstname")}
                        errorText={errors?.firstname?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Middle Name"
                        register={register("middlename")}
                        errorText={errors?.middlename?.message}
                        onBlur={checkClient}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Last Name"
                        register={register("lastname")}
                        errorText={errors?.lastname?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Phone"
                        register={register("phone")}
                        type="tel"
                        errorText={errors?.phone?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Email"
                        register={register("email")}
                        type="email"
                        errorText={errors?.email?.message}
                        onBlur={checkClient}
                        //important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <MuiCustomDatePicker
                        control={control}
                        label="DOB"
                        name="dob"
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Gender"
                        register={register("gender", {required: true})}
                        onBlur={checkClient}
                        options={[
                          {label: "Male", value: "Male"},
                          {label: "Female", value: "Female"},
                        ]}
                        errorText={errors?.gender?.message}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Marital Status"
                        register={register("maritalstatus")}
                        options={[
                          {label: "Single", value: "Single"},
                          {label: "Married", value: "Married"},
                          {label: "Widowed", value: "Widowed"},
                          {
                            label: "Divorced/Seperated",
                            value: "Divorced/Seperated",
                          },
                        ]}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Country"
                        control={control}
                        name="country"
                        //errorText={errors?.facilityCountry?.message}
                        options={["Nigeria"]}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12}>
                      <Input
                        label="Residential Address"
                        register={register("residentialaddress")}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="State"
                        control={control}
                        name="state"
                        //errorText={errors?.facilityState?.message}
                        options={sortedStates}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Town/City"
                        control={control}
                        name="town"
                        //errorText={errors?.facilityLGA?.message}
                        options={
                          selectedState
                            ? selectedState.lgas.sort((a, b) =>
                                a.localeCompare(b)
                              )
                            : []
                        }
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="LGA"
                        control={control}
                        name="lga"
                        //errorText={errors?.facilityLGA?.message}
                        options={
                          selectedState
                            ? selectedState.lgas.sort((a, b) =>
                                a.localeCompare(b)
                              )
                            : []
                        }
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Next of Kin"
                        register={register("nextofkin")}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Next of Kin Phone"
                        register={register("nextofkinphone")}
                        type="tel"
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Client Level"
                        important
                        control={control}
                        name="clientLevel"
                        options={[
                          {label: "Level 1", value: "1"},
                          {label: "Level 2", value: "2"},
                          {label: "Level 3", value: "3"},
                        ]}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    mt={2}
                  >
                    <GlobalCustomButton
                      color="warning"
                      onClick={closeModal}
                      sx={{marginRight: "15px"}}
                    >
                      Cancel
                    </GlobalCustomButton>

                    <GlobalCustomButton
                      type="submit"
                      loading={loading}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <SaveIcon fontSize="small" sx={{marginRight: "5px"}} />
                      Register Client
                    </GlobalCustomButton>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{width: "80vw", maxHeight: "80vh"}}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Names" />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4}>
                      <Input
                        label="First Name"
                        register={register("firstname")}
                        errorText={errors?.firstname?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4}>
                      <Input
                        label="Middle Name"
                        register={register("middlename")}
                        errorText={errors?.middlename?.message}
                        onBlur={checkClient}
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4}>
                      <Input
                        label="Last Name"
                        register={register("lastname")}
                        errorText={errors?.lastname?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Biodata" />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <MuiCustomDatePicker
                        control={control}
                        label="DOB"
                        name="dob"
                        important={true}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Gender"
                        register={register("gender")}
                        onBlur={checkClient}
                        options={[
                          {label: "Male", value: "male"},
                          {label: "Female", value: "female"},
                        ]}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Phone No"
                        register={register("phone")}
                        errorText={errors?.phone?.message}
                        onBlur={checkClient}
                        important={true}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Email"
                        register={register("email")}
                        errorText={errors?.email?.message}
                        onBlur={checkClient}
                        //important={true}
                      />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Marital Status"
                        register={register("maritalstatus")}
                        options={[
                          {label: "Single", value: "Single"},
                          {label: "Married", value: "Married"},
                          {label: "Widowed", value: "Widowed"},
                          {
                            label: "Divorced/Seperated",
                            value: "Divorced/Seperated",
                          },
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
                      <CustomSelect
                        label="Religion"
                        register={register("religion")}
                        options={[
                          {label: "Buddhism", value: "Buddhism"},
                          {label: "Christianity", value: "Christianity"},
                          {label: "Hinduism", value: "Hinduism"},
                          {label: "Judaism", value: "Judaism"},
                          {label: "Islam", value: "Islam"},
                          {label: "Taoism", value: "Taoism"},
                        ]}
                      />
                      {/* <Input label="Religion" register={register("religion")} /> */}
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Profession"
                        register={register("profession")}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12}>
                      <Input label="Tags" register={register("clientTags")} />
                    </Grid>

                    <Grid item lg={2} md={4} sm={6}>
                      <CustomSelect
                        label="Client Level"
                        control={control}
                        name="clientLevel"
                        important
                        options={[
                          {label: "Level 1", value: "1"},
                          {label: "Level 2", value: "2"},
                          {label: "Level 3", value: "3"},
                        ]}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Address" />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Country"
                        control={control}
                        name="country"
                        //errorText={errors?.facilityCountry?.message}
                        options={["Nigeria"]}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12}>
                      <Input
                        label="Residential Address"
                        register={register("residentialaddress")}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="State"
                        control={control}
                        name="state"
                        //errorText={errors?.facilityState?.message}
                        options={sortedStates}
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="Town/City"
                        control={control}
                        name="town"
                        //errorText={errors?.facilityLGA?.message}
                        options={
                          selectedState
                            ? selectedState.lgas.sort((a, b) =>
                                a.localeCompare(b)
                              )
                            : []
                        }
                      />
                    </Grid>

                    <Grid item lg={3} md={4} sm={6}>
                      <CustomSelect
                        label="LGA"
                        control={control}
                        name="lga"
                        //errorText={errors?.facilityLGA?.message}
                        options={
                          selectedState
                            ? selectedState.lgas.sort((a, b) =>
                                a.localeCompare(b)
                              )
                            : []
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormsHeaderText text="Client Medical Data" />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input
                        label="Blood Group"
                        register={register("bloodgroup")}
                      />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6}>
                      <Input label="Genotype" register={register("genotype")} />
                    </Grid>

                    <Grid item lg={8} md={6} sm={6}>
                      <Input
                        label="Disabilities"
                        register={register("disabilities")}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={6}>
                      <Input
                        label="Allergies"
                        register={register("allergies")}
                      />
                    </Grid>

                    <Grid item lg={6} md={4} sm={6}>
                      <Input
                        label="Co-mobidities"
                        register={register("comorbidities")}
                      />
                    </Grid>

                    <Grid item lg={12} md={4} sm={6}>
                      <Input
                        label="Specific Details "
                        register={register("specificDetails")}
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
                        register={register("nok_name")}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label="Phone Number"
                        register={register("nok_phoneno")}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6}>
                      <Input
                        label=" Email"
                        register={register("nok_email")}
                        type="email"
                      />
                    </Grid>
                    <Grid item lg={4} md={4} sm={6}>
                      <Input
                        label="Relationship"
                        register={register("nok_relationship")}
                      />
                    </Grid>
                    <Grid item lg={8} md={6} sm={12}>
                      <Input
                        label="Co-mobidities"
                        register={register("comorbidities")}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                    mt={2}
                  >
                    <GlobalCustomButton
                      color="warning"
                      onClick={closeModal}
                      sx={{marginRight: "15px"}}
                    >
                      Cancel
                    </GlobalCustomButton>

                    <GlobalCustomButton
                      type="submit"
                      loading={loading}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <SaveIcon fontSize="small" sx={{marginRight: "5px"}} />
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

export function PolicyDetail({showModal, setShowModal}) {
  const {register, reset, control, handleSubmit} = useForm();
  const policyServ = client.service("policy");
  const ClientServ = client.service("policy");
  const ServicesServ = client.service("healthplan");
  const [error, setError] = useState(false); //,
  const [finacialInfoModal, setFinacialInfoModal] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [message, setMessage] = useState(""); //,
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
  const [display, setDisplay] = useState(1);
  const [editPolicy, setEditPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editCustomer, setEditCustomer] = useState(false);
  const [facility, setFacility] = useState([]);
  const [benefittingPlans1, setBenefittingPlans1] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [familyPrice, setFamilyPrice] = useState("");
  const [individualPrice, setIndividualPrice] = useState("");
  const [healthplan, setHealthplan] = useState([]);
  let Client = state.ManagedCareModule.selectedClient;
  console.log(Client);

  useEffect(() => {
    let Client = state.ManagedCareModule.selectedClient;
    setFacility(Client);

    const initFormValue = {
      policyNo: Client?.policyNo,
      phone: Client?.principal?.phone,
      start_date: Client?.validitystarts,
      end_date: Client?.validityEnds,
      approval_date: Client?.approvalDate,
      approved_by: Client?.approvedby?.employeename,
      status: Client?.approved ? "Approved" : "Pending",
      sponsorship_type: Client?.sponsorshipType,
      plan_type: Client?.plan?.planName,
      policy_tag: Client?.principal?.clientTags,
      familyPremium: Client?.plan?.premiums?.[0]?.familyPremium,
      individualPremium: Client?.plan?.premiums?.[0]?.individualPremium,
      sponsor_name: Client.sponsor?.organizationDetail?.facilityName,
      sponsor_phone: Client.sponsor?.organizationDetail?.facilityContactPhone,
      sponsor_email: Client.sponsor?.organizationDetail?.facilityEmail,
      sponsor_address: Client.sponsor?.organizationDetail?.facilityAddress,
    };
    reset(initFormValue);
  }, [state.ManagedCareModule.selectedClient]);
  console.log(Client);

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
  const updateDetail = async data => {
    const docId = state.ManagedCareModule.selectedClient._id;
    let Client = state.ManagedCareModule.selectedClient;
    const employee = user.currentEmployee;
    console.log(data, docId);
    const policyDetails = {
      policyNo: data.policyNo,
      phone: data.phone,
      validitystarts: data.start_date,
      validityEnds: data.end_date,
      status: data.active,
      sponsorship_type: data.sponsorshipType,
      plan: selectedPlan ? selectedPlan : Client?.plan,
      plan_type: data.plan_type,
      policy_tag: data.policy_tag,
      sponsor_name: data.sponsor_name,
      sponsor_phone: data.sponsor_phone,
      sponsor_email: data.sponsor_email,
      sponsor_address: data.sponsor_address,
      statushx: [
        ...Client?.statushx,
        {
          date: new Date(),
          employeename: `${employee?.firstname} ${employee?.lastname}`,
          employeeId: employee?._id,
          status: selectedPlan ? "Plan Changed" : "Policy Updated",
        },
      ],
    };
    await policyServ
      .patch(docId, policyDetails)
      .then(res => {
        setState(prev => ({
          ...prev,
          ManagedCareModule: {...prev.ManagedCareModule, selectedClient: res},
        }));
        toast.success("Policy Detail Updated");
        setEditPolicy(false);
      })
      .catch(err => {
        toast.error("Error Updating Policy Detail");
        setEditPolicy(false);
      });
  };

  const approvePolicy = async () => {
    const docId = state.ManagedCareModule.selectedClient._id;
    const employee = user.currentEmployee;
    const policyDetails = {
      approved: true,
      active: true,
      isPaid: true,
      approvalDate: new Date(),
      approvedby: {
        employeename: `${employee?.firstname} ${employee?.lastname}`,
        employeeId: employee?._id,
      },
      statushx: [
        ...Client?.statushx,
        {
          date: new Date(),
          employeename: `${employee?.firstname} ${employee?.lastname}`,
          employeeId: employee?._id,
          status: "Policy Approved",
        },
      ],
    };
    console.log(policyDetails);
    await policyServ
      .patch(docId, policyDetails)
      .then(res => {
        setState(prev => ({
          ...prev,
          ManagedCareModule: {...prev.ManagedCareModule, selectedClient: res},
        }));
        toast.success("Policy Approved");
        setEditPolicy(false);
      })
      .catch(err => {
        console.log(err);
        toast.error("Error Approving Policy" + err);
        setEditPolicy(false);
      });
  };
  const getBenfittingPlans = async () => {
    setBenefittingPlans1([]);
    if (user.currentEmployee?.facilityDetail.facilityType === "HMO") {
      const findServices = await ServicesServ.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $sort: {
            category: 1,
          },
        },
      });
      console.log(findServices.data);
      const data = findServices.data;
      if (data.length > 0) {
        setHealthplan(data);
        const planName = data.map(plan => plan.planName);
        console.log("test", planName);
        setBenefittingPlans1(planName);
      }
    }
  };
  const handleChangePlan = async value => {
    console.log(value);
    if (value === "") {
      setFamilyPrice("");
      setIndividualPrice("");
      return;
    }
    console.log(benefittingPlans1);
    let cplan = healthplan.filter(el => el.planName === value);
    console.log(cplan);
    setSelectedPlan(cplan[0]);
    setFamilyPrice(cplan[0]?.premiums[0]?.familyPremium);
    setIndividualPrice(cplan[0]?.premiums[0]?.individualPremium);
  };
  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      // const findClient= await ClientServ.find()
      const findClient = await ClientServ.find({
        query: {
          active: true,
          // organization: user.currentEmployee.facilityDetail,
          $sort: {
            createdAt: -1,
          },
        },
      });
      /*  if (page===0){ */
      await setFacilities(findClient.data);
      setLoading(false);
      console.log(findClient.data, user);
      /* }else{
             await setFacilities(prevstate=>prevstate.concat(findClient.data))
         } */

      await setTotal(findClient.total);
      //console.log(user.currentEmployee.facilityDetail._id, state)
      //console.log(facilities)
      setPage(page => page + 1);
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
        setLoading(false);
      }
    }
  };
  useEffect(async () => {
    // getFacilities()

    getBenfittingPlans();
  }, []);

  const filteredBene = healthplan
    ?.filter(plan => plan?.planName !== Client?.plan?.planName)
    .map(plan => plan.planName);

  return (
    <>
      <div
        className="card "
        style={{
          height: "auto",
          overflowY: "scroll",
          margin: "0 1rem",
          width: "98%",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <ModalHeader
              text={`${Client?.principal?.firstname} ${Client?.principal?.lastname}'s Policy Details`}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{display: "flex", justifyContent: "flex-end"}}
            my={1}
          >
            <Button
              onClick={() => setShowModal(0)}
              variant="contained"
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
              color="warning"
            >
              Back
            </Button>
            <Button
              onClick={() => setDisplay(1)}
              variant={display === 1 ? "outlined" : "contained"}
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
              color="secondary"
            >
              Details
            </Button>

            <Button
              onClick={() => setDisplay(5)}
              variant={display === 5 ? "outlined" : "contained"}
              size="small"
              color="info"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
            >
              Claims
            </Button>
            <Button
              onClick={() => setDisplay(6)}
              variant={display === 6 ? "outlined" : "contained"}
              size="small"
              sx={{textTransform: "capitalize", marginRight: "10px"}}
            >
              Send Policy
            </Button>
          </Grid>
        </Grid>
        <Box>
          {display === 1 && (
            <Box
              sx={{
                height: "80vh",
                overflowY: "scroll",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "space-between",
                }}
                mb={1}
              >
                <FormsHeaderText
                  text={`${Client?.principal?.firstname} ${Client?.principal?.lastname}'s Details`}
                />
                <Box>
                  {!facility.approved && (
                    <GlobalCustomButton
                      color="success"
                      onClick={handleSubmit(approvePolicy)}
                      text="Approve"
                      sx={{marginRight: "5px"}}
                    />
                  )}
                  {editPolicy ? (
                    <GlobalCustomButton
                      color="success"
                      onClick={handleSubmit(updateDetail)}
                    >
                      <UpgradeOutlinedIcon
                        fontSize="small"
                        sx={{marginRight: "5px"}}
                      />
                      Update
                    </GlobalCustomButton>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{textTransform: "capitalize"}}
                      onClick={() => setEditPolicy(true)}
                    >
                      <ModeEditOutlineOutlinedIcon fontSize="small" /> Edit
                    </Button>
                  )}
                </Box>
              </Box>

              <Grid container spacing={1}>
                <Grid item md={3}>
                  <Input
                    register={register("policyNo", {required: true})}
                    label="Policy No."
                    disabled
                  />
                </Grid>

                <Grid item md={3}>
                  <Input
                    register={register("phone", {required: true})}
                    label="Phone"
                    disabled
                  />
                </Grid>
                <Grid item md={3}>
                  <Input
                    register={register("sponsorship_type", {required: true})}
                    label="Sponsorship Type"
                    disabled
                    //placeholder="Enter customer number"
                  />
                </Grid>
                {!editPolicy && (
                  <Grid item md={3}>
                    <Input
                      register={register("plan_type", {required: true})}
                      label="Plan Type"
                      disabled
                      //placeholder="Enter customer number"
                    />
                  </Grid>
                )}
                {editPolicy && (
                  <Grid item md={3}>
                    <CustomSelect
                      name="plan"
                      label="Change Plan"
                      options={filteredBene}
                      required
                      important
                      // control={control}
                      onChange={(e, i) => handleChangePlan(e.target.value)}
                    />
                  </Grid>
                )}
                <Grid item md={3}>
                  <Input
                    register={register("status", {required: true})}
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
                {Client?.planType === "Family" ? (
                  <Grid item md={3}>
                    <Input
                      label="Family Premium"
                      disabled
                      value={
                        editPolicy
                          ? familyPrice
                          : Client?.plan?.premiums?.map(p => {
                              if (p.planType === "Family") {
                                return p.premiumAmount;
                              }
                            })
                      }
                      //placeholder="Enter customer number"
                    />
                  </Grid>
                ) : (
                  <Grid item md={3}>
                    <Input
                      label="Individual Premium"
                      disabled
                      value={
                        editPolicy
                          ? individualPrice
                          : Client?.plan?.premiums?.map(p => {
                              if (p.planType === "Individual") {
                                return p.premiumAmount;
                              }
                            })
                      }
                      //placeholder="Enter customer number"
                    />
                  </Grid>
                )}

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
                {Client?.approved && (
                  <Grid item md={3}>
                    <Input
                      register={register("approved_by")}
                      label="Approved By"
                      disabled
                      //placeholder="Enter customer name"
                    />
                  </Grid>
                )}
                {Client?.approved && (
                  <Grid item md={3}>
                    <MuiCustomDatePicker
                      label="Approval Date"
                      name="approval_date"
                      control={control}
                      disabled
                    />
                  </Grid>
                )}
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
                  columns={EnrolleSchema4}
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
          {display === 6 && (
            <ModalBox open onClose={() => setDisplay(1)}>
              <ProviderPrintout data={Client} />
            </ModalBox>
          )}
        </Box>
      </div>
    </>
  );
}

export const AddFamilyToPolicy = ({
  addPrincipal,
  addDependent,
  createPolicy,
  providerColumns,
  providers,
  setProviders,
}) => {
  const {state, setState} = useContext(ObjectContext);
  //const [providers, setProviders] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleAddProviders = async obj => {
    // console.log(obj);
    if (
      // check if obj is an object
      obj && // check if obj is not null
      Object.keys(obj).length > 0 && // check if obj is not empty
      obj.constructor === Object &&
      // check if the obj is already present in the array
      !providers.some(el => el._id === obj._id)
    ) {
      await setProviders([...providers, obj]);
      setSuccess(true);
      setSuccess(false);
      //await console.log("OBJ", chosen);
    }
  };

  return (
    <Box
      sx={{
        width: "90vw",
        maxHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        gap={2}
        mb={2}
      >
        <GlobalCustomButton
          disabled={state.Beneficiary?.principal._id}
          onClick={addPrincipal}
        >
          <PersonAddAlt1Icon sx={{marginRight: "5px"}} fontSize="small" />
          Add Principal
        </GlobalCustomButton>

        <GlobalCustomButton onClick={addDependent}>
          <PeopleIcon sx={{marginRight: "5px"}} fontSize="small" />
          Add Dependant
        </GlobalCustomButton>
      </Box>

      <Box mb={1.5}>
        <FormsHeaderText text="Principal" />
        <Box
          sx={{
            minHeight: "5vh",
          }}
        >
          <CustomTable
            title={""}
            columns={EnrolleSchema}
            data={
              JSON.stringify(state.Beneficiary.principal) !== "{}"
                ? [state?.Beneficiary?.principal]
                : []
            }
            pointerOnHover
            highlightOnHover
            striped
            CustomEmptyData={
              <Typography sx={{fontSize: "0.8rem"}}>
                You've not added a principal yet...
              </Typography>
            }
            //onRowClicked={() => handleRow(state.Beneficiary?.principal)}
            progressPending={false}
          />
        </Box>
      </Box>

      <Box mb={1.5}>
        <FormsHeaderText text="Dependent(s)" />

        <Box
          sx={{
            minHeight: "10vh",
          }}
        >
          <CustomTable
            title={""}
            columns={EnrolleSchema2}
            data={state?.Beneficiary?.dependent}
            pointerOnHover
            highlightOnHover
            striped
            //onRowClicked={() => handleRow()}
            CustomEmptyData={
              <Typography sx={{fontSize: "0.8rem"}}>
                You've not added Dependant(s) yet...
              </Typography>
            }
            progressPending={false}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        mt={2}
        gap={2}
      >
        <FormsHeaderText text={"Search and Select Provider(s)"} />
        <Box>
          <OrgFacilitySearch
            getSearchfacility={handleAddProviders}
            clear={success}
          />
        </Box>

        <Box>
          <CustomTable
            title={""}
            columns={providerColumns}
            data={providers?.filter(item => item !== null)}
            pointerOnHover
            highlightOnHover
            striped
            CustomEmptyData={
              <Typography sx={{fontSize: "0.85rem"}}>
                No provider added yet...
              </Typography>
            }
            progressPending={false}
          />
        </Box>
      </Box>

      <Box sx={{display: "flex"}} gap={1.5} mt={2}>
        <GlobalCustomButton onClick={() => createPolicy()}>
          Add Family To List
        </GlobalCustomButton>
        <GlobalCustomButton>Reset Form</GlobalCustomButton>
      </Box>
    </Box>
  );
};

export const AddMulipleIndividualPolicy = ({
  addIndividual,
  createPolicy,
  providerColumns,
  providers,
  setProviders,
}) => {
  const {state, setState} = useContext(ObjectContext);

  const [success, setSuccess] = useState(false);

  const handleAddProviders = async obj => {
    // console.log(obj);
    if (
      // check if obj is an object
      obj && // check if obj is not null
      Object.keys(obj).length > 0 && // check if obj is not empty
      obj.constructor === Object &&
      // check if the obj is already present in the array
      !providers.some(el => el._id === obj._id)
    ) {
      await setProviders([...providers, obj]);
      setSuccess(true);
      setSuccess(false);
      //await console.log("OBJ", chosen);
    }
  };

  return (
    <Box
      sx={{
        width: "90vw",
        maxHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <GlobalCustomButton onClick={addIndividual}>
          Add To Individuals List
        </GlobalCustomButton>
      </Box>

      <Box>
        <FormsHeaderText text="List of Individuals" />

        <Box
          sx={{
            minHeight: "10vh",
          }}
        >
          <CustomTable
            title={""}
            columns={EnrolleSchema2}
            data={
              JSON.stringify(state.Beneficiary.principal) !== "{}"
                ? [state?.Beneficiary?.principal]
                : []
            }
            pointerOnHover
            highlightOnHover
            striped
            //onRowClicked={() => handleRow()}
            CustomEmptyData={
              <Typography sx={{fontSize: "0.8rem"}}>
                You've not added an Individual yet...
              </Typography>
            }
            progressPending={false}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        mt={2}
        gap={2}
      >
        <FormsHeaderText text={"Search and Select Provider(s)"} />
        <Box>
          <OrgFacilitySearch
            getSearchfacility={handleAddProviders}
            clear={success}
          />
        </Box>

        <Box>
          <CustomTable
            title={""}
            columns={providerColumns}
            data={providers?.filter(item => item !== null)}
            pointerOnHover
            highlightOnHover
            striped
            CustomEmptyData={
              <Typography sx={{fontSize: "0.85rem"}}>
                No provider added yet...
              </Typography>
            }
            progressPending={false}
          />
        </Box>
      </Box>

      <Box mt={2}>
        <GlobalCustomButton
          onClick={createPolicy}
          //disabled={state.Beneficiary.principal._id}
        >
          Add to Individual List
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
