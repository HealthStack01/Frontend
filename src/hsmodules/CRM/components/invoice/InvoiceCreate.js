import {useState, useEffect, useContext} from "react";
import {Button, Grid} from "@mui/material";
import {Box} from "@mui/system";
import Input from "../../../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";

import {FormsHeaderText} from "../../../../components/texts";
import CustomSelect from "../../../../components/inputs/basic/Select";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CustomTable from "../../../../components/customtable";
import moment from "moment";
import {CustomerView} from "../lead/LeadDetailView";
import CustomerDetail, {PageCustomerDetail} from "../global/CustomerDetail";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {formatDistanceToNowStrict} from "date-fns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {PageCreatePlan} from "../plans/CreatePlan";
import Plans from "../../Plans";
import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";

const random = require("random-string-generator");

const InvoiceCreate = ({closeModal, handleGoBack}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [duration, setDuration] = useState("");

  const {register, control, setValue, reset, handleSubmit} = useForm();

  const handleAddNewPlan = plan => {
    setPlans(prev => [plan, ...prev]);
  };

  const handleRemovePlan = plan => {
    setPlans(prev => prev.filter(item => item._id !== plan._id));
  };

  const createInvoice = async data => {
    showActionLoader();
    const currentDeal = state.DealModule.selectedDeal;
    const employee = user.currentEmployee;

    const document = {
      ...data,
      plans,
      createdAt: new Date(),
      dealId: currentDeal._id,
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
      customerName: currentDeal.name,
      customerEmail: currentDeal.email,
      customerPhone: currentDeal.phone,
      customerAddress: currentDeal.address,
      customerCity: currentDeal.city,
      customerLGA: currentDeal.lga,
      customerState: currentDeal.state,
      customerCountry: currentDeal.country,
      status: "Pending",
      _id: uuidv4(),
    };

    //return console.log(document);

    const prevInvoices = currentDeal.invoices || [];

    const newInvoices = [document, ...prevInvoices];

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
        //closeModal();
        reset({
          subscription_category: "",
          payment_option: "",
          payment_mode: "",
          invoice_number: random(12, "uppernumeric"),
          date: new Date(),
          total_amount: 0,
        });
        setPlans([]);
        toast.success(`You have successfully Created a new Invoice`);

        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        hideActionLoader();
        toast.error(`Sorry, Failed to Create an Invoice. ${err}`);
      });
  };

  useEffect(() => {
    setValue("invoice_number", random(12, "uppernumeric"));
    setValue("date", new Date());
    setValue("total_amount", 0);
  }, []);

  useEffect(() => {
    //console.log(plans[0]);
    const totalPlansSum = plans.reduce((accumulator, object) => {
      return Number(accumulator) + Number(object.amount);
    }, 0);

    setValue("total_amount", totalPlansSum);

    //console.log(totalPlansSum);
  }, [plans]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f8f8f8",
            backgroundColor: "#f8f8f8",
          }}
          p={2}
        >
          <GlobalCustomButton onClick={handleGoBack}>
            <ArrowBackIcon />
            Back
          </GlobalCustomButton>

          <Box
            sx={{
              display: "flex",
            }}
            gap={1}
          >
            <GlobalCustomButton
              color="success"
              onClick={handleSubmit(createInvoice)}
            >
              Create Invoice
            </GlobalCustomButton>
          </Box>
        </Box>

        <Grid container spacing={2} p={2}>
          <Grid item lg={12} md={12} sm={12}>
            <PageCustomerDetail />
          </Grid>

          <Grid item lg={12} md={12} sm={12}>
            <Box mb={1} sx={{display: "flex", justifyContent: "space-between"}}>
              <FormsHeaderText text="Invoice Information" />
            </Box>

            <Grid container spacing={1} mb={1.5}>
              <Grid item lg={2} md={3} sm={4}>
                <MuiCustomDatePicker
                  label="Date"
                  disabled={true}
                  control={control}
                  name="date"
                />
              </Grid>
              <Grid item lg={2} md={3} sm={4}>
                <Input
                  label="Invoice Number"
                  register={register("invoice_number")}
                  disabled={true}
                />
              </Grid>
              <Grid item lg={2} md={3} sm={4}>
                <Input
                  label="Total Amount"
                  register={register("total_amount")}
                  disabled={true}
                  type="number"
                />
              </Grid>

              <Grid item lg={2} md={3} sm={4}>
                <CustomSelect
                  label="Payment Mode"
                  options={["Cash", "Cheque", "Transfer"]}
                  control={control}
                  name="payment_mode"
                  required
                />
              </Grid>

              <Grid item lg={2} md={3} sm={4}>
                <CustomSelect
                  label="Payment Option"
                  options={["Annually", "Bi-Annually", "Quarterly"]}
                  control={control}
                  name="payment_option"
                  required
                />
              </Grid>

              <Grid item lg={2} md={3} sm={4}>
                <CustomSelect
                  label="Subscribtion Category"
                  options={["New", "Renewal", "Additional"]}
                  control={control}
                  name="subscription_category"
                  required
                />
              </Grid>
            </Grid>

            <Box>
              <PageCreatePlan addNewPlan={handleAddNewPlan} />
            </Box>

            <Box mt={1} mb={1}>
              <Plans
                omitCreate={true}
                plans={plans}
                removePlan={handleRemovePlan}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InvoiceCreate;
