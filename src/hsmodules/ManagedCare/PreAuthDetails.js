/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
import { Box, Grid, Button as MuiButton, FormHelperText } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import LocationSearch from '../helpers/LocationSearch';
import EmployeeSearch from '../helpers/EmployeeSearch';
import BillServiceCreate from '../Finance/BillServiceCreate';
import 'react-datepicker/dist/react-datepicker.css';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import Switch from '../../components/switch';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';

import { McText } from './text';
import Input from '../../components/inputs/basic/Input/index';
import ToggleButton from '../../components/toggleButton';
import RadioButton from '../../components/inputs/basic/Radio';
import BasicDatePicker from '../../components/inputs/Date';
import BasicDateTimePicker from '../../components/inputs/DateTime';
import CustomSelect from '../../components/inputs/basic/Select';
import Textarea from '../../components/inputs/basic/Textarea';
import { MdCancel, MdAddCircle } from 'react-icons/md';

import PatientProfile from '../Client/PatientProfile';
import { FormsHeaderText } from '../../components/texts';
import GlobalCustomButton from '../../components/buttons/CustomButton';

// eslint-disable-next-line
const searchfacility = {};

export default function PreAuthDetails({ standAlone }) {
	const { state } = useContext(ObjectContext); //,setState
	// eslint-disable-next-line
	const [selectedClient, setSelectedClient] = useState();
	const [selectedAppointment, setSelectedAppointment] = useState();
	//const [showState,setShowState]=useState() //create|modify|detail
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			{!standAlone && (
				<>
					<section className='section remPadTop'>
						<Details />
					</section>
				</>
			)}
		</>
	);
}

