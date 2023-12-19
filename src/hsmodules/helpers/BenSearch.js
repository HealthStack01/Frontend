/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "react-toastify";
import { FacilityCreate } from "../Admin/Facility";
import {formatDistanceToNowStrict, format} from "date-fns";
import ModalBox from "../../components/modal";
import {Box, Card, Grow, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const filter = createFilterOptions();

// Demo styles, see 'Styles' section below for some notes on use.

// eslint-disable-next-line

export function BeneficiarySearch({
  getSearchfacility,
  clear,
  label,
  closeModal,
}) {
  const facilityServ = client.service("policy");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRow = async (obj) => {
    setChosen(true);
    //alert("something is chaning")
    console.log("sent", obj)
    getSearchfacility(obj);

    await setSimpa(
      obj.firstname +
        " " +
        obj.middlename +
        " " +
        obj.lastname +
        " " +
        obj.gender +
        " " +
        obj.policyNo +
        " " +
        obj.clientType +
        " " +
        obj.sponsortype
    );


    // setSelectedFacility(obj)
    setShowPanel(false);
    setCount(2);
  };

  const handleSearch = async (value) => {
  console.log(value)
    setVal(value);
    if (value === "") {
      setShowPanel(false);
    //  getSearchfacility(false);
      //  setFacilities([]);
      return;
    }
    const field = "facilityName"; //field variable

    if (value.length >= 3) {
      console.log(value)
      setLoading(true)
     await facilityServ
        .find({
          query: {
         /*    $or:[
              { */
                policyNo: {
                  $regex: value,
                  $options: "i",
                },
              },
             /*  {
                "principal.lastname": {
                  $regex: val,
                  $options: "i",
                },
              },
              {
                "principal.firstname": {
                  $regex: val,
                  $options: "i",
                },
              },
              {
                "dependantBeneficiaries.firstname": {
                  $regex: val,
                  $options: "i",
                },
              },
              {
                "dependantBeneficiaries.lastname": {
                  $regex: val,
                  $options: "i",
                },
              },

            ]

            
          },
          */
        })
        .then((res) => {
          const policies = res.data;
          const data = returnBeneficiaries(policies);
         /*  setBeneficiaries(data);
          
            console.log("product  fetched successfully"); */
            console.log(value)
            console.log(res.data,data);
            //facilities.current=data
           
            setFacilities(data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
          setLoading(false)
        })
        .catch((err) => {
          toast.error(`Error Creating Service due to ${err}`);
        });
    } else {
      setShowPanel(false);
      setFacilities([]);
    }
  };

  const returnBeneficiaries = policies => {
    const data = policies.map(policy => {
      const dependents = policy.dependantBeneficiaries.map(item => {
        return {
          ...item,
          policyNo: policy.policyNo,          
          sponsor: policy.sponsor,
          plan: policy.plan,
          clientType: "Dependent",
          sponsortype: policy?.sponsorshipType,
          approved: policy?.approved,
          policy: policy,
        };
      });
      return [
        {
          ...policy.principal,
          policyNo: policy.policyNo,
          sponsor: policy.sponsor,
          plan: policy.plan,
          clientType: "Principal",
          sponsortype: policy?.sponsorshipType,
          approved: policy?.approved,
          policy: policy,
        },
        ...dependents,
      ];
    });

    const beneficiariesData = [].concat.apply([], data);

    return beneficiariesData;
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        size="small"
        value={simpa}
        loading={loading}
         onChange={(event, newValue, reason) => {
          if (reason === "clear") {
            setSimpa("");
          } else {
            //232D1034634
            handleRow(newValue);
          /*   if (typeof newValue === "string") {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
               // handleAddproduct();
              });
            } else if (newValue && newValue.inputValue) {
             // handleAddproduct();
            } else {
              handleRow(newValue);
            } */
          }
        }} 
        //onInputChange={(e,value) => handleSearch(value)}
       /*  filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              facilityName: `Add "${params.inputValue} to your Facilities"`,
            });
          }

          return filtered;
        }} */
        id="free-solo-dialog-demo"
        options={facilities}
         getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option?.inputValue) {
            return option?.inputValue;
          }
          const label=  `${option?.firstname} ${option?.lastname} ${option?.gender} ${option?.policyNo}   ${option?.clientType} `
          return label
        }} 
        selectOnFocus
        //clearOnBlur
        freeSolo
        handleHomeEndKeys
        /* getOptionLabel={(option) =>{
          if (option===undefined){
            const label=""
            return label
          }else{
     
        const label=  `${option?.firstname} ${option?.lastname} ${option?.gender} ${option?.policyNo}   ${option?.clientType} `
         return label
        }}
      } */
       /*  renderOption={(props, option) => (
          <Box {...props} style={{ fontSize: "0.75rem" }}>
            <Typography sx={{fontSize: "0.75rem"}}>
              {option?.firstname}
            </Typography>
            <Typography sx={{fontSize: "0.75rem"}}>
              {option?.middlename}
            </Typography>
            <Typography sx={{fontSize: "0.75rem"}}>
              {option?.lastname}
            </Typography>

            {option.dob && (
              <Typography sx={{fontSize: "0.75rem"}}>
                {option?.dob && formatDistanceToNowStrict(new Date(option?.dob))}
              </Typography>
            )}

            <Typography sx={{fontSize: "0.75rem"}}>{option?.gender}</Typography>

            <Typography sx={{fontSize: "0.75rem"}}>
              {option?.clientType}
            </Typography>

            <Typography sx={{fontSize: "0.75rem"}}>{option?.sponsortype}</Typography>
          </Box>
        )} */
        sx={{ width: "100%" }}
       
        //size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label={label ? label : "Search for Beneficiary with Policy ID"}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            /* sx={{
              fontSize: "0.75rem !important",
              backgroundColor: "#ffffff !important",
              "& .MuiInputBase-input": {
                height: "0.9rem",
                fontSize: "0.8rem",
              },
            }} */
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      <ModalBox
        open={productModal}
        onClose={handlecloseModal}
        header="Create Organization"
      >
        <FacilityCreate
          closeModal={() => {
            handlecloseModal();
            closeModal();
          }}
        />
      </ModalBox>
    </div>
  );
}

