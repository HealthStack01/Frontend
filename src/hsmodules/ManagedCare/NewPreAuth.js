/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Badge, Box, Grid } from '@mui/material';
import { toast } from 'bulma-toast';
import { addDays, format, subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import CustomTable from '../../components/customtable';
import ModalBox from '../../components/modal';
import FilterMenu from '../../components/utilities/FilterMenu';

import { TableMenu } from '../../ui/styled/global';
import { PageWrapper } from '../../ui/styled/styles';

import GlobalCustomButton from '../../components/buttons/CustomButton';

import { McText } from './text';
import { baseuRL, token } from '../../utils/api';
import axios from 'axios';
import { preAuthSchema } from './schema';
import { DashboardPageWrapper } from '../dashBoardUiComponent/core-ui/styles';
import PreAuthCreate from './PreAuthCreate';
import PreAuthDetail from './PreAuthDetail';

export const PreAuth = () => {
	const [data, setData] = useState([]);
	const [row, setRow] = useState([]);
	const [details, setDetails] = useState(false);
	const [open, setOpen] = useState(false);
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
	const handleCreateNew = () => {
		setOpen(true);
	};
	const handleRow = row => {
		setOpen(true);
		setRow(row);
		setDetails(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	console.log(row, '.>>>>>>');
	return (
		<>
			<ModalBox
				open={open}
				onClose={handleClose}
				width='80vw'>
				{details ? (
					<PreAuthDetail
						data={row}
						onClose={handleClose}
					/>
				) : (
					<PreAuthCreate onClose={handleClose} />
				)}
			</ModalBox>
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
		</>
	);
};
