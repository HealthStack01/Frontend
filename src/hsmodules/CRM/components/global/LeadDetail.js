import {useState, useEffect, useContext, useCallback, useRef} from 'react';
import ModeEditOutlineOutlined from '@mui/icons-material/ModeEditOutlineOutlined';
import UpgradeOutlined from '@mui/icons-material/UpgradeOutlined';
import {Box, Grid, Typography} from '@mui/material';
import Textarea from "../../../../components/inputs/basic/Textarea";
import ModalBox from "../../../../components/modal";
import moment from 'moment';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import GlobalCustomButton from '../../../../components/buttons/CustomButton';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import MuiCustomDatePicker from '../../../../components/inputs/Date/MuiDatePicker';
import {FormsHeaderText} from '../../../../components/texts';
import {ObjectContext, UserContext} from '../../../../context';
import client from '../../../../feathers';
import dayjs from 'dayjs';

var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

const LeadDetailView = () => {
	const {register, reset, control, handleSubmit} = useForm();
	const [editLead, setEditLead] = useState(false);
	const {state} = useContext(ObjectContext);

	const udpateLead = data => {
		toast.success('Lead Detail Updated');
		setEditLead(false);
	};

	useEffect(() => {
		const deal = state.DealModule.selectedDeal;

		const initFormValue = {
			probability: deal.dealinfo.probability,
			size: deal.dealinfo.size,
			status: deal.dealinfo.currStatus,
			nextAction: deal.dealinfo.nextAction,
			weightForecast: deal.dealinfo.weightForecast,
			closingDate: deal.dealinfo.closingDate,
			submissionDate: deal.createdAt,
		};
		reset(initFormValue);
	}, []);

	return (
		<>
	
			<Box
				sx={{
					display: 'flex',
					alignItem: 'center',
					justifyContent: 'space-between',
				}}
				mb={1}>
				
				<FormsHeaderText text='Lead Details' />

				{editLead ? (
					<GlobalCustomButton
						color='success'
						onClick={handleSubmit(udpateLead)}>
						<UpgradeOutlined
							fontSize='small'
							sx={{marginRight: '5px'}}
						/>
						Update
					</GlobalCustomButton>
				) : (
					<GlobalCustomButton onClick={() => setEditLead(true)}>
						<ModeEditOutlineOutlined
							fontSize='small'
							sx={{marginRight: '5px'}}
						/>
						Edit
					</GlobalCustomButton>
				)}
			</Box>

			<Grid
				container
				spacing={1}>
				<Grid
					item
					xs={3}>
					<Input
						register={register('probability', {required: true})}
						label='Probability'
						disabled={!editLead}
						//placeholder="Enter customer name"
					/>
				</Grid>

				<Grid
					item
					xs={3}>
					<Input
						register={register('size', {required: true})}
						label='Size'
						disabled={!editLead}
						//placeholder="Enter customer number"
					/>
				</Grid>

				<Grid
					item
					xs={3}>
					<CustomSelect
						label='Status'
						options={['Open', 'Closed', 'Pending']}
						control={control}
						name='currStatus'
						disabled={!editLead}
						// placeholder="Enter customer name"
					/>
				</Grid>

				<Grid
					item
					xs={3}>
					<Input
						register={register('weightForecast', {required: true})}
						label='Weight Forcast'
						disabled={!editLead}
						//placeholder="Enter customer number"
					/>
				</Grid>

				<Grid
					item
					xs={4}>
					<MuiCustomDatePicker
						label='Submission Date'
						name='submissionDate'
						control={control}
						disabled={true}
					/>
				</Grid>

				<Grid
					item
					xs={4}>
					<MuiCustomDatePicker
						label='Closing Date'
						name='closingDate'
						control={control}
						disabled={!editLead}
					/>
				</Grid>

				<Grid
					item
					xs={4}>
					<Input
						register={register('nextAction', {required: true})}
						label='Next Action'
						disabled={!editLead}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default LeadDetailView;

export const PageLeadDetailView = () => {
	const dealServer = client.service('deal');
	const notificationsServer = client.service('notification');
	const {register, reset, control, handleSubmit, watch, setValue} = useForm();
	const [editLead, setEditLead] = useState(false);
	const [score, setScore] = useState(false);
	const {state, setState, showActionLoader, hideActionLoader} =
		useContext(ObjectContext);
	const {user} = useContext(UserContext);
	const [currentStatus, setCurrentStatus] = useState('');

	const scoredetail= state.DealModule.selectedDeal.opportunityScore

	const udpateLead = async data => {
		showActionLoader();
		const employee = user.currentEmployee;
		const documentId = state.DealModule.selectedDeal._id;
		const currentDeal = state.DealModule.selectedDeal;
		const prevStatusHistory = state.DealModule.selectedDeal.statushx || [];
		

		const dealinfo = {
			probability: data.probability,
			size: data.size,
			currStatus: data.currStatus,
			nextAction: data.nextAction,
			weightForecast: data.weightForecast,
			closingDate: data.closingDate,
		};

		const statusHistoryObj = {
			date: new Date(),
			employeename: `${employee.firstname} ${employee.lastname}`,
			employeeId: employee.userId,
			status: data.currStatus,
		};

		const newStatusHistory =
			currentStatus !== data.currStatus
				? [statusHistoryObj, ...prevStatusHistory]
				: [...prevStatusHistory];

		//console.log(dealinfo);

		const notificationObj = {
			type: 'CRM',
			title: 'Deal Status Updated',
			description: `${employee.firstname} ${employee.lastname} Updates the status for Deal with ${currentDeal.type} ${currentDeal.name} from ${currentStatus} to ${data.currStatus} in CRM`,
			facilityId: employee.facilityDetail._id,
			sender: `${employee.firstname} ${employee.lastname}`,
			senderId: employee._id,
			pageUrl: '/app/crm/lead',
			priority: 'normal',
			dest_userId: currentDeal.assignStaff.map(item => item.employeeId),
		};

		await dealServer
			.patch(documentId, {dealinfo: dealinfo, statushx: newStatusHistory})
			.then(async res => {
				if (currentStatus !== data.currStatus) {
					await notificationsServer.create(notificationObj);

					hideActionLoader();
					setState(prev => ({
						...prev,
						DealModule: {...prev.DealModule, selectedDeal: res},
					}));

					setEditLead(false);
					toast.success(`Deal Details successfully updated!`);
				} else {
					hideActionLoader();
					setState(prev => ({
						...prev,
						DealModule: {...prev.DealModule, selectedDeal: res},
					}));

					setEditLead(false);
					toast.success(`Deal Details successfully updated!`);
				}
			})
			.catch(err => {
				hideActionLoader();
				toast.error(
					`Sorry, You weren't able to update the deal detail. ${err}`,
				);
			});
	};

	// const cancleEdit = () => {
	//    const deal = state.DealModule.selectedDeal;

	//    const initFormValue = {
	//      probability: deal.dealinfo.probability,
	//      size: deal.dealinfo.size,
	//      status: deal.dealinfo.currStatus,
	//      nextAction: deal.dealinfo.nextAction,
	//      weightForecast: deal.dealinfo.weightForecast,
	//      closingDate: deal.dealinfo.closingDate,
	//      submissionDate: deal.createdAt,
	//    };
	//    setEditLead(false)
	//    reset(initFormValue);
	// }

	useEffect(() => {
		const deal = state.DealModule.selectedDeal;
		//console.log(deal);

		const initFormValue = {
			probability: deal.dealinfo.probability,
			size: deal.dealinfo.size,
			currStatus: deal.dealinfo.currStatus,
			nextAction: deal.dealinfo.nextAction,
			weightForecast: deal.dealinfo.weightForecast,
			closingDate: deal.dealinfo.closingDate,
			submissionDate: deal.createdAt,
		};

		setCurrentStatus(deal.dealinfo.currStatus);
		reset(initFormValue);
	}, []);

	const probability = watch('probability');
	const size = watch('size');

	const calculateWeightForcast = useCallback(() => {
		console.log('Hello');
		const weightForecast = Number(probability) * Number(size);
		console.log(weightForecast);
		setValue('weightForecast', weightForecast);
	}, [probability, size]);

	useEffect(() => {
		calculateWeightForcast();
	}, [calculateWeightForcast]);

	const autoCloseDeal = useCallback(() => {
		const currentDeal = state.DealModule.selectedDeal;
		const closingDate = currentDeal.dealinfo.closingDate;

		if (dayjs(closingDate).isBefore(dayjs(), 'day')) {
			console.log('hello world');
		}
		//
	}, []);

	useEffect(() => {
		autoCloseDeal();
	}, []);

	return (
		<>
			<ModalBox
        open={score}
        onClose={() => setScore(false)}
        header="Sales Opportunity Scoring System"
      >
        <Opportunity
          closeModal={() => setScore(false)}
          //addInfo={addNewInfo}
        /> 
      </ModalBox>
			<Box
				sx={{
					display: 'flex',
					alignItem: 'center',
					justifyContent: 'space-between',
				}}
				mb={1}>
				<FormsHeaderText text='Deal Details' />

				<Box
					sx={{display: 'flex'}}
					gap={1}>
					{editLead ? (
						<>
							<GlobalCustomButton
								color='success'
								onClick={handleSubmit(udpateLead)}>
								<UpgradeOutlined
									fontSize='small'
									sx={{marginRight: '5px'}}
								/>
								Update
							</GlobalCustomButton>

							<GlobalCustomButton
								color='error'
								onClick={() => setEditLead(false)}>
								Cancel Edit
							</GlobalCustomButton>
						</>
					) : (
						<GlobalCustomButton onClick={() => setEditLead(true)}>
							<ModeEditOutlineOutlined
								fontSize='small'
								sx={{marginRight: '5px'}}
							/>
							Edit
						</GlobalCustomButton>
					)}
				</Box>
			</Box>

			<Grid
				container
				spacing={1}>
				<Grid
					item
					lg={2}
					md={4}
					sm={6}
					xs={12}>
					<Input
						register={register('probability', {required: true})}
						label='Probability'
						disabled={!editLead}
						type='number'
						//placeholder="Enter customer name"
					/>
				</Grid>

				<Grid
					item
					lg={2}
					md={3}
					sm={4}
					xs={6}>
					<Input
						register={register('size', {required: true})}
						label='Size'
						disabled={!editLead}
						type='number'
						//placeholder="Enter customer number"
					/>
				</Grid>

				<Grid
					item
					lg={2}
					md={3}
					sm={4}
					xs={6}>
					<CustomSelect
						label='Status'
						options={['Open', 'Closed', 'Suspended']}
						disabled={!editLead}
						control={control}
						name='currStatus'
						required={true}
					/>
				</Grid>

				<Grid
					item
					lg={3}
					md={4}
					sm={6}
					xs={8}>
					<Input
						register={register('weightForecast', {required: true})}
						label='Weight Forcast'
						disabled={true}
						type='number'
					/>
					
				</Grid>
				<Grid
					item
					lg={3}
					md={4}
					sm={6}
					xs={8}>
					<Input
						//register={register('weightForecast', {required: true})}
						label='Opportunity Score'
						value={scoredetail?.total}
						disabled={true}
						type='number'
					/>
					
				</Grid>
				<Grid
					item
					lg={3}
					md={4}
					sm={6}
					xs={8}>
					<Input
						//register={register('weightForecast', {required: true})}
						label='Opportunity Assessment'
						value={scoredetail?.assessment}
						disabled={true}
						type='text'
					/>
					
				</Grid>
				<Grid
					item
					lg={2}
					md={3}
					sm={4}
					xs={6}>
					
					<GlobalCustomButton
						color='error'
						onClick={() => setScore(true)}>
						Opportunity Score 
					</GlobalCustomButton>
				</Grid>

				<Grid
					item
					lg={3}
					md={4}
					sm={6}
					xs={8}>
					<MuiCustomDatePicker
						label='Submission Date'
						name='submissionDate'
						control={control}
						disabled={true}
					/>
				</Grid>

				<Grid
					item
					lg={2}
					md={3}
					sm={4}
					xs={6}>
					<MuiCustomDatePicker
						label='Closing Date'
						name='closingDate'
						control={control}
						disabled={!editLead}
					/>
				</Grid>

				<Grid
					item
					lg={2}
					md={3}
					sm={4}
					xs={6}>
					<Input
						register={register('nextAction', {required: true})}
						label='Next Action'
						disabled={!editLead}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export const Opportunity = ({addInfo, closeModal}) => {
	const dealServer = client.service("deal");
	const {state, setState, hideActionLoader, showActionLoader} =
	  useContext(ObjectContext);
	const {user} = useContext(UserContext);
	const {register, handleSubmit, control, reset} = useForm();
	const [answers, setAnswers] = useState({});
	const [total, setTotal] = useState(0);
	const [assessment, setAssessment] = useState("");
	const totalRef=useRef(0)
	const scoredetail= state.DealModule.selectedDeal.opportunityScore
	// const handleAddInfo = data => {
	//   const newData = {
	//     created_by: "Sulaimon Olaniran",
	//     information: data.additional_info,
	//     created_at: moment.now(),
	//     _id: `${Math.random()}`,
	//   };
	//   addInfo(newData);
	//   closeModal();
	//   //console.log(data);
	// };
    /*  useEffect(() => {
		if (!!state.DealModule.selectedDeal.opportunityScore.answers){
			setAnswers(state.DealModule.selectedDeal.opportunityScore.answers)
		}
		if (!!state.DealModule.selectedDeal.opportunityScore.total){
		setTotal(state.DealModule.selectedDeal.opportunityScore.total)
		}
	  }, [state.DealModule.selectedDeal?.opportunityScore.total, state.DealModule.selectedDeal?.opportunityScore.answers]);  */
	const updateScore = async data => {
	  //if (total === 0) return toast.error("Please provide your information");
	 // showActionLoader();
  
	  const employee = user.currentEmployee;
  
	  const newScore = {
		total: total,
		answer: answers,
		assessment: assessment,
		date: new Date(),
		employeename: `${employee.firstname} ${employee.lastname}`,
	  };
  
	  const oldDealInfo = state.DealModule.selectedDeal.additionalInfo;
  
	  //const updatedDealInfo = [newInfo, ...oldDealInfo];
  
	  const documentId = state.DealModule.selectedDeal._id;
  
	  await dealServer
		.patch(documentId, {opportunityScore: newScore})
		.then(res => {
		  hideActionLoader();
		  setState(prev => ({
			...prev,
			DealModule: {...prev.DealModule, selectedDeal: res},
		  }));
  
		  reset({
			info: "",
		  });
		  toast.success(
			`You have successfully added a new Addtional Information!`
		  );
		})
		.catch(err => {
		  hideActionLoader();
		  toast.error(
			`Sorry, You weren't able to add a new Addtional Information!. ${err}`
		  );
		});
	};

	const questions=[
		{
			id:1,
			question:"Client matches our Ideal Client Profile (ICP)",
			name:"icp",
			options:[
				{
				value:"Yes",
				score:0
			},
			{
				value:"No",
				score:0
			},

		]
		},
		{
			id:2,
			question:"Client have fund to finance Health Insurance Plan for their staff",
			name:"fund",
			options:[
				{
				value:"Yes",
				score:0
			},
			{
				value:"No",
				score:0
			},

		]
		},
		{
			id:3,
			question:"There is a statutory or regulatory compliance driving urgency to purchase Health Insurance",
			name:"compliance",
			options:[
				{
				value:"Yes",
				score:1
			},
			{
				value:"No",
				score:0
			},

		]
		},
		{
			id:4,
			question:"There is a change in Board or Management or Union which is driving urgency to purchase Health Insurance or thinking towards Health Insurance",
			name:"urgency",
			options:[
				{
				value:"Yes",
				score:1
			},
			{
				value:"No",
				score:0
			},

		]
		},
		{
			id:5,
			question:"There is company-wide discontentment with current solution or process",
			name:"discontentment",
			options:[
				{
				value:"Yes",
				score:2
			},
			{
				value:"No",
				score:0
			},

		]
		},
		{
			id:6,
			question:"The company Leaders are not comfortable with the workarounds to complement the current solution or process",
			name:"leaders",
			options:[
				{
				value:"Yes",
				score:2
			},
			{
				value:"No",
				score:0
			},

		]
		},
		/* {
			id:7,
			question:"The Internal stakeholders within the client company have agreed solution or plan criteria with our team",
			name:"agreed",
			options:[
				{
				value:"Yes",
				score:3
			},
			{
				value:"No",
				score:0
			},

		]
		}, */
		{
			id:7,
			question:"The Internal stakeholders within the client company have agreed solution or plan criteria with our team and the client stage in their buying journey for Health Insurance is known",
			name:"stage",
			options:[
				{
				value:"Client have a requested a meeting to discuss our proposal",
				score:1
			},
			{
				value:"Client request further presentation with all internal stakeholders after the initial meeting",
				score:2
			},
			{
				value:"Client calls for negotiation of contract & Terms of engagement after the presentation",
				score:3
			},

		]
		},
		{
			id:8,
			question:"The client timeframe to start the scheme is known and agreed",
			name:"timeframe",
			options:[
				{
				value:" Client confirms and agree to start the scheme within 1-2 months",
				score:3
			},
			{
				value:"Client confirms and agree to start the scheme within 3-4 months",
				score:2
			},
			{
				value:"Client confirms and agree to start the scheme greater than 4 months or timeframe is not known or agreed",
				score:0
			},


		]
		},
		{
			id:9,
			question:"We have the buy-in of the technical buyer for Health Insurance in the client company",
			name:"technical-buyer",
			options:[
				{
				value:"Yes",
				score:1
			},
			{
				value:"No",
				score:0
			},

		]
		},
		{
			id:10,
			question:"We have the buy-in of the economic buyer who have the financial decision to buy health insurance in the client company",
			name:"economic-buyer",
			options:[
				{
				value:"Yes",
				score:2
			},
			{
				value:"No",
				score:0
			},

		]
		},{
			id:11,
			question:'We have at least one person with influence in the client company who is our "internal advocate or Internal champion" in addition to the technical buyer and economic buyer',
			name:"champion",
			options:[
				{
				value:"Yes",
				score:3
			},
			{
				value:"No",
				score:0
			},

		]
		},

	]

	const handleAnswerChange = (questionId, selectedOption) => {
		setAnswers((prevAnswers) => ({
		  ...prevAnswers,
		  [questionId]: selectedOption,
		}));

		//calculateTotalScore()
	  };

	  useEffect(() => {
		let calculatedTotalScore = 0;
		for (const questionId in answers) {
		  const selectedOption = answers[questionId];
		  const question = questions.find((q) => q.id.toString() === questionId);
		  const option = question.options.find((opt) => opt.value === selectedOption);
		  calculatedTotalScore += option ? option.score : 0;
		}
		setTotal(calculatedTotalScore);
		let newAssessment = '';
			switch (true) {
			case calculatedTotalScore >= 14:
				newAssessment = 'Top Priority';
				break;
			case calculatedTotalScore >= 10:
				newAssessment = 'Medium Priority';
				break;
			/* case calculatedTotalScore >= 0:
				newAssessment = 'Average';
				break; */
			default:
				newAssessment = 'Preserve for nurturing';
			}
    	setAssessment(newAssessment);

		//setAssessment("Something to do")
	  }, [answers, questions]);


	  useEffect(() => {
		const scoredetails= state.DealModule.selectedDeal.opportunityScore
		setAnswers(scoredetails.answer)
		setTotal(scoredetails.total);
		
    	setAssessment(scoredetails.assessment);

		//setAssessment("Something to do")
	  }, []);
	
	

	return (
	  <Box
		sx={{
		  width: "400px",
		}}
	  >
		<Box mb={2}>
		
		<p> 
		 <strong>Total score: {total}</strong>
		 </p>
		 <p> 
		 <strong>Assessment:</strong> {assessment}
		 </p>
		 <h2>Questionaire</h2>
		{questions.map((question) => (
        <div key={question.id} className="question-container">
          <p>{question.question}</p>
          <select
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          >
            <option value="">Select an answer</option>
            {question.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value} 
              </option>
            ))}
          </select>
        </div>
      ))}
		{/* <h2>Summary</h2>
        <ul>
          {Object.entries(answers).map(([questionId, answer]) => (
            <li key={questionId}>
              <strong>Question {questionId}:</strong> {answer}
            </li>
          ))}
        </ul> */}
		</Box>
  
		<Box sx={{display: "flex"}}>
		  <GlobalCustomButton
			onClick={updateScore}
			sx={{marginRight: "10px"}}
		  >
			Add Information
		  </GlobalCustomButton>
  
		  <GlobalCustomButton onClick={closeModal} color="error">
			Cancel
		  </GlobalCustomButton>
		</Box>
	  </Box>
	);
  };