import React, { useState, useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import client from '../../../feathers';
import { toast } from 'bulma-toast';
import { UserContext, ObjectContext } from '../../../context';

const VitalSignChart = () => {
  const { register, handleSubmit, setValue } = useForm();
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

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Vital Signs Chart</p>
      </div>
      <div className="card-content vscrollable  pt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="columns mb-0 mt-0">
            <div className="column">
              <div className="field ">
                <label className="label is-small">Date & Time</label>
                <p className="control is-expanded">
                  <input
                    {...register('vitals_time', { required: true })}
                    name="vitals_time"
                    className="input is-small"
                    type="datetime-local"
                  />
                </p>
              </div>
            </div>
            <div className="column"></div>
            <div className="column"></div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small"
                    {...register('Temperature')}
                    name="Temperature"
                    type="text"
                    placeholder="Temperature"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small"
                    {...register('Pulse')}
                    name="Pulse"
                    type="text"
                    placeholder="Pulse"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-signs"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register('Respiratory_rate')}
                    name="Respiratory_rate"
                    type="text"
                    placeholder="Respiratory rate"
                  />
                  <span className="icon is-small is-left">
                    <i className=" fas fa-user-md "></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register('Random_glucose')}
                    name="Random_glucose"
                    type="text"
                    placeholder="Blood Glucose"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register('Systolic_BP')}
                    name="Systolic_BP"
                    type="text"
                    placeholder="Systolic BP"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register('Diastolic_BP')}
                    name="Diastolic_BP"
                    type="text"
                    placeholder="Diastolic_BP"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register('SPO2')}
                    name="SPO2"
                    type="text"
                    placeholder="SPO2"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register('Pain')}
                    name="Pain"
                    type="text"
                    placeholder="Pain"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="field is-horizontal">
            <div className="field-body">
            <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" {...register("x")} name="Height" type="text" placeholder="Height (m)"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" {...register("x")} name="Weight" type="text" placeholder="Weight (Kg)"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                
            </div> 
        </div>  */}
          {/* <div className="field">
                    <label className=" is-small">
                        <input  type="radio"  checked={docStatus==="Draft"} name="status" value="Draft"  onChange={(e)=>{handleChangeStatus(e)}}/>
                        <span > Draft</span>
                    </label> <br/>
                    <label className=" is-small">
                        <input type="radio" checked={docStatus==="Final"} name="status"  value="Final" onChange={(e)=>handleChangeStatus(e)}/>
                        <span> Final </span>
                    </label>
                </div>   */}

          <div className="field-body">
            <div className="field">
              <label className="label is-small">Comments</label>
              <div className="control">
                <input
                  {...register('comments')}
                  name="comments"
                  className="input is-small"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field mt-4">
                <button className="button is-info is-small">Enter</button>
              </div>
            </div>
            <div className="column">
              <div className="field mt-4">
                {/*  <button className="button is-success is-small is-pulled-right" disabled={chosen} onClick={handleSave}>save</button> */}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="mx-4 ">
        <div className="table-container pullup vscrola">
          <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
            <thead>
              <tr>
                <th>
                  <abbr title="Serial No">S/No</abbr>
                </th>
                <th>
                  <abbr title="Time">Date/Time</abbr>
                </th>
                {/* <th>Type</th> */}
                <th>
                  <abbr title="Last Name">Temp</abbr>
                </th>
                <th>
                  <abbr title="Class">Pulse</abbr>
                </th>
                <th>
                  <abbr title="Location">RR </abbr>
                </th>
                <th>
                  <abbr title="Location">BP </abbr>
                </th>
                <th>
                  <abbr title="Location">SPO2</abbr>
                </th>
                <th>
                  <abbr title="Location">Pain</abbr>
                </th>
                <th>
                  <abbr title="Location">RBG</abbr>
                </th>
                <th>
                  <abbr title="Type">Comments</abbr>
                </th>
                <th>
                  <abbr title="Status">Entry Time</abbr>
                </th>
                {/* <th><abbr title="Reason">Reason</abbr></th>
                                        <th><abbr title="Practitioner">Practitioner</abbr></th> */}
                {/* <th><abbr title="Actions">Actions</abbr></th> */}
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {facilities.map((Client, i) => (
                <tr
                  key={Client._id}
                  onClick={() => handleRow(Client)}
                  className={
                    Client._id === (selectedFluid?._id || null)
                      ? 'is-selected'
                      : ''
                  }
                >
                  <th>{i + 1}</th>
                  <td>
                    <strong>
                      {format(new Date(Client.vitals_time), 'HH:mm:ss')}
                    </strong>
                  </td>
                  <th>{Client.Temperature}</th>
                  <th>{Client.Pulse}</th>
                  <td>{Client.Respiratory_rate}</td>
                  <td>
                    {Client.Systolic_BP}/{Client.Diastolic_BP}
                  </td>
                  <td>{Client.SPO2}</td>
                  <td>{Client.Pain}</td>
                  <td>{Client.Random_glucose}</td>
                  {/*    <td>{Client.Height}</td>
                                           <td>{Client.Weight}</td> */}

                  <td>{Client.comments}</td>
                  {Client.entrytime && (
                    <td>
                      {format(new Date(Client.entrytime), 'dd-MM HH:mm:ss')}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VitalSignChart;
