import {useState, useContext, useCallback, useMemo} from 'react';
import {Box, Typography} from '@mui/material';
import CustomTable from '../../../../components/customtable';
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import GlobalCustomButton from '../../../../components/buttons/CustomButton';
import {FormsHeaderText} from '../../../../components/texts';
import client from '../../../../feathers';
import {ObjectContext} from '../../../../context';
import CustomConfirmationDialog from '../../../../components/confirm-dialog/confirm-dialog';
import {toast} from 'react-toastify';

import {getPlansColumns} from '../../../CRM/components/colums/columns';

const PremiumPlansList = ({
	openCreateModal,
	openDetailModal,
	plans,
	removePlan,
	omitCreate,
	handleRow,
}) => {
	const dealServer = client.service('deal');
	const {state, setState, showActionLoader, hideActionLoader} =
		useContext(ObjectContext);
	const [selectedPlans, setSelectedPlans] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	//first param is passed to the delete element on the table and the second param (false) decides whether or not the delete button is disabled

	const plansColumns = getPlansColumns(null, false, true);

	const handleRowSelected = useCallback(state => {
		//console.log(state);
		setSelectedPlans(state.selectedRows);
	}, []);

	const contextActions = useMemo(() => {
		const handleAction = () => {
			console.log(selectedPlans);
		};

		return (
			<GlobalCustomButton
				key='delete'
				onClick={handleAction}
				//style={{backgroundColor: 'red'}}
			>
				Make Payment
			</GlobalCustomButton>
		);
	}, [plans, selectedPlans, toggleCleared]);

	return (
		<Box>
			{!omitCreate && (
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
					mb={2}>
					<FormsHeaderText text='Plans List' />

					{/* <GlobalCustomButton onClick={openCreateModal}>
						<AddCircleOutlineOutlined
							sx={{marginRight: '5px'}}
							fontSize='small'
						/>
						Add New Plan
					</GlobalCustomButton> */}
				</Box>
			)}

			<Box
				mt={1}
				mb={1}>
				<CustomTable
					title={'Unpaid Plans'}
					columns={plansColumns}
					data={plans}
					pointerOnHover
					highlightOnHover
					striped
					//onRowClicked={handleRow}
					selectable
					clearSelectedRows={toggleCleared}
					//onSelectedRowsChange={handleRowSelected}
					contextActions={contextActions}
					CustomEmptyData={
						<Typography sx={{fontSize: '0.8rem'}}>
							You haven't added any plan yet!
						</Typography>
					}
					noHeader={false}
					progressPending={false}
				/>
			</Box>
		</Box>
	);
};

export default PremiumPlansList;