export function OrgFacilitySearch({ getSearchfacility, clear }) {
  const productServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  const [facilities, setFacilities] = useState([]);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState([]);

  const handleRow = async (obj) => {
    setChosen(true);
    // getSearchfacility(obj);
    await setSimpa(obj?.facilityName + "," + obj?.facilityCity);
    setShowPanel(false);
    await setCount(2);
    // check if the facility is already selected, if not add it to the list
    const found = selectedFacility.some((el) => el?._id === obj?._id);
    if (!found) {
      // await setSelectedFacility([...selectedFacility, obj]);
      await getSearchfacility(obj);
    }
  };
  const handleBlur = async (e) => {
    /*  if (count===2){
             console.log("stuff was chosen")
         }
        */
    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };

  const handleSearch = async (value) => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility([]);
      setFacilities([]);
      return;
    }

    if (value.length >= 3) {
      //productServ.  orgServ facility:user.currentEmployee.facilityDetail._id,
      orgServ
        .find({
          query: {
            //service
            /*   [field]: {
                     $regex:value,
                     $options:'i'
                    
                 }, */
            $search: value,
            // relationshiptype: 'managedcare',
            facility: user.currentEmployee.facilityDetail._id,
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log("product  fetched successfully");
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          toast.error(`Error creating Service due to ${err}`);
        });
    } else {
      // console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      setFacilities([]);
      //console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      // console.log("success has changed",clear)
      setSimpa("");
      setVal("");
      // clear=!clear
    }
    return () => {};
  }, [clear]);

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        value={simpa}
        id="tags-standard"
        options={facilities}
        onBlur={(e) => handleBlur(e)}
        getOptionLabel={(option) =>
          `${option?.organizationDetail?.facilityName} , ${option?.organizationDetail?.facilityCity}`
        }
        onChange={(event, newValue, reason) => {
          if (reason === "clear") {
            setSimpa("");
            setVal("");
          } else {
            if (typeof newValue === "string") {
              setTimeout(() => {
                handleAddproduct();
              });
            } else if (newValue && newValue.inputValue) {
              handleAddproduct();
            } else {
              handleRow(newValue);
            }
          }
        }}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option._id === value._id
        }
        inputValue={val}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        noOptionsText={val !== "" ? `${val} Not Found` : "Type something"}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Search for Provider"}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem !important",
              backgroundColor: "#ffffff !important",
              "& .MuiInputBase-input": {
                height: "0.9rem",
                fontSize: "0.8rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </Stack>
  );
}

