/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext, ObjectContext } from '../../context';
import { Outlet } from 'react-router-dom';
import ModalBox from '../../components/modal';
import { Box } from '@mui/material';
import Ward, { WardList } from './Ward';

export default function WardHome({ children }) {
	// const [activeModal, setActiveModal]=useState("modal is-active ")
	const { state, setState } = useContext(ObjectContext);
	const { user, setUser } = useContext(UserContext);
	// eslint-disable-next-line
	const [selectedWard, setSelectedWard] = useState(
		state.WardModule.selectedWard,
	);
	const [showModal, setShowModal] = useState(false);

	// const handleCloseModal = () => {
	//   state.showStoreModal = "modal";
	//   setState(state);
	//   console.log(state.showStoreModal);
	// };

	useEffect(() => {
		const notSelected = Object.keys(selectedWard).length === 0;

		if (notSelected) {
			handleChangeWard();
		}
		return () => {};
	}, []);

	useEffect(() => {
		setSelectedWard(state.WardModule.selectedWard);

		const newEmployeeLocation = {
			locationName: state.WardModule.selectedWard.name,
			locationType: 'Ward',
			locationId: state.WardModule.selectedWard._id,
			facilityId: user.currentEmployee.facilityDetail._id,
			facilityName: user.currentEmployee.facilityDetail.facilityName,
			case: 'ward',
		};
		setState(prevstate => ({
			...prevstate,
			employeeLocation: newEmployeeLocation,
		}));
	}, [state.WardModule.selectedWard]);

	const handleChangeWard = async () => {
		await setState(prev => ({
			...prev,
			WardModule: { ...prev.WardModule, locationModal: true },
		}));
		// console.log( showModal)
	};

	const handleCloseLocationModal = () => {
		setState(prev => ({
			...prev,
			WardModule: { ...prev.WardModule, locationModal: false },
		}));
	};

	return (
		<section className='section remPadTop'>
			{/*  <div className="is-1"> Appointment sdchedule for patients for this clinic</div>
               <div className="is-1"> Communication Command Center</div>     */}
			<section className='hero is-info is-fullheight'>
				<div className='hero-body'></div>
				<div className='layout__content-main'>
					<ModalBox open={state.WardModule.locationModal}>
						<Box
							sx={{
								maxWidth: '600px',
								maxHeight: '80vh',
							}}>
							<WardList
								standalone={true}
								closeModal={handleCloseLocationModal}
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
