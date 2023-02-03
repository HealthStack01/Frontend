import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import RefreshIcon from '@mui/icons-material/Refresh';
import BiotechIcon from '@mui/icons-material/Biotech';
import Typography from '@mui/material/Typography';
// import ModalBox from '../../components/modal';
import MedicalRecords from './components/medicalRecords/MedicalRecords';
import ClinicalNotes from './components/medicalRecords/ClinicalNotes';
import Prescription from './components/medicalRecords/Prescription';
import Referral from './components/medicalRecords/Referral';
import Appointment from './components/medicalRecords/Appointment';
import Lab from './components/medicalRecords/Lab';
import HealthInsurance from './components/medicalRecords/HealthInsurance';
import { useNavigate } from 'react-router-dom';

export default function ViewRecords() {
	const [currentView, setCurrentView] = useState('veiws');
	// const [healthInsuranceModal, setHealthInsuranceModal] = useState(false);

	const handleGoBack = () => {
		setCurrentView('veiws');
	};

	// const handleHideInsuranceModal = () => {
	//   setHealthInsuranceModal(false);
	// };

	// const handleInsuranceModal = () => {
	//   setHealthInsuranceModal(true);
	// };

	return (
		<Box>
			{currentView === 'veiws' && (
				<ViewRecordItems
					showMedicalModal={() => setCurrentView('medical')}
					showClinicalModal={() => setCurrentView('clinical')}
					showPrescriptionModal={() => setCurrentView('prescription')}
					showReferralModal={() => setCurrentView('referral')}
					showLabModal={() => setCurrentView('lab')}
					showAppointmentModal={() => setCurrentView('appointment')}
					showHealthInsuranceModal={() => setCurrentView('insurance')}
					// showHealthInsuranceModal={handleInsuranceModal}
				/>
			)}

			{currentView === 'medical' && (
				<MedicalRecords handleGoBack={handleGoBack} />
			)}

			{currentView === 'clinical' && (
				<ClinicalNotes handleGoBack={handleGoBack} />
			)}

			{currentView === 'prescription' && (
				<Prescription handleGoBack={handleGoBack} />
			)}

			{currentView === 'appointment' && (
				<Appointment handleGoBack={handleGoBack} />
			)}

			{currentView === 'referral' && <Referral handleGoBack={handleGoBack} />}

			{currentView === 'lab' && <Lab handleGoBack={handleGoBack} />}

			{currentView === 'insurance' && (
				<HealthInsurance handleGoBack={handleGoBack} />
			)}

			{/* <ViewRecordItems 
    showMedicalModal={handleMedicalModal} 
    showClinicalModal={handleClinicalModal}
    showPrescriptionModal={handlePrescriptionModal}
    showReferralModal={handleReferralModal}
    showLabModal={handleLabModal}
    showAppointmentModal={handleAppointmentModal}
    showHealthInsuranceModal={handleInsuranceModal}
    /> */}

			{/* <ModalBox width="50vw" open={medicalModal} onClose={handleHideMedicalModal} header="Medical Records">
          <MedicalRecords/>
        </ModalBox>
      
        <ModalBox width="50vw" open={clinicalModal} onClose={handleHideClinicalModal} header="Clinical Notes">
          <ClinicalNotes/>
        </ModalBox>

        <ModalBox width="40vw" open={prescriptionModal} onClose={handleHidePrescriptionModal} header="Prescriptions">
          <Presciption/>
        </ModalBox>
      
        <ModalBox width="40vw"  open={appointmentModal} onClose={handleHideAppointmentModal} header="Appointment">
          <Appointment/>
        </ModalBox>

        <ModalBox  open={referralModal} onClose={handleHideReferralModal} header="Referral">
          <Referral/>
        </ModalBox>

        <ModalBox width="40vw" open={labReportModal} onClose={handleHideLabModal} header="Lab">
          <Lab/>
        </ModalBox>*/}
			{/* <ModalBox open={healthInsuranceModal} onClose={handleHideInsuranceModal} header="Health Insurance">
          <HealthInsurance/>
        </ModalBox>  */}
		</Box>
	);
}