export function OrgFacilityProviderSearch({
  getSearchfacility,
  clear,
  label,
  closeModal,
  disabled = false,
  id,
}) {
  const productServ = client.service("organizationclient");
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const { user } = useContext(UserContext);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);

  const handleRow = async (obj) => {
    setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    setSimpa(obj.organizationDetail.facilityName);

    // setSelectedFacility(obj)
    setShowPanel(false);
    setCount(2);
  };

  const handleSearch = async (value) => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility(false);
      setFacilities([]);
      return;
    }
    const field = "facilityName"; //field variable

    if (value.length >= 3) {
      productServ
        .find({
          query: {
            $search: value,
            facility: user.currentEmployee.facilityDetail._id,
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          const data = res.data;
          const uniqueData = data.filter(
            (v, i, a) =>
              a.findIndex(
                (v2) => v2.organizationDetail._id === v.organizationDetail._id
              ) === i
          );
          setFacilities(uniqueData);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          toast.error(`Error Creating Service due to ${err}`);
        });
    } else {
      // console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      // console.log("success has changed",clear)
      setSimpa("");
      // clear=!clear
    }
    return () => {};
  }, [clear]);

  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        size="small"
        value={simpa}
        disabled={disabled}
        onChange={(event, newValue, reason) => {
          if (reason === "clear") {
            setSimpa("");
          } else {
            handleRow(newValue);
          }
        }}
        // filterOptions={(options, params) => {
        //   const filtered = filter(options, params);

        //   if (params.inputValue !== "") {
        //     filtered.push({
        //       inputValue: params.inputValue,
        //       facilityName: `Add "${params.inputValue} to your Facilities"`,
        //     });
        //   }

        //   return filtered;
        // }}
        id="free-solo-dialog-demo"
        options={facilities}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option?.organizationDetail?.facilityName;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props} style={{ fontSize: "0.75rem" }}>
            {option?.organizationDetail?.facilityName}
          </li>
        )}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option._id === value._id
        }
        noOptionsText={
          val === "" ? "Type something.." : `${val} is not an Employee`
        }
        sx={{ width: "100%" }}
        //size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || "Search for Providers"}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem",
              backgroundColor: "#ffffff",
              "& .MuiInputBase-input": {
                height: "0.9rem",
                fontSize: "0.75rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
              style: { color: "#2d2d2d" },
            }}
          />
        )}
      />

      <ModalBox
        open={productModal}
        onClose={handlecloseModal}
        header="Create Organization"
      >
        <FacilityCreate
          closeModal={() => {
            handlecloseModal();
            closeModal();
          }}
        />
      </ModalBox>
    </div>
  );
}

