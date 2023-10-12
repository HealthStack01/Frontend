import {Box, Grid} from "@mui/material";
import {useState, useCallback, useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import Input from "../../../../components/inputs/basic/Input";
import CustomSelect from "../../../../components/inputs/basic/Select";
import Textarea from "../../../../components/inputs/basic/Textarea";
import {ObjectContext, UserContext} from "../../../../context";
import client from "../../../../feathers";

const CreateBand = ({closeModal}) => {
  const bandServer = client.service("bands");
  const tariffsServer = client.service("tariff");
  const {register, handleSubmit, control} = useForm();
  const [prevBands, setPrevBands] = useState([]);
  const {user} = useContext(UserContext);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);
  const [files, setFiles] = useState([]);

  const getPreviousBands = useCallback(async () => {
    showActionLoader();
    const resp = await bandServer.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        bandType:
          user.currentEmployee.facilityDetail.facilityType === "HMO"
            ? "Provider"
            : "Company",

        // storeId:state.StoreModule.selectedStore._id,
        // $limit:20,
        //   paginate:false,
        $sort: {
          category: 1,
        },
      },
    });
    setPrevBands(resp.data);
    hideActionLoader();
  }, [user.currentEmployee.facilityDetail]);

  useEffect(() => {
    getPreviousBands();
  }, [getPreviousBands]);

  const handleCreateBand = async data => {
    //console.log(prevBands);
    const prevBandsNames = prevBands.map(item => item.name.toLowerCase());
    if (prevBandsNames.includes(data.name.toLowerCase()))
      return toast.error(`Band with name ${data.name} already Exists`);
    showActionLoader();

    const bandData = {
      ...data,
      facility: user.currentEmployee.facilityDetail._id,
    };

    await bandServer
      .create(bandData)
      .then(res => {
        toast.success(`Band successfully created`);
        closeModal();
        hideActionLoader();
      })
      .catch(err => {
        toast.error(`Sorry, You weren't able to create a band. ${err}`);
        hideActionLoader();
      });
  };

  return (
    <Box
      sx={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <Input
        important
        register={register("name", {required: true})}
        label="Band's Name"
      />

      <CustomSelect
        name="bandType"
        control={control}
        label="Band's Type"
        important
        required
        options={["Provider"]}
      />

      <Textarea register={register("description")} label="Description" />

      <Box sx={{display: "flex", gap: 2, width: "100%"}} mt={1}>
        <GlobalCustomButton onClick={handleSubmit(handleCreateBand)}>
          Create Band
        </GlobalCustomButton>

        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default CreateBand;