export function ViewRecordItems({
	showMedicalModal,
	showClinicalModal,
	showPrescriptionModal,
	showReferralModal,
	showLabModal,
	showAppointmentModal,
	showHealthInsuranceModal,
}) {
	const navigate = useNavigate();

	return (
		<Box
			py='6rem'
			px='4rem'
			height='100vh'
			overflow='auto'>
			<Grid
				container
				gap={4}>
				<Grid item>
					<Paper
						elevation={3}
						sx={{
							width: '250px',
							height: '100%',
							padding: '3rem',
							backgroundColor: '#f4f3ee',
							cursor: 'pointer',
						}}
						onClick={showMedicalModal}>
						<Box sx={{ textAlign: 'center' }}>
							<LocalHospitalRoundedIcon
								sx={{ color: '#FFA873', fontSize: '50px' }}
							/>
							<Typography
								sx={{ fontSize: '16px', fontWeight: 'bold' }}
								color='text.secondary'>
								Medical Records
							</Typography>
						</Box>
					</Paper>
				</Grid>
				<Grid item>
					<Paper
						elevation={3}
						sx={{
							width: '250px',
							height: '100%',
							padding: '3rem',
							backgroundColor: '#f4f3ee',
							cursor: 'pointer',
						}}
						onClick={showClinicalModal}>
						<Box sx={{ textAlign: 'center' }}>
							<NoteAddIcon sx={{ color: '#5554DB', fontSize: '50px' }} />
							<Typography
								sx={{ fontSize: '16px', fontWeight: 'bold' }}
								color='text.secondary'>
								Clinical Notes
							</Typography>
						</Box>
					</Paper>
				</Grid>
				<Grid item>
					<Paper
						elevation={3}
						sx={{
							width: '250px',
							height: '100%',
							padding: '3rem',
							backgroundColor: '#f4f3ee',
							cursor: 'pointer',
						}}
						onClick={showPrescriptionModal}>
						<Box sx={{ textAlign: 'center' }}>
							<MedicalInformationIcon
								sx={{ color: '#0364FF', fontSize: '50px' }}
							/>
							<Typography
								sx={{ fontSize: '16px', fontWeight: 'bold' }}
								color='text.secondary'>
								Prescriptions
							</Typography>
						</Box>
					</Paper>
				</Grid>
				<Grid item>
					<Paper
						elevation={3}
						sx={{
							width: '250px',
							height: '100%',
							padding: '3rem',
							backgroundColor: '#f4f3ee',
							cursor: 'pointer',
						}}
						onClick={showHealthInsuranceModal}>
						<Box sx={{ textAlign: 'center' }}>
							<HealthAndSafetyIcon
								sx={{ color: '#17935C', fontSize: '50px' }}
							/>
							<Typography
								sx={{ fontSize: '16px', fontWeight: 'bold' }}
								color='text.secondary'>
								Health Insurance
							</Typography>
						</Box>
					</Paper>
				</Grid>

				<Grid item>
					<Paper
						elevation={3}
						sx={{
							width: '250px',
							height: '100%',
							padding: '3rem',
							backgroundColor: '#f4f3ee',
							cursor: 'pointer',
						}}
						onClick={showAppointmentModal}>
						<Box sx={{ textAlign: 'center' }}>
							<BookOnlineIcon sx={{ color: '#03045E', fontSize: '50px' }} />
							<Typography
								sx={{ fontSize: '16px', fontWeight: 'bold' }}
								color='text.secondary'>
								Appointments
							</Typography>
						</Box>
					</Paper>
				</Grid>
				<Grid item>
					<Paper
						elevation={3}
						sx={{
							width: '250px',
							height: '100%',
							padding: '3rem',
							backgroundColor: '#f4f3ee',
							cursor: 'pointer',
						}}
						onClick={showReferralModal}>
						<Box sx={{ textAlign: 'center' }}>
							<RefreshIcon sx={{ color: '#0364FF', fontSize: '50px' }} />
							<Typography
								sx={{ fontSize: '16px', fontWeight: 'bold' }}
								color='text.secondary'>
								Referral
							</Typography>
						</Box>
					</Paper>
				</Grid>
				<Grid item>
					<Paper
						elevation={3}
						sx={{
							width: '250px',
							height: '100%',
							padding: '3rem',
							backgroundColor: '#f4f3ee',
							cursor: 'pointer',
						}}
						onClick={showLabModal}>
						<Box sx={{ textAlign: 'center' }}>
							<BiotechIcon sx={{ color: '#0364FF', fontSize: '50px' }} />
							<Typography
								sx={{ fontSize: '16px', fontWeight: 'bold' }}
								color='text.secondary'>
								Labs
							</Typography>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}
