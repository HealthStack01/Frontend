import {useState, useEffect, useContext} from "react";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import UpgradeOutlined from "@mui/icons-material/UpgradeOutlined";
import {Box, Grid} from "@mui/material";
import moment from "moment";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import Input from "../../../../components/inputs/basic/Input";
import CustomSelect from "../../../../components/inputs/basic/Select";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {FormsHeaderText} from "../../../../components/texts";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";

const LeadDetailView = () => {
  const {register, reset, control, handleSubmit} = useForm();
  const [editLead, setEditLead] = useState(false);
  const {state} = useContext(ObjectContext);

  const udpateLead = data => {
    toast.success("Lead Detail Updated");
    setEditLead(false);
  };

  useEffect(() => {
    const deal = state.DealModule.selectedDeal;

    const initFormValue = {
      probability: deal.dealinfo.probability,
      size: deal.dealinfo.size,
      status: deal.dealinfo.currStatus,
      nextAction: deal.dealinfo.nextAction,
      weightForecast: deal.dealinfo.weightForecast,
      closingDate: deal.dealinfo.closingDate,
      submissionDate: deal.createdAt,
    };
    reset(initFormValue);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text="Lead Details" />

        {editLead ? (
          <GlobalCustomButton
            color="success"
            onClick={handleSubmit(udpateLead)}
          >
            <UpgradeOutlined fontSize="small" sx={{marginRight: "5px"}} />
            Update
          </GlobalCustomButton>
        ) : (
          <GlobalCustomButton onClick={() => setEditLead(true)}>
            <ModeEditOutlineOutlined
              fontSize="small"
              sx={{marginRight: "5px"}}
            />
            Edit
          </GlobalCustomButton>
        )}
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Input
            register={register("probability", {required: true})}
            label="Probability"
            disabled={!editLead}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={3}>
          <Input
            register={register("size", {required: true})}
            label="Size"
            disabled={!editLead}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={3}>
          <CustomSelect
            label="Status"
            options={["Open", "Closed", "Pending"]}
            control={control}
            name="currStatus"
            disabled={!editLead}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item xs={3}>
          <Input
            register={register("weightForecast", {required: true})}
            label="Weight Forcast"
            disabled={!editLead}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={4}>
          <MuiCustomDatePicker
            label="Submission Date"
            name="submissionDate"
            control={control}
            disabled={true}
          />
        </Grid>

        <Grid item xs={4}>
          <MuiCustomDatePicker
            label="Closing Date"
            name="closingDate"
            control={control}
            disabled={!editLead}
          />
        </Grid>

        <Grid item xs={4}>
          <Input
            register={register("nextAction", {required: true})}
            label="Next Action"
            disabled={!editLead}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LeadDetailView;

export const PageLeadDetailView = () => {
  const dealServer = client.service("deal");
  const {register, reset, control, handleSubmit} = useForm();
  const [editLead, setEditLead] = useState(false);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [currentStatus, setCurrentStatus] = useState("");

  const udpateLead = async data => {
    showActionLoader();
    const employee = user.currentEmployee;
    const documentId = state.DealModule.selectedDeal._id;
    const prevStatusHistory = state.DealModule.selectedDeal.statushx || [];

    const dealinfo = {
      probability: data.probability,
      size: data.size,
      currStatus: data.currStatus,
      nextAction: data.nextAction,
      weightForecast: data.weightForecast,
      closingDate: data.closingDate,
    };

    const statusHistoryObj = {
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
      employeeId: employee.userId,
      status: data.currStatus,
    };

    const newStatusHistory =
      currentStatus !== data.currStatus
        ? [statusHistoryObj, ...prevStatusHistory]
        : [...prevStatusHistory];

    //console.log(dealinfo);

    await dealServer
      .patch(documentId, {dealinfo: dealinfo, statushx: newStatusHistory})
      .then(res => {
        hideActionLoader();
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));

        setEditLead(false);
        toast.success(`Deal Details successfully updated!`);
      })
      .catch(err => {
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to update the deal detail. ${err}`
        );
      });
  };

  // const cancleEdit = () => {
  //    const deal = state.DealModule.selectedDeal;

  //    const initFormValue = {
  //      probability: deal.dealinfo.probability,
  //      size: deal.dealinfo.size,
  //      status: deal.dealinfo.currStatus,
  //      nextAction: deal.dealinfo.nextAction,
  //      weightForecast: deal.dealinfo.weightForecast,
  //      closingDate: deal.dealinfo.closingDate,
  //      submissionDate: deal.createdAt,
  //    };
  //    setEditLead(false)
  //    reset(initFormValue);
  // }

  useEffect(() => {
    const deal = state.DealModule.selectedDeal;
    //console.log(deal);

    const initFormValue = {
      probability: deal.dealinfo.probability,
      size: deal.dealinfo.size,
      currStatus: deal.dealinfo.currStatus,
      nextAction: deal.dealinfo.nextAction,
      weightForecast: deal.dealinfo.weightForecast,
      closingDate: deal.dealinfo.closingDate,
      submissionDate: deal.createdAt,
    };

    setCurrentStatus(deal.dealinfo.currStatus);
    reset(initFormValue);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text="Deal Details" />

        <Box sx={{display: "flex"}} gap={1}>
          {editLead ? (
            <>
              <GlobalCustomButton
                color="success"
                onClick={handleSubmit(udpateLead)}
              >
                <UpgradeOutlined fontSize="small" sx={{marginRight: "5px"}} />
                Update
              </GlobalCustomButton>

              <GlobalCustomButton
                color="error"
                onClick={() => setEditLead(false)}
              >
                Cancel Edit
              </GlobalCustomButton>
            </>
          ) : (
            <GlobalCustomButton onClick={() => setEditLead(true)}>
              <ModeEditOutlineOutlined
                fontSize="small"
                sx={{marginRight: "5px"}}
              />
              Edit
            </GlobalCustomButton>
          )}
        </Box>
      </Box>

      <Grid container spacing={1}>
        <Grid item lg={2} md={4} sm={6} xs={12}>
          <Input
            register={register("probability", {required: true})}
            label="Probability"
            disabled={!editLead}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Input
            register={register("size", {required: true})}
            label="Size"
            disabled={!editLead}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item lg={2} md={3} sm={4} xs={6}>
          <CustomSelect
            label="Status"
            options={["Open", "Closed", "Suspended"]}
            disabled={!editLead}
            control={control}
            name="currStatus"
            required={true}
          />
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={8}>
          <Input
            register={register("weightForecast", {required: true})}
            label="Weight Forcast"
            disabled={!editLead}
          />
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={8}>
          <MuiCustomDatePicker
            label="Submission Date"
            name="submissionDate"
            control={control}
            disabled={true}
          />
        </Grid>

        <Grid item lg={2} md={3} sm={4} xs={6}>
          <MuiCustomDatePicker
            label="Closing Date"
            name="closingDate"
            control={control}
            disabled={!editLead}
          />
        </Grid>

        <Grid item lg={2} md={3} sm={4} xs={6}>
          <Input
            register={register("nextAction", {required: true})}
            label="Next Action"
            disabled={!editLead}
          />
        </Grid>
      </Grid>
    </>
  );
};
