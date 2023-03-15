import {useContext, useEffect, useState, useCallback} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import {FormsHeaderText} from "../../../../components/texts";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {useForm} from "react-hook-form";
import Input from "../../../../components/inputs/basic/Input";
import {Grid, Box, Typography} from "@mui/material";
import MuiCustomDatePicker from "../../../../components/inputs/Date/MuiDatePicker";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import {v4 as uuidv4} from "uuid";
import CustomSelect from "../../../../components/inputs/basic/Select";
import {AddCircleOutline} from "@mui/icons-material";
import CustomTable from "../../../../components/customtable";
import Textarea from "../../../../components/inputs/basic/Textarea";

import {getServicesColumns} from "./columns";
import client from "../../../../feathers";
import {ObjectContext, UserContext} from "../../../../context";

const ClaimCreateServices = ({setServices, closeModal}) => {
  const {control, register, reset, handleSubmit, watch, setValue} = useForm({
    defaultValues: {
      amount: 0,
      unitprice: 0,
    },
  });
  //const [services, setServices] = useState([]);
  const [service, setService] = useState({});

  const handleAddService = data => {
    const serviceObj = {
      ...data,
      service: service,
      status: "Submitted",
      _id: uuidv4(),
      pay_quantity: data.quantity,
      pay_amount: data.amount,
    };
    //return console.log(serviceObj);
    setServices(prev => [serviceObj, ...prev]);
    toast.success("Service added to list");
    reset({
      comments: "",
      amount: 0,
      quantity: 0,
      unitprice: 0,
      service: {},
    });
  };

  const handleGetService = data => {
    //console.log(data);
    setService(data);
    setValue("unitprice", data ? data.price : 0);
  };

  const unitprice = watch("unitprice");
  const quantity = watch("quantity");

  const getTotalAmount = useCallback(() => {
    const totalAmount = Number(unitprice) * Number(quantity);
    setValue("amount", totalAmount);
  }, [unitprice, quantity]);

  useEffect(() => {
    getTotalAmount();
  }, [getTotalAmount]);

  return (
    <Box sx={{width: "650px"}}>
      <Grid container spacing={1} mb={2}>
        <Grid item xs={12} md={12} lg={12}>
          {/* <Input
            name="service"
            label="Service Name"
            register={register("service", {required: true})}
          /> */}
          <SearchTariffService handleServiceChange={handleGetService} />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Input
            register={register("unitprice")}
            label="Unit Price"
            type="number"
            disabled
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Input
            register={register("quantity")}
            name="quantity"
            label="Quantity"
            type="number"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Input
            register={register("amount")}
            //name="amount"
            label="Amount"
            type="number"
            disabled
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Textarea
            label="Comments"
            //name="comments"
            register={register("comments")}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <GlobalCustomButton
          //color="success"
          onClick={handleSubmit(handleAddService)}
        >
          <AddCircleOutline fontSize="small" sx={{marginRight: "3px"}} />
          Add Service
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default ClaimCreateServices;

export const SearchTariffService = ({handleServiceChange}) => {
  const [tariffs, setTarrifs] = useState([]);
  const tariffServer = client.service("tariff");
  const policyServer = client.service("policy");
  const orgClientServer = client.service("organizationclient");
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
  const [services, setServices] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findServices = await tariffServer.find({
        query: {
          organizationId: user.currentEmployee.facilityDetail._id,
          $sort: {
            createdAt: -1,
          },
        },
      });
      console.log(findServices.data);
      setServices(findServices.data[0].contracts);
    } else {
      if (user.stacker) {
        toast.warning("You do not qualify to view this");
        return;
      }
    }
  };

  const getPolicy = () => {
    policyServer
      .find({
        query: {
          // organizationId: user.currentEmployee.facilityDetail._id,
          $or: [
            {
              "principal._id": state.ClientModule.selectedClient?._id,
            },
            {
              "dependents._id": state.ClientModule.selectedClient?._id,
            },
          ],
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        console.log("Policy", res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getOrgClient = () => {
    orgClientServer
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          relationshiptype: "provider",
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        console.log("org client", res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFacilities();
    getOrgClient();
    getPolicy();

    tariffServer.on("created", obj => getFacilities());
    tariffServer.on("updated", obj => getFacilities());
    tariffServer.on("patched", obj => getFacilities());
    tariffServer.on("removed", obj => getFacilities());
    return () => {};
  }, [state.facilityModule.selectedFacility]);

  const handleOnChange = service => {
    setValue(service);
    handleServiceChange(service);
  };

  return (
    <Box>
      <Autocomplete
        disablePortal
        //id="combo-box-demo"
        value={value}
        options={services}
        onChange={(event, newValue) => {
          handleOnChange(newValue);
        }}
        getOptionLabel={option => option.serviceName}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        sx={{width: "100%"}}
        renderInput={params => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
            label={"Search for Service"}
            //ref={inputEl}
            sx={{
              fontSize: "0.75rem",
              backgroundColor: "#ffffff",
              "& .MuiInputBase-input": {
                height: "0.9rem",
                fontSize: "0.8rem",
              },
            }}
            InputLabelProps={{
              Autocomplete: "new-password",
              shrink: true,
              style: {color: "#2d2d2d"},
            }}
          />
        )}
      />
    </Box>
  );
};
