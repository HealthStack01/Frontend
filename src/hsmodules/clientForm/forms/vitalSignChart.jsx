import React, { useState, useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import client from '../../../feathers';
import { toast } from 'bulma-toast';
import { UserContext, ObjectContext } from '../../../context';
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import Input from "../../../components/inputs/basic/Input";
import MuiCustomDatePicker from "../../../components/inputs/Date/MuiDatePicker";
import Textarea from "../../../components/inputs/basic/Textarea";
import { Box, Grid } from "@mui/material";
import CustomTable from '../../../components/customtable';
import moment from "moment";

const VitalSignChart = () => {
  const { register, handleSubmit, setValue ,control} = useForm();
  const fluidTypeOptions = ['Input', 'Output'];
  const { user, setUser } = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);
  const [selectedFluid, setSelectedFluid] = useState();
  const [chosen, setChosen] = useState(true);
  const [chosen1, setChosen1] = useState(true);
  const [chosen2, setChosen2] = useState(true);
  const { state } = useContext(ObjectContext);
  const [docStatus, setDocStatus] = useState('Draft');
  const ClientServ = client.service('clinicaldocument');
  const fac = useRef([]);
  const struc = useRef([]);

  const handleRow = () => {
    console.log("let's pray");
  };

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  const checkonadmission = () => {
    console.log(state.ClientModule.selectedClient.admission_id);
    if (!!state.ClientModule.selectedClient.admission_id) {
      setChosen2(false);
    } else {
      toast({
        message: 'Patient not on admission',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
    }
  };

  useEffect(() => {
    checkonadmission();
    findexistingChart();

    return () => {};
  }, [draftDoc]);

  const findexistingChart = async () => {
    const findClinic = await ClientServ.find({
      query: {
        client: state.ClientModule.selectedClient._id,
        facility: user.currentEmployee.facilityDetail._id,
        documentname: state.DocumentClassModule.selectedDocumentClass.name,
        episodeofcare_id: state.ClientModule.selectedClient.admission_id,

        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    });

    fac.current = findClinic.data[0];
    //console.log(fac.current)
    if (findClinic.total > 1) {
      setChosen1(false);
      setFacilities(fac.current.documentdetail.recordings);
    }
  };

  useEffect(() => {
    if (!!draftDoc && draftDoc.status === 'Draft') {
      /*  Object.entries(draftDoc.documentdetail).map(([keys,value],i)=>(
                  setValue(keys, value,  {
                      shouldValidate: true,
                      shouldDirty: true
                  })

              )) */
      setFacilities(draftDoc.documentdetail.recordings);
      // setAllergies(draftDoc.documentdetail.Allergy_Skin_Test)
    }
    return () => {
      draftDoc = {};
    };
  }, [draftDoc]);

  const handleSave = () => {
    let document = {};
    let data = {};
    data.recordings = facilities;
    // data.createdby=user._id

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname =
      state.DocumentClassModule.selectedDocumentClass.name;
    document.documentClassId =
      state.DocumentClassModule.selectedDocumentClass._id;
    document.location =
      state.ClinicModule.selectedClinic.name +
      ' ' +
      state.ClinicModule.selectedClinic.locationType;
    document.locationId = state.ClinicModule.selectedClinic._id;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + ' ' + user.lastname;
    document.status = docStatus === 'Draft' ? 'Draft' : 'completed';
    document.episodeofcare_id = state.ClientModule.selectedClient.admission_id;
    console.log(document);

    // alert(document.status)
    ClientServ.create(document)
      .then((res) => {
        setChosen(true);

        toast({
          message: 'Fluid Input/Output entry successful',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });
      })
      .catch((err) => {
        toast({
          message: 'Error creating Appointment ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const onSubmit = async (data, e) => {
    // console.log(state.DocumentClassModule.selectedDocumentClass)
    console.log(state.employeeLocation.locationName);
    e.preventDefault();
    data.entrytime = new Date();
    data.location =
      state.employeeLocation.locationName +
      ' ' +
      state.employeeLocation.locationType;
    data.locationId = state.employeeLocation.locationId;
    data.episodeofcare_id = state.ClientModule.selectedClient.admission_id;
    data.createdBy = user._id;
    data.createdByname = user.firstname + ' ' + user.lastname;

    // await update(data)
    struc.current = [data, ...facilities];
    // console.log(struc.current)
    setFacilities((prev) => [data, ...facilities]);
    // data.recordings=facilities
    e.target.reset();
    setChosen(false);
    //handleSave()
    let document = {};
    data = {};
    data.recordings = struc.current;
    // data.createdby=user._id

    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentname =
      state.DocumentClassModule.selectedDocumentClass.name;
    document.documentClassId =
      state.DocumentClassModule.selectedDocumentClass._id;
    document.location =
      state.employeeLocation.locationName +
      ' ' +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = state.ClientModule.selectedClient._id;
    document.createdBy = user._id;
    document.createdByname = user.firstname + ' ' + user.lastname;
    document.status = docStatus === 'Draft' ? 'Draft' : 'completed';
    document.episodeofcare_id = state.ClientModule.selectedClient.admission_id;
    console.log(document);

    // alert(document.status)
    if (chosen1) {
      ClientServ.create(document)
        .then((res) => {
          setChosen(true);

          toast({
            message: 'Vital Signs entry successful',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((err) => {
          toast({
            message: 'Fluid Input/Output entry ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } else {
      ClientServ.patch(fac.current._id, {
        documentdetail: document.documentdetail,
      })
        .then((res) => {
          setChosen(true);

          toast({
            message: 'Fluid Input/Output entry successful',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((err) => {
          toast({
            message: 'Fluid Input/Output entry ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const vitalSignsSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },

    {
      name: "Date",
      key: "Date",
      description: "date",
      selector: row => moment(row.date_time).calendar("L"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: 'Temperature',
      key: 'temperature',
      description: 'temperature',
      selector: (row) => row.temperature,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: "Pulse",
      key: "pulse",
      description: "pulse",
      selector: row => (row.pulse),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "RR",
      key: "RR",
      description: "Respiratory Rate",
      selector: row => (row.respiratory_rate),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "BP",
      key: "BP",
      description: "Diastolic BP",
      selector: row => (row.diastolic_bp),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "SPO2",
      key: "SPO2",
      description: "SPO2",
      selector: row => (row.sp02),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Pain",
      key: "pain",
      description: "Pain",
      selector: row => (row.pain),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: 'Comments',
      key: 'comments',
      description: 'comments',
      selector: (row) => row.comments,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Entry Time',
      key: 'entryTime',
      description: 'entrytime',
      selector: (row) => row.entrytime,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Vital Signs Chart</p>
      </div>
      <div className="card-content vscrollable  pt-0">
        <form onSubmit={handleSubmit(onSubmit)}>

       
        <Box mb="1rem">
          <MuiCustomDatePicker
                     name="date_time"
                     label="Date & Time"
                    control={control}
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('temperature')}
                  name="temperature"
                  label="Temperature"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('pulse')}
                  name="pulse"
                  label="Pulse"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('respiratory_rate')}
                  name="respiration_rate"
                  label="Respiration Rate"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('blood_glucose')}
                  name="blood_glucose"
                  label="Blood Glucose"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('systolic_bp')}
                  name="systolic_bp"
                  label="Systolic BP"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('diastolic_bp')}
                  name="diastolic_bp"
                  label="Diastolic BP"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('sp02')}
                  name="sp02"
                  label="SP02"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Input
                  {...register('pain')}
                  name="pain"
                  label="Pain"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <Textarea
                  {...register('comments')}
                  name="comments"
                  label="Comments"
                  type="text"
                  />
          </Box>
          <Box mb="1rem">
          <GlobalCustomButton
              text="Enter"
              customStyles={{
                marginRight: "5px",
              }}
            />
          </Box>
        </form>
      </div>
      <Box>
         <CustomTable
            title={'Fluid Intake'}
            columns={vitalSignsSchema}
            data={facilities}
            // onRowClicked={handleRow}
            pointerOnHover
            highlightOnHover
            striped
          />
         </Box>
      </div>
  );
};

export default VitalSignChart;
