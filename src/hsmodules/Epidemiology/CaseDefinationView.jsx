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
import GlobalCustomButton from '../../components/buttons/CustomButton';

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
      
        <Box display="flex" justifyContent="flex-end" mb="1rem">
            <GlobalCustomButton
            >Edit</GlobalCustomButton>
        </Box>
     
         
              <Box display="flex" flexDirection="column" gap="1rem">
                      <CustomSelect
                        label='Choose notification type'
                        options={notificationOptions}
                        defaultValue={casedefinition?.notificationtype}
                        disabled={!editing}
                      />
                   
                       <Input 
                        defaultValue={casedefinition?.disease?.name}
                       name="disease" type="text" label="Name of Disease" disabled={!editing}/>
               </Box>
    </>
  );
};

export default CaseDefinitionView;
