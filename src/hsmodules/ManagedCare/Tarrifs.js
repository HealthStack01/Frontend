import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { ObjectContext, UserContext } from "../../context";
import { TableMenu } from "../dashBoardUiComponent/core-ui/styles";
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
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";


import {
  BandTariffSearch,
} from "../helpers/FacilitySearch";
import CustomTariffSelect from "./components/TariffSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { bandTypeOptions } from "../../dummy-data";
import CreateIcon from "@mui/icons-material/Create";
import { createBandSchema } from "../Admin/ui-components/schema";

export default function TarrifList({ standAlone }) {
  const [showModal, setShowModal] = useState(0);
  const [openBand, setOpenBand] = useState(false);
  const [openTarrif, setOpenTarrif] = useState(false);
  const [openTarrifModify, setOpenTarrifModify] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  const [openBandName, setOpenBandName] = useState(false);


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

  const handleHideBandNameModal = () => {
    setOpenBandName(false);
  };
  
  const handleBandNameModal = () => {
    setOpenBandName(true);
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
          showBandName={handleBandNameModal}
          // showServicesPlan={handlePlanModal}

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
        width="100%"
        open={openTarrifModify}
        onClose={handleHideTariffModifyModal}
        header="Modify Tariff"
      >
        <TariffModify />
      </ModalBox>

      <ModalBox
             open={openBandName}
             onClose={handleHideBandNameModal}
             header="Modify Band Name"
           >
            <ModifyBandNames/>
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
  setShowModal,
  showTariff,
  showBand,
  showTariffModify,
  showBandName
}) => {
  const [showView, setShowView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openTarrifModify, setOpenTarrifModify] = useState(false);
  const [tariffs, setTariffs] = useState([]);
  const [tariff, setTariff] = useState();
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const ServicesServ = client.service("tariff");
  const BandsServ = client.service("bands");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showService, setShowService] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [slide, setSlide] = useState(false);
  const [changeView, setChangeView] = useState("service");
  const [selectPlans, setSelectPlans] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [singleSelectPlan, setSingleSelectPlan] = useState(null)
 
