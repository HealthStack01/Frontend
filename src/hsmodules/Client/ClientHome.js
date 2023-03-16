import React, { useState, useEffect, useContext } from 'react';
import { UserContext, ObjectContext } from '../../context';
import { Outlet } from 'react-router-dom';
import { FrontDeskList } from './FrontDesk';
import Box from '@mui/material/Box';
import ModalBox from '../../components/modal';

export default function ClientHome({ children }) {
	const { state, setState } = useContext(ObjectContext);
	const { user } = useContext(UserContext);

	const [selectedClinic, setSelectedClinic] = useState(
		state.FrontDesk.selectedFrontDesk,
	);

	useEffect(() => {
		const notSelected = Object.keys(selectedClinic).length === 0;

		if (notSelected) {
			handleChangeFrontDesk();
		}
		return () => {};
	}, []);

	const handleChangeFrontDesk = async () => {
		await setState(prev => ({
			...prev,
			FrontDesk: { ...prev.FrontDesk, locationModal: true },
		}));
	};

	const handleCloseLocationModule = () => {
		setState(prev => ({
			...prev,
			FrontDesk: { ...prev.FrontDesk, locationModal: false },
		}));
	};

	useEffect(() => {
		setSelectedClinic(state.FrontDesk.selectedFrontDesk);

		const newEmployeeLocation = {
			locationName: state.FrontDesk.selectedFrontDesk.name,
			locationType: 'Front Desk',
			locationId: state.FrontDesk.selectedFrontDesk._id,
			facilityId: user.currentEmployee.facilityDetail._id,
			facilityName: user.currentEmployee.facilityDetail.facilityName,
			case: 'client',
		};

		setState(prevstate => ({
			...prevstate,
			employeeLocation: newEmployeeLocation,
		}));
	}, [state.FrontDesk.selectedFrontDesk]);

	return (
		<section className='section remPadTop'>
			<section className='hero is-info is-fullheight'>
				<div className='layout__content-main'>
					<ModalBox open={state.FrontDesk.locationModal}>
						<Box
							sx={{
								maxWidth: '600px',
								maxHeight: '80vh',
							}}>
							<FrontDeskList
								standalone={true}
								closeModal={handleCloseLocationModule}
							/>
						</Box>
					</ModalBox>

					{children}
					<Outlet />
				</div>
			</section>
		</section>
	);
}