export function BandSearch({ getBandfacility, clear, newValue }) {
  // const BandServ = client.service('bands');
  // const ServicesServ = client.service('tariff');
  const BandsServ = client.service("bands");
  const [facilities, setFacilities] = useState([]);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState([]);
  // const [bandItems, setBandItems] = useState([])

  const handleRow = async (obj) => {
    setChosen(true);
    // getSearchfacility(obj);
    getBandfacility(obj);
    setSimpa(obj?.facilityName + "," + obj?.facilityCity);
    setShowPanel(false);
    setCount(2);
    // check if the facility is already selected, if not add it to the list
    const found = selectedFacility.some((el) => el?._id === obj?._id);
    if (!found) {
      // await setSelectedFacility([...selectedFacility, obj]);
      await getBandfacility(obj);
    }
  };
  const handleBlur = async (e) => {
    /*  if (count===2){
             console.log("stuff was chosen")
         }
        */
    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };

  const handleSearch = async (value) => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getBandfacility(false);
      await setFacilities([]);
      return;
    }
    const field = "facilityName"; //field variable

    if (value.length >= 3) {
      //productServ.  orgServ facility:user.currentEmployee.facilityDetail._id,
      BandsServ.find({
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
      })
        .then((res) => {
          // console.log('Band  fetched successfully');
          // console.log(res.data);
          setFacilities(res.data);
          setSearchMessage("Band  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          toast.error(`Error creating Service due to ${err}`);
        });
    } else {
      // console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      // console.log("success has changed",clear)
      setSimpa("");
      // clear=!clear
    }
    return () => {};
  }, [clear]);

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        id="tags-standard"
        options={facilities.filter((option) => option.name)}
        onBlur={(e) => handleBlur(e)}
        getOptionLabel={(option) => `${option?.name}`}
        onChange={(event, newValue) => {
          // console.log('newValue', newValue);

          handleRow(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Search for Band"}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem !important",
              backgroundColor: "#ffffff !important",
              "& .MuiInputBase-input": {
                height: "0.9rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </Stack>
  );
}

export function BandTariffSearch({ getBandfacility, clear, newValue }) {
  // const BandServ = client.service('bands');
  const ServicesServ = client.service("tariff");
  const [facilities, setFacilities] = useState([]);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState([]);
  // const [bandItems, setBandItems] = useState([])

  const handleRow = async (obj) => {
    await setChosen(true);
    // getSearchfacility(obj);
    getBandfacility(obj);
    await setSimpa(obj?.facilityName + "," + obj?.facilityCity);
    setShowPanel(false);
    await setCount(2);
    // check if the facility is already selected, if not add it to the list
    const found = selectedFacility.some((el) => el?._id === obj?._id);
    if (!found) {
      // await setSelectedFacility([...selectedFacility, obj]);
      await getBandfacility(obj);
    }
  };
  const handleBlur = async (e) => {
    /*  if (count===2){
             console.log("stuff was chosen")
         }
        */
    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };

  const handleSearch = async (value) => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getBandfacility(false);
      await setFacilities([]);
      return;
    }
    const field = "facilityName"; //field variable

    if (value.length >= 3) {
      //productServ.  orgServ facility:user.currentEmployee.facilityDetail._id,
      ServicesServ.find({
        query: {
          // [field]: {
          // 	$regex: val,
          // 	$options: 'i',
          // },
          organizationId: user.currentEmployee.facilityDetail._id,
          $limit: 20,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then((res) => {
          // console.log('Band  fetched successfully');
          // console.log(res.data);
          setFacilities(res.data);
          setSearchMessage("Band  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          toast.error(`Error creating Service due to ${err}`);
        });
    } else {
      // console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      // console.log("success has changed",clear)
      setSimpa("");
      // clear=!clear
    }
    return () => {};
  }, [clear]);

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        id="tags-standard"
        options={facilities.filter((option) => option.band)}
        onBlur={(e) => handleBlur(e)}
        getOptionLabel={(option) => `${option?.band}`}
        onChange={(event, newValue) => {
          // console.log('newValue', newValue);

          handleRow(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Search for Tariff Band"}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem !important",
              backgroundColor: "#ffffff !important",
              "& .MuiInputBase-input": {
                height: "0.9rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </Stack>
  );
}
export function HmoFacilitySearch({ getSearchfacility, clear }) {
  const productServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  const [facilities, setFacilities] = useState([]);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState([]);

  const handleRow = async (obj) => {
    await setChosen(true);
    // getSearchfacility(obj);
    await setSimpa(obj?.facilityName + "," + obj?.facilityCity);
    setShowPanel(false);
    await setCount(2);
    // check if the facility is already selected, if not add it to the list
    const found = selectedFacility.some((el) => el?._id === obj?._id);
    if (!found) {
      // await setSelectedFacility([...selectedFacility, obj]);
      await getSearchfacility([...selectedFacility, obj]);
    }
  };
  const handleBlur = async (e) => {
    /*  if (count===2){
             console.log("stuff was chosen")
         }
        */
    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };

  const handleSearch = async (value) => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility([]);
      await setFacilities([]);
      return;
    }
    const field = "facilityName"; //field variable

    if (value.length >= 3) {
      //productServ.  orgServ facility:user.currentEmployee.facilityDetail._id,
      productServ
        .find({
          query: {
            //service
            /*   [field]: {
                     $regex:value,
                     $options:'i'
                    
                 }, */
            [field]: {
              $regex: value,
              $options: "i",
            },
            // relationshiptype: 'hmo',
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log("product  fetched successfully");
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          toast.error(`Error creating Service due to ${err}`);
        });
    } else {
      // console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      // console.log("success has changed",clear)
      setSimpa("");
      // clear=!clear
    }
    return () => {};
  }, [clear]);

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        id="tags-standard"
        options={facilities.filter(
          (option) =>
            option.facilityCategory === "HMO" ||
            option.facilityCategory === "hmo"
        )}
        onBlur={(e) => handleBlur(e)}
        getOptionLabel={(option) =>
          `${option?.facilityName} , ${option?.facilityCity}`
        }
        onChange={(event, newValue) => {
          console.log("newValue", newValue);
          handleRow(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Search for HMO"}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem !important",
              backgroundColor: "#ffffff !important",
              "& .MuiInputBase-input": {
                height: "0.9rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </Stack>
  );
}

export function HmoFacilitySearchExternal({ getSearchfacility, clear }) {
  const productServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  const [facilities, setFacilities] = useState([]);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState([]);

  const handleRow = async (obj) => {
    setChosen(true);
    setSimpa(obj?.facilityName + "," + obj?.facilityCity);
    setShowPanel(false);
    setCount(2);
    // check if the facility is already selected, if not add it to the list
    const found = selectedFacility.some((el) => el?._id === obj?._id);
    if (!found) {
      // await setSelectedFacility([...selectedFacility, obj]);
      await getSearchfacility([...selectedFacility, obj]);
    }
  };
  const handleBlur = async (e) => {
    /*  if (count===2){
             console.log("stuff was chosen")
         }
        */
    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };

  const handleSearch = async (value) => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility([]);
      setFacilities([]);
      return;
    }
    const field = "facilityName"; //field variable

    if (value.length >= 3) {
      //productServ.  orgServ facility:user.currentEmployee.facilityDetail._id,
      productServ
        .find({
          query: {
            //service
            /*   [field]: {
                     $regex:value,
                     $options:'i'
                    
                 }, */
            [field]: {
              $regex: value,
              $options: "i",
            },
            // relationshiptype: 'hmo',
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log("product  fetched successfully");
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          toast.error(`Error creating Service due to ${err}`);
        });
    } else {
      // console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      // console.log("success has changed",clear)
      setSimpa("");
      // clear=!clear
    }
    return () => {};
  }, [clear]);

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        id="tags-standard"
        options={facilities.filter(
          (option) =>
            option.facilityCategory === "HMO" ||
            option.facilityCategory === "hmo"
        )}
        onBlur={(e) => handleBlur(e)}
        getOptionLabel={(option) =>
          `${option?.facilityName} , ${option?.facilityCity}`
        }
        onChange={(event, newValue) => {
          console.log("newValue", newValue);
          handleRow(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Search for HMO"}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem !important",
              backgroundColor: "#ffffff !important",
              "& .MuiInputBase-input": {
                height: "0.9rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </Stack>
  );
}

export function SponsorSearch({ getSearchfacility, clear }) {
  const productServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  const [facilities, setFacilities] = useState([]);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState("");
  const [productModal, setProductModal] = useState(false);

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName + "," + obj.facilityCity);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
  };
  const handleBlur = async (e) => {};

  const handleSearch = async (value) => {
    setVal(value);
    if (value === "") {
      setShowPanel(false);
      getSearchfacility(false);
      await setFacilities([]);
      return;
    }
    const field = "facilityName"; //field variable

    if (value.length >= 3) {
      //productServ.  orgServ facility:user.currentEmployee.facilityDetail._id,
      orgServ
        .find({
          query: {
            //service
            /*   [field]: {
                     $regex:value,
                     $options:'i'       
                 }, */
            $search: value,
            relationshiptype: "sponsor",
            facility: user.currentEmployee.facilityDetail._id,
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log("product  fetched successfully");
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch((err) => {
          toast.error(`Error creating Service due to ${err}`);
        });
    } else {
      // console.log("less than 3 ")
      //console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      //console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      // console.log("success has changed",clear)
      setSimpa("");
      // clear=!clear
    }
    return () => {};
  }, [clear]);
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        id="tags-standard"
        options={facilities}
        onBlur={(e) => handleBlur(e)}
        getOptionLabel={(option) =>
          `${option?.organizationDetail?.facilityName} , ${option?.organizationDetail?.facilityCity}`
        }
        onChange={(event, newValue) => {
          handleRow(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Search for Sponsor"}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem !important",
              backgroundColor: "#ffffff !important",
              "& .MuiInputBase-input": {
                height: "0.9rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </Stack>
  );
}

export function SelectBand({ selectedBand, setSelectedBand }) {
  const { user } = useContext(UserContext);
  const BandsServ = client.service("bands");
  const [band, setBand] = useState([]);
  const theme = useTheme();

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  // function getStyles(name, personName, theme) {
  // 	return {
  // 		fontWeight: '0.75rem',
  // 	};
  // }
  // function to get the provider band
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
      await setBand(findServices.data);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedBand(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    getProviderBand();
  }, []);

  return (
    <div>
      <FormControl
        sx={{
          fontSize: "0.75rem !important",
          backgroundColor: "#ffffff !important",
          "& .MuiInputBase-input": {
            height: "0.9rem",
          },
          width: "100%",
        }}
        size="small"
      >
        <InputLabel
          id="demo-multiple-name-label"
          sx={{
            fontSize: "0.75rem !important",
            color: "#000000 !important",
          }}
        >
          Choose Band(s)
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedBand}
          onChange={handleChange}
          input={
            <OutlinedInput
              label={
                user.currentEmployee.facilityDetail.facilityType === "HMO"
                  ? "Choose Provider Band"
                  : "Choose Company Band"
              }
            />
          }
          MenuProps={MenuProps}
        >
          {band?.map((option, i) => (
            <MenuItem key={i} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
export function SelectHealthPlan({ selectedPlan, setSelectedPlan }) {
  const { user } = useContext(UserContext);
  const HealthPlanServ = client.service("healthplan");
  const [facilities, setFacilities] = useState([]);
  const theme = useTheme();

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  // function getStyles(name, personName, theme) {
  // 	return {
  // 		fontWeight: '0.75rem',
  // 	};
  // }
  // function to get the provider band
  const getFacilities = async () => {
    console.log(user);
    if (user.currentEmployee) {
      let stuff = {
        organizationId: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      const findHealthPlan = await HealthPlanServ.find({ query: stuff });

      await console.log("HealthPlan", findHealthPlan.data);
      await setFacilities(findHealthPlan.data);
    } else {
      if (user.stacker) {
        const findClient = await HealthPlanServ.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findClient.data);
      }
    }
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPlan(value);
  };

  useEffect(() => {
    getFacilities();
  }, []);

  return (
    <div>
      <FormControl
        sx={{
          fontSize: "0.75rem !important",
          backgroundColor: "#ffffff !important",
          "& .MuiInputBase-input": {
            height: "0.9rem",
          },
          width: "100%",
        }}
        size="small"
      >
        <InputLabel
          id="demo-multiple-name-label"
          sx={{
            fontSize: "0.75rem !important",
            color: "#000000 !important",
          }}
        >
          Choose Plan(s)
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedPlan}
          onChange={handleChange}
          input={<OutlinedInput label={"Choose Plan(s)"} />}
          MenuProps={MenuProps}
        >
          {facilities?.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option.planName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export function SearchCategory({ selectedCategory, setSelectedCategory }) {
  const filter = createFilterOptions();
  const HealthPlanServ = client.service("healthplan");
  const { user } = useContext(UserContext);
  const [healthPlan, setHealthPlan] = useState([]);

  const getFacilities = async () => {
    console.log(user);
    if (user.currentEmployee) {
      let stuff = {
        organizationId: user.currentEmployee.facilityDetail._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      const findHealthPlan = await HealthPlanServ.find({ query: stuff });
      let data = findHealthPlan.data;
      let newData = [];
      data.map((item) => {
        item.benefits?.map((benefit) => {
          newData.push(benefit);
        });
      });
      let category = newData
        ?.map((item) => item.category)
        ?.filter((item) => item);
      //removing duplicate value from the array of category
      let uniqueCategory = [...new Set(category)];
      await setHealthPlan(uniqueCategory);
      await console.log("selectSearchCategory", uniqueCategory);
    } else {
      if (user.stacker) {
        const findClient = await HealthPlanServ.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        let data = findClient.data;
        let allBenefit = data.map((item) => {
          return item?.benefits;
        });
        let allCategory = allBenefit.map((item) => {
          return item?.category;
        });

        //removing duplicate value from the array of category
        let uniqueCategory = [...new Set(allCategory)];

        setHealthPlan(uniqueCategory);
      }
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

  console.log("selectSearchCategory", healthPlan);
  return (
    <Autocomplete
      value={selectedCategory}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setSelectedCategory(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setSelectedCategory(newValue.inputValue);
        } else {
          setSelectedCategory(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting) {
          filtered.push(inputValue);
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={healthPlan}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        // if (option?.inputValue) {
        // 	return option?.inputValue;
        // }
        // Regular option
        return option;
      }}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{ width: "100%" }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose Category"
          sx={{
            fontSize: "0.75rem !important",
            backgroundColor: "#ffffff !important",
            "& .MuiInputBase-input": {
              height: "0.9rem",
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
}

export function SearchCategory2({ selectedCategory, setSelectedCategory }) {
  const filter = createFilterOptions();
  const HealthPlanServ = client.service("healthplan");
  const { user } = useContext(UserContext);
  const [healthPlan, setHealthPlan] = useState([]);
  const getFacilities = async () => {
    console.log(user);
    if (user.currentEmployee) {
      let stuff = {
        organizationId: user.currentEmployee.facilityDetail._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      const findHealthPlan = await HealthPlanServ.find({ query: stuff });
      let data = findHealthPlan.data;
      let allCategory = data.map((item) => {
        return item?.planCategory;
      });

      setHealthPlan(allCategory);
      await console.log(category);
    } else {
      if (user.stacker) {
        const findClient = await HealthPlanServ.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        let data = findClient.data;
        let allCategory = data.map((item) => {
          return item?.planCategory;
        });

        setHealthPlan(allCategory);
      }
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);
  console.log(healthPlan);
  return (
    <Autocomplete
      value={selectedCategory}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setSelectedCategory(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setSelectedCategory(newValue.inputValue);
        } else {
          setSelectedCategory(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting) {
          filtered.push(inputValue);
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={healthPlan}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        // if (option?.inputValue) {
        // 	return option?.inputValue;
        // }
        // Regular option
        return option;
      }}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{ width: "100%" }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter Category"
          sx={{
            fontSize: "0.75rem !important",
            backgroundColor: "#ffffff !important",
            "& .MuiInputBase-input": {
              height: "0.9rem",
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
}

export function SelectedBenefit({
  data,
  selectedBenefits,
  setSelectedBenefits,
}) {
  const { user } = useContext(UserContext);
  const BandsServ = client.service("bands");
  const [band, setBand] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const theme = useTheme();

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  // function getStyles(name, personName, theme) {
  // 	return {
  // 		fontWeight: '0.75rem',
  // 	};
  // }
  // function to get the provider band

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedBenefits(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    setSelectedData(data.benefits);
  }, [data]);

  console.log("data", data, "selectedData", selectedData);
  return (
    <div>
      <FormControl
        sx={{
          fontSize: "0.75rem !important",
          backgroundColor: "#ffffff !important",
          "& .MuiInputBase-input": {
            height: "0.9rem",
          },
          width: "100%",
        }}
        size="small"
      >
        <InputLabel
          id="demo-multiple-name-label"
          sx={{
            fontSize: "0.75rem !important",
            color: "#000000 !important",
          }}
        >
          Choose Benefits
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedBenefits}
          onChange={handleChange}
          input={<OutlinedInput label={"Choose Benefits"} />}
          MenuProps={MenuProps}
        >
          {selectedData?.map((option, i) => {
            console.log("option", option.category);
            return (
              <MenuItem key={i} value={option}>
                {option.category}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
