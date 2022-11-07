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
import { HeadWrapper } from './styles';
import ViewText from '../../components/viewtext';

const CaseDefinitionView = ({ casedefinition, open, setOpen }) => {
  const CaseServ = client.service('casedefinition');

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      notificationType: casedefinition?.notificationType,
      disease: casedefinition?.disease?.name,
      observations: casedefinition?.observations,
    },
  });
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

  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');
    const dleteId = casedefinition._id;
    if (conf) {
      await CaseServ.remove(dleteId)
        .then(res => {
          toast.success(`Case definition successfully deleted!`);
          setOpen(false);
        })
        .catch(err => {
          toast.error(`Sorry, Unable to delete case definition. ${err}`);
        });
    }
  };

  const onSubmit = async (data, e) => {
    setLoading(true);

    data.observations = casedefinition?.observations;
    data.disease = casedefinition?.disease;

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

    await CaseServ.patch(casedefinition._id, data)
      .then(res => {
        toast.success(`Case Defination successfully updated!`);
        setLoading(false);
        setOpen(false);
      })
      .catch(err => {
        toast.error(`Sorry, Unable  to updated a case definition! ${err}`);
        setLoading(false);
      });

    setLoading(false);
  };

  return (
    <>
      <PageWrapper>
        <HeadWrapper>
          <div>
            <h2>Case Definition Detail</h2>
            <span>Case Definition detail of Case Definition</span>
          </div>
          <BottomWrapper>
            <Button
              label='Delete Case Definition'
              background='#FFE9E9'
              color='#ED0423'
              onClick={() => handleDelete()}
            />

            <Button
              label={`${!editing ? 'Edit Case Definition' : 'Cancel Editing'}`}
              background='#ECF3FF'
              color='#0364FF'
              showicon
              icon='bi bi-pen-fill'
              disabled={editing}
              onClick={() => {
                setEditing(!editing);
              }}
            />
          </BottomWrapper>
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ToastContainer theme='colored' />

          <PageWrapper>
            <GrayWrapper>
              <Box>
                <DetailsWrapper title='Notification Type and Name of Disease '>
                  <GridWrapper>
                    {!editing ? (
                      <ViewText
                        label='Notification Type'
                        text={casedefinition?.notificationtype}
                      />
                    ) : (
                      <CustomSelect
                        label='Choose notification type'
                        name='notification type'
                        options={notificationOptions}
                        register={register('notificationtype')}
                      />
                    )}
                    {!editing ? (
                      <ViewText
                        label='Name of Disease'
                        text={casedefinition?.disease?.name}
                      />
                    ) : (
                      <Input
                        label='Name of disease'
                        register={register('disease')}
                        name='disease'
                      />
                    )}
                  </GridWrapper>
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
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        width: '80px',
                      }}
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

                <BottomWrapper>
                  <Button label='Save ' loading={loading} type='submit' />
                </BottomWrapper>
              </Box>
            </GrayWrapper>
          </PageWrapper>
        </form>
      </PageWrapper>
    </>
  );
};

export default CaseDefinitionView;
