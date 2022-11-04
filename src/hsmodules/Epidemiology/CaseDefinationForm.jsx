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

const CaseDefinitionForm = () => {
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

  const onSubmit = async data => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper>
        <GrayWrapper>
          <Box>
            <DetailsWrapper title='Notification Type and Name of Disease '>
              <CustomSelect
                label='choose notification type'
                name='notification type'
                options={notificationOptions}
                register={register('notificationType', { required: true })}
              />

              <Input
                label='name of disease'
                register={register('disease', { required: true })}
                name='disease'
              />
            </DetailsWrapper>
            <DetailsWrapper title='Symptoms'>
              <GridWrapper className='four-columns'>
                <Input
                  label='Symptoms'
                  type='text'
                  value={symptom}
                  register={register('symptom', { required: true })}
                  onChange={e => {
                    setSymptom(e.target.value);
                  }}
                  placeholder='Specify'
                />
                <Input
                  label='Duration'
                  value={duration}
                  register={register('Duration', { required: true })}
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
                    register={register('sympreq', { required: true })}
                  />
                  required
                </Box>

                <Button
                  style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}
                  label='Add'
                  onClick={handleAddSymptoms}
                />
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
                  register={register('finding', { required: true })}
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
                    register={register('findingreq', { required: true })}
                  />
                  required
                </Box>
                <Button
                  style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}
                  label='Add '
                  onClick={handleAddFindings}
                />
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
                  {...register('lab', { required: true })}
                  onChange={e => {
                    setLab(e.target.value);
                  }}
                  label='Lab'
                  type='text'
                  placeholder='Specify'
                />

                <Input
                  value={labvalue}
                  {...register('labvalue', { required: true })}
                  onChange={e => {
                    setLabvalue(e.target.value);
                  }}
                  label='Value'
                  type='text'
                  placeholder='Specify'
                />

                <Button
                  style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}
                  label='Add '
                  onClick={handleAddLabs}
                />
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
                {...register('mgtProtocol', { required: true })}
                onChange={e => {
                  setMgtProtocol(e.target.value);
                }}
              />
            </DetailsWrapper>

            <BottomWrapper>
              <Button
                style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}
                label='Save '
              />
            </BottomWrapper>
          </Box>
        </GrayWrapper>
      </PageWrapper>
    </form>
  );
};

export default CaseDefinitionForm;
