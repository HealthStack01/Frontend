import React, {useState, useContext, useEffect, useRef} from "react";
//import {Route, Switch,   Link, NavLink, } from 'react-router-dom'
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import DebouncedInput from "./ui-components/inputs/DebouncedInput";
//import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict, format} from "date-fns";
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import CircularProgress from '@mui/material/CircularProgress';
import CustomTable from "../../components/customtable";
// eslint-disable-next-line
//const searchfacility={};
import {Box, Card, Grow, Typography} from "@mui/material";
import ModalBox from "./ui-components/modal";
import Input from "../../components/inputs/basic/Input";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export function BeneficiarySearch({
  getSearchfacility,
  clear,
  label,
  id,
  disabled = false,
  patient,
}) {
  const ClientServ = client.service("client");
  const policyServ = client.service("policy");
  const [facilities, setFacilities] = useState([]);
//const facilities=useRef([])
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
  const {user} = useContext(UserContext);
  const {state} = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropDownRef = useRef(null);

  const getInitial = async id => {
    //console.log("ID from client search", id);
    if (!!id) {
      await ClientServ.get(id)
        .then(resp => {
          console.log(resp);
          handleRow(resp);
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    getInitial(id);
    return () => {};
  }, [id]);

  const handleRow = async obj => {
    // console.log(obj);
    await setChosen(true);
    //alert("something is chaning")
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
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };

  useEffect(() => {
    if (!patient) return;

    handleRow(patient);
  }, [patient]);

  const handleBlur = async e => {
    /*   if (count===2){
             console.log("stuff was chosen")
         } */
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
    //  getSearchfacility(false);
      return;
    }
    const field = "name"; //field variable

    if (value.length >= 3) {
      
     policyServ.find({
        query: {
          policyNo: {
            $regex: value,
            $options: "i",
          },
         /*  $or: [
            {
              firstname: {
                $regex: val,
                $options: "i",
              },
            },
            {
              lastname: {
                $regex: val,
                $options: "i",
              },
            },
            {
              middlename: {
                $regex: val,
                $options: "i",
              },
            },
            {
              phone: {
                $regex: val,
                $options: "i",
              },
            },
            {
              clientTags: {
                $regex: val,
                $options: "i",
              },
            },
            {
              mrn: {
                $regex: val,
                $options: "i",
              },
            },
            {
              specificDetails: {
                $regex: val,
                $options: "i",
              },
            },
          ],
 */
          //facility: user.currentEmployee.facilityDetail._id,
         // "relatedfacilities.facility": user.currentEmployee.facilityDetail._id,
          //storeId: state.StoreModule.selectedStore._id,
          $limit: 10,
         /*  $sort: {
            createdAt: -1,
          }, */
        },
      })
        .then(res => {
         
          const policies = res.data;
        const data = returnBeneficiaries(policies);
       /*  setBeneficiaries(data);

          console.log("product  fetched successfully"); */
          console.log(res.data,data);
          //facilities.current=data
         
          setFacilities(data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        
        })
        .catch(err => {
         
          toast({
            message: "Error creating ProductEntry " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
         
        });
    } else {
   
      setShowPanel(false);
      await setFacilities([]);
      
   
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
      console.log("success has changed", clear);
      setSimpa("");
    }
    return () => {};
  }, [clear]);

  useOnClickOutside(dropDownRef, () => setShowPanel(false));

  // <div>
  //   <span>{facility.firstname}</span>
  //   <span className="padleft">{facility.middlename}</span>
  //   <span className="padleft">{facility.lastname}</span>
  //   <span className="padleft">
  //     {facility.dob && formatDistanceToNowStrict(new Date(facility.dob))}
  //   </span>
  //   <span className="padleft">{facility.gender}</span>
  //   <span className="padleft">{facility.profession}</span>
  //   <span className="padleft">{facility.phone}</span>
  // </div>;

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Autocomplete
        //disabled={disabled}
        size="small"
       
        value={simpa}
         onChange={(event, newValue, reason) => {
          if (reason === "clear") {
            setSimpa("");
          } else {
            handleRow(newValue);
          }
        }}  
       /*  openOnFocus={true} */
        id="free-solo-dialog-demo"
        onInputChange={(e,value) => handleSearch(value)}
        options={facilities}
        loading={loading}
        getOptionLabel={option => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.firstname;
        }}
      /*   isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option._id === value._id
        } */
        selectOnFocus
        clearOnBlur={false}
        handleHomeEndKeys
        noOptionsText={
          val === "" ? "Type something..." : `${val} was not found`
        } 
       /*  renderOption={(props, option) => (
          <Box
            {...props}
            style={{display: "flex", flexWrap: "wrap"}}
            gap={1}
             onClick={() => handleRow(option)} 
          >
            <Typography sx={{fontSize: "0.75rem"}}>
              {option.firstname}
            </Typography>
            <Typography sx={{fontSize: "0.75rem"}}>
              {option.middlename}
            </Typography>
            <Typography sx={{fontSize: "0.75rem"}}>
              {option.lastname}
            </Typography>

            {option.dob && (
              <Typography sx={{fontSize: "0.75rem"}}>
                {option.dob && formatDistanceToNowStrict(new Date(option.dob))}
              </Typography>
            )}

            <Typography sx={{fontSize: "0.75rem"}}>{option.gender}</Typography>

            <Typography sx={{fontSize: "0.75rem"}}>
              {option.clientType}
            </Typography>

            <Typography sx={{fontSize: "0.75rem"}}>{option.sponsortype}</Typography>
          </Box>
        )} */
        sx={{
          width: "100%",
        }}
        freeSolo
         renderInput={params => (
          <TextField
            {...params}
            label={label || "Search for Beneficiary with Policy Number"}
            //onChange={e => handleSearch(e.target.value)} 
            ref={inputEl}
            sx={{
              fontSize: "0.75rem",
              backgroundColor: "#ffffff",
              "& .MuiInputBase-input": {
                height: "0.9rem",
                fontSize: "0.75rem",
              },

              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
           // disabled={disabled}
            InputLabelProps={{
              shrink: true,
              style: {color: "#2d2d2d"},
            }}
          />
        )}  
      />
      {/* <Autocomplete
       id="search"
       options={facilities}
       getOptionLabel={option => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.firstname;
      }}
       inputValue={val}
       onInputChange={handleSearch}
       loading={loading}

        renderInput={(params) => (
        <TextField
          {...params}
          label="Search by Name"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
        )}   
      /> */}

      <ModalBox open={productModal} onClose={handlecloseModal}>
        <div className={`modal ${productModal ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Choose Store</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handlecloseModal}
              ></button>
            </header>
            <section className="modal-card-body">
              {/* <StoreList standalone="true" /> */}
              {/* <ProductCreate /> */}
            </section>
          </div>
        </div>
      </ModalBox>
    </div>
  );
}
