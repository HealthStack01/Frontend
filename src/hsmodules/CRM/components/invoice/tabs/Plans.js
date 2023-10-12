import {useEffect, useState} from "react";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {Box, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import Input from "../../../../../components/inputs/basic/Input";
import {InputBox} from "../../../../../components/inputs/basic/Input/styles";
import CustomSelect from "../../../../../components/inputs/basic/Select";
import {FormsHeaderText} from "../../../../../components/texts";
import moment from "moment";
import CustomTable from "../../../../../components/customtable";
import {getPlansColumns} from "../../colums/columns";
import ModalBox from "../../../../../components/modal";
import {toast} from "react-toastify";
import {generateRandomString} from "../../../../helpers/generateString";

const InvoicePlansTab = () => {
  const [plans, setPlans] = useState([]);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const {register, handleSubmit, reset, control, getValues} = useForm();
  const [plantype, setPlanType] = useState("");

  const resetFormState = {
    plan_type: "Family",
    amount: "",
    no_of_months: "",
  };

  const handleAddPlan = data => {
    const plan = {
      plan_type: data.plan_type,
      amount: data.amount,
      no_of_months: data.no_of_months,
      created_at: moment.now(),
      _id: `${Math.random()}`,
    };
    console.log(plan);
    setPlans(prev => [plan, ...prev]);

    reset(resetFormState);
  };

  const handleRemovePlan = plan => {
    setPlans(prev => prev.filter(item => item._id !== plan._id));
  };

  const handleUpdatePlan = plan => {
    setPlans(prev =>
      prev.map(item => {
        if (item._id === plan._id) {
          return {...plan};
        }
        return item;
      })
    );
  };

  const planColumns = getPlansColumns(handleRemovePlan, false);

  const handleRowClick = item => {
    setSelectedPlan(item);
    setDetailModal(true);
  };

  return (
    <Box>
      <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
        <FormsHeaderText text="Invoice Information" />
      </Box>

      <Grid container spacing={1} mb={1.5}>
        <Grid item xs={4}>
          <Input
            label="Date"
            value={moment(moment.now()).format("L")}
            register={register("date", {required: true})}
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Invoice Number"
            value={generateRandomString(12)}
            register={register("invoice_number", {required: true})}
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Total Amount"
            value={"100000"}
            register={register("total_amount", {required: true})}
            disabled={true}
          />
        </Grid>
      </Grid>

      <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
        <FormsHeaderText text="Plan" />

        <GlobalCustomButton onClick={handleSubmit(handleAddPlan)}>
          <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
          Add Plan
        </GlobalCustomButton>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <CustomSelect
            //register={register("plan_type", {required: true})}
            defaultValue={getValues().plan_type}
            name="plan_type"
            label="Plan Type"
            options={["Family", "HMO", "Free", "Personal"]}
            control={control}
          />
        </Grid>

        <Grid item xs={3}>
          <Input
            register={register("premium", {required: true})}
            label="Premium"
            type="number"
          />
        </Grid>

        <Grid item xs={3}>
          <Input
            register={register("no_of_months", {required: true})}
            label="No of Plans"
            type="number"
          />
        </Grid>

        <Grid item xs={3}>
          <Input
            register={register("amount", {required: true})}
            label="Amount"
            type="text"
          />
        </Grid>
      </Grid>

      {/* <Box mt={1} mb={1}>
        <CustomTable
          columns={planColumns}
          data={plans}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRowClick}
          CustomEmptyData="You haven't added any Plan yet..."
          progressPending={false}
        />
      </Box> */}

      <ModalBox open={detailModal} onClose={() => setDetailModal(false)}>
        <EachPlanDetail
          plan={selectedPlan}
          closeModal={() => setDetailModal(false)}
          deletePlan={handleRemovePlan}
        />
      </ModalBox>
    </Box>
  );
};

export default InvoicePlansTab;

export const EachPlanDetail = ({plan, closeModal, deletePlan, updatePlan}) => {
  const {register, handleSubmit, reset, control} = useForm();
  const [editPlan, setEditPlan] = useState(false);

  const initFormState = {
    plan_type: plan.plan_type,
    no_of_months: plan.no_of_months,
    created_at: moment(plan.created_at).format("L"),
    amount: plan.amount,
  };

  useEffect(() => {
    reset(initFormState);
  }, []);

  const handleUpdatePlan = data => {
    const newPlan = {...plan, ...data};
    updatePlan(newPlan);
  };

  const handleDeletePlan = () => {
    deletePlan(plan);
    closeModal();
    toast.success("Plan deleted succesfully");
  };

  return (
    <Box
      sx={{
        width: "500px",
      }}
    >
      <Box sx={{display: "flex", justifyContent: "flex-end"}} mb={2}>
        {editPlan ? (
          <>
            <GlobalCustomButton
              color="success"
              sx={{marginRight: "10px"}}
              onClick={handleSubmit(handleUpdatePlan)}
            >
              Update
            </GlobalCustomButton>

            <GlobalCustomButton
              color="warning"
              onClick={() => setEditPlan(false)}
            >
              Cancel
            </GlobalCustomButton>
          </>
        ) : (
          <>
            <GlobalCustomButton
              color="info"
              sx={{marginRight: "10px"}}
              onClick={() => setEditPlan(true)}
            >
              Edit
            </GlobalCustomButton>

            <GlobalCustomButton color="error" onClick={handleDeletePlan}>
              Delete
            </GlobalCustomButton>
          </>
        )}
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <CustomSelect
            //register={register("plan_type", {required: true})}
            defaultValue={plan.plan_type}
            name="plan_type"
            label="Plan Type"
            options={["Family", "HMO", "Free", "Personal"]}
            disabled={!editPlan}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            register={register("created_at", {required: true})}
            label="Date"
            type="text"
            disabled={true}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            register={register("no_of_months", {required: true})}
            label="No of Months"
            type="number"
            disabled={!editPlan}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            register={register("amount", {required: true})}
            label="Amount"
            type="text"
            disabled={!editPlan}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
