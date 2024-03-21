import {useState, useContext, useEffect, useCallback} from "react";
import {Box, Grid, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useForm} from "react-hook-form";
import {getPlansColumns, getServicesColumns} from "./columns";

import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import client from "../../../../feathers";
import CustomSelect from "../../../../components/inputs/basic/Select";
import {ObjectContext, UserContext} from "../../../../context";
import CustomTable from "../../../../components/customtable";
import {FormsHeaderText} from "../../../../components/texts";
import {toast} from "react-toastify";
import SearchSelect from "../../../helpers/SearchSelect";
import Input from "../../../../components/inputs/basic/Input";
import Textarea from "../../../../components/inputs/basic/Textarea";
import {AddServicePlan} from "./Services";
import ModalBox from "../../../../components/modal";
import UploadTarrifComponent from "../../UploadTarrif"

const CreateTariff = ({goBack}) => {
  const bandServer = client.service("bands");
  const tariffsServer = client.service("tariff");
  const {user} = useContext(UserContext);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const {setValue, handleSubmit, control} = useForm();
  const [bands, setBands] = useState([]);
  const [services, setServices] = useState([]);

  const getBands = useCallback(async () => {
    showActionLoader();
    const resp = await bandServer.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        bandType:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? "Provider"
            : "Company",
        $sort: {
          category: 1,
        },
      },
    });
    setBands(resp.data);
    hideActionLoader();
  }, [user.currentEmployee.facilityDetail]);

  useEffect(() => {
    getBands();
  }, [getBands]);

  const handleGoBack = () => {
    goBack();
  };

  const handleCreateTarrif = data => {
    if (services.length < 1)
      return toast.error("Please add at least one(1) Service...");
    showActionLoader();
    const selectedBand = bands.find(
      item => item.name.toLowerCase() === data.band_name.toLowerCase()
    );
    console.log(selectedBand);

    const tarrifData = {
      organizationId: user.currentEmployee.facilityDetail._id,
      organizationName: user.currentEmployee.facilityDetail.facilityName,
      band: selectedBand.name,
      bandId: selectedBand._id,
      contracts: services,
      providers: [],
    };

    tariffsServer
      .create(tarrifData)
      .then(res => {
        hideActionLoader();
        toast.success("Tariff created succesfully");
        setServices([]);
        setValue("band_name", null);
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error creating Tariff " + err);
      });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "1px solid #f8f8f8",
          backgroundColor: "#f8f8f8",
          position: "sticky",
          zIndex: 99,
          top: 0,
          left: 0,
        }}
        mb={2}
        p={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon sx={{marginRight: "3px"}} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              Create a new Tariff
            </Typography>
          </Box>
        </Box>

        <Box>
          <GlobalCustomButton onClick={handleSubmit(handleCreateTarrif)}>
            Create Tariff
          </GlobalCustomButton>
        </Box>
      </Box>

      <Box
        sx={{
          width: "40vw",
        }}
        p={2}
      >
        <CustomSelect
          name="band_name"
          options={bands}
          control={control}
          required
          important
          label="Select Band"
        />
      </Box>

      <Box>
        <CreateTariffServicesList
          services={services}
          setServices={setServices}
        />
      </Box>
    </Box>
  );
};

export default CreateTariff;

