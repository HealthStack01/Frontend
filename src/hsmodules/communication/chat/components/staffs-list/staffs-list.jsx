import {useState, useEffect, useCallback, useContext} from 'react';
import {Box} from '@mui/system';
import {IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ExpandableSearchInput from '../../../../../components/inputs/Search/ExpandableSearch';
import client from '../../../../../feathers';
import {UserContext} from '../../../../../context';
import ChatEachStaff from './each-staff';

const CustomLoader = () => (
	<div
		style={{
			padding: '24px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
		<img
			src='/loading.gif'
			style={{width: '200px', height: 'auto', display: 'block'}}
		/>
		<Typography sx={{marginTop: '-2rem', fontSize: '0.85rem'}}>
			Hold on, whilst we fetch your data...
		</Typography>
	</div>
);

const CommunicationChatStaffsList = ({closeStaffsList}) => {
	const EmployeeServ = client.service('employee');
	const {user} = useContext(UserContext);
	const [staffs, setStaffs] = useState([]);
	const [filteredStaffs, setFilteredStaffs] = useState([]);
	const [fetchingStaffs, setFetchingStaffs] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const handleSearchChange = e => {
		const inputValue = e.target.value;
		setSearchValue(inputValue);

		const filterdStaffs = staffs.filter(staff => {
			const value = inputValue.toLowerCase();
			if (
				staff.firstname.toLowerCase().includes(value) ||
				staff.lastname.toLowerCase().includes(value) ||
				staff.profession.toLowerCase().includes(value) ||
				staff.department.toLowerCase().includes(value)
			) {
				return staff;
			}
		});

		setFilteredStaffs(filterdStaffs);
	};

	const handleGetStaffs = useCallback(async () => {
		setFetchingStaffs(true);
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
			setFetchingStaffs(false);
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
				setFetchingStaffs(false);
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

	// console.log(filteredStaffs);

	return (
		<Box sx={{width: '100%', height: '100%'}}>
			<Box
				sx={{
					height: '50px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					backgroundColor: '#f0f0f0',
					padding: '0 15px',
				}}>
				<Box sx={{width: 'calc(100% - 50px)'}}>
					<ExpandableSearchInput
						onChange={handleSearchChange}
						value={searchValue}
					/>
				</Box>

				<IconButton onClick={closeStaffsList}>
					<CloseIcon />
				</IconButton>
			</Box>

			{fetchingStaffs ? (
				<Box
					sx={{
						width: '100%',
						height: 'calc(100% - 50px)',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<CustomLoader />
				</Box>
			) : (
				<Box
					sx={{width: '100%', height: 'calc(100% - 50px)', overflowY: 'auto'}}>
					{staffs.map(staff => {
						return (
							<ChatEachStaff
								key={staff._id}
								staff={staff}
							/>
						);
					})}
				</Box>
			)}
		</Box>
	);
};

export default CommunicationChatStaffsList;
