import {useState} from "react";
import {useForm} from "react-hook-form";
import {Box} from "@mui/material";

const OrganizationView = () => {
  const {reset, handleSubmit} = useForm();

  const initFormState = {
    owner: "Dr. Simpa Dania",
    name: "St. Nicholas Hospital",
    address: "No 15, gateway road, off Awo complex",
    //local_govt: "Bamidele",
    city: "Ikeja",
    state: "Ogun",
    deal_probability: "90%",
    deal_size: "Extra Large",
    deal_status: "Closed",
    deal_next_action: "Unknown",
    weight_forcast: "Unknown",
    submission_date: moment().subtract(100, "days").calendar(),
    closing_date: moment().add(3, "years").calendar(),
    type: "HMO",
    category: "HMO",
  };

  const updateOrganization = () => {};

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
      >
        <FormsHeaderText text="Customer Details" />

        {editCustomer ? (
          <Button
            variant="contained"
            size="small"
            sx={{textTransform: "capitalize"}}
            color="success"
            onClick={handleSubmit(updateOrganization)}
          >
            <UpgradeOutlinedIcon fontSize="small" />
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            sx={{textTransform: "capitalize"}}
            onClick={() => setEditCustomer(true)}
          >
            <ModeEditOutlineOutlinedIcon fontSize="small" /> Edit
          </Button>
        )}
      </Box>
    </Box>
  );
};

const ProviderDetail = () => {
  const [currentView, setCurrentView] = useState("customer");

  const handleSetCurrentView = view => {
    setCurrentView(view);
  };

  return (
    <Box sx={{width: "750px", minHeight: "300px", maxHeight: "80vh"}}>
      <Box></Box>
    </Box>
  );
};

export default ProviderDetail;
