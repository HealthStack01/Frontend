import {Box} from "@mui/material";
import {useEffect} from "react";
import CheckboxGroup from "../../../../components/inputs/basic/Checkbox/CheckBoxGroup";

const ModulesForm = ({control, reset, setValue}) => {
  const modules = [
    "Admin",
    "Client",
    "Clinic",
    "Appointment",
    "Check-In",
    "Ward",
    "Laboratory",
    "Radiology",
    "Pharmacy",
    "Theatre",
    "Blood Bank",
    "Inventory",
    "Communication",
    "Immunization",
    "Finance",
    "Accounting",
    "Complaints",
    "Referral",
    "Epidemiology",
    "Engagement",
  ];

  useEffect(() => {
    setValue("facilityModules", modules);
  }, []);

  return (
    <Box>
      <Box>
        <CheckboxGroup
          name="facilityModules"
          options={modules}
          control={control}
        />
      </Box>
    </Box>
  );
};

export default ModulesForm;
