import {useState, useEffect, useContext} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";

const PlanDetail = ({updatePlan, closeModal}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, handleSubmit, control, getValues, reset} = useForm();
  const [edit, setEdit] = useState(false);

  const handleUpdatePlan = async data => {
    showActionLoader();
    const employee = user.currentEmployee;
    const invoiceDetail = state.InvoiceModule.selectedInvoice;
    const prevPlans = invoiceDetail.plans;
    const currentDeal = state.DealModule.selectedDeal;
    const selectedPlan = state.InvoiceModule.selectedPlan;

    const newPlans = prevPlans.map(item => {
      if (item._id === selectedPlan._id) {
        return {
          ...item,
          ...data,
          updatedAt: new Date(),
          updatedBy: employee.userId,
          updatedByName: `${employee.firstname} ${employee.lastname}`,
        };
      } else {
        return item;
      }
    });

    const totalPlansSum = newPlans.reduce((accumulator, object) => {
      return Number(accumulator) + Number(object.amount);
    }, 0);

    const newInvoiceDetail = {
      ...invoiceDetail,
      total_amount: totalPlansSum,
      plans: newPlans,
    };

    const prevInvoices = currentDeal.invoices;

    //console.log(prevInvoices);

    const newInvoices = prevInvoices.map(item => {
      if (item._id === newInvoiceDetail._id) {
        return newInvoiceDetail;
      } else {
        return item;
      }
    });

    //return console.log(newInvoices);

    const documentId = currentDeal._id;

    await dealServer
      .patch(documentId, {invoices: newInvoices})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));

        setState(prev => ({
          ...prev,
          InvoiceModule: {
            ...prev.InvoiceModule,
            selectedInvoice: newInvoiceDetail,
          },
        }));
        closeModal();
        toast.success(`You have successfully Updated Plan`);

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to Update the Plan. ${err}`);
      });
  };

  useEffect(() => {
    const plan = state.InvoiceModule.selectedPlan;
    reset(plan);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "600px",
        }}
      >
        <Box
          mb={1.5}
          sx={{display: "flex", justifyContent: "flex-end"}}
          gap={1}
        >
          {edit ? (
            <>
              <GlobalCustomButton color="error" onClick={() => setEdit(false)}>
                Cancel
              </GlobalCustomButton>

              <GlobalCustomButton
                color="success"
                onClick={handleSubmit(handleUpdatePlan)}
              >
                Update Plan
              </GlobalCustomButton>
            </>
          ) : (
            <GlobalCustomButton onClick={() => setEdit(true)}>
              <EditIcon fontSize="small" sx={{marginRight: "5px"}} />
              Edit Plan
            </GlobalCustomButton>
          )}
        </Box>

        <Grid container spacing={1}>
          <Grid item lg={6} md={6} sm={6}>
            <CustomSelect
              label="Plan Type"
              options={["Family", "HMO", "Free", "Personal"]}
              disabled={!edit}
              control={control}
              name="type"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("premium", {required: true})}
              label="Premium"
              type="number"
              disabled={!edit}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("heads", {required: true})}
              label="No of Heads"
              type="number"
              disabled={!edit}
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <CustomSelect
              label="Duration Calendrical"
              options={["Week(s)", "Month(s)", "Year(s)"]}
              disabled={!edit}
              control={control}
              name="calendrical"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("length", {required: true})}
              label="Duration Legnth"
              type="number"
              disabled={!edit}
              //placeholder="Enter customer number"
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6}>
            <Input
              register={register("amount", {required: true})}
              label="Amount"
              type="NUMBER"
              disabled={!edit}
              //placeholder="Enter customer number"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PlanDetail;
