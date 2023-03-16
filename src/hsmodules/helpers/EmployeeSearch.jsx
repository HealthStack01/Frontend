import { useContext, useEffect, useRef, useState } from 'react';
//import {Route, Switch,   Link, NavLink, } from 'react-router-dom'
import client from '../../feathers';
//import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { toast } from 'bulma-toast';
import { ObjectContext, UserContext } from '../../context';
// eslint-disable-next-line

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function EmployeeSearch({
	id,
	getSearchfacility,
	clear,
	label,
	disabled,
	setParentState,
}) {
	const ClientServ = client.service('employee');
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

	const getInitial = async id => {
		if (!!id) {
			await ClientServ.get(id)
				.then(resp => {
					handleRow(resp);
				})
				.catch(err => console.log(err));
		}
	};

	useEffect(() => {
		getInitial(id);
		return () => {};
	}, []);

	const handleRow = async obj => {
		await setChosen(true);
		//alert("something is chaning")

		await setSimpa(
			obj.firstname +
				' ' +
				obj.lastname +
				'  (' +
				obj.profession +
				', ' +
				obj.department +
				' Department )',
		);
		getSearchfacility(obj);
		// setSelectedFacility(obj)
		setShowPanel(false);
		await setCount(2);
		/* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
		//console.log(state)
		setCloseDropdown(true);
	};

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
	const handleSearch = async val => {
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
							firstname: {
								$regex: val,
								$options: 'i',
							},
						},
						{
							lastname: {
								$regex: val,
								$options: 'i',
							},
						},
						{
							profession: {
								$regex: val,
								$options: 'i',
							},
						},
						{
							department: {
								$regex: val,
								$options: 'i',
							},
						},
						/* { clientTags: {
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
					$limit: 20,
					$sort: {
						lastname: 1,
					},
				},
			})
				.then(res => {
					console.log('employees  fetched successfully');
					console.log(res.data);
					setFacilities(res.data);
					setSearchMessage(' Employees  fetched successfully');
					setShowPanel(true);
				})
				.catch(err => {
					toast({
						message: 'Error searching Employees ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
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
			//console.log("success has changed", clear);
			setSimpa('');
		}
		return () => {};
	}, [clear]);

	return (
		<div>
			<Autocomplete
				size='small'
				value={simpa}
				disabled={disabled}
				onChange={(event, newValue, reason) => {
					if (reason === 'clear') {
						setSimpa('');
						setParentState && setParentState(null);
					} else {
						handleRow(newValue);
					}
				}}
				id='free-solo-dialog-demo'
				options={facilities}
				getOptionLabel={option => {
					if (typeof option === 'string') {
						return option;
					}
					if (option.inputValue) {
						return option.inputValue;
					}
					return option.firstname;
				}}
				isOptionEqualToValue={(option, value) =>
					value === undefined || value === '' || option._id === value._id
				}
				//isOptionEqualToValue={(option, value) => option.id === value.id}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				noOptionsText={
					val === '' ? 'Type something..' : `${val} is not an Employee`
				}
				renderOption={(props, option) => (
					<li
						{...props}
						style={{ fontSize: '0.75rem' }}>
						{option.firstname}, {option.profession}, {option.department}{' '}
						department.
					</li>
				)}
				sx={{
					width: '100%',
					'& .MuiInputBase-input.Mui-disabled': {
						WebkitTextFillColor: '#000000',
						color: 'black',
					},
				}}
				freeSolo={false}
				renderInput={params => (
					<TextField
						{...params}
						label={label || 'Search for Employee'}
						onChange={e => handleSearch(e.target.value)}
						ref={inputEl}
						sx={{
							fontSize: '0.75rem',
							backgroundColor: '#ffffff',
							'& .MuiInputBase-input': {
								height: '0.9rem',
								fontSize: '0.75rem',
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
