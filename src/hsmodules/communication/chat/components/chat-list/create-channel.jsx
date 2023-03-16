import {useState, useContext, useCallback, useEffect} from 'react';
import {Box, Grid} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useForm} from 'react-hook-form';

import client from '../../../../../feathers';
import Input from '../../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../../components/inputs/basic/Select';
import GlobalCustomButton from '../../../../../components/buttons/CustomButton';
import {UserContext} from '../../../../../context';
import {toast} from 'react-toastify';

const CreateNewChannel = () => {
	const EmployeeServ = client.service('employee');
	const ChatServer = client.service('chat');
	const {user} = useContext(UserContext);
	const [staffs, setStaffs] = useState([]);
	const [members, setMemebers] = useState([]);
	const [val, setVal] = useState('');

	const {register, reset, control, handleSubmit} = useForm();

	const handleGetStaffs = useCallback(async () => {
		//setFetchingStaffs(true);
		if (user.currentEmployee) {
			const findEmployee = await EmployeeServ.find({
				query: {
					facility: user.currentEmployee.facilityDetail._id,
					$limit: 200,
					$sort: {
						createdAt: -1,
					},
				},
			});

			await setStaffs(findEmployee.data);
			//setFetchingStaffs(false);
		} else {
			if (user.stacker) {
				const findEmployee = await EmployeeServ.find({
					query: {
						$limit: 100,
						$sort: {
							facility: -1,
						},
					},
				});

				await setStaffs(findEmployee.data);
				//setFetchingStaffs(false);
			}
		}
	}, []);

	useEffect(() => {
		if (user) {
			handleGetStaffs();
		} else {
			return;
		}
		EmployeeServ.on('created', obj => handleGetStaffs());
		EmployeeServ.on('updated', obj => handleGetStaffs());
		EmployeeServ.on('patched', obj => {
			handleGetStaffs();
		});
		EmployeeServ.on('removed', obj => handleGetStaffs());
		return () => {};
	}, []);

	const handleCreateChannel = data => {
		if (members.length === 0)
			return toast.warning('Select at least one Channel member');
		const document = {
			...data,
			members: members.map(item => item._id),
		};

		console.log(document);
	};

	return (
		<Box
			sx={{
				width: '550px',
			}}>
			<Box>
				<Grid
					container
					spacing={2}
					mb={2}>
					<Grid
						item
						xs={12}>
						<CustomSelect
							label='Channel Type'
							name='channel_type'
							options={[
								'Unit',
								'Location',
								'Client',
								'Global',
								'Department',
								'Organization',
								'Network',
							]}
							required='Select Channel Type'
							control={control}
						/>
					</Grid>

					<Grid
						item
						xs={12}>
						<Input
							label='Channel Name'
							register={register('channel_name', {
								required: 'Provide Channel Name',
							})}
						/>
					</Grid>

					<Grid
						item
						xs={12}>
						<Autocomplete
							multiple
							//onChange={handleMembersChange}
							value={members}
							onChange={(event, newValue, reason) => {
								if (reason === 'clear') {
									setMemebers([]);
								} else {
									console.log(newValue);
									setMemebers(newValue);
								}
							}}
							limitTags={3}
							id='multiple-limit-tags'
							options={staffs.map(item => {
								return {...item, name: `${item.firstname} ${item.lastname}`};
							})}
							getOptionLabel={option => {
								if (typeof option === 'string') {
									return option;
								}
								if (option.inputValue) {
									return option.inputValue;
								}
								return option.name;
							}}
							isOptionEqualToValue={(option, value) =>
								value === undefined || value === '' || option._id === value._id
							}
							selectOnFocus
							clearOnBlur
							handleHomeEndKeys
							noOptionsText={
								val === '' ? 'Type something..' : `${val} is not an Employee`
							}
							renderOption={(props, option) => (
								<li
									{...props}
									style={{fontSize: '0.75rem'}}>
									{option.name} - {option.department}
								</li>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label={'Channel Members'}
									onChange={e => setVal(e.target.value)}
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
										style: {color: '#2d2d2d'},
									}}
								/>
							)}
							sx={{width: '100%'}}
						/>
					</Grid>
				</Grid>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<GlobalCustomButton
						sx={{
							width: '90%',
						}}
						onClick={handleSubmit(handleCreateChannel)}>
						Create Channel
					</GlobalCustomButton>
				</Box>
			</Box>
		</Box>
	);
};

export default CreateNewChannel;
