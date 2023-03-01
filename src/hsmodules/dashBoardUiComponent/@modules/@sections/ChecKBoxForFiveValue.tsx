import { Box, Card, Checkbox, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
interface ViewCardProps {
	count: number;
	title: string;
	dataSource?: any;
	isLoading?: boolean;
}

const demoData = {
	totalCheckOne: 3,
	totalCheckTwo: 10,
	totalCheckThree: 30,
};

const CheckBoxCard: React.FC<ViewCardProps> = ({
	title,
	count,
	dataSource = demoData,
	isLoading,
}) => {
	const [checkOne, setCheckOne] = useState(true);
	const [checkTwo, setCheckTwo] = useState(false);
	const [checkThree, setCheckThree] = useState(false);
	const [countValue, setcountValue] = useState(count);
	const [arr, setArr] = useState(0);

	const checkBoxTitleArray = [
		'Total Policy',
		'Total Approved Policy',
		'Total Pending Policy',
	];

	const renderDataSource = () => {
		if (checkOne) {
			setcountValue(dataSource.totalCheckOne);
			return;
		} else if (checkTwo) {
			setcountValue(dataSource.totalCheckTwo);
			return;
		} else if (checkThree) {
			setcountValue(dataSource.totalCheckThree);
			return;
		} else {
			setcountValue(dataSource.totalCheckOne);
			setCheckOne(true);
			return;
		}
	};

	useEffect(() => {
		renderDataSource();
	}, [arr, count]);

	const RenderFilterGroup = () => {
		const handleChangeCheckOne = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.checked;
			setCheckOne(value);
			setCheckTwo(false);
			setCheckThree(false);
			setArr((prevState) => prevState + 1);
		};

		const handleChangeCheckTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.checked;
			setCheckOne(false);
			setCheckTwo(value);
			setCheckThree(false);
			setArr((prevState) => prevState + 1);
		};

		const handleChangeCheckThree = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.checked;
			setCheckOne(false);
			setCheckTwo(false);
			setCheckThree(value);
			setArr((prevState) => prevState + 1);
		};

		//each box
		return (
			<>
				<Stack direction='column'>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							m: 0,
							p: 0,
						}}>
						<label>{checkBoxTitleArray[0]}</label>
						<Checkbox
							sx={{ m: 0, p: 0, ml: 2 }}
							size='small'
							checked={checkOne}
							onChange={handleChangeCheckOne}
							name='checkOne'
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							m: 0,
							p: 0,
						}}>
						<label>{checkBoxTitleArray[1]}</label>
						<Checkbox
							sx={{ m: 0, p: 0, ml: 2 }}
							size='small'
							checked={checkTwo}
							onChange={handleChangeCheckTwo}
							name='checkTwo'
						/>
					</Box>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							m: 0,
							p: 0,
						}}>
						<label>{checkBoxTitleArray[2]}</label>
						<Checkbox
							sx={{ m: 0, p: 0, ml: 2 }}
							size='small'
							checked={checkThree}
							onChange={handleChangeCheckThree}
							name='checkThree'
						/>
					</Box>
				</Stack>
			</>
		);
	};

	const isFilterObject = () => {
		return { padding: 1.5, width: '75%' };
	};

	if (isLoading === true && isNaN(countValue)) {
		setTimeout(() => {
			setArr((prevState) => prevState + 1);
		}, 3000);

		return (
			<Card
				sx={{
					p: isFilterObject().padding,
					background: '#f9f9f9',
					boxShadow: '0',
					borderRadius: 4,
					width: { xs: '100%' },
					textAlign: 'center',
					mr: 1,
					mb: { xs: 1 },
					display: 'flex',
					alignItems: 'center',
				}}>
				<Box sx={{ width: isFilterObject().width }}>
					<Typography
						variant='h1'
						sx={{ fontWeight: 'bold', fontSize: '15px' }}>
						<p>Loading . . .</p>
					</Typography>
				</Box>
			</Card>
		);
	} else
		return (
			<Card
				sx={{
					p: isFilterObject().padding,
					background: '#f9f9f9',
					boxShadow: '0',
					borderRadius: 4,
					width: { xs: '100%' },
					textAlign: 'center',
					mr: 1,
					mb: { xs: 1 },
					display: 'flex',
					alignItems: 'center',
				}}>
				<Box sx={{ width: isFilterObject().width }}>
					<Typography
						variant='h1'
						sx={{ fontWeight: 'bold', fontSize: '15px' }}>
						{countValue}
					</Typography>
					{/* <Typography>{title}</Typography> */}
				</Box>
				<RenderFilterGroup />
			</Card>
		);
};
export default CheckBoxCard;