export function Details() {
	const [deny, setDeny] = useState(false);
	const [approve, setApprove] = useState(false);
	return (
		<>
			<Grid
				container
				spacing={3}>
				<Grid
					item
					md={3}>
					<div
						style={{
							backgroundColor: '#EBEBEB',
							height: 'auto',
							borderRadius: '8px',
							marginLeft: '5px',
						}}>
						<Grid
							container
							spacing={2}
							mt={1}
							px={2}>
							<Grid
								item
								xs={12}
								style={{ width: 'fit-content' }}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<div
										style={{
											maxWidth: '100px',
											height: '100px',
										}}>
										<img
											src='/img_avatar.png'
											alt='avatar'
											style={{
												width: '100%',
												height: '100%',
											}}
										/>
									</div>
									<div style={{ marginLeft: '10px' }}>
										<p style={{ fontWeight: 'bold', margin: 0 }}>
											Tejiri Tabor
										</p>
										<p style={{ fontWeight: 'bold', margin: 0 }}>
											+2348123456789
										</p>
									</div>
								</div>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={2}
							mt={1}
							px={2}>
							<Grid
								item
								xs={12}>
								<p style={{ fontWeight: 'bold' }}>DOB: 23/06/2022</p>
							</Grid>
							<Grid
								item
								xs={12}>
								<p style={{ fontWeight: 'bold' }}>Age: 52</p>
							</Grid>
							<Grid
								item
								xs={12}>
								<p style={{ fontWeight: 'bold' }}>Gender: Male</p>
							</Grid>
							<Grid
								item
								xs={12}>
								<p style={{ fontWeight: 'bold' }}>
									Hospital Name: Lagos State Clinic{' '}
								</p>
							</Grid>
							<Grid
								item
								xs={12}>
								<p style={{ fontWeight: 'bold' }}>
									Health Plan: Former sector plan
								</p>
							</Grid>
							<Grid
								item
								xs={12}>
								<p style={{ fontWeight: 'bold' }}>
									Date of Admission: 23/06/2022
								</p>
							</Grid>
							<Grid
								item
								xs={12}>
								<p style={{ fontWeight: 'bold' }}>
									Date of Discharge: 23/06/2022
								</p>
							</Grid>
							<Grid
								item
								xs={12}>
								<p style={{ fontWeight: 'bold' }}>Capitation: Filed</p>
							</Grid>
							<Grid
								item
								xs={12}>
								<p style={{ fontWeight: 'bold' }}>Fee of Service: Filed</p>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Grid
					item
					md={9}>
					<div
						style={{
							width: '100%',
							height: 'calc(100vh - 90px)',
							overflow: 'auto',
							paddingRight: '1rem',
						}}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}>
							<Box>
								<FormsHeaderText text={'Pre-Authorization Details - 13322BA'} />
							</Box>
							<Box sx={{ display: 'flex', marginTop: '1rem' }}>
								<GlobalCustomButton
									onClick={() => setApprove(true)}
									text='Approve'
									color='success'
									customStyles={{ marginRight: '.8rem' }}
								/>
								<GlobalCustomButton
									onClick={() => {}}
									text='On Hold'
									color='secondary'
									customStyles={{ marginRight: '.8rem' }}
								/>
								<GlobalCustomButton
									onClick={() => setDeny(true)}
									text='Reject'
									color='error'
								/>
							</Box>
						</Box>

						<div
							style={{
								marginTop: '10px',
								border: '1px solid #8F8F8F',
								padding: '1rem',
							}}>
							<p>Request Sent 08/05/2022 9:45pm</p>
							<McText txt={'Clinical Information'} />
							<Grid
								container
								spacing={2}
								mb={1}>
								<Grid
									item
									xs={12}>
									<p style={{ fontWeight: 'bold' }}>Presenting Complaints:</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt
									</p>
								</Grid>
							</Grid>

							<FormsHeaderText text={'Clinical Findings'} />
							<Grid
								container
								spacing={2}
								mb={1}>
								<Grid
									item
									xs={12}>
									<p style={{ fontWeight: 'bold' }}>Provisional Diagonosis:</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt
									</p>

									<p style={{ fontWeight: 'bold' }}>
										Planned Procedures / Services Requiring Authorization:
									</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt
									</p>
									<p style={{ fontWeight: 'bold' }}>
										Planned Procedures / Services Requiring Authorization:
									</p>
								</Grid>
							</Grid>

							<Grid
								container
								spacing={2}>
								<Grid
									item
									xs={12}>
									<p style={{ fontWeight: 'bold' }}>Reason for Request:</p>
									<span
										style={{
											fontWeight: 'bold',
											backgroundColor: '#ECF3FF',
											color: '#0364FF',
											padding: '.3rem',
											marginRight: '1rem',
										}}>
										Procedure
									</span>
									<span
										style={{
											fontWeight: 'bold',
											backgroundColor: '#ECF3FF',
											color: '#0364FF',
											padding: '.3rem',
										}}>
										Services
									</span>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}>
								<Grid
									item
									xs={12}>
									<p style={{ fontWeight: 'bold' }}>Physician Name:</p>
									<p>Dr. John Doe</p>
									<p>Lagos State Hospital</p>
								</Grid>
							</Grid>
						</div>

						<div
							style={{
								marginTop: '10px',
								border: '1px solid #8F8F8F',
								padding: '1rem',
							}}>
							<p>Request Sent 08/05/2022 9:45pm</p>
							<p>
								Request Status: <span style={{ color: '#ED0423' }}>Reject</span>
							</p>
							<Grid
								container
								spacing={2}
								mb={1}>
								<Grid
									item
									xs={12}>
									<p style={{ fontWeight: 'bold' }}>Reason for Denial:</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt
									</p>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}>
								<Grid
									item
									xs={12}>
									<p style={{ fontWeight: 'bold' }}>Physician Name:</p>
									<p>Dr. John Doe</p>
									<p>Lagos State Hospital</p>
								</Grid>
							</Grid>
						</div>

						<div
							style={{
								marginTop: '10px',
								border: '1px solid #8F8F8F',
								padding: '1rem',
							}}>
							<p>Request Sent 08/05/2022 9:45pm</p>
							<p>
								Request Status:{' '}
								<span style={{ color: '#17935C' }}>Approve</span>
							</p>
							<Grid
								container
								spacing={2}
								mb={1}>
								<Grid
									item
									xs={12}>
									<p style={{ fontWeight: 'bold' }}>reason for Approval:</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt
									</p>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}>
								<Grid
									item
									xs={12}>
									<p style={{ fontWeight: 'bold' }}>Physician Name:</p>
									<p>Dr. John Doe</p>
									<p>Lagos State Hospital</p>
								</Grid>
							</Grid>
						</div>
					</div>
				</Grid>
			</Grid>
			{approve && (
				<>
					<ModalBox
						open={approve}
						onClose={() => setApprove(false)}>
						<form>
							<h2>Approve Claim 13229-BA</h2>
							<Grid
								container
								spacing={2}
								mt={1}>
								<Grid
									item
									xs={12}>
									<Input label={'Name of Referral'} />
								</Grid>
								<Grid
									item
									xs={12}>
									<Input label={'Institution'} />
								</Grid>
								<Grid
									item
									xs={12}>
									<Input label={'Reason'} />
								</Grid>
								<Grid
									item
									xs={12}>
									<GlobalCustomButton
										text={'Approve'}
										color='success'
									/>
								</Grid>
							</Grid>
						</form>
					</ModalBox>
				</>
			)}
			{deny && (
				<>
					<ModalBox
						open={deny}
						onClose={() => setDeny(false)}>
						<form>
							<h2>Deny Claim 13229-BA</h2>

							<Grid
								container
								spacing={2}
								mt={1}>
								<Grid
									item
									xs={12}>
									<Input label={'Name of Referral'} />
								</Grid>
								<Grid
									item
									xs={12}>
									<Input label={'Institution'} />
								</Grid>
								<Grid
									item
									xs={12}>
									<Input label={'Reason'} />
								</Grid>
								<Grid
									item
									xs={12}>
									<GlobalCustomButton
										text={'Reject'}
										color='error'
									/>
								</Grid>
							</Grid>
						</form>
					</ModalBox>
				</>
			)}
		</>
	);
}
