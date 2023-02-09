import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { ObjectContext, UserContext } from "../../context";
import { TableMenu } from "../dashBoardUiComponent/core-ui/styles";
import { DebounceInput } from "react-debounce-input";
import client from "../../feathers";
import CustomTable from "../../components/customtable";
import { Box, IconButton, Grid, Typography } from "@mui/material";
import ModalBox from "../../components/modal";
import { useForm } from "react-hook-form";
import Input from "../../components/inputs/basic/Input";
import Textarea from "../../components/inputs/basic/Textarea";
import CustomSelect from "../../components/inputs/basic/Select";
import SearchSelect from "../helpers/SearchSelect";
import { toast, ToastContainer } from "react-toastify";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import { FormsHeaderText } from "../../components/texts";
import FilterMenu from "../../components/utilities/FilterMenu";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import CategorySearch from "../helpers/CategorySearch";
import {
  BandSearch,
  SelectedBenefit,
  SelectHealthPlan,
} from "../helpers/FacilitySearch";
import { Group } from "@mui/icons-material";
import CustomTariffSelect from "./components/TariffSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { bandTypeOptions } from "../../dummy-data";
import CreateIcon from "@mui/icons-material/Create";
import { createBandSchema } from "../Admin/ui-components/schema";

export default function TarrifList({ standAlone }) {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(0);
  const [openBand, setOpenBand] = useState(false);
  const [openTarrif, setOpenTarrif] = useState(false);
  const [openTarrifModify, setOpenTarrifModify] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState();

  const handleHideTariffModal = () => {
    setOpenTarrif(false);
  };

  const handleTariffModal = () => {
    setOpenTarrif(true);
  };

  const handleHideTariffModifyModal = () => {
    setOpenTarrifModify(false);
  };

  const handleTariffModifyModal = () => {
    setOpenTarrifModify(true);
  };

  const handleHideBandModal = () => {
    setOpenBand(false);
  };

  const handleBandModal = () => {
    setOpenBand(true);
  };

  return (
    <section className="section remPadTop">
      {showModal === 0 && (
        <TarrifListView
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedClient={setSelectedPlan}
          standAlone={standAlone}
          showTariff={handleTariffModal}
          showTariffModify={handleTariffModifyModal}
          showBand={handleBandModal}
        />
      )}
      {showModal === 1 && (
        <TariffCreate showModal={showModal} setShowModal={setShowModal} />
      )}
      {showModal === 2 && (
        <TariffView
          setShowModal={setShowModal}
          selectedPlan={selectedPlan}
          standAlone={standAlone}
        />
      )}

      <ModalBox
        width="50vw"
        open={openBand}
        onClose={handleHideBandModal}
        header="Create Band"
      >
        <BandForm />
      </ModalBox>

      <ModalBox
        width="50vw"
        open={openTarrifModify}
        onClose={handleHideTariffModifyModal}
        header="Modify Tariff"
      >
        <TariffModify />
      </ModalBox>

      <ModalBox
        width="50vw"
        open={openTarrif}
        onClose={handleHideTariffModal}
        header="Inherit Tariff"
      >
        <InheritTariff />
      </ModalBox>
    </section>
  );
}
export const TarrifListView = ({
  showModal,
  setShowModal,
  showTariff,
  showBand,
  showTariffModify,
}) => {
  const [showView, setShowView] = useState(false);
  const [tariffs, setTariffs] = useState([]);
  const [tariff, setTariff] = useState();
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const ServicesServ = client.service("tariff");
  const BandsServ = client.service("bands");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  // const [totalServices, setTotalServices] = useState(0);
  // const [totalFacilities, setTotalFacilities] = useState(0);
  const [newFacility, setNewFacility] = useState([]);
  const [slide, setSlide] = useState(false);
  const [changeView, setChangeView] = useState("service");
  const [selectPlans, setSelectPlans] = useState([]);

  const Services = state.ServicesModule.selectedServices;
  // const fac = state.facilityModule.selectedFacility;
  // console.log(Services);

  const ServiceSchema = [
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
      name: "Band Name",
      key: "bandname",
      description: "Band Name",
      selector: (row) => row?.band,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "No of Facilities",
      key: "nofacilities",
      description: "No of Facilities",
      selector: (row) =>
        row?.contracts
          ?.map((healist) => healist?.source_org_name)
          .filter((v, i, a) => a.indexOf(v) === i).length,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "No of Services",
      key: "noservices",
      description: "No of Services",
      selector: (row) => row?.contracts?.length,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row?.band === newFacility?.map((item) => item?.band),
      style: {
        backgroundColor: "#4cc9f0",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
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
      key: "serviceName",
      description: "Service Name",
      selector: (row) => (
        <Typography
          sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
          data-tag="allowRowEvents"
        >
          {row?.serviceName}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Price",
      key: "price",
      description: "Price",
      selector: (row) => `₦${row?.price}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Comment",
      key: "comment",
      description: "Comment",
      selector: (row) =>
        row?.plans.map((plan, i) => <div key={i}>{plan?.comments}</div>),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const otherServiceSchema = [
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
      name: "Plan Name",
      key: "plan",
      description: "Plan",
      selector: (row) => row.planName,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Capitation",
      key: "capitation",
      description: "capitation",
      selector: (row) => (row?.capitation === true ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Free for Service",
      key: "free service",
      description: "Free for Service",
      selector: (row) => (row?.feeForService === true ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "PreAuth",
      key: "PreAuth",
      description: "PreAuth",
      selector: (row) => (row?.reqPA !== "false" ? "Yes" : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Co Pay",
      key: "co pay",
      description: "Co pay",
      selector: (row) => (row.coPay === true ? `₦${row?.copayDetail}` : "No"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
    },
    // {
    // 	name: 'CoPay Amount',
    // 	key: 'CoPay Amount',
    // 	description: 'CoPay Amount',
    // 	selector: (row) =>
    // 		row.copayDetail !== '' ? `₦${row?.copayDetail}` : 'N/A',
    // 	sortable: true,
    // 	required: true,
    // 	inputType: 'TEXT',
    // },
    {
      name: "Benefit Category",
      key: "Benefit Category",
      description: "Benefit Category",
      selector: (row) => row.benefitcategory,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "100px",
    },
    {
      name: "Benefit",
      key: "Benefit",
      description: "Benefit",
      selector: (row) => row.benefit,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
  ];

  // console.log(Services);
  const facilitySchema = [
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
      name: "Facility Name",
      key: "facility",
      description: "Facility Name",
      selector: (row) => row?.dest_org_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  // const handleCreateNew = async () => {
  // 	const newServicesModule = {
  // 		selectedServices: {},
  // 		show: 'create',
  // 	};
  // 	await setState((prevstate) => ({
  // 		...prevstate,
  // 		ServicesModule: newServicesModule,
  // 	}));
  // };
  const handleRow = async (Service, i) => {
    // console.log(Service);
    setSlide(!slide);
    setSelectedServices(Service?.contracts);
    const newServicesModule = {
      selectedServices: Service,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      ServicesModule: newServicesModule,
    }));

    const bandPlans = Service.contracts.map((data) => {
      const allPlans = [];

      data.plans.map((plan) => {
        const planData = {
          planName: plan.planName,
          benefit: plan.benefit,
          benefitcategory: plan.benefitcategory,
          feeForService: plan.feeForService,
          capitation: plan.capitation,
          coPay: plan.coPay,
          copayDetail: plan.copayDetail,
          reqPA: plan.reqPA,
        };

        allPlans.push(planData);
      });
      return allPlans;
    });

    setSelectPlans(bandPlans.flat(1));
  };

  const handleService = async (Service) => {
    console.log(Service, "Cat....");
    setSelectedCategory(Service?.contracts);
    // const newServicesModule = {
    // 	selectedServices: Service,
    // 	show: 'detail',
    // };
    // await setState((prevstate) => ({
    // 	...prevstate,
    // 	ServicesModule: newServicesModule,
    // }));
    showTariffModify();
  };

  const handleSearch = (val) => {
    const field = "name";
    console.log(val);
    ServicesServ.find({
      query: {
        // [field]: {
        // 	$regex: val,
        // 	$options: 'i',
        // },
        organizationId: user.currentEmployee.facilityDetail._id,
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error during search " + err);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findServices = await ServicesServ.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $sort: {
            createdAt: -1,
          },
        },
      });
      console.log(findServices.data);
      await setFacilities(findServices.data);
    } else {
      if (user.stacker) {
        toast.warning("You do not qualify to view this");
        return;
      }
    }
  };

  useEffect(() => {
    getFacilities();

    ServicesServ.on("created", (obj) => getFacilities());
    ServicesServ.on("updated", (obj) => getFacilities());
    ServicesServ.on("patched", (obj) => getFacilities());
    ServicesServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, [state.facilityModule.selectedFacility]);

  // console.log(facilities);

  return (
    <div>
      <Box
        sx={{
          width: "98%",
          margin: "0 auto",
        }}
      >
        {!slide && (
          <>
            <TableMenu>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
                  List of Tariffs
                </h2>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
              </div>

              <GlobalCustomButton text="Add Band" onClick={showBand} />
            </TableMenu>
            <CustomTable
              title={""}
              columns={ServiceSchema}
              data={facilities}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={(row) => handleRow(row)}
              conditionalRowStyles={conditionalRowStyles}
            />
          </>
        )}

        {selectedServices && selectedServices.length > 0 && slide && (
          <Box
            style={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormsHeaderText text={"Band Details"} />

              <Box>
                <GlobalCustomButton
                  text="Back"
                  onClick={() => setSlide(false)}
                  customStyles={{ marginRight: "1rem" }}
                  color="warning"
                />

                <GlobalCustomButton
                  text={
                    changeView === "service"
                      ? "View Facilities"
                      : "View Services"
                  }
                  onClick={
                    changeView === "facility"
                      ? () => setChangeView("service")
                      : () => setChangeView("facility")
                  }
                  color={changeView === "facility" ? "primary" : "secondary"}
                />
                <GlobalCustomButton
                  text="Inherit Tarrif"
                  onClick={showTariff}
                  customStyles={{ marginLeft: "1rem" }}
                  // color='warning'
                />
                <GlobalCustomButton
                  text="Add Tarrif"
                  onClick={() => setShowModal(1)}
                  customStyles={{ marginLeft: "1rem" }}
                  // color='warning'
                />
              </Box>
            </Box>
            <Box sx={{ mt: "2rem", px: "0.20rem" }}>
              <FormsHeaderText text={Services?.band} />
            </Box>

            <Box>
              {changeView === "service" ? (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={2}
                  sx={{ mt: "2rem", height: "88vh", px: "0.20rem" }}
                >
                  <Grid xs={4}>
                    <CustomTable
                      title={""}
                      columns={productItemSchema}
                      data={selectedServices}
                      pointerOnHover
                      highlightOnHover
                      striped
                      onRowClicked={(row) => handleService(row)}
                    />
                  </Grid>
                  <Grid xs={7}>
                    <CustomTable
                      title={""}
                      columns={otherServiceSchema}
                      data={selectPlans}
                      pointerOnHover
                      highlightOnHover
                      striped
                      // onRowClicked={(row) => handleService(row)}
                    />
                  </Grid>
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "88vh",
                    overflowY: "scroll",
                    marginTop: "1rem",
                  }}
                >
                  <CustomTable
                    title={""}
                    columns={facilitySchema}
                    data={selectedFacilities}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={(row) => handleService(row)}
                  />
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export const TariffCreate = ({ showModal, setShowModal }) => {
  const [, setPriceState] = useState({
    bronze: false,
    gold: false,
    silver: false,
    platinium: false,
  });
  const [loading, setLoading] = useState(false);
  const [bands, setBands] = useState([]);
  const [data, setData] = useState(null);
  const [catergory, setCategory] = useState(null);
  const [categoryname, setCategoryName] = useState("");
  const [success, setSuccess] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [cash, setCash] = useState("Cash");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const [providerBand, setProviderBand] = useState([]);
  const [benefittingPlans1, setBenefittingPlans1] = useState([]);
  const ServicesServ = client.service("tariff");
  const BandsServ = client.service("bands");
  const HealthPlanServ = client.service("healthplan");
  //const history = useHistory()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [facilityId, setFacilityId] = useState("");
  const [source, setSource] = useState("");
  const [panel, setPanel] = useState(false);
  const [name, setName] = useState("");
  const [benefittingplans, setBenefittingPlans] = useState([]);
  const [quantity, setQuantity] = useState();
  const [costprice, setCostprice] = useState("");
  const [orgType, setOrgType] = useState("");
  const [comments, setComments] = useState("");
  const [productItem, setProductItem] = useState([]);
  const [plan, setPlan] = useState("");
  const [service, setService] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [panelList, setPanelList] = useState([]);
  const [successService, setSuccessService] = useState(false);
  const { state } = useContext(ObjectContext);
  const [chosen2, setChosen2] = useState();
  const [band, setBand] = useState("");
  const [showService, setShowService] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState([]);
  const [capitation, setCapitation] = useState(false);
  const [feeForService, setFeeForService] = useState(false);
  const [serviceClass, setServiceClass] = useState("");
  const [copay, setCopay] = useState("");
  const [reqCopay, setReqCopay] = useState(false);
  const [reqAuthCode, setReqAuthCode] = useState(false);
  const [selectedBand, setSelectedBand] = useState("");
  const [showCoPay, setShowCoPay] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [sCoPay, setSCoPay] = useState(false);
  const [beneCat, setBeneCat] = useState("");
  const [newBene, setNewBene] = useState([]);
  const [selectNo, setSelectNo] = useState("");
  const [serviceUnavailable, setServiceUnavailable] = useState({
    status: false,
    name: "",
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    defaultValues: {
      facility: user.currentEmployee.facility,
    },
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const findServices = await ServicesServ.find();
        const findBands = await BandsServ.find();
        setBands(findBands?.data);
      } catch (err) {}
      setLoading(false);
    };

    getData();
  }, []);
  const updateObjectInArray = (array, child) => {
    array.map((item, index) => {
      if (item.name !== child.name) {
        // This isn't the item we care about - keep it as-is
        return item;
      }
      // Otherwise, this is the one we want - return an updated value
      //console.log(child)
      return {
        ...child,
      };
    });
    return array;
  };
  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = (obj) => {
    setFacilityId(obj._id);
    setName(obj.facilityName);
    setOrgType(obj.facilityType);

    if (!obj) {
      // setName("")
      setOrgType("");
      setFacilityId("");
      setCostprice("");
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };
  const getSearchfacility2 = (obj) => {
    setCategoryName(obj.categoryname);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setCategoryName("");
      setChosen2();
    }
  };

  const getSearchService = (obj) => {
    setService(obj);
    if (!obj) {
      setService("");
    }
    setSuccessService(false);
  };

  const notfound = async (obj) => {
    //alert(obj)
    await setServiceUnavailable(obj);
    await setSuccessService(true);
    if (!obj) {
      await setServiceUnavailable("");
    }
    // console.log(obj)
    //here
  };

  useEffect(() => {
    setCurrentUser(user);

    //console.log(currentUser)
    return () => {};
  }, [user]);

  const getProviderBand = async () => {
    if (user.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType:
            user.currentEmployee.facilityDetail.facilityType === "HMO"
              ? "Provider"
              : "Company",

          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });
      // console.log(findServices)
      await setProviderBand(findServices.data);
      console.log(findServices);
    }
  };
  const getFacilities = async () => {
    console.log(user);
    if (user.currentEmployee) {
      let stuff = {
        organizationId: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      // if (state.employeeLocation.locationType !== "Front Desk") {
      //   stuff.locationId = state.employeeLocation.locationId;
      // }

      const findHealthPlan = await HealthPlanServ.find({ query: stuff });

      await console.log("HealthPlan", findHealthPlan.data);
      await setFacilities(findHealthPlan.data);
    } else {
      if (user.stacker) {
        const findClient = await HealthPlanServ.find({
          query: {
            $limit: 100,
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
    // console.log("starting...")
    getFacilities();
    setBenefittingPlans1([]);
    setFacilityId(user.currentEmployee.facilityDetail._id);
    setName(user.currentEmployee.facilityDetail.facilityName);
    setOrgType(user.currentEmployee.facilityDetail.facilityType);
    getProviderBand();
    return () => {};
  }, []);

  const handleServType = async (e, i, c) => {
    let currentPlan = benefittingplans.filter(
      (el) => el.planName === c.planName
    )[0];
    currentPlan.capitation = e.target.value === "Capitation" ? true : false;
    currentPlan.feeforService =
      e.target.value === "Fee for Service" ? true : false;
    const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
    await setBenefittingPlans(updatedplan);
  };

  const handleCopay = async (e, i, c) => {
    let currentPlan = benefittingplans.filter(
      (el) => el.planName === c.planName
    )[0];
    currentPlan.copayDetail = e.target.value;
    currentPlan.coPay = currentPlan.copayDetail === "" ? false : true;
    const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
    await setBenefittingPlans(updatedplan);
  };

  const handleAuthCode = async (e, i, c) => {
    let currentPlan = benefittingplans.filter(
      (el) => el.planName === c.planName
    )[0];
    currentPlan.reqPA = e.target.checked;
    const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
    await setBenefittingPlans(updatedplan);
  };
  const handleBenefit = async (e, i, c) => {
    console.log(e.target.value, i, c);
    let selectedBene = e.target.value;
    console.log(selectedBene, selectedBene.comments);
    let currentPlan = benefittingplans.filter(
      (el) => el.planName === c.planName
    )[0];
    console.log(currentPlan);
    currentPlan.benefit = selectedBene.comments;
    currentPlan.benefitCategory = selectedBene.category;
    // currentPlan.covered =
    // 	facilities.benefits.filter((el) => el.category === e.target.value)[0]
    // 		.status === 'Covered'
    // 		? true
    // 		: false;
    const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
    await setBenefittingPlans(updatedplan);
  };

  const handleChange = async (e, i, c) => {
    c.checked = !c.checked;

    const newPlan = {
      name: c.planName,
      checked: false,
    };
    // console.log(c.checked)
    if (c.checked) {
      //add to benefiting plan
      let planx = {
        planName: c.planName,
        planId: c._id,
        benefit: "",
        // benefitId : c.benefitId,
        benefitCategory: "",
        feeforService: true,
        capitation: false,
        reqPA: false,
        coPay: false,
        copayDetail: "",
        comments: comments,
      };
      //   console.log(planx)
      await setBenefittingPlans((prev) => [...prev, planx]);
    } else {
      await setBenefittingPlans((prevstate) =>
        prevstate.filter((el) => el.name !== c.name)
      ); //remove from benefiting plan
    }
  };
  const closeModal = () => {
    setShowService(false);
    setBenefittingPlans([]);
    setComments("");
  };

  const handleClickProd = async () => {
    if (benefittingplans.length === 0) {
      return toast.warning("Please select a plan");
    }
    if (costprice === "") {
      return toast.warning("Please enter price");
    }
    if (service === "") {
      return toast.warning("Please select a service");
    }
    let seviceItem = {
      source_org: user.currentEmployee.facilityDetail,
      source_org_name: user.currentEmployee.facilityDetail.facilityName,
      serviceName: service.name,
      serviceId: service._id,
      price: parseFloat(costprice),
      comments: comments,
      plans: benefittingplans,
      billing_type:
        user.currentEmployee.facilityDetail.facilityType === "HMO"
          ? "HMO"
          : "Company",
    };
    setProductItem([...productItem, seviceItem]);
    await setBenefittingPlans([]);
    await setService("");
    await setCostprice("");
    await setSuccess(true);
  };

  const onSubmit = async () => {
    if (bands.length === 0) {
      return toast.error("Please add a band");
    }
    if (productItem.length === 0) {
      return toast.error("Please add a service");
    }

    let data = {
      organizationId: user.currentEmployee.facilityDetail._id,
      organizationName: user.currentEmployee.facilityDetail.facilityName,
      band: selectedBand,
      contracts: productItem,
    };
    //  console.log(data)

    ServicesServ.create(data)
      .then((res) => {
        toast.success("Tariff created succesfully");
        setShowModal(0);
      })
      .catch((err) => {
        toast.error("Error creating Tariff " + err);
      });
  };

  // const handleBenefit = (e) => {
  // 	setBenefittingPlans((prevstate) => prevstate.concat(plan));
  // 	setPlan('');
  // };

  const handleRemove = (index, contract) => {
    console.log(index, contract);
    const newProductItem = productItem.filter(
      (ProductionItem, i) => i !== contract
    );
    setProductItem(newProductItem);
    console.log(newProductItem);
  };
  const handleAddPanel = () => {
    // setSuccessService(false)
    let newService = {
      serviceId: service._id,
      service_name: service.name,
      panel: service.panel,
    };
    setPanelList((prevstate) => prevstate.concat(newService));
    setSuccessService(true);
    newService = {};
    setService("");
    console.log("something added");
  };
  const handleCheck = async () => {
    if (!categoryname) {
      toast.warning("Enter Category!");
      return true;
    }
    console.log("unavailb:", serviceUnavailable.name);
    console.log("availb:", service.name);
    const resp = await ServicesServ.find({
      query: {
        name: serviceUnavailable.name || service.name, //source
        facility: user.currentEmployee.facilityDetail._id,
        category: categoryname,
      },
    });
    console.log(resp);
    //.
    /*then((resp)=>{
        console.log(resp)*/
    if (resp.data.length > 0) {
      toast.info(
        "Service already exist. Kindly modify it " //+ resp.data ,
      );
      return true;
    } else {
      return false;
    }
  };

  const copaySelect = (e, i) => {
    setShowCoPay(i);
    if (e.target.checked) {
      setSCoPay(true);
    } else {
      setSCoPay(false);
    }
  };
  useEffect(() => {
    facilities?.map((c, i) => {
      console.log("c", c);
      const benefit = c.benefits?.find((b) => b.comments === beneCat?.comments);
      console.log("BENE", benefit);
      if (benefit) {
        setNewBene([benefit]);
      }
      console.log("NEW BENEFITS", newBene);
    });
  }, [beneCat]);
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
      key: "serviceName",
      description: "Service Name",
      selector: (row) => row?.serviceName,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Price",
      key: "price",
      description: "Price",
      selector: (row) => `₦${row?.price}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Comment",
      key: "comment",
      description: "Comment",
      selector: (row) =>
        row?.plans.map((plan, i) => <div key={i}>{plan?.comments}</div>),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Plan Name",
      key: "plan",
      description: "Plan",
      selector: (row) =>
        row?.plans.map((plan, i) => <div key={i}>{plan?.planName}</div>),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Capitation",
      key: "capitation",
      description: "capitation",
      selector: (row) =>
        row?.plans.map((plan, i) => (
          <div key={i}>{plan?.capitation === true ? "Yes" : "No"}</div>
        )),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Free for Service",
      key: "free service",
      description: "Free for Service",
      selector: (row) =>
        row?.plans.map((plan, i) => (
          <div key={i}>{plan?.feeForService === true ? "Yes" : "No"}</div>
        )),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "PreAuth",
      key: "PreAuth",
      description: "PreAuth",
      selector: (row) =>
        row?.plans.map((plan, i) => (
          <div key={i}>{plan?.reqPa === true ? "Yes" : "No"}</div>
        )),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Co Pay",
      key: "co pay",
      description: "Co pay",
      selector: (row) =>
        row?.plans.map((plan, i) => (
          <div key={i}>
            {plan?.coPay === true ? `₦${row?.copayDetail}` : "No"}
          </div>
        )),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Benefit Category",
      key: "Benefit Category",
      description: "Benefit Category",
      selector: (row) =>
        row?.plans.map((plan, i) => <div key={i}>{plan?.benefitcategory}</div>),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Benefits",
      key: "benefits",
      description: "Benefits",
      selector: (row) =>
        row?.plans.map((plan, i) => <div key={i}>{plan?.benefit}</div>),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "90px",
    },
    {
      name: "Del",
      width: "50px",
      center: true,
      key: "contact_email",
      description: "Enter Date",
      selector: (i, row) => (
        <IconButton onClick={() => handleRemove(i, row)} color="error">
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
  ];
  console.log("selectedBenefit", benefittingplans, "productItem", productItem);
  console.log("beneCat", beneCat);
  return (
    <Box
      style={{
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
        <FormsHeaderText text="Create Tariff" />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <GlobalCustomButton
            text="Back"
            onClick={() => setShowModal(0)}
            color="warning"
            customStyles={{ marginRight: "1rem" }}
          />
          <GlobalCustomButton
            text="Create Tarrif"
            onClick={onSubmit}
            color="success"
          />
        </Box>
      </Box>
      <Grid container spacing={2} mt={1}>
        {/* <Grid item xs={12} sm={6}>
            <Input label="Tariff Name" />
          </Grid> */}
        <Grid item xs={12} sm={4}>
          <CustomSelect
            name="bandType"
            placeholder="Choose Provider Band"
            options={providerBand}
            value={selectedBand}
            label="Select Band"
            onChange={(e) => setSelectedBand(e.target.value)}
          />
          {/* <select
						name='bandType'
						value={selectedBand}
						onChange={(e) => setSelectedBand(e.target.value)}
						className='selectadd'
						style={{
							border: '1px solid #b6b6b6',
							height: '2.2rem',
							borderRadius: '4px',
							width: '100%',
						}}>
						<option value=''>
							{user.currentEmployee.facilityDetail.facilityType === 'HMO'
								? 'Choose Provider Band'
								: 'Choose Company Band'}{' '}
						</option>
						{providerBand.map((option, i) => (
							<option
								key={i}
								value={option.name}>
								{' '}
								{option.name}
							</option>
						))}
					</select> */}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1rem 0",
        }}
      >
        <FormsHeaderText text={"Services"} />
        <GlobalCustomButton
          type="button"
          variant="contained"
          color="primary"
          onClick={() => setShowService(true)}
          text="Add Service"
          customStyles={{ marginRight: ".8rem" }}
        />
      </Box>
      {productItem?.length > 0 && (
        <Box my={1}>
          <CustomTable
            title={""}
            columns={productItemSchema}
            data={productItem}
            pointerOnHover
            highlightOnHover
            striped
          />
        </Box>
      )}

      {showService && (
        <ModalBox
          open={showService}
          onClose={() => closeModal()}
          header="Add Services"
        >
          <Box
            sx={{
              width: "70vw",
            }}
          >
            <GlobalCustomButton
              type="button"
              variant="contained"
              color="success"
              onClick={handleClickProd}
              text="Add Service"
              customStyles={{ float: "right" }}
            />
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                // sm={4}
              >
                <SearchSelect
                  getSearchService={getSearchService}
                  clear={successService}
                  notfound={notfound}
                  placeholder="Search Service"
                />
              </Grid>
              {/* <Grid
							item
							xs={12}
							sm={4}>
							<SelectHealthPlan
								selectedPlan={selectedPlan}
								setSelectedPlan={setSelectedPlan}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={4}>
							<SelectedBenefit
								data={selectedPlan}
								setSelectedBenefits={setSelectedBenefits}
								selectedBenefits={selectedBenefits}
							/>
						</Grid> */}
              <Grid
                item
                xs={6}
                // sm={4}
              >
                <Input
                  label="Price"
                  onChange={(e) => setCostprice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Textarea
                  label="Comments"
                  onChange={(e) => setComments(e.target.value)}
                />
              </Grid>
              {/* <Box sx={{ width: '95%' }}>
							<Grid
								container
								spacing={2}
								m={1}>
								<Grid
									item
									xs={12}
									sm={3}>
									<input
										className=' is-small'
										value='Capitation'
										type='radio'
										onChange={(e) => handleServType(e)}
										style={{ marginRight: '5px' }}
									/>
									<span>Capitation</span>
								</Grid>
								<Grid
									item
									xs={12}
									sm={3}>
									<input
										className=' is-small'
										value='Fee for Service'
										type='radio'
										onChange={(e) => handleServType(e)}
										style={{ marginRight: '5px' }}
									/>

									<span>Fee for Service</span>
								</Grid>
								<Grid
									item
									xs={12}
									sm={3}>
									<input
										className='checkbox is-small'
										type='checkbox'
										onChange={(e) => setShowCoPay(!showCoPay)}
										style={{ marginRight: '5px' }}
									/>
									<span>Co-Pay?</span>
								</Grid>
								<Grid
									item
									xs={12}
									sm={3}>
									<input
										className='checkbox is-small'
										type='checkbox'
										onChange={(e) => handleAuthCode(e)}
										style={{ marginRight: '5px' }}
									/>
									<span>Requires Pre-Authorization Code</span>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}>
								<Grid
									item
									xs={12}
									sm={6}
									m={1}>
									{showCoPay && (
										<Input
											className='input smallerinput is-small is-pulled-right '
											onChange={(e) => handleCopay(e)}
											label='Co-pay Amount'
										/>
									)}
								</Grid>
							</Grid>
						</Box> */}
              <Box
                mx={1}
                sx={{
                  width: "100%",
                }}
              >
                {facilities.map((c, index) => {
                  const allCategories = c?.benefits?.map((cat) => cat);
                  console.log("ALL CATS", allCategories);
                  return (
                    <>
                      <Grid
                        container
                        spacing={2}
                        my={1}
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          sx={{ display: "flex", alignItems: "center" }}
                          xs={12}
                          // sm={2}
                          key={index}
                        >
                          <input
                            className="checkbox is-small "
                            type="checkbox"
                            value={index}
                            name={`selectedPlans +${index}`}
                            label={c.planName}
                            onChange={(event) => handleChange(event, index, c)}
                            style={{ marginRight: "10px" }}
                          />
                          <p
                            style={{
                              fontWeight: "bold",
                              marginRight: "10px",
                            }}
                          >
                            {c.planName}
                          </p>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <CustomSelect
                            options={allCategories}
                            label="Select Benefit Category"
                            onChange={(e) => {
                              setBeneCat(e.target.value);
                              setSelectNo(index);
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <CustomTariffSelect
                            key={index}
                            options={selectNo === index ? newBene : []}
                            label="Select Benefit"
                            onChange={(event) => handleBenefit(event, index, c)}
                          />
                        </Grid>
                        <Box display="flex" ml="1rem" gap="1rem">
                          <Box key={index}>
                            <input
                              className="is-small"
                              value="Capitation"
                              name={`servtype +${index}`}
                              type="radio"
                              onChange={(event) =>
                                handleServType(event, index, c)
                              }
                              style={{ marginRight: "10px" }}
                            />
                            <span>Capitation</span>
                          </Box>
                          <Box key={index}>
                            <input
                              className="is-small"
                              name={`servtype +${index}`}
                              value="Fee for Service"
                              type="radio"
                              onChange={(event) =>
                                handleServType(event, index, c)
                              }
                              style={{ marginRight: "10px" }}
                            />

                            <span>Fee for Service</span>
                          </Box>
                          <Box key={index}>
                            <input
                              className=" is-small"
                              name={`pay${index}`}
                              value="Fee for Service"
                              type="checkbox"
                              onChange={(event) => copaySelect(event, index)}
                              style={
                                showCoPay === index
                                  ? {
                                      marginBottom: ".6rem",
                                      marginRight: "10px",
                                    }
                                  : { marginBottom: "0", marginRight: "10px" }
                              }
                            />
                            <span>Co-Pay?</span>
                            {showCoPay === index && sCoPay && (
                              <Input
                                className="input smallerinput is-small is-pulled-right "
                                name={`copay +${index}`}
                                type="text"
                                onChange={(event) =>
                                  handleCopay(event, index, c)
                                }
                                label="Co-pay Amount"
                              />
                            )}
                          </Box>

                          <Box key={index}>
                            <input
                              className="checkbox is-small"
                              name={`authCode +${index}`}
                              type="checkbox"
                              onChange={(event) =>
                                handleAuthCode(event, index, c)
                              }
                              style={{ marginRight: "10px" }}
                            />
                            <span>Requires Pre-Auth?</span>
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
              </Box>
            </Grid>
          </Box>
        </ModalBox>
      )}
    </Box>
  );
};

export const TariffView = (service) => {
  const [editing, setEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: service.serviceName,
      comment: service.comment,
    },
  });
  const selected = service.service;
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FormsHeaderText text={service?.serviceName} />
        <Box>
          {!editing && (
            <GlobalCustomButton text="Edit" onClick={() => setEditing(true)} />
          )}
          {editing && (
            <GlobalCustomButton
              text="Save Form"
              type="submit"
              color="success"
            />
          )}
        </Box>
      </Box>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={4}>
          {!editing ? (
            <Input
              label="Service Name"
              value={selected?.serviceName}
              disabled
            />
          ) : (
            <Input label="Name" register={register("serviceName")} />
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          {!editing ? (
            <Input label="Duration" value={selected?.duration} disabled />
          ) : (
            <Input label="Duration" register={register("duration")} />
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          {!editing ? (
            <Input label="Status" value={selected?.status} disabled />
          ) : (
            <Input label="Status" register={register("status")} />
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          {!editing ? (
            <Textarea label="Comment" value={selected?.comments} disabled />
          ) : (
            <Textarea label="Price" register={register("comment")} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export function InheritTariff({ getBandfacility, newValue }) {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit } = useForm();
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const ServicesServ = client.service("tariff");
  const BandsServ = client.service("bands");
  const [providerBand, setProviderBand] = useState([]);
  const [selectedBand, setSelectedBand] = useState("");
  const Services = state.ServicesModule.selectedServices;

  const getProviderBand = async () => {
    if (user.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType:
            user.currentEmployee.facilityDetail.facilityType === "HMO"
              ? "Provider"
              : "Company",

          // storeId:state.StoreModule.selectedStore._id,
          // $limit:20,
          //   paginate:false,
          $sort: {
            category: 1,
          },
        },
      });
      await setProviderBand(findServices.data);
    }
  };

  useEffect(() => {
    getProviderBand();
  }, []);

  const onSubmit = async () => {
    let data = {
      organizationId: user.currentEmployee.facilityDetail._id,
      organizationName: user.currentEmployee.facilityDetail.facilityName,
      band: selectedBand,
      contracts: Services?.contracts,
    };

    ServicesServ.create(data)
      .then((res) => {
        toast.success("Tariff created succesfully");
      })
      .catch((err) => {
        toast.error("Error creating Tariff " + err);
      });
  };
  return (
    <Box>
      <Box sx={{ my: "1rem", display: "flex", justifyContent: "flex-end" }}>
        <GlobalCustomButton text="Save" onClick={handleSubmit(onSubmit)} />
      </Box>

      <Box display="flex" flexDirection="column" gap={3}>
        <Box>
          <CustomSelect
            name="bandType"
            placeholder="Choose Provider Band"
            options={providerBand}
            value={selectedBand}
            label="Select Provider Band"
            onChange={(e) => setSelectedBand(e.target.value)}
          />
        </Box>
        <Box>
          <BandSearch clear={success} />
        </Box>
      </Box>
    </Box>
  );
}

export const BandForm = () => {
  const BandServ = client.service("bands");
  const [success, setSuccess] = useState(false);
  const data = localStorage.getItem("band");
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    resolver: yupResolver(createBandSchema),

    defaultValues: {
      name: "",
      bandType: "",
      facility: user.currentEmployee.facilityDetail._id,
    },
  });

  const submit = useCallback(
    async (data, e) => {
      e.preventDefault();
      setSuccess(false);
      await BandServ.create(data)
        .then((res) => {
          toast.success(`Band successfully created`);
          reset();
        })
        .catch((err) => {
          toast.error(`Sorry, You weren't able to create a band. ${err}`);
        });
    },
    [data]
  );

  return (
    // <ModalBox
    // 	open={open}
    // 	onClose={setOpen}
    // 	width='40vw'
    // 	header={'Create Band'}>
    <form>
      <ToastContainer theme="colored" />
      <Box display="flex" justifyContent="flex-end" mb="1rem">
        <GlobalCustomButton
          onClick={handleSubmit(submit)}
          style={{ marginTop: "1rem" }}
        >
          <CreateIcon fontSize="small" sx={{ marginRight: "5px" }} />
          Create Band
        </GlobalCustomButton>
      </Box>
      <Grid>
        <Box mb="1rem">
          <Input
            label="Name of Band"
            register={register("name")}
            errorText={errors?.name?.message}
            sx={{ marginBottom: "2rem" }}
          />
        </Box>
        <Box mb="1rem">
          <CustomSelect
            label="Choose Band Type"
            name="bandType"
            options={bandTypeOptions}
            register={register("bandType")}
            control={control}
          />
        </Box>
        <Box>
          <Textarea
            label="Description"
            register={register("description")}
            name="description"
            type="text"
          />
        </Box>
      </Grid>
    </form>
    // </ModalBox>
  );
};

export function TariffModify() {
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [successService, setSuccessService] = useState(false);
  const [serviceUnavailable, setServiceUnavailable] = useState({
    status: false,
    name: "",
  });
  const { register, handleSubmit, control } = useForm();
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const ServicesServ = client.service("tariff");
  // const [selectTariff, setSelectTariff] = useState([]);
  const Services = state.ServicesModule.selectedServices;
  console.log(Services);
  const getSearchService = (obj) => {
    setService(obj);
    if (!obj) {
      setService("");
    }
    setSuccessService(false);
  };

  const notfound = async (obj) => {
    await setServiceUnavailable(obj);
    await setSuccessService(true);
    if (!obj) {
      await setServiceUnavailable("");
    }
  };

  const onSubmit = async (data) => {
    data.band = data.bandName;
    data.contracts = {
      serviceName: data.servicename,
      price: data.costPrice,
      comments: data.comment,
    };
    data.organizationId = Services.organizationId;
    data.organizationName = Services.organizationName;
    ServicesServ.patch(Services._id, data)
      .then((res) => {
        console.log(res);
        toast.success("Tariff updated succesfully");
      })
      .catch((err) => {
        toast.error("Error updating Tariff " + err);
      });
  };

  return (
    <>
      <Box sx={{ my: "1rem", display: "flex", justifyContent: "flex-end" }}>
        <GlobalCustomButton text="Update" onClick={handleSubmit(onSubmit)} />
      </Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          // sm={4}
        >
          <Input
            label="Band"
            name="bandName"
            register={register("bandName", { required: true })}
            defaultValue={Services.band}
          />
        </Grid>
        <Grid
          item
          xs={6}
          // sm={4}
        >
          <Input
            label="Price"
            name="servicename"
            register={register("servicename", { required: true })}
            defaultValue={Services.serviceName}
          />
          {/* <SearchSelect
						getSearchService={getSearchService}
						clear={successService}
						notfound={notfound}
						placeholder='Search Service'
						// name='servicename'
						// register={register('servicename', { required: true })}
						defaultValue={Services?.contracts?.serviceName}
					/> */}
        </Grid>
        <Grid
          item
          xs={6}
          // sm={4}
        >
          <Input
            label="Price"
            name="costPrice"
            register={register("costPrice", { required: true })}
            defaultValue={Services.price}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Textarea
            label="Comments"
            name="comment"
            register={register("comment", { required: true })}
            defaultValue={Services?.comments}
          />
        </Grid>
      </Grid>
    </>
  );
}
