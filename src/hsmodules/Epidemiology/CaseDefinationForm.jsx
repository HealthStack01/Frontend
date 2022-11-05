import { Box } from '@mui/system';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import { customStyles } from '../../components/customtable/styles';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  PageWrapper,
} from '../app/styles';
import { clinicalSignSchema, syptomSchema, labSchema } from './schema';
import client from '../../feathers';
import { toast, ToastContainer } from 'react-toastify';

const CaseDefinitionForm = () => {
  const CaseServ = client.service('casedefinition');

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [finding, setFinding] = useState('');
  const [findings, setFindings] = useState([]);
  const [findingreq, setFindingreq] = useState(false);

  const [symptom, setSymptom] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [duration, setDuration] = useState('');
  const [sympreq, setSympreq] = useState(false);

  const [lab, setLab] = useState('');
  const [labs, setLabs] = useState([]);
  const [labvalue, setLabvalue] = useState('');
  /* const [sympreq,setSympreq] = useState(false) */
  const [observations, setObservations] = useState([]);
  const [mgtProtocol, setMgtProtocol] = useState('');
  const [notified, setNotified] = useState('');

  const data = localStorage.getItem('user');
  const user = JSON.parse(data);

  const notificationOptions = [
    'Immediate Notification',
    'Weekly',
    'Monthly',
    'Whatsapp',
  ];

  const handleChecked = e => {
    // console.log(e.target.checked)
    setSympreq(e.target.checked);
  };

  const handleChecked2 = e => {
    // console.log(e.target.checked)
    setFindingreq(e.target.checked);
  };

  const handleAddSymptoms = () => {
    let newsymptom = {
      symptom,
      duration,
      sympreq,
    };
    console.log(newsymptom);
    setSymptoms(prev => [...prev, newsymptom]);
    // setAllergy({})
    setSymptom('');
    setDuration('');
    setSympreq(false);
  };
  const handleAddFindings = () => {
    let newFinding = {
      finding,
      findingreq,
    };
    console.log(newFinding);
    setFindings(prev => [...prev, newFinding]);
    // setAllergy({})
    setFinding('');
    setFindingreq(false);
  };
  const handleAddLabs = () => {
    let newLabs = {
      lab,
      labvalue,
    };
    console.log(newLabs);
    setLabs(prev => [...prev, newLabs]);
    // setAllergy({})
    setLab('');
    setLabvalue('');
    /*  setFindingreq(false) */
  };

  const onSubmit = async (data, e) => {
    setLoading(true);

    data.observations = [];
    data.disease = {
      name: data.disease,
      icdcode: '',
      icdver: '',
      snomed: '',
      snomedver: '',
    };

    if (data.notificationtype === '') {
      alert('Kindly choose notification type');
      return;
    }

    if (symptoms.length > 0) {
      let sympcollection = [];
      symptoms.forEach(el => {
        let obs = {
          category: 'symptoms',
          name: el.symptom,
          duration: el.duration,
          /* note:"",
                    snomed:"" ,
                    response:"" , */
          required: el.sympreq,
          /* value:""  */
        };
        console.log(obs);
        sympcollection.push(obs);
        console.log(sympcollection);
      });
      data.observations = [...data.observations, ...sympcollection];
    }

    if (findings.length > 0) {
      let findingscollection = [];
      findings.forEach(el => {
        let obs = {
          category: 'Signs',
          name: el.finding,
          /*  duration:el.duration , */
          /* note:"",
                    snomed:"" ,
                    response:"" , */
          required: el.findingreq,
          /* value:""  */
        };
        findingscollection.push(obs);
      });
      data.observations = [...data.observations, ...findingscollection];
    }
    if (labs.length > 0) {
      let labscollection = [];
      labs.forEach(el => {
        let obs = {
          category: 'Laboratory',
          name: el.lab,
          /*  duration:el.duration , */
          /* note:"",
                    snomed:"" ,
                    response:"" , */
          /*  required:el.findingreq, */
          value: el.labvalue,
        };
        labscollection.push(obs);
      });
      data.observations = [...data.observations, ...labscollection];
    }

    if (findings.length > 0) {
      let findingscollection = [];
      findings.forEach(el => {
        let obs = {
          category: 'Signs',
          name: el.finding,
          /*  duration:el.duration , */
          /* note:"",
                    snomed:"" ,
                    response:"" , */
          required: el.findingreq,
          /* value:""  */
        };
        findingscollection.push(obs);
      });
      data.observations = [...data.observations, ...findingscollection];
    }
    if (labs.length > 0) {
      let labscollection = [];
      labs.forEach(el => {
        let obs = {
          category: 'Laboratory',
          name: el.lab,
          /*  duration:el.duration , */
          /* note:"",
                    snomed:"" ,
                    response:"" , */
          /*  required:el.findingreq, */
          value: el.labvalue,
        };
        labscollection.push(obs);
      });
      data.observations = [...data.observations, ...labscollection];
    }

    data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown

    await CaseServ.create(data)
      .then(res => {
        toast.success(`Case Defination successfully created!`);
        setLoading(false);
      })
      .catch(err => {
        toast.error(`Sorry, Unable  to create a case definition! ${err}`);
        setLoading(false);
      });

    setLoading(false);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer theme='colored' />

      <PageWrapper>
        <GrayWrapper>
          <Box>
            <DetailsWrapper title='Notification Type and Name of Disease '>
              <CustomSelect
                label='choose notification type'
                name='notification type'
                options={notificationOptions}
                register={register('notificationtype')}
              />

              <Input
                label='name of disease'
                register={register('disease')}
                name='disease'
              />
            </DetailsWrapper>
            <DetailsWrapper title='Symptoms'>
              <GridWrapper className='four-columns'>
                <Input
                  label='Symptoms'
                  type='text'
                  value={symptom}
                  onChange={e => {
                    setSymptom(e.target.value);
                  }}
                  placeholder='Specify'
                />
                <Input
                  label='Duration'
                  value={duration}
                  onChange={e => {
                    setDuration(e.target.value);
                  }}
                  name='duration'
                />

                <Box sx={{ jusifyContent: 'space-between' }}>
                  <input
                    type='checkbox'
                    value={sympreq}
                    name='sympreq'
                    onChange={e => {
                      handleChecked(e);
                    }}
                    register={register('sympreq')}
                  />
                  required
                </Box>

                <div
                  style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}
                  onClick={handleAddSymptoms}
                >
                  +Add
                </div>
              </GridWrapper>

              <DataTable
                customStyles={customStyles}
                title={'Syptom'}
                columns={syptomSchema}
                data={symptoms}
                pointerOnHover
                highlightOnHover
                striped
              />
            </DetailsWrapper>
            <DetailsWrapper title='Clinical Signs'>
              <GridWrapper>
                <Input
                  label='Clinical Signs'
                  value={finding}
                  onChange={e => {
                    setFinding(e.target.value);
                  }}
                  type='text'
                  placeholder='Finding'
                />
                <Box sx={{ jusifyContent: 'space-between' }}>
                  <input
                    type='checkbox'
                    value={findingreq}
                    name='sympreq'
                    onChange={e => {
                      handleChecked2(e);
                    }}
                    register={register('findingreq')}
                  />
                  required
                </Box>
                <div
                  style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}
                  onClick={handleAddFindings}
                >
                  +Add
                </div>
              </GridWrapper>

              <DataTable
                title={'Clinical Signs'}
                columns={clinicalSignSchema}
                customStyles={customStyles}
                data={findings}
                pointerOnHover
                highlightOnHover
                striped
              />
            </DetailsWrapper>

            <DetailsWrapper title='Lab Confirmation'>
              <GridWrapper>
                <Input
                  value={lab}
                  // {...register('lab')}
                  onChange={e => {
                    setLab(e.target.value);
                  }}
                  label='Lab'
                  type='text'
                  placeholder='Specify'
                />

                <Input
                  value={labvalue}
                  // {...register('labvalue')}
                  onChange={e => {
                    setLabvalue(e.target.value);
                  }}
                  label='Value'
                  type='text'
                  placeholder='Specify'
                />

                <div
                  style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}
                  label='Add '
                  onClick={handleAddLabs}
                >
                  +Add
                </div>
              </GridWrapper>

              <DataTable
                title={'Lab Confirmation'}
                customStyles={customStyles}
                columns={labSchema}
                data={labs}
                pointerOnHover
                highlightOnHover
                striped
              />
            </DetailsWrapper>

            <DetailsWrapper title='Management Protocol'>
              <Input
                label='Management protocol'
                value={mgtProtocol}
                {...register('mgtProtocol')}
                onChange={e => {
                  setMgtProtocol(e.target.value);
                }}
              />
            </DetailsWrapper>

            <BottomWrapper>
              <Button label='Save ' loading={loading} type='submit' />
            </BottomWrapper>
          </Box>
        </GrayWrapper>
      </PageWrapper>
    </form>
  );
};

export default CaseDefinitionForm;
