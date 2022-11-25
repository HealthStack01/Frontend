/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext, ObjectContext } from '../../context';
import { format, formatDistanceToNowStrict } from 'date-fns';
import ReportCreate from './ReportCreate';
import PatientProfile from '../Client/PatientProfile';
import Encounter from '../Documentation/Documentation';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import ModalBox from '../../components/modal';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { Box, Grid, TextareaBase } from '@mui/material';
import Textarea from '../../components/inputs/basic/Textarea';
import { toast } from 'react-toastify';
import GlobalCustomButton from '../../components/buttons/CustomButton';

export default function RadDetails() {
  //const {state}=useContext(ObjectContext) //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const BillServ = client.service('bills');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedOrders, setSelectedOrders] = useState([]); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Grid container>
      <Grid item sm={3}>
        <PatientProfile />
      </Grid>
      <Grid item sm={9} p={1}>
        <RadiologyNoteCreate />
      </Grid>
    </Grid>
  );
}

export function RadiologyNoteCreate() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service('labresults');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [reportStatus, setReportStatus] = useState('Draft');
  const { state, setState } = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);
  const navigate = useNavigate();

  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    // setState((prevstate)=>({...prevstate, labFormType:value}))
    if (!order.resultDetail?.documentdetail) {
      setValue('Finding', '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('Recommendation', '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== 'Pending') {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = 'Radiology Result';
    document.documentname = `${data.Procedure} Result`; /* `${order.serviceInfo.name} Result` */
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      ' ' +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + ' ' + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.warning(
        ' Documentation data missing, requires location and facility details'
      );
      return;
    }

    if (bill_report_status === 'Pending') {
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast.success('Lab Result created succesfully');
          setSuccess(false);
        })
        .catch((err) => {
          toast.error('Error creating Lab Result ' + err);
        });
    }

    if (bill_report_status === 'Draft') {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast.success('Radiology Result updated succesfully');
          setSuccess(false);
        })
        .catch((err) => {
          toast.error('Error updating Radiology Result ' + err);
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: 'show',
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue('Finding', '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('Recommendation', '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== 'Pending') {
      console.log(order.resultDetail.documentdetail);

      setValue('Finding', order.resultDetail.documentdetail.Finding, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue(
        'Recommendation',
        order.resultDetail.documentdetail.Recommendation,
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
      setReportStatus(order.report_status);
    }

    return () => {};
  }, [order]);
  const showDocumentation = async (value) => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    // handleSearch(val)
  };
  const ProperCase = (text) => {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item md={6}>
          <p style={{ maxWidth: '400px', fontWeight: '700' }}>
            {ProperCase(
              `Radiology Result for ${order.orderInfo.orderObj.clientname} Ordered Test: ${order.serviceInfo.name}`
            )}
          </p>
        </Grid>
        <Grid item md={6} mb={1}>
          <GlobalCustomButton
            text="back"
            onClick={() => navigate(-1)}
            customStyles={{
              float: 'right',
              marginLeft: 'auto',
            }}
          />
          <GlobalCustomButton
            text="Documentation"
            onClick={showDocumentation}
            customStyles={{
              float: 'right',
              marginLeft: 'auto',
              marginRight: '.2rem',
            }}
            color="success"
          />
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Textarea
              name="Procedure"
              type="text"
              register={register('Procedure', { required: true })}
              label="Procedure"
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} mt={1}>
            <Textarea
              label="Clinical Indication"
              name="Clinical Indication"
              type="text"
              register={register('Clinical Indication', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} mt={1}>
            <Textarea
              label="Technique"
              name="Technique"
              type="text"
              register={register('Technique', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} mt={1}>
            <Textarea
              label="Comparison"
              name="Comparison"
              type="text"
              register={register('Comparison', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} mt={1}>
            <Textarea
              label="Finding"
              name="Finding"
              type="text"
              register={register('Finding', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} mt={1}>
            <Textarea
              label="Impression"
              name="Impression"
              type="text"
              register={register('Impression', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} mt={1}>
            <Textarea
              label="Recommendation"
              name="recommendation"
              type="text"
              register={register('recommendation', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
              style={{
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '.8rem',
              }}
            >
              {' '}
              Draft
            </span>
          </Grid>{' '}
          <Grid item xs={12} sm={4}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === 'Final'}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === 'Final'}
              style={{
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '.8rem',
              }}
            >
              {' '}
              Final{' '}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== 'Final' && (
              <GlobalCustomButton
                text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
                onClick={handleSubmit(onSubmit)}
              />
            )}
          </Grid>
        </Grid>
      </form>
      {productModal && (
        <ModalBox open onClose={() => setProductModal(false)}>
          <Encounter standalone={true} />
        </ModalBox>
      )}
      {/* <div className="card ">
        <div className="card-header">
          <p className="card-header-title">
            Radiology Result for {order.orderInfo.orderObj.clientname} Ordered
            Test: {order.serviceInfo.name}
          </p>
          <button
            className="button is-success is-small btnheight mt-2"
            onClick={showDocumentation}
          >
            Documentation
          </button>
        </div>
        <div className="card-content vscrollable remPad1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <Textarea
                      className="Textarea is-small"
                      {...register('x')}
                      name="Procedure"
                      type="text"
                      label="Procedure"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      sx={{height: '38px'}}
                      className="textarea
                         is-small"sx={{height: '38px'}}
                      {...register('x')}
                      name="Clinical Indication"
                      type="text"
                      label="Clinical Indication"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      sx={{height: '38px'}}
                      className="textarea
                         is-small"sx={{height: '38px'}}
                      {...register('x')}
                      name="Technique"
                      type="text"
                      label="Technique"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      sx={{height: '38px'}}
                      className="textarea
                         is-small"sx={{height: '38px'}}
                      {...register('x')}
                      name="Comparison"
                      type="text"
                      label="Comparison"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      sx={{height: '38px'}}
                      className="textarea
                         is-small"sx={{height: '38px'}}
                      {...register('x')}
                      name="Finding"
                      type="text"
                      label="Findings"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      sx={{height: '38px'}}
                      className="textarea
                         is-small"sx={{height: '38px'}}
                      {...register('x')}
                      name="Impression"
                      type="text"
                      label="Impression"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <textarea
                      sx={{height: '38px'}}
                      className="textarea
                         is-small"sx={{height: '38px'}}
                      {...register('x')}
                      name="Recommendation"
                      type="text"
                      label="Recommendation"
                      disabled={bill_report_status === 'Final'}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label className=" is-small">
                <Textarea
                  type="radio"
                  name="status"
                  value="Draft"
                  checked={
                    reportStatus === 'Draft' || reportStatus === 'Pending'
                  }
                  onChange={(e) => {
                    handleChangePart(e);
                  }}
                  disabled={bill_report_status === 'Final'}
                />
                <span> Draft</span>
              </label>{' '}
              <br />
              <label className=" is-small">
                <Textarea
                  type="radio"
                  name="status"
                  value="Final"
                  checked={reportStatus === 'Final'}
                  onChange={(e) => handleChangePart(e)}
                  disabled={bill_report_status === 'Final'}
                />
                <span> Final </span>
              </label>
            </div>
            <div className="field  is-grouped mt-2">
              <p className="control">
                <button
                  type="submit"
                  className="button is-success is-small"
                  disabled={bill_report_status === 'Final'}
                >
                  {bill_report_status === 'Pending' ? 'Save' : 'Update'}
                </button>
              </p>
             
            </div>
          </form>
        </div>
      </div> */}
      {/* <div className={`modal ${productModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card  modalbkgrnd">
          <header className="modal-card-head  btnheight">
            <p className="modal-card-title">Documentation</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body modalcolor">
            <Encounter standalone="true" />
          </section>

        </div>
      </div> */}
    </>
  );
}