const CreateTariffServicesList = ({services, setServices}) => {
  const [selectedService, setSelectedService] = useState(null);
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [importModal, setImportModal] = useState(false);

  const deleteService = service => {
    setServices(prev =>
      prev.filter(item => item.serviceId !== service.serviceId)
    );
    if (service.serviceId === selectedService.serviceId) {
      setSelectedService(null);
    }
  };

  const deletePlan = plan => {
    const prevPlans = selectedService.plans;

    const newPlans = prevPlans.filter(item => item.planId !== plan.planId);

    const newServices = services.map(item => {
      if (item.serviceId === selectedService.serviceId) {
        return {
          ...item,
          plans: newPlans,
        };
      } else {
        return item;
      }
    });

    setServices(newServices);
    setSelectedService(prev => ({
      ...prev,
      plans: newPlans,
    }));
  };

  const plansColumns = getPlansColumns(deletePlan);

  const servicesColumns = getServicesColumns(deleteService, null, true);

  const handleServicesRowClick = service => {
    console.log(service);
    if (selectedService && service.serviceId === selectedService.serviceId)
      return setSelectedService(null);

    setSelectedService(service);
  };

  const conditionalRowStyles = [
    {
      when: row =>
        selectedService && selectedService.serviceId === row.serviceId,
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
    <Box p={2}>
      <ModalBox
        open={addServiceModal}
        onClose={() => setAddServiceModal(false)}
        header={`Add New Service To Tarrif`}
      >
        <AddNewService
          closeModal={() => setAddServiceModal(false)}
          setServices={setServices}
        />
      </ModalBox>
      <ModalBox
        open={importModal}
        onClose={() => setImportModal(false)}
        header={`Import Tarrif Services`}
      >
        <UploadTarrifComponent
         closeModal={() => setImportModal(false)}
          setServices={setServices}
        />
      </ModalBox>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={1.5}
      >
        <FormsHeaderText text="List of Services" />

        <GlobalCustomButton onClick={() => setAddServiceModal(true)}>
          Add New Service
        </GlobalCustomButton>
        <GlobalCustomButton onClick={() => setImportModal(true)}>
          Import Services
        </GlobalCustomButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "calc(100vh - 170px)",
            transition: "width 0.5s ease-in",
            width: selectedService ? "39%" : "100%",
          }}
        >
          <CustomTable
            title={""}
            columns={servicesColumns}
            data={services}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleServicesRowClick}
            progressPending={false}
            conditionalRowStyles={conditionalRowStyles}
            CustomEmptyData={
              <Typography sx={{fontSize: "0.8rem"}}>
                There are no services for this Tarrif yet
              </Typography>
            }
          />
        </Box>

        {selectedService && (
          <Box
            sx={{
              height: "calc(100% - 70px)",
              width: "59%",
            }}
          >
            <CustomTable
              title={""}
              columns={plansColumns}
              data={selectedService.plans || []}
              pointerOnHover
              highlightOnHover
              striped
              progressPending={false}
              //onRowClicked={handlePlansRowClick}
              CustomEmptyData={
                <Typography sx={{fontSize: "0.8rem"}}>
                  There are no Plans for this Service yet
                </Typography>
              }
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const AddNewService = ({closeModal, setServices}) => {
  const healthPlanServer = client.service("healthplan");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {register, control, handleSubmit} = useForm();
  const [servicePlans, setServicePlans] = useState([]);

  const [healthPlans, setHealthPlans] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [clearSearch, setClearSearch] = useState(false);

  const handleGetSearchedResult = service => {
    setSearchResult(service);
  };

  const getHealthPlans = useCallback(async () => {
    showActionLoader();
    let query = {
      organizationId: user.currentEmployee.facilityDetail._id,
      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };

    const resp = await healthPlanServer.find({query: query});

    setHealthPlans(resp.data);
    hideActionLoader();
  }, [user.currentEmployee]);

  useEffect(() => {
    getHealthPlans();
  }, [getHealthPlans]);

  const handleAddService = data => {
    if (!searchResult) return toast.warning("Please select a Service");
    if (servicePlans.length <= 0)
      return toast.warning("Please include at least one(1) plan");

    const service = {
      ...data, //comments and costprice
      source_org: user.currentEmployee.facilityDetail,
      source_org_name: user.currentEmployee.facilityDetail.facilityName,
      serviceName: searchResult.name,
      serviceId: searchResult._id,
      plans: servicePlans,
      billing_type:
        user.currentEmployee.facilityDetail.facilityType === "HMO"
          ? "HMO"
          : "Company",
    };

    setServices(prev => [service, ...prev]);
    closeModal();
    toast.success("Service Added to Tariff");
  };

  return (
    <Box
      sx={{
        width: "85vw",
        maxHeight: "80vh",
      }}
      gap={1}
    >
      <Grid container spacing={2}>
        <Grid item lg={8} md={7} sm={6} xs={12}>
          <SearchSelect
            getSearchService={handleGetSearchedResult}
            clear={clearSearch}
            //notfound={notfound}
            placeholder="Search for Service"
          />
        </Grid>

        <Grid item lg={4} md={5} sm={6} xs={12}>
          <Input
            label="Price"
            type="number"
            register={register("price", {required: true})}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Textarea
            label="Comments"
            register={register("comments", {required: true})}
          />
        </Grid>
      </Grid>

      <Box>
        {healthPlans.map((plan, index) => {
          return (
            <AddServicePlan
              key={plan._id}
              plan={plan}
              setServicePlans={setServicePlans}
              servicePlans={servicePlans}
              healthPlans={healthPlans}
            />
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <GlobalCustomButton onClick={handleSubmit(handleAddService)}>
          Add Service
        </GlobalCustomButton>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