const selectedServiceDetails = state.ServicesModule.selectedServices;
const selectedContractDetails = state.TariffModule.selectedContracts;


 
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

  };

  const handleService = async (Category) => {
      setSelectedCategory(Category?.contracts);
    const newContractModule = {
      selectedContracts: Category,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      TariffModule: newContractModule,
    }));
    const bandPlans = selectedServices?.map(data => {
      const allPlans = [];
      data.plans.map(plan => {
        const planData = {
          _id: plan._id,
          planName:plan.planName,
          planId: plan.planId,
          benefit:plan.benefit,
          benefitcategory :plan.benefitcategory,
          feeForService :plan.feeForService,
          capitation:plan.capitation,
          coPay:plan.coPay,
          copayDetail:plan.copayDetail,
          reqPA:plan.reqPA,
        };
    
        allPlans.push(planData);
      });
      return allPlans;
    });
    setSelectedCategory(bandPlans?.flat(1))
    setSelectPlans(selectedCategory)
   };

 

  const handleSearch = (val) => {
    const field = "name";
    // console.log(val);
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
    setLoading(true);
    if (user.currentEmployee) {
      const findServices = await ServicesServ.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $sort: {
            createdAt: -1,
          },
        },
      });
      // console.log(findServices.data);
      await setFacilities(findServices.data);
      setLoading(false);
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
      selector: (row) => row?.comments,
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
      selector: (row) => (row?.feeForService !== true ? "Yes" : "No"),
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
    {
      name: "Action",
      key: "Action",
      description: "Action",
      selector: (row, i) => (
        <GlobalCustomButton
          color="error"
          onClick={() => {
          setOpenPlan(true)
           setSingleSelectPlan(row);
            // // console.log("click", i, row);
            // setEditIndividualPremium(true);
            // setEditPlanType(row.planType);
            // setIndividualPremiumState(row);
            // setEditPremiumDurationType(row?.premiumDurationType);
            // setConfirmDialog(true);
          }
          }
          customStyles={{ float: "center", p: "0.1rem" }}
        >
          <CreateIcon fontSize="small" sx={{ marginRight: "5px" }} />
          Edit
        </GlobalCustomButton>
      ),
      sortable: false,
      required: false,
      inputType: "TEXT",
    },
    {
      name: "Delete",
      width: "50px",
      center: true,
      key: "delete",
      description: "Delete row",
      selector: (i, row) => (
        <IconButton
          onClick={() => {
            setSingleSelectPlan(i);
            setConfirmDialog(true);
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

  // DELETE THE PLANS FUNCTIONS
  function handleDelete(){
    // THIS IS USE TO THE THE SELECTED PLAN IN THE CONTRACTS
    const newUpdatedServices = Object.values(selectedCategory)?.filter((data) => data._id !== singleSelectPlan._id);
    // console.log(newUpdatedServices)

    const newPlanDetail = {
      ...selectedContractDetails,
      ...selectedServiceDetails,
      organizationId: user.currentEmployee.facilityDetail._id,
      organizationName: user.currentEmployee.facilityDetail.facilityName,
      band: selectedServiceDetails.bandName,
      contracts: [
        {
          serviceName: selectedContractDetails?.serviceName,
          comments: selectedContractDetails?.comments,
          price: selectedContractDetails?.price,
          plans: newUpdatedServices,
        },
      ],
    };

    // SELECTED SERVICES ID
    const selectId = selectedServiceDetails._id;

  //  console.log(selectId)

// THIS IS USE TO UPDATE THE CONTRACTS DATA, AFTER THE PLAN WAS DELETE FROM THE ARRAY
    ServicesServ.patch(selectId, newPlanDetail)
      .then((res) => {
        console.log(res)
        setSelectPlans(res.contracts.filter(item => item.serviceId === selectedCategory.serviceId).plans);
        setSelectedServices(res.contracts)
        setConfirmDialog(false);
        toast.success(`Plan successfully deleted!`);
      })
      .catch((err) => {
        toast.error(`Sorry, Unable to delete plan. ${err}`);
      });
    //}
  };
  console.log(selectedContractDetails)
console.log(selectedServiceDetails)
console.log(selectedServices)


  const conditionalRowStyles = [
    {
      when: (row) => row?.planId === selectPlans?.planId,
      style: {
        backgroundColor: "#4cc9f0",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

 
  return (
    <div>
     
      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmationAction={handleDelete}
        type="danger"
        message="Are you sure you want to delete this data?"
      />
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
              <Box display="flex" gap={2}>
                <GlobalCustomButton text="Add Band" onClick={showBand} />

                <GlobalCustomButton
                  text="Add Tarrif"
                  onClick={() => setShowModal(1)}
                  customStyles={{ marginLeft: "1rem" }}
                  // color='warning'
                />
              </Box>
            </TableMenu>
            <CustomTable
              title={""}
              columns={ServiceSchema}
              data={facilities}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={(row) => handleRow(row)}
            />
          </>
        )}

        {slide && (
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

              <Box my="1rem">
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
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: "1rem",
              }}
            >
              <FormsHeaderText text={selectedServiceDetails?.band} />

              <Box display="flex" gap="1rem">
          
                <GlobalCustomButton
          color="error"
          onClick={() => {showBandName()}}
        >

          <CreateIcon fontSize="small" sx={{ marginRight: "5px" }} />
          Edit Band Name
        </GlobalCustomButton>
                <GlobalCustomButton
                  text="Edit Services"
                  onClick={ () =>  showTariffModify()}
                  customStyles={{ marginLeft: "1rem" }}
                  color="warning"
                />
              </Box>
            </Box>
            <Box>
              {changeView === "service" ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    gap: "0.5rem"
                  }}
                >
                  <Box
                    sx={{
                      height: "calc(100vh - 170px)",
                      transition: "width 0.5s ease-in",
                      width: selectedCategory ? "30%" : "100%",
                    }}
                  >
                    <CustomTable
                      title={""}
                      columns={productItemSchema}
                      data={selectedServices || []}
                      pointerOnHover
                      highlightOnHover
                      striped
                      onRowClicked={(row) =>handleService(row)}
                      progressPending={loading}
                      conditionalRowStyles={conditionalRowStyles}
                    />
                 </Box>
                {selectedCategory && 
                 <Box 
                 sx={{
                  height: "calc(100vh - 170px)",
                  width: "80%",
                  transition: "width 0.5s ease-in",
                 }}
                 >
                  <CustomTable
                    title={""}
                    columns={otherServiceSchema}
                    data={selectPlans ? selectPlans : []}
                    pointerOnHover
                    highlightOnHover
                    striped
                    progressPending={loading}
                    // onRowClicked={(row) => handleDelete(row)}
                  />
                 </Box>
}
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
                    // onRowClicked={(row) => handleService(row)}
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

export const ModifyBandNames = () => {
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const ServicesServ = client.service("tariff");

const selectedServiceDetails = state.ServicesModule.selectedServices;
const selectedContractDetails = state.TariffModule.selectedContracts;

const { register, handleSubmit } = useForm();
    //UPDATE BAND FUNCTION
    const handleUpdateBand  = async(data) =>{
      const newPlanDetails = {
        ...selectedContractDetails,
      ...selectedServiceDetails,
        organizationId: user.currentEmployee.facilityDetail._id,
        organizationName: user.currentEmployee.facilityDetail.facilityName,
        band: data.bandName,
        contracts: [
          {
            serviceName: selectedContractDetails?.serviceName,
            comments: selectedContractDetails?.comments,
            price: selectedContractDetails?.price,
            plans: selectedContractDetails.plans
          },
        ],
      }
      const selectId = selectedServiceDetails._id;

   await ServicesServ.patch(selectId, newPlanDetails)
        .then((res) => {
          setState((prev) => ({
            ...prev,
            ServicesModule: { ...prev.ServicesModule, selectedServices: res},
          }));
          setState((prev) => ({
            ...prev,
            TariffModule: { ...prev.TariffModule, selectedCategory: res},
          }));
          toast.success(`Band name successfully updated!`);
        })
        .catch((err) => {
          toast.error(`Sorry, Unable to update band name. ${err}`);
        });
  }
  return (
    <Box>
   
            
          <Box display="flex" justifyContent="flex-end">
          <GlobalCustomButton
                        onClick={handleSubmit(handleUpdateBand)}
                        text="Save"
                        color="primary"
                        variant="contained"
                        sx={{my:'1rem'}}
                        // customStyles={{ float: "right" }}
                      />
          </Box>
             <Input
               label="Band"
               name="bandName"
               register={register("bandName", { required: true })}
                defaultValue={selectedServiceDetails?.band}
             />
    </Box>
  )
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
  // const Services = state.ServicesModule.selectedServices;

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
        comments: "",
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
    // let existBand = providerBand.filter((band) => band.name === data.name)

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
      selector: (row) => row?.comments,
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
        <Box sx={{ display: "flex", alignItems: "center", my: "1rem" }}>
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
          {/* <BandSearch 
				clear={success} 
				value={selectedBand} 
				onChange={(e) => setSelectedBand(e.target.value)}/> */}
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
              width: "80vw",
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
                my={2}
                sx={{
                  width: "100%",
                }}
              >
                {facilities.map((c, index) => {
                  const allCategories = c?.benefits?.map((cat) => cat);
                  console.log("ALL CATS", allCategories);
                  return (
                    <>
                      <Grid>
                        <Box display="flex" gap={4} pb={3}>
                          <Box
                            sx={{ display: "flex", alignItems: "center" }}
                            key={index}
                          >
                            <input
                              className="checkbox is-small "
                              type="checkbox"
                              value={index}
                              name={`selectedPlans +${index}`}
                              label={c.planName}
                              onChange={(event) =>
                                handleChange(event, index, c)
                              }
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
                          </Box>
                          {!c.checked ? null : (
                            <>
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
                                  onChange={(event) =>
                                    handleBenefit(event, index, c)
                                  }
                                />
                              </Grid>

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
                                  onChange={(event) =>
                                    copaySelect(event, index)
                                  }
                                  style={
                                    showCoPay === index
                                      ? {
                                          marginBottom: ".6rem",
                                          marginRight: "10px",
                                        }
                                      : {
                                          marginBottom: "0",
                                          marginRight: "10px",
                                        }
                                  }
                                />
                                <span>Co-Pay?</span>
                                {showCoPay === index && sCoPay && (
                                  <Input
                                    width="100%"
                                    // className='input smallerinput is-small is-pulled-right '
                                    name={`copay +${index}`}
                                    type="text"
                                    onChange={(event) =>
                                      handleCopay(event, index, c)
                                    }
                                    label="Amount"
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
                            </>
                          )}
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
  // console.log(Services)
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

      console.log("provideerBand", findServices.data);
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
          {/* <BandSearch clear={success} value={selectedBand} onChange={(e) => setSelectedBand(e.target.value)}/> */}
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
          <BandTariffSearch clear={success} />
        </Box>
      </Box>
    </Box>
  );
}

export const BandForm = () => {
  const BandServ = client.service("bands");
  const [success, setSuccess] = useState(false);
  const BandsServ = client.service("bands");
  const { state, setState } = useContext(ObjectContext);
  const [providerBand, setProviderBand] = useState([]);
  // const [existBand, setExistBand] = useState('');
  const Services = state.ServicesModule.selectedServices;

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

  const submit = useCallback(
    async (data, e) => {
      e.preventDefault();
      setSuccess(false);
      let existBand = providerBand.find((band) => band.name === name);

      if (existBand) {
        toast.error("Band name already exist");
      } else {
        await BandServ.create(data)
          .then((res) => {
            toast.success(`Band successfully created`);
            reset();
          })
          .catch((err) => {
            toast.error(`Sorry, You weren't able to create a band. ${err}`);
          });
      }
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

export function TariffModify({handleHideTariffModifyModal}) {
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const ServicesServ = client.service("tariff");
  // const [selectPlan, setSelectPlan] = useState([]);
  const [editing, setEditing] = useState(false);
  const [service, setService] = useState("");
  const [successService, setSuccessService] = useState(false);
  const [serviceUnavailable, setServiceUnavailable] = useState({
    status: false,
    name: "",
  });
  const [beneCat, setBeneCat] = useState("");
  const [newBene, setNewBene] = useState([]);
  const [selectNo, setSelectNo] = useState("");
  const [capitation, setCapitation] = useState(false);
  const [copayDetails, setCopayDetails] = useState('');
  const [showCoPay, setShowCoPay] = useState(false);
  const [feeForService, setFeeForService] = useState(true);
  const [sCoPay, setSCoPay] = useState(false);
  const [authCode, setAuthCode] = useState('');
  
  const selectedServiceDetails = state.ServicesModule.selectedServices;
  const selectedContractDetails = state.TariffModule.selectedContracts;

  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      bandName: selectedServiceDetails?.band,
      servicename: selectedContractDetails?.serviceName,
      comment: selectedContractDetails?.comments,
      costPrice: selectedContractDetails?.price,
    },
  });

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

  const onSubmit = async (data) => {
    setLoading(true);
    //  let contract = Services.contracts.find((data) => data._id === id )
    //  console.log(contract)
    
    const newPlanDetail = {
      ...selectedContractDetails,
      ...selectedServiceDetails,
      organizationId: user.currentEmployee.facilityDetail._id,
      organizationName: user.currentEmployee.facilityDetail.facilityName,
      band: selectedServiceDetails?.band,
      contracts: [
        {
          serviceName: service?.name,
          comments: data.comment,
          price: data.costPrice,
          plans: [
            { 
              planName:selectedContractDetails.plans[0]?.planName,
              benefit: selectedContractDetails.plans[0]?.benefit,
              benefitCategory: selectedContractDetails.plans[0]?.benefitCategory,
              feeforService: feeForService,
              capitation: capitation,
              reqPA: selectedContractDetails.plans[0]?.reqPA,
              coPay: selectedContractDetails.plans[0]?.coPay, 
              copayDetail: selectedContractDetails.plans[0]?.copayDetail,
              comments: selectedContractDetails.plans[0]?.comments,
            }
        ],
        },
      ],
    };

  

    // console.log(contractDetails);
  

    ServicesServ.patch(selectedServiceDetails._id, newPlanDetail)
      .then((res) => {
        console.log(res)
        setState((prev) => ({
          ...prev,
          ServicesModule: { ...prev.ServicesModule, selectedServices: res},
        }));
        setState((prev) => ({
          ...prev,
          TariffModule: { ...prev.TariffModule, selectedCategory: res},
        }));
        setLoading(false);
        toast.success("Tariff updated succesfully");
      })
      handleHideTariffModifyModal()
      .catch((err) => {
        setLoading(false);
        toast.error("Error updating Tariff " + err);
      });
  };

  return (
    <>
      <Box sx={{ my: "1rem", display: "flex", justifyContent: "flex-end" }}>
        {!editing ? (
          <GlobalCustomButton
            text="Edit"
            onClick={() => {
              setEditing(!editing);
            }}
          />
        ) : (
          <GlobalCustomButton
            color="success"
            text="Update"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        )}
      </Box>
      <Grid container spacing={2}>
       
        {!editing ? (
          <Grid
            item
            xs={6}
            // sm={4}
          >
            <Input
              label="Service Name"
              name="servicename"
              register={register("servicename", { required: true })}
              disabled={!editing}
              // defaultValue={.serviceName}
            />
          </Grid>
        ) : (
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
        )}
        {!editing ? (
          <Grid
            item
            xs={6}
            // sm={4}
          >
            <Input
              label="Price"
              name="costPrice"
              register={register("costPrice", { required: true })}
              disabled={!editing}
            />
          </Grid>
        ) : (
          <Grid
            item
            xs={6}
            // sm={4}
          >
            <Input
              label="Price"
              name="costPrice"
              register={register("costPrice", { required: true })}
            />
          </Grid>
        )}
        {!editing ? (
          <Grid item xs={12} sm={12}>
            <Textarea
              label="Comments"
              name="comment"
              register={register("comment", { required: true })}
              disabled={!editing}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={12}>
            <Textarea
              label="Comments"
              name="comment"
              register={register("comment", { required: true })}
            />
          </Grid>
        )}
      </Grid>
        <Box mt="2rem">
         {selectedContractDetails?.plans?.map((c, index) => {
                    const allCategories = c?.benefits?.map((cat) => cat);
                    return (
                      <>
                          <Box display="flex" gap={4} pb={3}>
                            <Box
                              sx={{ display: "flex", alignItems: "center",gap: "1rem" }}
                              key={index}
                            >
                              <input
                                className="checkbox is-small "
                                type="checkbox"
                                value={true}
                                name={`selectedPlans +${index}`}
                                label={c.planName}
                                defaultChecked={true}
                              />
                              <p
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {c.planName}
                              </p>
                            </Box>
                            <Grid container spacing={2} alignItems="center">
                            <Grid item xs={3}>
                                  <CustomSelect
                                    options={allCategories || []}
                                    label="Select Benefit Category"
                                    onChange={(e) => {
                                      setBeneCat(e.target.value);
                                      setSelectNo(index);
                                    }}
                                    defaultValue={c.benefit || ''}
                                  />
                                </Grid> 
                                <Grid item xs={3}>
                                  <CustomTariffSelect
                                    key={index}
                                    options={selectNo === index ? newBene : []}
                                    label="Select Benefit"
                                    onChange={(event) =>
                                      setNewBene(event.target.value)
                                    }
                                    defaultValue={c.comments ||''}
                                  />
                                </Grid>
                               <Box display="flex" px="1rem" gap="2rem" alignItems="center">
                                <Box key={index}>
                                   <input
                                    className="is-small"
                                    value="Capitation"
                                    name={`servtype +${index}`}
                                    type="radio"
                                    onChange={(event) =>
                                      setCapitation(event.target.value === "Capitation" ? true : false)
                                    }
                                    defaultChecked={c.capitation}
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
                                      setFeeForService(event.target.value === "Fee for Service" ? true : false)
                                    }
                                    defaultChecked={c.feeforService}
                                    style={{ marginRight: "10px" }}
                                  />
  
                                  <span>Fee for Service</span>
                                </Box>
                                <Box key={index}>
                                  <input
                                    className=" is-small"
                                    name={`pay${index}`}
                                    value= {sCoPay}
                                    type="checkbox"
                                    onChange={(event) =>
                                      setSCoPay(event.target.checked ? true && copayDetails : false)
                                    }
                                    defaultChecked={c.coPay}
                                    style={
                                      showCoPay === index
                                        ? {
                                            marginBottom: ".6rem",
                                            marginRight: "10px",
                                          }
                                        : {
                                            marginBottom: "0",
                                            marginRight: "10px",
                                          }
                                    }
                                  />
                                  <span>Co-Pay?</span>
                                  {showCoPay === index && sCoPay && (
                                    <Input
                                      width="100%"
                                      // className='input smallerinput is-small is-pulled-right '
                                      name={`copay +${index}`}
                                      type="text"
                                      value={copayDetails}
                                      onChange={(event) =>
                                        setCopayDetails(event.target.value)
                                      }
                                      defaultValue={c.copayDetail}
                                      label="Amount"
                                    />
                                  )}
                                </Box>
  
                                <Box key={index}>
                                  <input
                                    className="checkbox is-small"
                                    name={`authCode +${index}`}
                                    type="checkbox"
                                    value={authCode}
                                    onChange={(event) =>
                                      setAuthCode(event.target.checked ? true : false)
                                    }
                                    defaultChecked={c.reqPA}
                                    style={{ marginRight: "10px" }}
                                  />
                                  <span>Requires Pre-Auth?</span>
                                </Box>
                                </Box>
                                </Grid>
                          </Box>
                          
                      </>
                    );
                  })}
        </Box>
      
    </>
  );
}

export function AddService() {
  const [, setPriceState] = useState({
    bronze: false,
    gold: false,
    silver: false,
    platinium: false,
  });
  const { state, setState } = useContext(ObjectContext);
  const Services = state.ServicesModule.selectedServices;
  const HealthPlanServ = client.service("healthplan");
  //const history = useHistory()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [facilityId, setFacilityId] = useState("");
  const [name, setName] = useState("");
  const [bandName, setBandName] = useState("");
  const [benefittingplans, setBenefittingPlans] = useState([]);
  const ServicesServ = client.service("tariff");
  const [service, setService] = useState("");
  const [productItem, setProductItem] = useState([]);
  const [selectedBand, setSelectedBand] = useState("");
  const [showCoPay, setShowCoPay] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [sCoPay, setSCoPay] = useState(false);
  const [beneCat, setBeneCat] = useState("");
  const [newBene, setNewBene] = useState([]);
  const [selectNo, setSelectNo] = useState("");
  const [orgType, setOrgType] = useState("");
  const [successService, setSuccessService] = useState(false);

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

  const getFacilities = async () => {
    // console.log(user);
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
    // setBenefittingPlans1([]);
    setFacilityId(user.currentEmployee.facilityDetail._id);
    setName(user.currentEmployee.facilityDetail.facilityName);
    setOrgType(user.currentEmployee.facilityDetail.facilityType);
    // getProviderBand();
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
        comments: "",
      };
      //   console.log(planx)
      await setBenefittingPlans((prev) => [...prev, planx]);
    } else {
      await setBenefittingPlans((prevstate) =>
        prevstate.filter((el) => el.name !== c.name)
      ); //remove from benefiting plan
    }
  };
  const contractDetails = state.TariffModule.selectedContracts;
  const servicesDetails = state.ServicesModule.selectedServices;

  const handleClickServices = async (data) => {
    setLoading(true);
    //  let contract = Services.contracts.find((data) => data._id === id )
    //  console.log(contract)
    const newPlanDetail = {
      ...contractDetails,
      ...servicesDetails,
      organizationId: user.currentEmployee.facilityDetail._id,
      organizationName: user.currentEmployee.facilityDetail.facilityName,
      band: data.bandName,
      contracts: [
        {
          serviceName: service?.name,
          comments: data.comment,
          price: data.costPrice,
          plans: contractDetails?.plans,
        },
      ],
    };

    ServicesServ.patch(servicesDetails._id, newPlanDetail)
      .then((res) => {
        // console.log(res);
        setState((prev) => ({
          ...prev,
          ServicesModule: { ...prev.ServicesModule, selectedServices: res },
        }));
        setState((prev) => ({
          ...prev,
          TariffModule: { ...prev.TariffModule, selectedCategory: res },
        }));
        setLoading(false);
        toast.success("Tariff updated succesfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error updating Tariff " + err);
      });
  };

  // const contractDetails = state.TariffModule.selectedContracts;

  // const handleClickServices = async () => {
  //   let seviceItem = {
  //     source_org: user.currentEmployee.facilityDetail,
  //     source_org_name: user.currentEmployee.facilityDetail.facilityName,
  //     serviceName: contractDetails.serviceName,
  //     serviceId: contractDetails.service._id,
  //     price: contractDetails.price,
  //     comments: contractDetails.comments,
  //     plans: benefittingplans,
  //   };

  //   const id = contractDetails._id;

  //   ServicesServ.patch(id, seviceItem)
  //     .then((res) => {
  //       toast.success("Tariff updated succesfully");
  //     })
  //     .catch((err) => {
  //       toast.error("Error updating Tariff " + err);
  //     });
  // };

  // const newUpdatedServices = Object.values(contractDetails)?.find((data) => data._id == serviceSN._id)


  return (
    <Box
      sx={{
        width: "80vw",
      }}
    >
      <GlobalCustomButton
        type="button"
        variant="contained"
        color="success"
        onClick={handleClickServices}
        text="Add Service"
        customStyles={{ float: "right" }}
      />
    <Grid container spacing={2}>
        {/* <Grid
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
        <Grid
          item
          xs={6}
          // sm={4}
        >
          <Input label="Price" onChange={(e) => setCostprice(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Textarea
            label="Comments"
            onChange={(e) => setComments(e.target.value)}
          />
        </Grid>  */}
        <Box
          mx={1}
          my={2}
          sx={{
            width: "100%",
          }}
        >
          {facilities.map((c) => {
            const allCategories = c?.benefits?.map((cat) => cat);
            // console.log("ALL CATS", allCategories);
            return (
              <>
                <Grid>
                  <Box display="flex" gap={4} pb={3}>
                    <Box
                      sx={{ display: "flex", alignItems: "center" }}
                      key={c._id}
                    >
                      <input
                        className="checkbox is-small "
                        type="checkbox"
                        value={c._id}
                        name={`selectedPlans +${c._id}`}
                        label={c.planName}
                        onChange={(event) => handleChange(event, c._id, c)}
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
                    </Box>
                    {!c.checked ? null : (
                      <>
                        <Grid item xs={12} sm={2}>
                          <CustomSelect
                            options={allCategories}
                            label="Select Benefit Category"
                            onChange={(e) => {
                              setBeneCat(e.target.value);
                              setSelectNo(c._id);
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <CustomTariffSelect
                            key={c._id}
                            options={selectNo === c._id ? newBene : []}
                            label="Select Benefit"
                            onChange={(event) => handleBenefit(event, c._id, c)}
                          />
                        </Grid>

                        <Box key={c._id}>
                          <input
                            className="is-small"
                            value="Capitation"
                            name={`servtype +${c._id}`}
                            type="radio"
                            onChange={(event) =>
                              handleServType(event, c._id, c)
                            }
                            style={{ marginRight: "10px" }}
                          />
                          <span>Capitation</span>
                        </Box>
                        <Box key={c._id}>
                          <input
                            className="is-small"
                            name={`servtype +${c._id}`}
                            value="Fee for Service"
                            type="radio"
                            onChange={(event) =>
                              handleServType(event, c._id, c)
                            }
                            style={{ marginRight: "10px" }}
                          />

                          <span>Fee for Service</span>
                        </Box>
                        <Box key={c._id}>
                          <input
                            className=" is-small"
                            name={`pay${c._id}`}
                            value="Fee for Service"
                            type="checkbox"
                            onChange={(event) => copaySelect(event, c._id)}
                            style={
                              showCoPay === c._id
                                ? {
                                    marginBottom: ".6rem",
                                    marginRight: "10px",
                                  }
                                : {
                                    marginBottom: "0",
                                    marginRight: "10px",
                                  }
                            }
                          />
                          <span>Co-Pay?</span>
                          {showCoPay === c._id && sCoPay && (
                            <Input
                              width="100%"
                              // className='input smallerinput is-small is-pulled-right '
                              name={`copay +${c._id}`}
                              type="text"
                              onChange={(event) => handleCopay(event, c._id, c)}
                              label="Amount"
                            />
                          )}
                        </Box>

                        <Box key={c._id}>
                          <input
                            className="checkbox is-small"
                            name={`authCode +${c._id}`}
                            type="checkbox"
                            onChange={(event) =>
                              handleAuthCode(event, c._id, c)
                            }
                            style={{ marginRight: "10px" }}
                          />
                          <span>Requires Pre-Auth?</span>
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>
              </>
            );
          })}
        </Box>
      </Grid>
    </Box>
  );
}

