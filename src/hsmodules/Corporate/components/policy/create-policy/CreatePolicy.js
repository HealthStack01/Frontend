import {Box, Grid, IconButton, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";

import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import CustomSelect from "../../../../../components/inputs/basic/Select";
import SimpleRadioInput from "../../../../../components/inputs/basic/Radio/SimpleRadio";
import {getValue} from "@mui/system";
import client from "../../../../../feathers";
import {useCallback, useContext, useEffect, useState} from "react";
import {ObjectContext, UserContext} from "../../../../../context";
import {
  HmoFacilitySearch,
  SponsorSearch,
} from "../../../../helpers/FacilitySearch";
import Input from "../../../../../components/inputs/basic/Input";
import {FormsHeaderText} from "../../../../../components/texts";
import CustomTable from "../../../../../components/customtable";
import {toast} from "react-toastify";
import ModalBox from "../../../../../components/modal";
import {AddIndividualPolicy, IndividualPoliciesList} from "./Individual";
import {FamilyPoliciesAdd, FamilyPoliciesList} from "./Family";
import {DeleteOutline} from "@mui/icons-material";
import PolicyClientCreate from "./Client";

const CreateNewPolicy = ({goBack}) => {
  const healthPlanServer = client.service("healthplan");
  const policyServer = client.service("policy");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [healthPlans, setHealthPlans] = useState([]);
  const [fetchingPlans, setFetchingPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [providers, setProviders] = useState([]);
  const [modal, setModal] = useState(null);
  const [clientModal, setClientModal] = useState(false);
  const [premium, setPremium] = useState({
    amount: "",
    duration: "",
  });
  const [hmo, setHmo] = useState(null);
  const [subSponsor, setSubSponsor] = useState(null);

  const {register, handleSubmit, setValue, getValues, watch, control} = useForm(
    {
      defaultValues: {
        plan_type: "Individual",
        sponsor_type: "Self",
      },
    }
  );

  const isHMO = user.currentEmployee.facilityDetail.facilityType === "HMO";

  const handleGoBack = () => {
    goBack();
  };

  const onSubSponsorSelect = item => {
    setSubSponsor(item);
  };

  const onHMOSearchSelect = item => {
    setHmo(item);
  };

  const handleCreatePolicy = data => {};

  const sponsor_type = watch("sponsor_type");
  const planType = watch("plan_type");
  const planName = watch("plan_name");

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

  const onPlanChange = useCallback(() => {
    if (!planName) return;
    const selectedPlan = healthPlans.find(item => item.planName === planName);
    setSelectedPlan(selectedPlan);

    const premium = selectedPlan?.premiums.find(
      item => item.planType === planType
    );

    setPremium({
      amount: premium.premiumAmount,
      duration: `${premium.premiumDuration} ${
        premium.premiumDurationType || premium.premiumDurationTwo
      }`,
    });
  }, [planName, planType]);

  useEffect(() => {
    onPlanChange();
  }, [onPlanChange]);

  const handleBeneficiaryModal = () => {
    setModal(planType.toLowerCase());
  };

  const handleAddIndividualPolicy = async data => {
    const facility = user.currentEmployee.facilityDetail;

    if (!state.Beneficiary.principal._id)
      return toast.warning("Please add principal! ");

    const year = new Date().getFullYear().toString().slice(-2);
    const planType1 = planName?.charAt(0);
    const orgType = data?.sponsor_type === "Self" ? 1 : 2;
    const orgId = Math.floor(100000 + Math.random() * 900000);
    const policyNo = `${year}${planType1}${orgType}${orgId}`;

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }

    let policy = {
      policyNo: policyNo,
      organizationType: isHMO ? facility.facilityType : hmo.facilityType,
      organizationId: isHMO ? facility._id : hmo._id,
      organizationName: isHMO ? facility.facilityName : hmo.facilityName,
      organization: isHMO ? facility : hmo,
      principal: {...state.Beneficiary.principal, policyNo: policyNo}, //
      dependantBeneficiaries: state.Beneficiary.dependent.map((item, i) => {
        return {
          ...item,
          policyNo: `${policyNo}-${i + 1}`,
        };
      }),
      providers: providers,
      sponsorshipType: data.sponsor_type,
      sponsor: subSponsor,
      plan: selectedPlan,
      planType: planType,
      // premium: price.price,
      // premiumContract: price,
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
  };

  const handleAddFamilyPolicy = async data => {
    const facility = user.currentEmployee.facilityDetail;

    if (!state.Beneficiary.principal._id)
      return toast.warning("Please add principal! ");
    const year = new Date().getFullYear().toString().slice(-2);
    const planType1 = planName?.charAt(0);
    const orgType = data?.sponsor_type === "Self" ? 1 : 2;
    const orgId = Math.floor(100000 + Math.random() * 900000);
    const policyNo = `${year}${planType1}${orgType}${orgId}`;

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id;
    }

    let policy = {
      policyNo: policyNo,
      organizationType: isHMO ? facility.facilityType : hmo.facilityType,
      organizationId: isHMO ? facility._id : hmo._id,
      organizationName: isHMO ? facility.facilityName : hmo.facilityName,
      organization: isHMO ? facility : hmo,
      principal: {...state.Beneficiary.principal, policyNo: policyNo},
      dependantBeneficiaries: state.Beneficiary.dependent.map((item, i) => {
        return {
          ...item,
          policyNo: `${policyNo}-${i + 1}`,
        };
      }),
      providers: providers,
      sponsorshipType: data.sponsor_type,
      sponsor: subSponsor,
      plan: selectedPlan,
      planType: planType,
      // premium: price.price,
      // premiumContract: price,
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
    // //console.log("POLICY", policy);

    //return //console.log(policy);

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
  };

  const handleAddPrincipal = () => {
    setState(prev => ({...prev, currBeneficiary: "principal"}));

    setClientModal(true);
  };

  const handleAddDependent = () => {
    setState(prev => ({...prev, currBeneficiary: "dependent"}));

    setClientModal(true);
  };

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

  const createPolicy = async policy => {
    await policyServer.create(policy);
  };

  const handleCompleteAddPolicy = async () => {
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
    <Box>
      <ModalBox
        open={clientModal}
        onClose={() => {
          setClientModal(false);
        }}
      >
        <PolicyClientCreate
          closeModal={() => {
            setClientModal(false);
          }}
        />
      </ModalBox>

      <ModalBox
        open={modal === "individual"}
        onClose={() => setModal(null)}
        header="Create Policy For Individuals"
      >
        <AddIndividualPolicy
          addIndividual={handleAddPrincipal}
          providers={providers}
          setProviders={setProviders}
          providerColumns={providerColumns}
          createPolicy={handleSubmit(handleAddIndividualPolicy)}
        />
      </ModalBox>

      <ModalBox
        open={modal === "family"}
        onClose={() => {
          setModal(null);
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
        <FamilyPoliciesAdd
          addPrincipal={handleAddPrincipal}
          addDependent={handleAddDependent}
          createPolicy={handleSubmit(handleAddFamilyPolicy)}
          providers={providers}
          setProviders={setProviders}
          providerColumns={providerColumns}
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
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon sx={{marginRight: "3px"}} fontSize="small" />
            Back
          </GlobalCustomButton>

          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            Create New Policy
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          gap={1}
        >
          <GlobalCustomButton onClick={handleCompleteAddPolicy}>
            <AddBoxIcon sx={{marginRight: "3px"}} fontSize="small" />
            Complete New Policy
          </GlobalCustomButton>
        </Box>
      </Box>

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <SimpleRadioInput
                value={sponsor_type}
                defaultValue={sponsor_type}
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

          {!isHMO && (
            <Grid item md={4}>
              <HmoFacilitySearch
                getSearchfacility={onHMOSearchSelect}
                //clear={success}
              />
            </Grid>
          )}

          <Grid item md={4}>
            <CustomSelect
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
              options={
                fetchingPlans ? [] : healthPlans.map(item => item.planName)
              }
              required
              important
              control={control}
              //register={register("plan_name")}
            />
          </Grid>

          <Grid item md={isHMO ? 6 : 4}>
            <Input
              value={premium.amount.toLocaleString()}
              disabled
              label={`${planType} Price`}
            />
          </Grid>
          <Grid item md={isHMO ? 6 : 4}>
            <Input
              value={premium.duration}
              disabled
              label={`${planType} Premium Duration`}
            />
          </Grid>

          {sponsor_type === "Company" && (
            <>
              <Grid item md={5}>
                <CustomSelect
                  name="sub_sponsor"
                  control={control}
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
                />
              </Grid>

              <Grid item md={7}>
                <SponsorSearch
                  getSearchfacility={onSubSponsorSelect}
                  //clear={success}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>

      <Box p={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormsHeaderText text={"Policy Beneficiaries"} />
          <GlobalCustomButton onClick={handleBeneficiaryModal}>
            Add New Policy
          </GlobalCustomButton>
        </Box>

        {state.Beneficiary.familyPolicies.length > 0 && (
          <FamilyPoliciesList providerColumns={providerColumns} />
        )}

        {state.Beneficiary.individualPolicies.length > 0 && (
          <IndividualPoliciesList providerColumns={providerColumns} />
        )}
      </Box>
    </Box>
  );
};

export default CreateNewPolicy;
