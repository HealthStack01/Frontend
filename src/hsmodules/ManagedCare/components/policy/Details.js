import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import {useCallback, useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom"; //Route, Switch,Link, NavLink,
import {toast} from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";

import ChangePolicyPrincipal from "./edit-policy/ChangePrincipal";
import AddDependentToPolicy from "./edit-policy/AddDependent";
import PolicyAddProvider from "./edit-policy/AddProvider";
import ChangePolicySponsor from "./edit-policy/ChangeSponsor";
import DefaultClientDetail from "../../../../components/client-detail/Client-Detail";
import DefaultFacilityDetail from "../../../../components/facility-detail/Facility-Detail";
//import ModalHeader from "../Appointment/ui-components/Heading/modalHeader";
//import Claims from "./Claims";
import {
  EnrolleSchema,
  sponsorColumns,
  EnrolleSchema3,
  returnDependentModel,
  returnProviderModel,
  EnrolleSchema4,
  EnrolleSchemaProvider,
  EnrolleSchema5,
  principalData,
} from "./models";
//import {ProviderPrintout} from "./components/Printout";
import ModalHeader from "../../../Appointment/ui-components/Heading/modalHeader";
import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import SimpleRadioInput from "../../../../components/inputs/basic/Radio/SimpleRadio";
import CustomSelect from "../../../../components/inputs/basic/Select";
import Input from "../../../../components/inputs/basic/Input";
import {FormsHeaderText} from "../../../../components/texts";
import CustomTable from "../../../../components/customtable";
import ModalBox from "../../../../components/modal";
import {SponsorSearch} from "../../../helpers/FacilitySearch";
import {ProviderPrintout} from "../Printout";
import dayjs from "dayjs";

const PolicyDetail = ({goBack, beneficiary}) => {
  const [clientDetail, setClientDetail] = useState(null);
  const [facilityDetail, setFacilityDetail] = useState(null);
  const [view, setView] = useState("details");
  const [fetchingPlans, setFetchingPlans] = useState(false);
  const [healthPlans, setHealthPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [edit, setEdit] = useState(false);
  const [hmo, setHmo] = useState(null);
  const [subSponsor, setSubSponsor] = useState(null);
  const [premium, setPremium] = useState({
    amount: "",
    duration: "",
  });
  const policyServer = client.service("policy");
  const healthPlanServer = client.service("healthplan");
  const {user} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const [policy, setPolicy] = useState({});
  const [modal, setModal] = useState(null);
  const {register, reset, control, handleSubmit, watch} = useForm({
    defaultValues: {
      sponsor_type: state.PolicyModule.selectedPolicy.sponsorshipType,
    },
  });

  const sponsor_type = watch("sponsor_type");
  const planName = watch("plan_name");
  const planType = watch("plan_type");
  const isHMO = user.currentEmployee.facilityDetail.facilityType === "HMO";

  const getHealthPlans = useCallback(async () => {
    setFetchingPlans(true);
    const facility = user.currentEmployee.facilityDetail;
    const orgId = isHMO ? facility._id : hmo._id;

    const resp = await healthPlanServer.find({
      query: {
        organizationId: orgId,
        $sort: {
          category: 1,
        },
      },
    });

    const data = resp.data;
    setHealthPlans(data);
    setFetchingPlans(false);
  }, [hmo]);

  useEffect(() => {
    getHealthPlans();
  }, [getHealthPlans]);

  useEffect(() => {
    const prevPolicy = state.PolicyModule.selectedPolicy;

    setSubSponsor(prevPolicy.sponsor);

    const initFormValue = {
      status: prevPolicy?.approved ? "Approved" : "Pending",
      plan_type: prevPolicy?.planType,
      plan_name: prevPolicy?.plan?.planName,
      sponsor_type: prevPolicy.sponsorshipType,
    };
    reset(initFormValue);

    setPolicy(prevPolicy);
  }, [state.PolicyModule]);

  const getPremiumPrice = useCallback(() => {
    if (!planName) return;
    const selectedPlan = healthPlans.find(item => item.planName === planName);
    setSelectedPlan(selectedPlan);

    const activePremiun = selectedPlan?.premiums.find(
      item => item.planType === planType
    );

    //console.log(activePremiun);

    setPremium({
      amount: activePremiun?.premiumAmount,
      duration: `${activePremiun?.premiumDuration} ${
        activePremiun?.premiumDurationType || activePremiun?.premiumDurationTwo
      }`,
    });
  }, [policy, healthPlans, planName, planType]);

  useEffect(() => {
    getPremiumPrice();
  }, [getPremiumPrice]);

  const handleEditPolicy = () => {
    setState(prev => ({
      ...prev,
      PolicyModule: {
        ...prev.PolicyModule,
        preservedPolicy: state.PolicyModule.selectedPolicy,
      },
    }));
    setEdit(true);
  };

  const cancelEditPolicy = () => {
    setState(prev => ({
      ...prev,
      PolicyModule: {
        ...prev.PolicyModule,
        selectedPolicy: state.PolicyModule.preservedPolicy,
      },
    }));
    setEdit(false);
  };

  const removeProvider = provider => {
    const prevProviders = state.PolicyModule.selectedPolicy.providers;
    const newProviders = prevProviders.filter(
      item => item._id !== provider._id
    );

    setState(prev => ({
      ...prev,
      PolicyModule: {
        ...prev.PolicyModule,
        selectedPolicy: {
          ...prev.PolicyModule.selectedPolicy,
          providers: newProviders,
        },
      },
    }));
  };

  const removeDependent = dependent => {
    const oldDependants =
      state.PolicyModule.selectedPolicy.dependantBeneficiaries;
    const newDependants = oldDependants.filter(
      item => item._id !== dependent._id
    );
    setState(prev => ({
      ...prev,
      PolicyModule: {
        ...prev.PolicyModule,
        selectedPolicy: {
          ...prev.PolicyModule.selectedPolicy,
          dependantBeneficiaries: newDependants,
        },
      },
    }));
  };

  const dependentModel = returnDependentModel(removeDependent, !edit);

  const providerModel = returnProviderModel(removeProvider, !edit);

  const handleUpdatePolicyDetails = data => {
    showActionLoader();
    const policy = state.PolicyModule.selectedPolicy;

    const updatedPolicy = {
      ...policy,
      plan: selectedPlan,
      planType: planType,
      sponsor: data.sponsor_type === "Self" ? "" : subSponsor,
      sponsorshipType: data.sponsor_type,
    };

    //return console.log(updatedPolicy);

    policyServer
      .patch(policy._id, updatedPolicy)
      .then(res => {
        console.log(res);
        hideActionLoader();
        toast.success("Policy Updated");
        setState(prev => ({
          ...prev,
          PolicyModule: {
            ...prev.PolicyModule,
            selectedPolicy: res,
            preservedPolicy: null,
          },
        }));
      })
      .catch(error => {
        hideActionLoader();
        toast.error(`Failed to update policy ${err}`);
      });
  };

  const approvePolicy = async () => {
    const policy = state.PolicyModule.selectedPolicy;
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
        ...policy?.statushx,
        {
          date: new Date(),
          employeename: `${employee?.firstname} ${employee?.lastname}`,
          employeeId: employee?._id,
          status: "Policy Approved",
        },
      ],
      ...policy,
    };
    //console.log(policyDetails);
    await policyServer
      .patch(docId, policyDetails)
      .then(res => {
        setState(prev => ({
          ...prev,
          PolicyModule: {...prev.PolicyModule, selectedPolicy: res},
        }));
        toast.success("Policy Approved");
      })
      .catch(err => {
        //console.log(err);
        toast.error("Error Approving Policy" + err);
      });
  };

  const statushxColums = [
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
      name: "Employee Name",
      key: "providerName",
      description: "Provider Name",
      selector: row => row?.employeename,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Update Date",
      key: "providerName",
      description: "Provider Name",
      selector: row => dayjs(row.date).format("DD-MM-YYYY"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Description",
      key: "providerName",
      description: "Provider Name",
      selector: row => row.status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const onBeneficiaryRowClick = row => {
    setClientDetail(row);
    setView("client");
  };

  const onFacilityRowClicked = row => {
    setFacilityDetail(row);
    setView("facility");
  };

  const handleReturn = () => {
    setClientDetail(null);
  };

  return (
    <Box>
      <ModalBox open={modal === "print"} onClose={() => setModal(null)}>
        <ProviderPrintout data={policy} />
      </ModalBox>

      <ModalBox
        open={modal === "principal"}
        onClose={() => {
          setModal(null);
        }}
      >
        <ChangePolicyPrincipal
          closeModal={() => {
            setModal(null);
          }}
        />
      </ModalBox>

      <ModalBox
        open={modal === "sponsor"}
        onClose={() => {
          setModal(null);
        }}
      >
        <ChangePolicySponsor
          closeModal={() => {
            setModal(null);
          }}
        />
      </ModalBox>

      <ModalBox
        open={modal === "dependent"}
        onClose={() => {
          setModal(null);
        }}
      >
        <AddDependentToPolicy
          closeModal={() => {
            setModal(null);
          }}
        />
      </ModalBox>

      <ModalBox
        open={modal === "provider"}
        onClose={() => {
          setModal(null);
        }}
      >
        <PolicyAddProvider
          closeModal={() => {
            setModal(null);
          }}
        />
      </ModalBox>

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
          <GlobalCustomButton onClick={goBack}>
            <ArrowBackIcon sx={{marginRight: "3px"}} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: "600",
            }}
          >
            Policy Details For -
          </Typography>
          <FormsHeaderText text={`${policy.policyNo}`} />
        </Box>

        {edit && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            gap={1}
          >
            <GlobalCustomButton
              onClick={handleSubmit(handleUpdatePolicyDetails)}
              color="success"
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Update Policy
            </GlobalCustomButton>

            <GlobalCustomButton onClick={cancelEditPolicy} color="warning">
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Cancel Update
            </GlobalCustomButton>
          </Box>
        )}

        {!edit && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            gap={1}
          >
            <GlobalCustomButton
              onClick={() => setView("details")}
              sx={
                view === "details"
                  ? {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                      },
                    }
                  : {}
              }
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Policy Details
            </GlobalCustomButton>

            {view === "details" && (
              <GlobalCustomButton onClick={handleEditPolicy}>
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Edit Details
              </GlobalCustomButton>
            )}

            {!policy.approved && (
              <GlobalCustomButton onClick={approvePolicy} color="warning">
                <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
                Approve Policy
              </GlobalCustomButton>
            )}

            {/* <GlobalCustomButton
              onClick={() => setView("claims")}
              color="secondary"
              sx={
                view === "claims"
                  ? {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                      },
                    }
                  : {}
              }
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Claims
            </GlobalCustomButton> */}

            <GlobalCustomButton
              onClick={() => setModal("print")}
              color="success"
            >
              <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
              Send Policy
            </GlobalCustomButton>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 150px)",
          overflowY: "scroll",
        }}
      >
        {view === "client" && <DefaultClientDetail detail={clientDetail} />}

        {view === "facility" && (
          <DefaultFacilityDetail detail={facilityDetail} />
        )}

        {view === "details" && (
          <>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <SimpleRadioInput
                      //value={"Self"}
                      value={sponsor_type}
                      defaultValue={sponsor_type}
                      //disabled={!edit}
                      register={register("sponsor_type")}
                      options={[
                        {
                          label: "Self",
                          value: "Self",
                        },
                        {
                          label: "Company",
                          value: "Company",
                        },
                      ]}
                    />
                  </Box>
                </Grid>

                <Grid item md={4}>
                  <CustomSelect
                    disabled={!edit}
                    control={control}
                    name="plan_type"
                    label="Plan Type"
                    options={[
                      {value: "Individual", label: "Individual"},
                      {value: "Family", label: "Family"},
                    ]}
                    required
                    important
                  />
                </Grid>

                <Grid item md={4}>
                  <CustomSelect
                    name="plan_name"
                    label="Choose Plan"
                    disabled={!edit}
                    options={
                      fetchingPlans
                        ? []
                        : healthPlans.map(item => item.planName)
                    }
                    required
                    important
                    control={control}
                    //register={register("plan_name")}
                  />
                </Grid>

                <Grid item md={isHMO ? 6 : 4}>
                  <Input
                    value={premium?.amount}
                    disabled
                    label={`${policy?.planType} Price`}
                  />
                </Grid>
                <Grid item md={isHMO ? 6 : 4}>
                  <Input
                    value={premium?.duration}
                    disabled
                    label={`${policy?.planType} Premium Duration`}
                  />
                </Grid>
              </Grid>
            </Box>

            {sponsor_type === "Company" && (
              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  mb={1.5}
                >
                  <FormsHeaderText text="Sponsor Details" />

                  <GlobalCustomButton
                    onClick={() => setModal("sponsor")}
                    disabled={!edit}
                  >
                    {policy?.sponsor ? "Change Sponsor" : "Add Sponsor"}
                  </GlobalCustomButton>
                </Box>

                <CustomTable
                  title={""}
                  columns={sponsorColumns}
                  data={
                    policy.sponsor ? [policy?.sponsor?.organizationDetail] : []
                  }
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={onFacilityRowClicked}
                  progressPending={false}
                  CustomEmptyData="You have no Sponsor yet."
                />
              </Box>
            )}

            <Box p={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                mb={1.5}
              >
                <FormsHeaderText text="Principal Details" />

                <GlobalCustomButton
                  onClick={() => setModal("principal")}
                  disabled={!edit}
                >
                  Change Principal
                </GlobalCustomButton>
              </Box>

              <CustomTable
                title={""}
                columns={EnrolleSchema3}
                data={[policy?.principal]}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={onBeneficiaryRowClick}
                progressPending={false}
                CustomEmptyData="You have no Principal yet."
              />
            </Box>

            {planType === "Family" && (
              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  mb={1.5}
                >
                  <FormsHeaderText text="Dependants List" />

                  <GlobalCustomButton
                    onClick={() => setModal("dependent")}
                    disabled={!edit}
                  >
                    Add Dependant
                  </GlobalCustomButton>
                </Box>

                <CustomTable
                  title={""}
                  columns={dependentModel}
                  data={policy?.dependantBeneficiaries}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={onBeneficiaryRowClick}
                  progressPending={false}
                  CustomEmptyData="You have no Dependants yet."
                />
              </Box>
            )}

            <Box p={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                mb={1.5}
              >
                <FormsHeaderText text="Providers List" />

                <GlobalCustomButton
                  onClick={() => setModal("provider")}
                  disabled={!edit}
                >
                  Add Provider
                </GlobalCustomButton>
              </Box>

              <CustomTable
                title={""}
                columns={providerModel}
                data={policy?.providers}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={row =>
                  onFacilityRowClicked(row.organizationDetail)
                }
                progressPending={false}
                CustomEmptyData="You have no Providers yet."
              />
            </Box>

            <Box p={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                mb={1.5}
              >
                <FormsHeaderText text="Policy Status History" />

                {/* <GlobalCustomButton
            onClick={() => console.log("provider")}
            disabled={!edit}
          >
            Clear History
          </GlobalCustomButton> */}
              </Box>

              <CustomTable
                title={""}
                columns={statushxColums}
                data={policy?.statushx}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={() => {}}
                progressPending={false}
                CustomEmptyData="Policy has no Status"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PolicyDetail;
