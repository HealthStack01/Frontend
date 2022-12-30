/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'react-toastify';
import { FacilityCreate } from '../Admin/Facility';
import ModalBox from '../../components/modal';

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import Stack from '@mui/material/Stack';

const filter = createFilterOptions();

// Demo styles, see 'Styles' section below for some notes on use.

// eslint-disable-next-line

export function FacilitySearch({
  getSearchfacility,
  clear,
  label,
  closeModal,
}) {
  const productServ = client.service('facility');
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState('');
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState('');
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState('');
  const [productModal, setProductModal] = useState(false);

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
  };

  const handleSearch = async (value) => {
    setVal(value);
    if (value === '') {
      setShowPanel(false);
      getSearchfacility(false);
      await setFacilities([]);
      return;
    }
    const field = 'facilityName'; //field variable

    if (value.length >= 3) {
      productServ
        .find({
          query: {
            //service
            [field]: {
              $regex: value,
              $options: 'i',
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          // console.log("product  fetched successfully")
          //console.log(res.data)
          setFacilities(res.data);
          setSearchMessage(' product  fetched successfully');
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
      setSimpa('');
      // clear=!clear
    }
    return () => {};
  }, [clear]);
  return (
    <div style={{ width: '100%' }}>
      <Autocomplete
        size="small"
        value={simpa}
        //loading={loading}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              handleAddproduct();
            });
          } else if (newValue && newValue.inputValue) {
            handleAddproduct();
          } else {
            handleRow(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              facilityName: `Add "${params.inputValue} to your Facilities"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={facilities}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.facilityName;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props} style={{ fontSize: '0.75rem' }}>
            {option.facilityName}
          </li>
        )}
        sx={{ width: '100%' }}
        freeSolo
        //size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label={label ? label : 'Search for Organization'}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: '0.75rem !important',
              backgroundColor: '#ffffff !important',
              '& .MuiInputBase-input': {
                height: '0.9rem',
              },
            }}
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
  const productServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  const [facilities, setFacilities] = useState([]);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState('');
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState('');
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState('');
  const [productModal, setProductModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState([]);

  const handleRow = async (obj) => {
    await setChosen(true);
    // getSearchfacility(obj);
    await setSimpa(obj?.facilityName + ',' + obj?.facilityCity);
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
    if (value === '') {
      setShowPanel(false);
      getSearchfacility([]);
      await setFacilities([]);
      return;
    }
    const field = 'facilityName'; //field variable

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
            relationshiptype: 'managedcare',
            facility: user.currentEmployee.facilityDetail._id,
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log('product  fetched successfully');
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(' product  fetched successfully');
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
      setSimpa('');
      // clear=!clear
    }
    return () => {};
  }, [clear]);

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Autocomplete
        id="tags-standard"
        options={facilities}
        onBlur={(e) => handleBlur(e)}
        getOptionLabel={(option) =>
          `${option?.organizationDetail?.facilityName} , ${option?.organizationDetail?.facilityCity}`
        }
        onChange={(event, newValue) => {
          console.log('newValue', newValue);
          handleRow(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Search for Provider'}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: '0.75rem !important',
              backgroundColor: '#ffffff !important',
              '& .MuiInputBase-input': {
                height: '0.9rem',
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
  const productServ = client.service('facility');
  const orgServ = client.service('organizationclient');
  const [facilities, setFacilities] = useState([]);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState('');
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState('');
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState('');
  const [productModal, setProductModal] = useState(false);

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName + ',' + obj.facilityCity);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
  };
  const handleBlur = async (e) => {};

  const handleSearch = async (value) => {
    setVal(value);
    if (value === '') {
      setShowPanel(false);
      getSearchfacility(false);
      await setFacilities([]);
      return;
    }
    const field = 'facilityName'; //field variable

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
            relationshiptype: 'sponsor',
            facility: user.currentEmployee.facilityDetail._id,
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log('product  fetched successfully');
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(' product  fetched successfully');
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
      setSimpa('');
      // clear=!clear
    }
    return () => {};
  }, [clear]);
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
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
            label={'Search for Sponsor'}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: '0.75rem !important',
              backgroundColor: '#ffffff !important',
              '& .MuiInputBase-input': {
                height: '0.9rem',
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
