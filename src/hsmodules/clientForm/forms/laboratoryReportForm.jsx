import React, { useState, useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import client from '../../../feathers';
import Encounter from '../../Documentation/Documentation';
import { UserContext, ObjectContext } from '../../../context';
import { toast } from 'react-toastify';
import Input from '../../../components/inputs/basic/Input/index';
import Textarea from '../../../components/inputs/basic/Textarea/index';
import RadioButton from '../../../components/inputs/basic/Radio/index';
import ModalHeader from '../../Appointment/ui-components/Heading/modalHeader/index';
import { Box, Grid, InputBase } from '@mui/material';
import Button from '../../../components/buttons/Button';
import ModalBox from '../../../components/modal';
import CheckboxInput from '../../../components/inputs/basic/Checkbox';
import CustomSelect from '../../../components/inputs/basic/Select';
import { Select } from 'semantic-ui-react';

export default function LaboratoryReportForm() {
  const { register, handleSubmit } = useForm();

  const { state, setState } = useContext(ObjectContext);

  const [reportStatus, setReportStatus] = useState('Draft');
  const [choosenForm, setChoosenForm] = useState('');
  const [productModal, setProductModal] = useState(false);

  const formtype = [
    'Haematology',
    'Serology',
    'Biochemistry',
    'Microbiology',
    'Urine',
    'Urinalysis',
    'Stool',
    'HVS Culture',
    'Generic',
  ];
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const handleChangeMode = (value) => {
    setChoosenForm(value);

    setState((prevstate) => ({ ...prevstate, labFormType: value }));
  };

  console.log('STATE', state);

  useEffect(() => {
    if (order.resultDetail?.labFormType == null) {
      console.log('null');
      //setChoosenForm("unknown")
      setState((prevstate) => ({ ...prevstate, labFormType: 'unknown' }));
    } else {
      console.log('not null');
      //setChoosenForm(state.financeModule.selectedFinance.resultDetail.labFormType)
      setState((prevstate) => ({
        ...prevstate,
        labFormType:
          state.financeModule.selectedFinance.resultDetail.labFormType,
      }));
    }
    if (order.resultDetail == null) {
      console.log('does not exist');
      // setChoosenForm("")
      setState((prevstate) => ({ ...prevstate, labFormType: '' }));
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
  // make text a ProperCase string
  const ProperCase = (text) => {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  console.log(formtype, choosenForm);

  return (
    <>
      <div className="card">
        <ModalHeader
          text={ProperCase(
            ` ${order.serviceInfo.name} for ${order.orderInfo.orderObj.clientname}`
          )}
        />
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} md={6}>
            {bill_report_status === 'Pending' && (
              <div className="control mt-2 mr-2">
                <div className="select is-small ">
                  <select
                    name="FormType"
                    {...register('FormType', { required: true })}
                    onChange={(e) => handleChangeMode(e.target.value)}
                    className="selectadd"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      margin: '1rem 0',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: '1px solid rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <option value="" defaultChecked>
                      Choose Form{' '}
                    </option>
                    {formtype.map((option, i) => (
                      <option key={i} value={option}>
                        {' '}
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              className="button is-success is-small btnheight mt-2"
              onClick={showDocumentation}
              style={{
                // width: '100%',
                margin: '2rem 0',
                backgroundColor: '#0364FF',
                fontSize: '18px',
                textAlign: 'right',
                marginLeft: 'auto',
              }}
            >
              Documentation
            </Button>
          </Grid>
        </Grid>
        <div className="card-content mb-0 vscrollable">
          <div>
            {state.labFormType === 'Haematology' && <Haematology />}
            {state.labFormType === 'Serology' && <Serology />}
            {state.labFormType === 'Biochemistry' && <Biochemistry />}
            {state.labFormType === 'Microbiology' && <Microbiology />}
            {state.labFormType === 'Urine' && <Urine />}
            {state.labFormType === 'Urinalysis' && <Urinalysis />}
            {state.labFormType === 'Stool' && <Stool />}
            {state.labFormType === 'HVS Culture' && <HVS />}
            {state.labFormType === 'Generic' && <LabNoteGeneric />}
            {state.labFormType === 'unknown' && <LabNoteCreate />}
            {/* {state.labFormType === '' && <LabNoteCreate />} */}
          </div>
        </div>
      </div>
      {productModal && (
        <ModalBox open onClose={() => setProductModal(false)}>
          <Encounter standalone={true} />
        </ModalBox>
      )}
    </>
  );
}

export function Haematology() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service('clinicaldocument');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState('Draft');
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  // let draftDoc=state.DocumentClassModule.selectedDocumentClass.document

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

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

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
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        ' Documentation data missing, requires location and facility details'
      );
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast('Error creating Lab Result ' + err);
        });
    }

    if (bill_report_status === 'Draft') {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error updating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p style={{ fontWeight: '700' }} className="label is-small">
        HEAMATOLOGY
      </p>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="Hb"
            name="hb"
            type="text"
            register={register('pcv', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="PCV"
            name="pcv"
            type="text"
            register={register('pcv', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="WBC"
            name="wbc"
            type="text"
            register={register('wbc', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="ESR"
            name="esr"
            type="text"
            register={register('esr', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="Platelets"
            name="platelets"
            type="text"
            register={register('platelets', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="Rectics"
            name="rectics"
            type="text"
            register={register('rectics', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="RBC"
            name="rbc"
            type="text"
            register={register('rbc', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="MCV"
            name="mcv"
            type="text"
            register={register('mcv', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="MCHC"
            name="mchc"
            type="text"
            register={register('mchc', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="MCH"
            name="mch"
            type="text"
            register={register('mch', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="Neutrophils"
            name="neutrophils"
            type="text"
            register={register('neutrophils', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="Lymphocytes"
            name="lymphocytes"
            type="text"
            register={register('lymphocytes', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="Monocytes"
            name="monocytes"
            type="text"
            register={register('monocytes', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="Eosinophils"
            name="eosinophils"
            type="text"
            register={register('eosinophils', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="Basophils"
            name="basophils"
            type="text"
            register={register('basophils', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="Pro-Myelocyte"
            name="proMyelocyte"
            type="text"
            register={register('proMyelocyte', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="Meta-Myelocyte"
            name="metaMyelocyte"
            type="text"
            register={register('metaMyelocyte', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="Nucleated RBC"
            name="nucleatedRbc"
            type="text"
            register={register('nucleatedRbc', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Input
            label="Genotype"
            name="genotype"
            type="text"
            register={register('genotype', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            label="Blood Group"
            name="bloodGroup"
            type="text"
            register={register('bloodGroup', { required: true })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Textarea
            placeholder="Recommendation"
            name="recommendation"
            type="text"
            register={register('recommendation', { required: true })}
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
              transform: 'scale(1.5)',
              margin: '1rem',
            }}
          />
          <span
            style={{
              fontSize: '1rem',
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
              transform: 'scale(1.5)',
              margin: '1rem',
            }}
          />
          <span
            style={{
              fontSize: '1rem',
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
            <Button
              type="submit"
              style={{
                backgroundColor: '#0364FF',
                width: '100%',
                cursor: 'pointer',
                marginTop: '1rem',
                padding: '1rem',
              }}
            >
              {bill_report_status === 'Pending' ? 'Save' : 'Update'}
            </Button>
          )}
        </Grid>
      </Grid>
      {/* 
      <div className="columns mt-3 is-flex-wrap-wrap">
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">HB</label>
              <p className="control is-expanded">
                <input
                 
                  name="hb"
                  className="input is-small"
                  type="text"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">PCV</label>
              <div className="control">
                <input
                 
                  name="pcv"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">WBC</label>
              <div className="control">
                <input
                 
                  name="wbc"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">ESR</label>
              <div className="control">
                <input
                 
                  name="esr"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="columns mt-3 is-flex-wrap-wrap">
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Platelets</label>
              <p className="control is-expanded">
                <input
                 
                  name="platelets"
                  className="input is-small"
                  type="text"
                />
              </p>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Rectics</label>
              <div className="control">
                <input
                  //
                  name="rectics"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">RBC</label>
              <div className="control">
                <input
                 
                  name="rbc"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">MCV</label>
              <div className="control">
                <input
                 
                  name="mcv"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="columns mt-3 is-flex-wrap-wrap">
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">MCHC</label>
              <p className="control is-expanded">
                <input
                 
                  name="mchc"
                  className="input is-small"
                  type="text"
                />
              </p>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">MCH</label>
              <div className="control">
                <input
                 
                  name="mch"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Neutrophils</label>
              <div className="control">
                <input
                 
                  name="neutrophils"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Lymphocytes</label>
              <div className="control">
                <input
                 
                  name="lymphocytes"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="columns mt-3 is-flex-wrap-wrap">
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Monocytes</label>
              <p className="control is-expanded">
                <input
                 
                  name="monocytes"
                  className="input is-small"
                  type="text"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Eosinophils</label>
              <div className="control">
                <input
                 
                  name="eosinophils"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Basophils</label>
              <div className="control">
                <input
                 
                  name="basophils"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Pro-Myelocyte</label>
              <div className="control">
                <input
                 
                  name="proMyelocyte"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns mt-3 is-flex-wrap-wrap">
        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Meta-Myelocyte</label>
              <p className="control is-expanded">
                <input
                 
                  name="metaMyelocyte"
                  className="input is-small"
                  type="text"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Nucleated RBC</label>
              <div className="control">
                <input
                 
                  name="nucleatedRbc"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Genotype</label>
              <div className="control">
                <input
                 
                  name="genotype"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field-body">
            <div className="field is-flex">
              <label className="label is-small mr-2">Blood Group</label>
              <div className="control">
                <input
                 
                  name="bldGroup"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <textarea
                className="textarea is-small"
                {...register('x')}
                name="Recommendation"
                type="text"
                placeholder="Recommendation"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field">
        <label className=" is-small">
          <input
            type="radio"
            name="status"
            value="Draft"
            checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
            onChange={(e) => {
              handleChangePart(e);
            }}
            disabled={bill_report_status === 'Final'}
          />
          <span> Draft</span>
        </label>{' '}
        <br />
        <label className=" is-small">
          <input
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
    
      </div> */}
    </form>
  );
}

export function Serology() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service('clinicaldocument');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState('Draft');
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

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

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

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
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        ' Documentation data missing, requires location and facility details'
      );
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast.error('Lab Result created succesfully');
          setSuccess(false);
        })
        .catch((err) => {
          toast.setError('Error creating Lab Result ' + err);
        });
    }

    if (bill_report_status === 'Draft') {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error updating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
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

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: '700' }} className="label is-small">
          SEROLOGY
        </p>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="HBsAG"
              name="hbsag"
              type="text"
              register={register('hbsag', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="HCV"
              name="hcv"
              type="text"
              register={register('hcv', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="VDRL"
              name="vdrl"
              type="text"
              register={register('vdrl', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="RPHA"
              name="rpha"
              type="text"
              register={register('rpha', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="COOMBS"
              name="coombs"
              type="text"
              register={register('coombs', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="A.S.O Titre"
              name="asoTitre"
              type="text"
              register={register('asoTitre', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="SLE"
              name="sle"
              type="text"
              register={register('sle', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="R.A Factor"
              name="raFactor"
              type="text"
              register={register('raFactor', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="B-HCG"
              name="bHcg"
              type="text"
              register={register('bHcg', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="MANTOUX"
              name="mantoux"
              type="text"
              register={register('mantoux', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Blood Preg. Test"
              name="bloodPregTest"
              type="text"
              register={register('bloodPregTest', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="XYZ"
              name="xyz"
              type="text"
              register={register('xyz', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register('Recommendation', { required: true })}
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  padding: '1rem',
                }}
              >
                {bill_report_status === 'Pending' ? 'Save' : 'Update'}
              </Button>
            )}
          </Grid>
        </Grid>
        {/* <label className="label is-small">SEROLOGY</label>
        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">HBsAG</label>
                <p className="control is-expanded">
                  <input name="hbsag" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">HCV</label>
                <div className="control">
                  <input name="hcv" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">VDRL</label>
                <div className="control">
                  <input name="vdrl" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">RPHA</label>
                <div className="control">
                  <input name="rpha" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">COOMBS</label>
                <p className="control is-expanded">
                  <input name="coombs" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">A.S.O Titre</label>
                <div className="control">
                  <input
                    name="asoTitre"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">SLE</label>
                <div className="control">
                  <input name="sle" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">R.A Factor</label>
                <div className="control">
                  <input
                    name="raFactor"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">B-HCG</label>
                <p className="control is-expanded">
                  <input name="bHcg" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">MANTOUX</label>
                <div className="control">
                  <input
                    name="mantoux"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Blood Preg. Test</label>
                <div className="control">
                  <input
                    name="bldPregTest"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">XYZ</label>
                <div className="control">
                  <input name="xyz" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register('x')}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
            />
            <span> Draft</span>
          </label>{' '}
          <br />
          <label className=" is-small">
            <input
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
          </p> */}
        {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        {/* </div> */}
      </form>
    </>
  );
}

export function Biochemistry() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service('clinicaldocument');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState('Draft');
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

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

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });
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
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          ' Documentation data missing, requires location and facility details',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error creating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === 'Draft') {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error updating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
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

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: '700' }} className="label is-small">
          BIOCHEMISTRY
        </p>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Glucose (Fasting)"
              name="glucoseFasting"
              type="text"
              register={register('glucoseFasting', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Glucose (Random)"
              name="glucoseRandom"
              type="text"
              register={register('glucoseRandom', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Urea"
              name="urea"
              type="text"
              register={register('urea', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Creatinine"
              name="creatinine"
              type="text"
              register={register('creatinine', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Uric Acid"
              name="uricAcid"
              type="text"
              register={register('uricAcid', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Sodium"
              name="sodium"
              type="text"
              register={register('sodium', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Potassium"
              name="potassium"
              type="text"
              register={register('potassium', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Bicarbonate"
              name="bicarbonate"
              type="text"
              register={register('bicarbonate', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Chloride"
              name="chloride"
              type="text"
              register={register('chloride', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Total Protein"
              name="totalProtein"
              type="text"
              register={register('totalProtein', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Albumin"
              name="albumin"
              type="text"
              register={register('albumin', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="T. Bilirubin"
              name="tBilirubin"
              type="text"
              register={register('tBilirubin', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="D.Bilirubin"
              name="dBilirubin"
              type="text"
              register={register('dBilirubin', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Cholesterol"
              name="cholesterol"
              type="text"
              register={register('cholesterol', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Triglyceride"
              name="triglyceride"
              type="text"
              register={register('triglyceride', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Phos"
              name="phos"
              type="text"
              register={register('phos', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Calcium"
              name="calcium"
              type="text"
              register={register('calcium', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="SGOT"
              name="sgot"
              type="text"
              register={register('sgot', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="SGPT"
              name="sgpt"
              type="text"
              register={register('sgpt', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="OGTT"
              name="ogtt"
              type="text"
              register={register('ogtt', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Alk Phos"
              name="alkPhos"
              type="text"
              register={register('alkPhos', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Acid Phos"
              name="acidPhos"
              type="text"
              register={register('acidPhos', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="ADH"
              name="adh"
              type="text"
              register={register('adh', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="APK"
              name="apk"
              type="text"
              register={register('apk', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Amylase"
              name="amylase"
              type="text"
              register={register('adh', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register('Recommendation', { required: true })}
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  padding: '1rem',
                }}
              >
                {bill_report_status === 'Pending' ? 'Save' : 'Update'}
              </Button>
            )}
          </Grid>
        </Grid>
        {/* <label className="label is-small">BIOCHEMISTRY</label>
        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Glucose (Fasting)</label>
                <p className="control is-expanded">
                  <input
                    name="glucoseFasting"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Glucose (Random)</label>
                <div className="control">
                  <input
                    name="glucoseRandom"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Urea</label>
                <div className="control">
                  <input name="urea" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Creatinine</label>
                <div className="control">
                  <input
                    name="creatinine"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Uric Acid</label>
                <p className="control is-expanded">
                  <input
                    name="uricAcid"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Sodium</label>
                <div className="control">
                  <input name="sodium" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Potassium</label>
                <div className="control">
                  <input
                    name="potassium"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Bicarbonate</label>
                <div className="control">
                  <input
                    name="bicarbonate"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Chloride</label>
                <p className="control is-expanded">
                  <input
                    name="chloride"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Total Protein</label>
                <div className="control">
                  <input
                    name="totalProtein"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Albumin</label>
                <div className="control">
                  <input
                    name="albumin"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">T. Bilirubin</label>
                <div className="control">
                  <input
                    name="tBilirubin"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">D.Bilirubin</label>
                <p className="control is-expanded">
                  <input
                    name="dBilirubin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Cholesterol</label>
                <div className="control">
                  <input
                    name="cholesterol"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Triglyceride</label>
                <div className="control">
                  <input
                    name="triglyceride"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Phos</label>
                <div className="control">
                  <input name="phos" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Calcium</label>
                <p className="control is-expanded">
                  <input
                    name="calcium"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">SGOT</label>
                <div className="control">
                  <input name="sgot" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">SGPT</label>
                <div className="control">
                  <input name="sgpt" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">OGTT</label>
                <div className="control">
                  <input name="ogtt" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Alk Phos</label>
                <p className="control is-expanded">
                  <input
                    name="alkPhos"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Acid Phos</label>
                <div className="control">
                  <input
                    name="acidPhos"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">ADH</label>
                <div className="control">
                  <input name="adh" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">APK</label>
                <div className="control">
                  <input name="apk" className="input is-small" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Amylase</label>
                <p className="control is-expanded">
                  <input
                    name="amylase"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register('x')}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
            />
            <span> Draft</span>
          </label>{' '}
          <br />
          <label className=" is-small">
            <input
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
          </p> */}
        {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        {/* </div> */}
      </form>
    </>
  );
}

export function Microbiology() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service('clinicaldocument');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState('Draft');
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

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

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

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
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        ' Documentation data missing, requires location and facility details'
      );
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast.error('Lab Result created succesfully');
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
          toast.error('Lab Result updated succesfully');
          setSuccess(false);
        })
        .catch((err) => {
          toast.error('Error updating Lab Result ' + err);
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

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  const checkBoxArray = [
    {
      name: 'urinalysisOrMicro',
      label: 'UrinalysisOrMicro',
      value: 'urinalysisOrMicro',
    },
    {
      name: 'stoolAnalysis',
      label: 'Stool Analysis',
      value: 'Stool Analysis',
    },
    {
      name: 'stoolOccult',
      label: 'Semen Analysis',
      value: 'Semen Analysis',
    },
    { name: 'Finding', label: 'Finding', value: 'Recommendation' },
    {
      name: 'gramStain',
      label: 'Gram Stain',
      value: 'Gram Stain',
    },
    {
      name: 'znStain',
      label: 'ZN Stain',
      value: 'ZN Stain',
    },
    {
      name: 'mantouxTest',
      label: 'Mantoux Test',
      value: 'Mantoux Test',
    },
    {
      name: 'fungalStudies',
      label: 'Fungal Studies',
      value: 'Fungal Studies',
    },
    {
      name: 'urine',
      label: 'M/C/S Urine',
      value: 'M/C/S Urine',
    },
    {
      name: 'throatSwab',
      label: 'M/C/S Throat Swab',
      value: 'M/C/S Throat Swab',
    },
    {
      name: 'aspirateAndDischarge',
      label: 'C/S/PUS/Aspirate/Discharge',
      value: 'C/S/PUS/Aspirate/Discharge',
    },
    {
      name: 'woundSwab',
      label: 'C/S Wound Swab',
      value: 'C/S Wound Swab',
    },
    {
      name: 'semen',
      label: 'M/C/S Semen',
      value: 'M/C/S Semen',
    },
    {
      name: 'fluid',
      label: 'M/C/S Fluid',
      value: 'M/C/S Fluid',
    },
    {
      name: 'stool2',
      label: 'M/C/S Stool',
      value: 'M/C/S Stool',
    },
    {
      name: 'endocerviclSwab',
      label: 'C/S Endocervical Swab',
      value: 'C/S Endocervical Swab',
    },
    {
      name: 'hvs',
      label: 'M/C/S HVS',
      value: 'M/C/S HVS',
    },
    {
      name: 'sputum',
      label: 'M/C/S Sputum',
      value: 'M/C/S Sputum',
    },

    {
      name: 'csBld',
      label: 'C/S Blood',
      value: 'C/S Blood',
    },
    {
      name: 'microfilariaSkin',
      label: 'Microfilaria-Skin Snip',
      value: 'Microfilaria-Skin Snip',
    },
    {
      name: 'otherSwab',
      label: 'Other Swab (Specify)',
      value: 'Other Swab (Specify)',
    },
    {
      name: 'faecalOccultBld',
      label: 'Faecal Occult Blood',
      value: 'Faecal Occult Blood',
    },
    {
      name: 'salmoOrshigella',
      label: 'Recommalmonella/Shigellaendation',
      value: 'almonella/Shigella',
    },
  ];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: '700' }} className="label is-small">
          MiCROBIOLOGY
        </p>

        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CheckboxInput options={checkBoxArray} />
          </div>
        </>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register('Recommendation', { required: true })}
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  padding: '1rem',
                }}
              >
                {bill_report_status === 'Pending' ? 'Save' : 'Update'}
              </Button>
            )}
          </Grid>
        </Grid>
        {/* <div className="field">
          <label className="label is-small">MICROBIOLOGY</label>
          <label class="checkbox me-3">
            <input name="urinalysisOrMicro" type="checkbox" />
            <span className="ms-2 is-small">Urinanalysis/Microscope</span>
          </label>
          <label class="checkbox me-3">
            <input name="stoolAnalysis" type="checkbox" />
            <span className="ms-2 is-small">Stool Analysis</span>
          </label>
          <label class="checkbox me-3">
            <input name="stoolOccult" type="checkbox" />
            <span className="ms-2 is-small">Stool Occult</span>
          </label>
          <label class="checkbox me-3">
            <input name="semenAnalysis" type="checkbox" />
            <span className="ms-2 is-small">Semen Analysis</span>
          </label>
          <label class="checkbox me-3">
            <input name="gramStain" type="checkbox" />
            <span className="ms-2 is-small">Gram Stain</span>
          </label>
          <label class="checkbox me-3">
            <input name="znStain" type="checkbox" />
            <span className="ms-2 is-small">ZN Stain</span>
          </label>
          <label class="checkbox me-3">
            <input name="mantouxTest" type="checkbox" />
            <span className="ms-2 is-small">Mantoux Test</span>
          </label>
          <label class="checkbox me-3">
            <input name="fungalStudies" type="checkbox" />
            <span className="ms-2 is-small">Fungal Studies</span>
          </label>
          <label class="checkbox me-3">
            <input name="urine" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Urine</span>
          </label>
          <label class="checkbox me-3">
            <input name="throatSwab" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Throat Swab</span>
          </label>
          <label class="checkbox me-3">
            <input name="aspirateAndDischarge" type="checkbox" />
            <span className="ms-2 is-small">C/S/PUS/Aspirate/Discharge</span>
          </label>
          <label class="checkbox me-3">
            <input name="woundSwab" type="checkbox" />
            <span className="ms-2 is-small">C/S Wound Swab</span>
          </label>
          <label class="checkbox me-3">
            <input name="semen" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Semen</span>
          </label>
          <label class="checkbox me-3">
            <input name="fluid" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Fluid</span>
          </label>
          <label class="checkbox me-3">
            <input name="stool2" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Stool</span>
          </label>
          <label class="checkbox me-3">
            <input name="endocerviclSwab" type="checkbox" />
            <span className="ms-2 is-small">C/S Endocervical Swab</span>
          </label>
          <label class="checkbox me-3">
            <input name="hvs" type="checkbox" />
            <span className="ms-2 is-small">M/C/S HVS</span>
          </label>
          <label class="checkbox me-3">
            <input name="sputum" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Sputum</span>
          </label>
          <label class="checkbox me-3">
            <input name="csBld" type="checkbox" />
            <span className="ms-2 is-small">C/S Blood</span>
          </label>
          <label class="checkbox me-3">
            <input name="microfilariaSkin" type="checkbox" />
            <span className="ms-2 is-small">Microfilaria-Skin Snip</span>
          </label>
          <label class="checkbox me-3">
            <input name="otherSwab" type="checkbox" />
            <span className="ms-2 is-small">Other Swab (Specify)</span>
          </label>
          <label class="checkbox me-3">
            <input name="faecalOccultBld" type="checkbox" />
            <span className="ms-2 is-small">Faecal Occult Blood</span>
          </label>
          <label class="checkbox me-3">
            <input name="salmoOrshigella" type="checkbox" />
            <span className="ms-2 is-small">Salmonella/Shigella</span>
          </label>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register('x')}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
            />
            <span> Draft</span>
          </label>{' '}
          <br />
          <label className=" is-small">
            <input
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
          </p> */}
        {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        {/* </div> */}
      </form>
    </>
  );
}

export function Urine() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service('clinicaldocument');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState('Draft');

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

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

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });
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
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        ' Documentation data missing, requires location and facility details'
      );
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast.error('Lab Result created succesfully');
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
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error updating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
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

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: '700' }} className="label is-small">
          Urine
        </p>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Macroscopy"
              name="macroscopy"
              type="text"
              register={register('macroscopy', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Microscopy"
              name="microscopy"
              type="text"
              register={register('microscopy', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Pus Cells/hof"
              name="pusCellsOrhof"
              type="text"
              register={register('pusCellsOrhof', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="RBC/hpf"
              name="rbsOrHpf"
              type="text"
              register={register('rbsOrHpf', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Yeast Cells"
              name="yeastCells"
              type="text"
              register={register('yeastCells', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Bacteria"
              name="bacteria"
              type="text"
              register={register('bacteria', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Casts"
              name="casts"
              type="text"
              register={register('casts', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Epith Cells"
              name="epithCells"
              type="text"
              register={register('epithCells', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Crystals"
              name="crystals"
              type="text"
              register={register('crystals', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="T.V"
              name="tv"
              type="text"
              register={register('tv', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              label="Culture Yielded"
              name="cultureYielded"
              register={register('cultureYielded', { required: true })}
              type="text"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              label="Malaria Parasite"
              name="malariaParasite"
              register={register('malariaParasite', { required: true })}
              type="text"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              label="Recommendation"
              name="Recommendation"
              register={register('Recommendation', { required: true })}
              type="text"
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  padding: '1rem',
                }}
              >
                {bill_report_status === 'Pending' ? 'Save' : 'Update'}
              </Button>
            )}
          </Grid>
        </Grid>

        {/* <label className="label is-small">URINE</label>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Macroscopy</label>
                <p className="control is-expanded">
                  <input
                   
                    name="macroscopy"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Microscopy</label>
                <p className="control is-expanded">
                  <input
                   
                    name="microscopy"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Pus Cells/hof</label>
                <p className="control is-expanded">
                  <input
                   
                    name="pusCellsOrhof"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Rbs/hpf</label>
                <p className="control is-expanded">
                  <input
                   
                    name="rbsOrHpf"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Yeast Cells</label>
                <p className="control is-expanded">
                  <input
                   
                    name="yeastCells"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Bacteria</label>
                <p className="control is-expanded">
                  <input
                   
                    name="bacteria"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Casts</label>
                <p className="control is-expanded">
                  <input
                   
                    name="casts"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Epith Cells</label>
                <p className="control is-expanded">
                  <input
                   
                    name="epithCells"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Crystals</label>
                <p className="control is-expanded">
                  <input
                   
                    name="crystals"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">T.V</label>
                <p className="control is-expanded">
                  <input
                   
                    name="tv"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Culture Yielded</label>
          <div className="control">
            <textarea
             
              name="cultureYielded"
              className="textarea is-small"
            ></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Malaria Parasite</label>
          <div className="control">
            <textarea
             
              name="malariaParasite"
              className="textarea is-small"
            ></textarea>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register('x')}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
            />
            <span> Draft</span>
          </label>{' '}
          <br />
          <label className=" is-small">
            <input
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
          </p> */}
        {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        {/* </div> */}
      </form>
    </>
  );
}

export function Urinalysis() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service('clinicaldocument');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState('Draft');

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

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

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });
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
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          ' Documentation data missing, requires location and facility details',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error creating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === 'Draft') {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error updating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
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

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label is-small">URINALYSIS</label>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Appearance</label>
                <p className="control is-expanded">
                  <input
                    name="appearance"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Color</label>
                <p className="control is-expanded">
                  <input name="color" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">PH</label>
                <p className="control is-expanded">
                  <input name="ph" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Protein</label>
                <p className="control is-expanded">
                  <input
                    name="protein"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Sugar</label>
                <p className="control is-expanded">
                  <input name="sugar" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Ketones</label>
                <p className="control is-expanded">
                  <input
                    name="ketones"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Blood</label>
                <p className="control is-expanded">
                  <input name="blood" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Billirubin</label>
                <p className="control is-expanded">
                  <input
                    name="billirubin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">S.G</label>
                <p className="control is-expanded">
                  <input name="sg" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Nitrite</label>
                <p className="control is-expanded">
                  <input
                    name="nitrite"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Urobilin</label>
                <p className="control is-expanded">
                  <input
                    name="urobilin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Urobilinogen</label>
                <p className="control is-expanded">
                  <input
                    name="urobilinogin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Leucocyte</label>
                <p className="control is-expanded">
                  <input
                    name="leucocyte"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register('x')}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
            />
            <span> Draft</span>
          </label>{' '}
          <br />
          <label className=" is-small">
            <input
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
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </form>
    </>
  );
}

export function Stool() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service('clinicaldocument');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState('Draft');

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

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

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

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
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          ' Documentation data missing, requires location and facility details',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error creating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === 'Draft') {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error updating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
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

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: '700' }} className="label is-small">
          STOOL
        </p>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Macro"
              name="macro"
              type="text"
              register={register('macro', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Micro"
              name="micro"
              type="text"
              register={register('macro', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Culture"
              name="culture2"
              type="text"
              register={register('macro', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register('Recommendation', { required: true })}
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  padding: '1rem',
                }}
              >
                {bill_report_status === 'Pending' ? 'Save' : 'Update'}
              </Button>
            )}
          </Grid>
        </Grid>
        {/* <label className="label is-small">STOOL</label>
        <div className="field">
          <label className="label is-small">Macro</label>
          <div className="control">
            <textarea name="macro" className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Micro</label>
          <div className="control">
            <textarea name="micro" className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Culture</label>
          <div className="control">
            <textarea name="culture2" className="textarea is-small"></textarea>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register('x')}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
            />
            <span> Draft</span>
          </label>{' '}
          <br />
          <label className=" is-small">
            <input
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
          </p> */}
        {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        {/* </div> */}
      </form>
    </>
  );
}

export function HVS() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service('clinicaldocument');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState('Draft');

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

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

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

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
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          ' Documentation data missing, requires location and facility details',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error creating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === 'Draft') {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error updating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
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
    setReportStatus(e.target.value);
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
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: '700' }} className="label is-small">
          HVS CULTURE
        </p>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Pus cells' hpf"
              name="pusCells"
              type="text"
              register={register('pusCells', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Rbcs/hpf"
              name="rbcsOrHpf"
              type="text"
              register={register('rbcsOrHpf', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Yeast Cells"
              name="yeastCells"
              type="text"
              register={register('yeastCells', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Bacteria"
              name="bacteria2"
              type="text"
              register={register('bacteria2', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Casts"
              name="casts"
              type="text"
              register={register('casts', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="Epith Cells"
              name="epithCells2"
              type="text"
              register={register('epithCells2', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Input
              label="Crystals"
              name="crystals2"
              type="text"
              register={register('crystals2', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label="T.V"
              name="tv2"
              type="text"
              register={register('tv2', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Recommendation"
              name="Recommendation"
              type="text"
              register={register('Recommendation', { required: true })}
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
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
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  padding: '1rem',
                }}
              >
                {bill_report_status === 'Pending' ? 'Save' : 'Update'}
              </Button>
            )}
          </Grid>
        </Grid>
        {/* <label className="label is-small">HVS CULTURE</label>
        <label className="label is-small mt-3">Wet Prep</label>

        <div className="columns">
          <div className="column is-half">
            <div className="field-body mb-1">
              <div className="field is-flex ">
                <label className="label is-small mr-2">Pus cells' hpf</label>
                <p className="control is-expanded">
                  <input
                    name="pusCells"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>

            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Rbcs/hpf</label>
                <p className="control is-expanded">
                  <input
                    name="rbcsOrHpf"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>

            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Yeast Cells</label>
                <p className="control is-expanded">
                  <input
                    name="yeastCells"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Bacteria</label>
                <p className="control is-expanded">
                  <input
                    name="bacteria2"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Casts</label>
                <p className="control is-expanded">
                  <input name="casts" className="input is-small" type="text" />
                </p>
              </div>
            </div>

            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Epith Cells</label>
                <p className="control is-expanded">
                  <input
                    name="epithCells2"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>

            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Crystals</label>
                <p className="control is-expanded">
                  <input
                    name="crystals2"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>

            <div className="field-body">
              <div className="field is-flex mb-1">
                <label className="label is-small mr-2">T.V</label>
                <p className="control is-expanded">
                  <input name="tv2" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body mb-1">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register('x')}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
            />
            <span> Draft</span>
          </label>{' '}
          <br />
          <label className=" is-small">
            <input
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
          </p> */}
        {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        {/* </div> */}
      </form>
    </>
  );
}

export function LabNoteGeneric() {
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service('clinicaldocument');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState('Draft');
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

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

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

  const onSubmit = async (data) => {
    // e.preventDefault();
    setMessage('');
    setError(false);
    setSuccess(false);
    console.log(data);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        ' Documentation data missing, requires location and facility details'
      );
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast.error(`Error creating Lab Result  + ${err}`);
        });
    }

    if (bill_report_status === 'Draft') {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error updating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
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

  const handleChangeStatus = async (e) => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async (e) => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                name="investigation"
                register={register('investigation', { required: true })}
                type="text"
                placeholder="Investigation"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="finding"
                placeholder="Findings"
                register={register('finding', { required: true })}
                type="text"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="recommendation"
                placeholder="Recommendation"
                register={register('recommendation', { required: true })}
                type="text"
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
                  transform: 'scale(1.5)',
                  margin: '1rem',
                }}
              />
              <span
                style={{
                  fontSize: '1rem',
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
                  transform: 'scale(1.5)',
                  margin: '1rem',
                }}
              />
              <span
                style={{
                  fontSize: '1rem',
                }}
              >
                {' '}
                Final{' '}
              </span>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: '1rem',
                }}
              >
                {bill_report_status === 'Pending' ? 'Save' : 'Update'}
              </Button>
            </Grid>
          </Grid>
          {/* <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input is-small"
              {...register('x')}
              name="Investigation"
              type="text"
              placeholder="Investigation"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-hospital"></i>
            </span>
          </p>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register('x')}
                  name="Finding"
                  type="text"
                  placeholder="Findings"
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
                  className="textarea is-small"
                  {...register('x')}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
            />
            <span> Draft</span>
          </label>{' '}
          <br />
          <label className=" is-small">
            <input
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
         
        </div> */}
        </form>
      </div>
    </>
  );
}

export function LabNoteCreate() {
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

  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

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
    document.documentType = 'Diagnostic Result';
    document.documentname = `${order.serviceInfo.name} Result`;
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
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.error(
        ' Documentation data missing, requires location and facility details'
      );
      return;
    }

    if (bill_report_status === 'Pending') {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
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
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
          toast({
            message: 'Error updating Lab Result ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
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

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="Finding"
                placeholder="Findings"
                register={register('Finding', { required: true })}
                type="text"
                disabled={bill_report_status === 'Final'}
                style={{
                  cursor: bill_report_status === 'Final' && 'not-allowed',
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Textarea
                name="Recommendation"
                placeholder="Recommendation"
                register={register('Recommendation', { required: true })}
                type="text"
                disabled={bill_report_status === 'Final'}
                style={{
                  cursor: bill_report_status === 'Final' && 'not-allowed',
                }}
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
                  transform: 'scale(1.5)',
                  margin: '1rem',
                }}
              />
              <span
                style={{
                  fontSize: '1rem',
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
                  transform: 'scale(1.5)',
                  margin: '1rem',
                }}
              />
              <span
                style={{
                  fontSize: '1rem',
                }}
              >
                {' '}
                Final{' '}
              </span>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              {bill_report_status !== 'Final' && (
                <Button
                  type="submit"
                  style={{
                    backgroundColor: '#0364FF',
                    width: '100%',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    padding: '1rem',
                  }}
                >
                  {bill_report_status === 'Pending' ? 'Save' : 'Update'}
                </Button>
              )}
            </Grid>
          </Grid>
          {/* <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register('x')}
                  name="Finding"
                  type="text"
                  placeholder="Findings"
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
                  className="textarea is-small"
                  {...register('x')}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                  disabled={bill_report_status === 'Final'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
            />
            <span> Draft</span>
          </label>{' '}
          <br />
          <label className=" is-small">
            <input
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
          </p> */}
          {/*  <p className="control">
                  <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                      Cancel
                  </button>
              </p> */}
        </form>
      </div>
    </>
  );
}
