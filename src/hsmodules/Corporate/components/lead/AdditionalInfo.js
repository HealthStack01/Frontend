import DeleteOutline from "@mui/icons-material/DeleteOutline";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import moment from "moment";
import {useContext} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import Input from "../../../../components/inputs/basic/Input";
import Textarea from "../../../../components/inputs/basic/Textarea";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";

const AdditionalInformationCard = ({action, data}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        padding: "8px 8px",
        justifyContent: "space-between",
        boxShadow: 2,
        borderRadius: "7.5px",
      }}
    >
      <Box
        sx={{
          width: "80px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          borderRight: "1px solid lightgray",
        }}
      >
        <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
          {moment(data.date).format("L")}
        </Typography>

        <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
          {moment(data.date).format("LT")}
        </Typography>
      </Box>

      <Box sx={{width: "calc(100% - 150px)", display: "flex"}}>
        <Box sx={{width: "100%"}}>
          <Typography sx={{fontSize: "0.75rem", color: "#000000"}}>
            <span
              style={{
                fontSize: "0.8rem",
                color: "#0064CC",
                marginRight: "3px",
                textTransform: "capitalize",
              }}
            >
              {data.employeename} -
            </span>
            {data.info}
          </Typography>
        </Box>
      </Box>

      <IconButton
        size="small"
        onClick={action}
        sx={{width: "30px", height: "30px"}}
        color="error"
      >
        <DeleteOutline fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default AdditionalInformationCard;

export const CreateAdditionalInfo = ({addInfo, closeModal}) => {
  const dealServer = client.service("deal");
  const {state, setState, hideActionLoader, showActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, handleSubmit, control, reset} = useForm();

  // const handleAddInfo = data => {
  //   const newData = {
  //     created_by: "Sulaimon Olaniran",
  //     information: data.additional_info,
  //     created_at: moment.now(),
  //     _id: `${Math.random()}`,
  //   };
  //   addInfo(newData);
  //   closeModal();
  //   //console.log(data);
  // };

  const updateAdditionalInfo = async data => {
    if (data.info === "") return toast.error("Please provide your information");
    showActionLoader();

    const employee = user.currentEmployee;

    const newInfo = {
      info: data.info,
      date: new Date(),
      employeename: `${employee.firstname} ${employee.lastname}`,
    };

    const oldDealInfo = state.DealModule.selectedDeal.additionalInfo;

    const updatedDealInfo = [newInfo, ...oldDealInfo];

    const documentId = state.DealModule.selectedDeal._id;

    await dealServer
      .patch(documentId, {additionalInfo: updatedDealInfo})
      .then(res => {
        hideActionLoader();
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
        }));

        reset({
          info: "",
        });
        toast.success(
          `You have successfully added a new Addtional Information!`
        );
      })
      .catch(err => {
        hideActionLoader();
        toast.error(
          `Sorry, You weren't able to add a new Addtional Information!. ${err}`
        );
      });
  };

  return (
    <Box
      sx={{
        width: "400px",
      }}
    >
      <Box mb={2}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Textarea
              label="Additional Information"
              placeholder="Write here..."
              important
              register={register("info")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{display: "flex"}}>
        <GlobalCustomButton
          onClick={handleSubmit(updateAdditionalInfo)}
          sx={{marginRight: "10px"}}
        >
          Add Information
        </GlobalCustomButton>

        <GlobalCustomButton onClick={closeModal} color="error">
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
