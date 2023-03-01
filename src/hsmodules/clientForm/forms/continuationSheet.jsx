import {useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import {Box, Grid, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ObjectContext} from "../../../context";
import {FormsHeaderText} from "../../../components/texts";
import {toast} from "react-toastify";

const ContinuationSheet = ({onSubmit}) => {
  const {register, handleSubmit, control} = useForm();

  const {state, setState} = useContext(ObjectContext);

  const closeForm = async () => {
    let documentobj = {};
    documentobj.name = "";
    documentobj.facility = "";
    documentobj.document = "";
    //  alert("I am in draft mode : " + Clinic.documentname)
    const newDocumentClassModule = {
      selectedDocumentClass: documentobj,
      encounter_right: false,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      DocumentClassModule: newDocumentClassModule,
    }));
  };

  useEffect(() => {
    toast.error(
      "This form isn't available at the moment, will update you when it is.."
    );
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <FormsHeaderText text="Continuation Sheet" />

          <IconButton onClick={closeForm}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box mb="1rem">
          <Input
            register={register("surname")}
            name="surname"
            label="Surname"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            register={register("firstname")}
            name="firstname"
            label="Firstname"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <MuiCustomDatePicker
            name="dateAndTime"
            label="Date & Time"
            control={control}
          />
        </Box>

        <Box mb="1rem">
          <Textarea
            register={register("descOrRemark")}
            name="description"
            label="Descriptiom/Remark"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <Input
            register={register("signature")}
            name="signature"
            label="Signature"
            type="text"
          />
        </Box>
        <Box mb="1rem">
          <GlobalCustomButton
            onClick={handleSubmit(onSubmit)}
            color="secondary"
          >
            Submit Continous Sheet
          </GlobalCustomButton>
        </Box>
      </div>
    </form>
  );
};

export default ContinuationSheet;
