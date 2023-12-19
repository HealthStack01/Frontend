import React, {useContext, useState, useEffect, useCallback} from "react";
import {ObjectContext, UserContext} from "../../../../context";

import client from "../../../../feathers";

import {Box, IconButton, Grid, Typography} from "@mui/material";

import {useForm} from "react-hook-form";

//import CustomSelect from "../../../components/inputs/basic/Select";

import {toast} from "react-toastify";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {BandTariffSearch} from "../../../helpers/FacilitySearch";
import CustomSelect from "../../../../components/inputs/basic/Select";

const InheritTariff = ({closeModal}) => {
  const [success, setSuccess] = useState(false);
  const {handleSubmit} = useForm();
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const tariffServer = client.service("tariff");
  const BandsServ = client.service("bands");
  const [providerBand, setProviderBand] = useState([]);
  const [selectedBand, setSelectedBand] = useState("");

  // A FUNCTION THAT FETCH BAND DETAILS
  const getProviderBand = async () => {
    if (user.currentEmployee) {
      const findServices = await BandsServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType:
            user.currentEmployee.facilityDetail.facilityType === "HMO"
              ? "Provider"
              : "Company",
          $sort: {
            category: 1,
          },
        },
      });
      await setProviderBand(findServices.data);
    }
  };

  useEffect(() => {
    getProviderBand();
  }, []);

  const getBandfacility=(tarrif)=>{

    setState(prev=>({
      ...prev,
      inheritTarrif:tarrif
      
    }))

  }

  // A FUNCTION THAT INHERIT TARIFF
  const onSubmit = async () => {
    showActionLoader();

    const  choosenBand= providerBand.find( //selectedBand
      item => item.name.toLowerCase() === selectedBand.toLowerCase()
    );

    const tariff = state.inheritTarrif;

    const tariffData = {
      organizationId: user.currentEmployee.facilityDetail._id,
      organizationName: user.currentEmployee.facilityDetail.facilityName,
      band: choosenBand.name,
      bandId: choosenBand._id,
      contracts: tariff.service,
      providers: [],
    };

    tariffServer
      .create(tariffData)
      .then(res => {
        hideActionLoader();
        toast.success("Tariff created succesfully");
        closeModal();
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error creating Tariff " + err);
        setSuccess(false);
      });
  };
  return (
    <Box sx={{width: "500px"}}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Box>
          <CustomSelect
            name="bandType"
            placeholder="Choose Provider Band"
            options={providerBand}
            value={selectedBand}
            label="Select Provider Band"
            onChange={e => setSelectedBand(e.target.value)}
          />
        </Box>
        <Box>
          <BandTariffSearch clear={success} getBandfacility={getBandfacility} />
        </Box>
      </Box>

      <Box sx={{display: "flex", gap: 1.5}} mt={2}>
        <GlobalCustomButton
          text="Save Inheritance"
          onClick={handleSubmit(onSubmit)}
        />

        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default InheritTariff;
