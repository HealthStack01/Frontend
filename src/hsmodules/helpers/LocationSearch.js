import { useContext, useEffect, useRef, useState } from 'react';
//import {Route, Switch,   Link, NavLink, } from 'react-router-dom'
import client from '../../feathers';
//import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { ObjectContext, UserContext } from '../../context';

// eslint-disable-next-line
//const searchfacility={};

export default function LocationSearch({
  id,
  getSearchfacility,
  clear,
  label,
  disabled,
}) {
  const ClientServ = client.service('location');
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
  const { user } = useContext(UserContext);
  const { state } = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);
  const [closeDropdown, setCloseDropdown] = useState(false);

  const getInitial = async (id) => {
    if (!!id) {
      await ClientServ.get(id)
        .then((resp) => {
          handleRow(resp);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getInitial(id);
    return () => {};
  }, []);

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.name + ' ' + obj.locationType);

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

  const handleBlur = async (e) => {
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
  const handleSearch = async (val) => {
    setVal(val);
    if (val === '') {
      setShowPanel(false);
      getSearchfacility(false);
      return;
    }
    const field = 'name'; //field variable
    /* name: { type: String, required: true },
        locationType: { type: String }, */

    if (val.length >= 3) {
      ClientServ.find({
        query: {
          $or: [
            {
              name: {
                $regex: val,
                $options: 'i',
              },
            },
            {
              locationType: {
                $regex: val,
                $options: 'i',
              },
            },
            /*    { middlename: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { phone: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { clientTags: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { mrn: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { specificDetails: {
                        $regex:val,
                        $options:'i' 
                    }}, */
          ],

          facility: user.currentEmployee.facilityDetail._id,
          //storeId: state.StoreModule.selectedStore._id,
          $limit: 10,
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
          toast.error('Error fetching Location ' + err);
        });
    } else {
      console.log('less than 3 ');
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
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
      console.log('success has changed', clear);
      setSimpa('');
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <Autocomplete
        size="small"
        value={simpa}
        disabled={disabled}
        onChange={(event, newValue) => {
          handleRow(newValue);
          setSimpa('');
        }}
        id="free-solo-dialog-demo"
        options={facilities}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        //isOptionEqualToValue={(option, value) => option.id === value.id}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        noOptionsText="No Location found"
        renderOption={(props, option) => (
          <li {...props} style={{ fontSize: '0.75rem' }}>
            {option.name}, {option.locationType}
          </li>
        )}
        sx={{
          width: '100%',
        }}
        freeSolo={false}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || 'Search for Location'}
            onChange={(e) => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: '0.75rem',
              backgroundColor: '#ffffff',
              '& .MuiInputBase-input': {
                height: '0.9rem',
              },
            }}
            InputLabelProps={{
              shrink: true,
              style: { color: '#2d2d2d' },
            }}
          />
        )}
      />
    </div>
  );
}
