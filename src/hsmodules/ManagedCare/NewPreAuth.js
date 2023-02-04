/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { Badge, Box, Grid } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { toast } from 'bulma-toast';
import { addDays, format, subDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomTable from '../../components/customtable';
import ModalBox from '../../components/modal';
import FilterMenu from '../../components/utilities/FilterMenu';
import { ObjectContext, UserContext } from '../../context';
import { TableMenu } from '../../ui/styled/global';
import { PageWrapper } from '../../ui/styled/styles';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';

import GlobalCustomButton from '../../components/buttons/CustomButton';

import AutoCompleteBox from '../../components/inputs/AutoComplete';
import Input from '../../components/inputs/basic/Input/index';
import RadioButton from '../../components/inputs/basic/Radio';
import Textarea from '../../components/inputs/basic/Textarea';
import BasicDatePicker from '../../components/inputs/Date';
import { FormsHeaderText } from '../../components/texts';
import PatientProfile from '../Client/PatientProfile';
import CRMTasks from '../CRM/Tasks';
import Beneficiary from './Beneficiary';
import Claims from './Claims';
import Policy from './Policy';
import PremiumPayment from './Premium';
import { McText } from './text';
import { baseuRL, token } from '../../utils/api';
import axios from 'axios';
import { preAuthSchema } from './schema';
import { DashboardPageWrapper } from '../dashBoardUiComponent/core-ui/styles';

export const PreAuth = () => {
	const [data, setData] = useState([]);
	const [loading, setloading] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	useEffect(() => {
		axios
			.get(`${baseuRL}/preauth`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				setData(response.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	});


	const handleSearch = () => {};
	const handleCreateNew = () => {};
	const handleRow = () => {};

	return (
		<DashboardPageWrapper>
			<div>
				<TableMenu>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{handleSearch && (
							<div className='inner-table'>
								<FilterMenu onSearch={handleSearch} />
							</div>
						)}
						<h2 style={{ margin: '0 10px', fontSize: '0.95rem' }}>
							Pre-Authorization
						</h2>
						{/* <DatePicker
						selected={startDate}
						onChange={date => handleDate(date)}
						dateFormat='dd/MM/yyyy'
						placeholderText='Filter By Date'
						isClearable
					/> */}
					</div>

					{handleCreateNew && (
						<GlobalCustomButton
							text='Add new '
							onClick={handleCreateNew}
						/>
					)}
				</TableMenu>

				<div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
					<CustomTable
						title={''}
						columns={preAuthSchema}
						data={data}
						pointerOnHover
						highlightOnHover
						striped
						onRowClicked={handleRow}
						loading={false}
					/>
				</div>
			</div>
		</DashboardPageWrapper>
	);
};
