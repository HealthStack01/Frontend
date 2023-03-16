import {useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import {FormsHeaderText} from "../../../../../components/texts";
import GlobalCustomButton from "../../../../../components/buttons/CustomButton";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import UpgradeOutlined from "@mui/icons-material/UpgradeOutlined";
import Input from "../../../../../components/inputs/basic/Input";
import {toast} from "react-toastify";

const InvoiceDetailsTab = () => {
  const {register, reset, handleSubmit} = useForm();
  const [editDetail, setEditDetail] = useState(false);

  const initFormState = {
    customer_name: "Dr. Simpa Dania",
    customer_number: "08074567832",
    address: "No 15, gateway road, off Awo complex",
    local_govt: "Bamidele",
    city: "Ikeja",
    state: "Lagos",
    country: "Nigeria",
  };

  const updateDetail = data => {
    setEditDetail(false);
    toast.success("You've updted customer detail");
  };

  useEffect(() => {
    reset(initFormState);
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
        mb={1}
      >
        <FormsHeaderText text="Customer Details" />

        {editDetail ? (
          <Box>
            <GlobalCustomButton
              color="success"
              onClick={handleSubmit(updateDetail)}
              sx={{
                marginRight: "10px",
              }}
            >
              <UpgradeOutlined fontSize="small" sx={{marginRight: "5px"}} />
              Update
            </GlobalCustomButton>

            <GlobalCustomButton
              color="warning"
              //variant="outlined"
              onClick={() => setEditDetail(false)}
            >
              Cancel
            </GlobalCustomButton>
          </Box>
        ) : (
          <GlobalCustomButton
            color="secondary"
            onClick={() => setEditDetail(true)}
          >
            <ModeEditOutlineOutlined
              fontSize="small"
              sx={{marginRight: "5px"}}
            />
            Edit
          </GlobalCustomButton>
        )}
      </Box>

      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={6}>
          <Input
            register={register("customer_name", {required: true})}
            label="Customer Name"
            disabled={!editDetail}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            register={register("customer_number", {required: true})}
            label="Customer Number"
            disabled={!editDetail}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item xs={8}>
          <Input
            register={register("address", {required: true})}
            label="Residential Address"
            disabled={!editDetail}
            //placeholder="Enter customer name"
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6}>
          <Input
            register={register("local_govt", {required: true})}
            label="LGA"
            disabled={!editDetail}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6}>
          <Input
            register={register("city", {required: true})}
            label="City"
            disabled={!editDetail}
            // placeholder="Enter customer name"
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6}>
          <Input
            register={register("state", {required: true})}
            label="State"
            disabled={!editDetail}
            //placeholder="Enter customer number"
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6}>
          <Input
            register={register("country", {required: true})}
            label="Country"
            disabled={!editDetail}
            //placeholder="Enter customer number"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvoiceDetailsTab;
