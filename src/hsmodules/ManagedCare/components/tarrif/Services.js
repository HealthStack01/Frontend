import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { ObjectContext, UserContext } from "../../../../context";
import { FormsHeaderText } from "../../../../components/texts";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import CustomTable from "../../../../components/customtable";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import { useForm } from "react-hook-form";
import SearchSelect from "../../../helpers/SearchSelect";
import Input from "../../../../components/inputs/basic/Input";
import Textarea from "../../../../components/inputs/basic/Textarea";
import ModalBox from "../../../../components/modal";
import client from "../../../../feathers";
import CustomSelect from "../../../../components/inputs/basic/Select";
import CustomTariffSelect from "../TariffSelect";
import GroupedRadio from "../../../../components/inputs/basic/Radio/GroupedRadio";
import { toast } from "react-toastify";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import { getPlansColumns, getServicesColumns } from "./columns";
import ReviewRequestComponent from "./ReviewRequest";

const TarrifServices = ({ provider }) => {
  const tarrifsServer = client.service("tariff");
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const [selectedService, setSelectedService] = useState(null);
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [services, setServices] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [chosenServices, setChosenServices] = useState([]);
  const containerScrollRef = useRef(null);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    message: "",
    type: "",
    action: null,
  });

  const handleOnTableScroll = () => {
    if (containerScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        containerScrollRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // TO SOMETHING HERE
        console.log("Reached bottom");
      }
    }
  };

  useEffect(() => {
    setServices(state.TarrifModule.selectedTarrif.contracts);
  }, [state.TarrifModule.selectedTarrif]);

  useEffect(() => {
    const stateService = state.TarrifModule.selectedService;
    if (selectedService && selectedService._id === stateService._id) {
      setSelectedService(stateService);
    } else {
      return;
    }
  }, [state.TarrifModule.selectedService]);

  const unSelectService = () => {
    setState((prev) => ({
      ...prev,
      sideMenu: {
        ...prev.sideMenu,
        open: true,
      },
    }));

    setSelectedService(null);
  };

  const handleServicesRowClick = (service) => {
    if (selectedService && service._id === selectedService._id)
      return unSelectService();

    setSelectedService(service);
    setState((prev) => ({
      ...prev,
      sideMenu: {
        ...prev.sideMenu,
        open: false,
      },
    }));
  };

  const handlePlansRowClick = (plan) => {
    console.log(plan);
  };

  const handleDeletePlan = (plan) => {
    showActionLoader();
    const prevTarrif = state.TarrifModule.selectedTarrif;
    const prevServices = prevTarrif.contracts;

    const prevPlans = selectedService.plans || [];

    const newPlans = prevPlans.filter((item) => item.planId !== plan.planId);

    const newSelectedService = {
      ...selectedService,
      plans: newPlans,
    };

    const newServices = prevServices.map((item) => {
      if (item._id === selectedService._id) {
        return newSelectedService;
      } else {
        return item;
      }
    });
    return tarrifsServer
      .patch(prevTarrif._id, { contracts: newServices })
      .then((res) => {
        setState((prev) => ({
          ...prev,
          TarrifModule: {
            ...prev.TarrifModule,
            selectedTarrif: res,
          },
        }));

        setSelectedService(newSelectedService);
        cancelConfirmDialog();
        hideActionLoader();

        toast.success(
          `You have succesfully deleted a plan from Service - ${newSelectedService.serviceName}`
        );
      })
      .catch((err) => {
        toast.error("Failed to delete plan from Service" + err);
        hideActionLoader();
      });
  };

  const handleDeleteService = (service) => {
    showActionLoader();

    const prevTarrif = state.TarrifModule.selectedTarrif;
    const prevServices = prevTarrif.contracts;

    const newServices = prevServices.filter((item) => item._id !== service._id);

    return tarrifsServer
      .patch(prevTarrif._id, { contracts: newServices })
      .then((res) => {
        setState((prev) => ({
          ...prev,
          TarrifModule: {
            ...prev.TarrifModule,
            selectedTarrif: res,
          },
        }));
        if (selectedService._id === service._id) {
          setSelectedService(null);
        }
        cancelConfirmDialog();
        hideActionLoader();
        toast.success(
          `You have succesfully deleted a new Service from Tarrif - ${res.band}`
        );
      })
      .catch((err) => {
        toast.error("Failed to delete Service from Tariff " + err);
        hideActionLoader();
      });
  };

  const confirmDeletePlan = (plan) => {
    setConfirmDialog({
      open: true,
      message: `You're about to delete a plan named - ${plan.planName} from a service - ${selectedService.serviceName}`,
      type: "danger",
      action: () => handleDeletePlan(plan),
    });
  };

  const confirmDeleteService = (service) => {
    setConfirmDialog({
      open: true,
      message: `You're about to delete a Service named - ${service.serviceName}`,
      type: "danger",
      action: () => handleDeleteService(service),
    });
  };

  const handleEditService = (service) => {
    setState((prev) => ({
      ...prev,
      TarrifModule: {
        ...prev.TarrifModule,
        selectedService: service,
      },
    }));
    setEditModal(true);
  };

  const plansColumns = getPlansColumns(confirmDeletePlan, provider);

  const servicesColumns = getServicesColumns(
    confirmDeleteService,
    handleEditService,
    provider,
    provider
  );

  const conditionalRowStyles = [
    {
      when: (row) => row?._id === selectedService?._id,
      style: {
        backgroundColor: "#4cc9f0",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const cancelConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      message: "",
      type: "",
      action: null,
    });
  };

  const handleRowSelected = useCallback((state) => {
    setChosenServices(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleAction = () => {
      setReviewModal(true);
    };

    return (
      <Box sx={{ display: "flex", gap: "10px" }}>
        <GlobalCustomButton
          key="delete"
          onClick={handleAction}
          //style={{backgroundColor: 'red'}}
        >
          Request Review
        </GlobalCustomButton>
      </Box>
    );
  }, [chosenServices, services, toggleCleared]);

  return (
    <Box>
      <CustomConfirmationDialog
        open={confirmDialog.open}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmationAction={confirmDialog.action}
        cancelAction={cancelConfirmDialog}
      />
      <ModalBox
        open={addServiceModal}
        onClose={() => setAddServiceModal(false)}
        header={`Add New Service To Tarrif - ${state.TarrifModule.selectedTarrif.band}`}
      >
        <AddNewService closeModal={() => setAddServiceModal(false)} />
      </ModalBox>

      <ModalBox
        open={reviewModal}
        onClose={() => setReviewModal(false)}
        header={`Request Review on ${chosenServices.length} Services`}
      >
        <ReviewRequestComponent
          closeModal={() => setReviewModal(false)}
          services={chosenServices}
        />
      </ModalBox>

      <ModalBox
        open={editModal}
        onClose={() => setEditModal(false)}
        header={`Edit Service - ${state.TarrifModule.selectedService.serviceName}`}
      >
        <ServiceDetailsEdit closeModal={() => setEditModal(false)} />
      </ModalBox>

      {!provider && (
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
        </Box>
      )}

      <Box
        sx={{
         // height: "50%",  //"calc(100% - 270px)",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          overflow: "auto",
        }}
      >
        {/* <Box
          sx={{
            height: "calc(100vh - 200px)",
            transition: "width 0.5s ease-in",
            width: selectedService ? "39.5%" : "100%",
            overflow: "auto",
          }}
          ref={containerScrollRef}
          onScroll={handleOnTableScroll}
        > */}
        <div
          style={{
            width: selectedService ? "39.5%" : "100%",
            height: "calc(100vh - 170px)",
            overflow: "auto",
          }}
          ref={containerScrollRef}
          onScroll={handleOnTableScroll}
        >
          <CustomTable
            title={provider ? "List of Tariff Services" : ""}
            columns={servicesColumns}
            data={services}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleServicesRowClick}
            progressPending={false}
            conditionalRowStyles={conditionalRowStyles}
            selectable={provider}
            contextActions={contextActions}
            clearSelectedRows={toggleCleared}
            noHeader={false}
            onSelectedRowsChange={handleRowSelected}
            CustomEmptyData={
              <Typography sx={{ fontSize: "0.8rem" }}>
                There are no services for this Tarrif yet
              </Typography>
            }
          />
        </div>

        {/* </Box> */}

        {selectedService && (
          <Box
            sx={{
              height: "calc(100% - 70px)",
              width: "59.5%",
            }}
          >
            <CustomTable
              title={`Listed Plans for Service - ${selectedService?.serviceName}`}
              columns={plansColumns}
              data={selectedService.plans || []}
              pointerOnHover
              highlightOnHover
              striped
              progressPending={false}
              noHeader={false}
              onRowClicked={handlePlansRowClick}
              CustomEmptyData={
                <Typography sx={{ fontSize: "0.8rem" }}>
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

export default TarrifServices;

export const AddNewService = ({ closeModal }) => {
  const tarrifsServer = client.service("tariff");
  const healthPlanServer = client.service("healthplan");
  const { user } = useContext(UserContext);
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const { register, control, handleSubmit, reset, setValue } = useForm();
  const [servicePlans, setServicePlans] = useState([]);

  const [healthPlans, setHealthPlans] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [clearSearch, setClearSearch] = useState(false);

  const handleGetSearchedResult = (service) => {
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

    const resp = await healthPlanServer.find({ query: query });

    setHealthPlans(resp.data);
    hideActionLoader();
  }, [user.currentEmployee]);

  useEffect(() => {
    getHealthPlans();
  }, [getHealthPlans]);

  const handleAddService = (data) => {
    if (!searchResult) return toast.warning("Please select a Service");
    if (servicePlans.length <= 0)
      return toast.warning("Please include at least one(1) plan");

    showActionLoader();

    const prevTarrif = state.TarrifModule.selectedTarrif;
    const prevServices = prevTarrif.contracts;

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

    const newServices = [service, ...prevServices];

    //return console.log(newServices);

    return tarrifsServer
      .patch(prevTarrif._id, { contracts: newServices })
      .then((res) => {
        setState((prev) => ({
          ...prev,
          TarrifModule: {
            ...prev.TarrifModule,
            selectedTarrif: res,
          },
        }));
        closeModal();
        hideActionLoader();
        toast.success(
          `You have succesfully added a new Service to Tarrif ${res.band}`
        );
      })
      .catch((err) => {
        toast.error("Failed to add new Service to Tariff " + err);
        hideActionLoader();
      });
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
            register={register("price", { required: true })}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Textarea
            label="Comments"
            register={register("comments", { required: true })}
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

export const AddServicePlan = ({ plan, setServicePlans, servicePlans }) => {
  const { register, control, watch, setValue } = useForm({
    defaultValues: {
      service_type: "Fee For Service",
      co_pay_amount: 0,
    },
  });
  const [selectPlan, setSelectPlan] = useState(false);
  const [coPay, setCoPay] = useState(false);
  const [preAuth, setPreAuth] = useState(false);
  const [benefits, setBenefits] = useState([]);

  const allCategories = plan?.benefits?.map((item) => item.category);

  const handleSelectPlan = (event) => {
    const isChecked = event.target.checked;
    setSelectPlan(isChecked);

    const planData = {
      planId: plan._id,
      planName: plan.planName,
      benefit: "",
      benefitcategory: "",
      feeForService: true,
      capitation: false,
      reqPA: false,
      coPay: false,
      copayDetail: "",
      comments: "",
    };

    if (isChecked) {
      setServicePlans((prev) => [planData, ...prev]);
    } else {
      setServicePlans((prev) =>
        prev.filter((item) => item.planId !== plan._id)
      );
    }
  };

  const handleChangePreAuth = (event) => {
    const isChecked = event.target.checked;
    const selectedPlan = servicePlans.find((item) => item.planId === plan._id);

    const updatedPlan = {
      ...selectedPlan,
      reqPA: isChecked,
    };

    const newServicePlans = servicePlans.map((item) => {
      if (item.planId === plan._id) {
        return updatedPlan;
      } else {
        return item;
      }
    });

    setServicePlans(newServicePlans);
    setPreAuth(isChecked);
  };

  const handleChangeCoPay = (event) => {
    const isChecked = event.target.checked;
    const selectedPlan = servicePlans.find((item) => item.planId === plan._id);

    const updatedPlan = {
      ...selectedPlan,
      coPay: isChecked,
    };

    const newServicePlans = servicePlans.map((item) => {
      if (item.planId === plan._id) {
        return updatedPlan;
      } else {
        return item;
      }
    });

    setServicePlans(newServicePlans);
    setCoPay(isChecked);
  };

  const service_type = watch("service_type");
  const benefit_category = watch("benefit_category");
  const co_pay_amount = watch("co_pay_amount");
  const benefit = watch("benefit");

  const handleHookFormChange = useCallback(() => {
    const selectedPlan = servicePlans.find((item) => item.planId === plan._id);

    const updatedPlan = {
      ...selectedPlan,
      feeForService: service_type.toLowerCase() === "fee for service",
      capitation: service_type.toLowerCase() === "capitation",
      benefitcategory: benefit_category || "",
      copayDetail: co_pay_amount.toString(),
      benefit: benefit || "",
    };

    const newServicePlans = servicePlans.map((item) => {
      if (item.planId === plan._id) {
        return updatedPlan;
      } else {
        return item;
      }
    });

    setServicePlans(newServicePlans);
  }, [service_type, benefit_category, co_pay_amount, benefit]);

  const updateBenefits = useCallback(() => {
    const benefitCat = plan.benefits.filter(
      (item) => item.category === benefit_category
    );
    const fits = benefitCat.map((item) => item.comments);
    setBenefits(benefitCat);
    setValue("benefit", fits[0]);
  }, [benefit_category]);

  useEffect(() => {
    handleHookFormChange();
  }, [handleHookFormChange]);

  useEffect(() => {
    updateBenefits();
  }, [updateBenefits]);

  return (
    <Box mt={0.7}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "160px",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={selectPlan}
                  name={plan._id}
                  onChange={(event) => handleSelectPlan(event)}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                  }}
                >
                  {plan.planName}
                </Typography>
              }
            />
          </FormGroup>
        </Box>

        <Box
          sx={{
            width: "calc(100% - 175px)",
            visibility: selectPlan ? "visible" : "hidden",
          }}
        >
          <Grid container spacing={1.5}>
            <Grid item lg={2} md={2}>
              <CustomSelect
                options={allCategories || []}
                label="Benefit Category"
                name="benefit_category"
                control={control}
              />
            </Grid>

            <Grid item lg={2} md={3}>
              <CustomSelect
                options={benefits.map((item) => item.comments)}
                label="Select Benefit"
                name="benefit"
                control={control}
              />
            </Grid>

            <Grid item lg={3} md={3}>
              <GroupedRadio
                row
                options={["Fee For Service", "Capitation"]}
                control={control}
                name="service_type"
              />
            </Grid>

            <Grid item lg={2}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={preAuth}
                      name={"pre-auth"}
                      onChange={(event) => handleChangePreAuth(event)}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                      }}
                    >
                      Pre-Auth
                    </Typography>
                  }
                />
              </FormGroup>
            </Grid>

            <Grid item lg={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={coPay}
                      name={"pre-auth"}
                      onChange={(event) => handleChangeCoPay(event)}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                      }}
                    >
                      Co-pay
                    </Typography>
                  }
                />
              </FormGroup>

              <Box sx={{ visibility: coPay ? "visible" : "hidden" }}>
                <Input
                  register={register("co_pay_amount")}
                  label="Amount"
                  type="number"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export const ServiceDetailsEdit = ({ closeModal }) => {
  const tarrifsServer = client.service("tariff");
  const healthPlanServer = client.service("healthplan");
  const [currentService, setCurrentService] = useState(null);
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const selectedService = state.TarrifModule.selectedService;

  const [healthPlans, setHealthPlans] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  const [servicePlans, setServicePlans] = useState([...selectedService.plans]);

  const { register, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      comments: selectedService.comments,
      price: Number(selectedService.price),
    },
  });

  const getHealthPlans = useCallback(async () => {
    showActionLoader();
    let query = {
      organizationId: user.currentEmployee.facilityDetail._id,
      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };

    const resp = await healthPlanServer.find({ query: query });

    setHealthPlans(resp.data);
    hideActionLoader();
  }, [user.currentEmployee]);

  useEffect(() => {
    getHealthPlans();
  }, [getHealthPlans]);

  const handleGetSearchedResult = (service) => {
    setSearchResult(service);
  };

  const handleUpdateService = (data) => {
    if (!searchResult) return toast.warning("Please select a Service");
    if (servicePlans.length <= 0)
      return toast.warning("Please include at least one(1) plan");

    showActionLoader();

    const prevTarrif = state.TarrifModule.selectedTarrif;
    const prevServices = prevTarrif.contracts;

    const service = {
      ...selectedService,
      ...data, //comments and costprice
      serviceName: searchResult.name,
      serviceId: searchResult._id,
      plans: servicePlans,
      billing_type:
        user.currentEmployee.facilityDetail.facilityType === "HMO"
          ? "HMO"
          : "Company",
    };

    const newServices = prevServices.map((item) => {
      if (item._id === service._id) {
        return service;
      } else {
        return item;
      }
    });

    //return console.log(newServices);

    return tarrifsServer
      .patch(prevTarrif._id, { contracts: newServices })
      .then((res) => {
        setState((prev) => ({
          ...prev,
          TarrifModule: {
            ...prev.TarrifModule,
            selectedTarrif: res,
            selectedService: service,
          },
        }));
        closeModal();
        hideActionLoader();
        toast.success(
          `You have succesfully added a new Service to Tarrif ${res.band}`
        );
      })
      .catch((err) => {
        toast.error("Failed to add new Service to Tariff " + err);
        hideActionLoader();
      });
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
            //clear={clearSearch}
            placeholder="Search for Service"
            id={selectedService?.serviceId || ""}
          />
        </Grid>

        <Grid item lg={4} md={5} sm={6} xs={12}>
          <Input
            label="Price"
            type="number"
            register={register("price", { required: true })}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Textarea
            label="Comments"
            register={register("comments", { required: true })}
          />
        </Grid>
      </Grid>

      <Box>
        {healthPlans.map((plan, index) => {
          return (
            <ServiceDetailsPlansEdit
              key={plan._id}
              plan={plan}
              setServicePlans={setServicePlans}
              servicePlans={servicePlans}
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
        <GlobalCustomButton onClick={handleSubmit(handleUpdateService)}>
          Update Service
        </GlobalCustomButton>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export const ServiceDetailsPlansEdit = ({
  plan,
  setServicePlans,
  servicePlans,
}) => {
  const isCurrentPlan = servicePlans.find((item) => item.planId === plan._id);

  const [selectPlan, setSelectPlan] = useState(isCurrentPlan ? true : false);
  const [coPay, setCoPay] = useState(
    isCurrentPlan ? isCurrentPlan.coPay : false
  );
  const [preAuth, setPreAuth] = useState(
    isCurrentPlan ? isCurrentPlan.reqPA : false
  );
  const [benefits, setBenefits] = useState([]);

  const { register, control, watch, setValue } = useForm({
    defaultValues: {
      service_type: isCurrentPlan
        ? isCurrentPlan.capitation
          ? "Capitation"
          : "Fee For Service"
        : "Fee For Service",
      co_pay_amount: isCurrentPlan
        ? isCurrentPlan.coPay
          ? Number(isCurrentPlan.copayDetail)
          : 0
        : 0,
      benefit_category: isCurrentPlan ? isCurrentPlan.benefitcategory : "",
      benefit: isCurrentPlan ? isCurrentPlan.benefit : "",
    },
  });

  const allCategories = plan?.benefits?.map((item) => item.category);

  const handleSelectPlan = (event) => {
    const isChecked = event.target.checked;
    setSelectPlan(isChecked);

    const planData = {
      planId: plan._id,
      planName: plan.planName,
      benefit: "",
      benefitcategory: "",
      feeForService: true,
      capitation: false,
      reqPA: false,
      coPay: false,
      copayDetail: "",
      comments: "",
    };

    if (isChecked) {
      setServicePlans((prev) => [planData, ...prev]);
    } else {
      setServicePlans((prev) =>
        prev.filter((item) => item.planId !== plan._id)
      );
    }
  };

  const handleChangePreAuth = (event) => {
    const isChecked = event.target.checked;
    const selectedPlan = servicePlans.find((item) => item.planId === plan._id);

    const updatedPlan = {
      ...selectedPlan,
      reqPA: isChecked,
    };

    const newServicePlans = servicePlans.map((item) => {
      if (item.planId === plan._id) {
        return updatedPlan;
      } else {
        return item;
      }
    });

    setServicePlans(newServicePlans);
    setPreAuth(isChecked);
  };

  const handleChangeCoPay = (event) => {
    const isChecked = event.target.checked;
    const selectedPlan = servicePlans.find((item) => item.planId === plan._id);

    const updatedPlan = {
      ...selectedPlan,
      coPay: isChecked,
    };

    const newServicePlans = servicePlans.map((item) => {
      if (item.planId === plan._id) {
        return updatedPlan;
      } else {
        return item;
      }
    });

    setServicePlans(newServicePlans);
    setCoPay(isChecked);
  };

  const service_type = watch("service_type");
  const benefit_category = watch("benefit_category");
  const co_pay_amount = watch("co_pay_amount");
  const benefit = watch("benefit");

  const handleHookFormChange = useCallback(() => {
    const selectedPlan = servicePlans.find((item) => item.planId === plan._id);

    const updatedPlan = {
      ...selectedPlan,
      feeForService: service_type.toLowerCase() === "fee for service",
      capitation: service_type.toLowerCase() === "capitation",
      benefitcategory: benefit_category || "",
      copayDetail: co_pay_amount.toString(),
      benefit: benefit || "",
    };

    const newServicePlans = servicePlans.map((item) => {
      if (item.planId === plan._id) {
        return updatedPlan;
      } else {
        return item;
      }
    });

    setServicePlans(newServicePlans);
  }, [service_type, benefit_category, co_pay_amount, benefit]);

  const updateBenefits = useCallback(() => {
    const benefitCat = plan.benefits.filter(
      (item) => item.category === benefit_category
    );
    const fits = benefitCat.map((item) => item.comments);
    setBenefits(benefitCat);
    setValue("benefit", fits[0]);
  }, [benefit_category]);

  useEffect(() => {
    handleHookFormChange();
  }, [handleHookFormChange]);

  useEffect(() => {
    updateBenefits();
  }, [updateBenefits]);

  return (
    <Box mt={0.7}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "160px",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={selectPlan}
                  name={plan._id}
                  onChange={(event) => handleSelectPlan(event)}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                  }}
                >
                  {plan.planName}
                </Typography>
              }
            />
          </FormGroup>
        </Box>

        <Box
          sx={{
            width: "calc(100% - 175px)",
            visibility: selectPlan ? "visible" : "hidden",
          }}
        >
          <Grid container spacing={1.5}>
            <Grid item lg={2} md={2}>
              <CustomSelect
                options={allCategories || []}
                label="Benefit Category"
                name="benefit_category"
                control={control}
              />
            </Grid>

            <Grid item lg={2} md={3}>
              <CustomSelect
                options={benefits.map((item) => item.comments)}
                label="Select Benefit"
                name="benefit"
                control={control}
              />
            </Grid>

            <Grid item lg={3} md={3}>
              <GroupedRadio
                row
                options={["Fee For Service", "Capitation"]}
                control={control}
                name="service_type"
              />
            </Grid>

            <Grid item lg={2}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={preAuth}
                      name={"pre-auth"}
                      onChange={(event) => handleChangePreAuth(event)}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                      }}
                    >
                      Pre-Auth
                    </Typography>
                  }
                />
              </FormGroup>
            </Grid>

            <Grid item lg={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={coPay}
                      name={"pre-auth"}
                      onChange={(event) => handleChangeCoPay(event)}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                      }}
                    >
                      Co-pay
                    </Typography>
                  }
                />
              </FormGroup>

              <Box sx={{ visibility: coPay ? "visible" : "hidden" }}>
                <Input
                  register={register("co_pay_amount")}
                  label="Amount"
                  type="number"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
