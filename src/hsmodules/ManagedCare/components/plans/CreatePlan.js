import {useState, useEffect, useContext, useCallback} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import moment from "moment";
import {UserContext} from "../../../../context";
import {HealthPlanSearchSelect} from "../invoice/InvoiceCreate";

export const PageCreatePlan = ({addNewPlan}) => {
  const [selectedPlan, setSelectedPlan] = useState({premiumAmount: 0});
  const {register, handleSubmit, control, getValues, reset, watch, setValue} =
    useForm({
      defaultValues: {
        amount: 0,
        premium: 0,
      },
    });
  const {user} = useContext(UserContext);

  const defaultValues = {
    name:"",
    type: "",
    premium: "",
    heads: "",
    calendrical: "",
    length: "",
    amount: "",
  };

  const onSubmit = data => {
    //return console.log(data);
    const employee = user.currentEmployee;
    const newPlan = {
      ...data,
     /*  _id: uuidv4(), */
      created_at: new Date(),
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
    };

    //return console.log(newPlan);

    addNewPlan(newPlan);
    //toast.success("Plan Added successfully");

    reset(defaultValues);
  };

  const handleOnPlanSelect = plan => {
    //console.log(plan);
    setSelectedPlan(plan);
    setValue("name", `${plan?.planName}`)
    setValue("type", `${plan.planType}`);
    setValue("premium", Number(plan.premiumAmount));
  };

  // const setPremiumValue = useCallback(() => {
  //   const premium = selectedPlan ? selectedPlan.premiumAmount : 0;

  //   setValue("premium", Number(premium));
  // }, [selectedPlan]);

  // useEffect(() => {
  //   setPremiumValue();
  // }, [setPremiumValue]);

  const premium = watch("premium");
  const calendrical = watch("calendrical");
  const length = watch("length");
  const heads = watch("heads");

  const calculatePlanAmount = useCallback(() => {
    //console.log(premium);
    if (!premium || !calendrical || !length || !heads) return;

    if (calendrical === "Year(s)") {
      const amount = Number(premium) * Number(length);
      //console.log(amount);
      const headsAmount = Number(amount) * Number(heads);
      setValue("amount", headsAmount);
    } else {
      const numOfYears = length;
      const numOfYearsToMonths =  Number(length)/12;

      const amount = Number(premium) * Number(numOfYearsToMonths);
      const headsAmount = Number(amount) * Number(heads);
      setValue("amount", headsAmount);
    }
  }, [premium, calendrical, length, heads]);

  useEffect(() => {
    calculatePlanAmount();
  }, [calculatePlanAmount]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
          <FormsHeaderText text="Plans Section" />

          <GlobalCustomButton onClick={handleSubmit(onSubmit)}>
            <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
            Add Plan
          </GlobalCustomButton>
        </Box>

        <Grid container spacing={1}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <HealthPlanSearchSelect handleChange={handleOnPlanSelect} />
            <Box
              sx={{
                display: "none",
              }}
            >
              <Input register={register("type")} />
            </Box>
          </Grid>

          <Grid item lg={2} md={3} sm={4}>
            {/* <CustomSelect
              label="Premium Type"
              options={[
                {label: "Family", value: "familyPremium"},
                {label: "Individual", value: "individualPremiun"},
              ]}
              control={control}
              name="premium"
              required
            /> */}

            <Input
              register={register("premium", {required: true})}
              label="Premium"
              type="NUMBER"
              disabled
            />
          </Grid>

          <Grid item lg={2} md={3} sm={4}>
            <CustomSelect
              label="Calendrical Duration"
              options={["Month(s)", "Year(s)"]}
              control={control}
              name="calendrical"
            />
          </Grid>

          <Grid item lg={2} md={3} sm={4}>
            <Input
              register={register("length", {required: true})}
              label="Duration Legnth"
              type="number"
            />
          </Grid>
          <Grid item lg={2} md={3} sm={4}>
            <Input
              register={register("heads", {required: true})}
              label="No of Heads"
              type="number"
            />
          </Grid>

          <Grid item lg={2} md={3} sm={4}>
            <Input
              register={register("amount", {required: true})}
              label="Amount"
              type="NUMBER"
              disabled
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export const ModalCreatePlan = ({addNewPlan}) => {
  const {user} = useContext(UserContext);
  const {register, handleSubmit, control, getValues, reset} = useForm();

  const defaultValues = {
    name:"",
    type: "",
    premium: "",
    heads: "",
    calendrical: "",
    length: "",
    amount: "",
  };

  const onSubmit = async data => {
    const employee = user.currentEmployee;

    const newPlan = {
      ...data,
     /*  _id: uuidv4(), */
      created_at: new Date(),
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
    };

    await addNewPlan(newPlan);
    //toast.success("Plan Added successfully");

    reset(defaultValues);
  };

  return (
    <>
      <Box
        sx={{
          width: "600px",
        }}
      >
        <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
          <FormsHeaderText text="Plans Section" />

          <GlobalCustomButton onClick={handleSubmit(onSubmit)}>
            <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
            Add Plan
          </GlobalCustomButton>
        </Box>

        <Grid container spacing={1}>
          <Grid item lg={6} md={6} sm={6}>
            <CustomSelect
              label="Plan Type"
              options={["Family", "HMO", "Free", "Personal"]}
              control={control}
              name="type"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("premium", {required: true})}
              label="Premium"
              type="number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("heads", {required: true})}
              label="No of Heads"
              type="number"
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <CustomSelect
              label="Duration Calendrical"
              options={["Week(s)", "Month(s)", "Year(s)"]}
              control={control}
              name="calendrical"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("length", {required: true})}
              label="Duration Legnth"
              type="number"
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("amount", {required: true})}
              label="Amount"
              type="number"
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
