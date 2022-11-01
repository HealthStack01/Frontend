/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { formatDistanceToNowStrict } from 'date-fns';
import VideoConference from '../utils/VideoConference';

// Demo styles, see 'Styles' section below for some notes on use.

import { DrugAdminList } from '../Documentation/Prescription';
import BillServiceCreate from '../Finance/BillServiceCreate';

export default function PatientProfile() {
  const { state } = useContext(ObjectContext); //,setState
  const { user, setUser } = useContext(UserContext);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [billingModal, setBillingModal] = useState(false);
  const [medicationModal, setMedicationModal] = useState(false);
  const [visitModal, setVisitModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [intoleranceModal, setIntoleranceModal] = useState(false);
  const [problemModal, setProblemModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const client = state.ClientModule.selectedClient;
  const {
    firstname,
    middlename,
    lastname,
    dob,
    gender,
    maritalstatus,
    religion,
    phone,
    email,
    profession,

    nok_name,
    nok_phoneno,
    nok_email,
    nok_relationship,
    bloodgroup,
    genotype,
    disabilities,
    specificDetails,
    clientTags,
    mrn,
    address,
    city,
    lga,
    //state,
    country,
    allergies,
    comorbidities,
    paymentinfo,
  } = state.ClientModule.selectedClient;

  /*   const {
        cash,
        cashDetails,
        familycover,
        familyDetails,
        companycover,
        companyDetails,
        hmocover,
        hmoDetails
        } =state.ClientModule.selectedClient.paymentinfo */

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedClient(state.ClientModule.selectedClient);
    /*  console.log(client)
        console.log(selectedClient) */
    return () => {};
  });
  const handlecloseModal1 = () => {
    setBillingModal(false);
  };
  const handlecloseModal2 = () => {
    setMedicationModal(false);
  };
  const showBilling = () => {
    setBillingModal(true);
    //navigate('/app/finance/billservice')
  };
  const showMedication = () => {
    setMedicationModal(true);
    //navigate('/app/finance/billservice')
  };
  const showTask = () => {
    setBillingModal(true);
    //navigate('/app/finance/billservice')
  };

  const showIntolerance = () => {
    setBillingModal(true);
    //navigate('/app/finance/billservice')
  };
  const showProblem = () => {
    setBillingModal(true);
    //navigate('/app/finance/billservice')
  };
  return (
    <div>
      <div className="card">
        <div className="card-content p-1">
          <div className="media p-0 m-0 ">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-7 is-uppercase">
                {firstname} {middlename} {lastname}
              </p>
              <p className="subtitle is-7 ">
                {paymentinfo &&
                  paymentinfo.map((pay, i) => (
                    <>
                      {pay.paymentmode} {pay.paymentmode === 'Cash' ? '' : ':'}{' '}
                      {pay.organizationName}
                      <br></br>
                    </>
                  ))}
                {/* {cash && "Cash"}
                                {familycover && "Family Cover"}
                                {companycover && "Company Cover"}
                                {hmocover && "HMO Cover"} */}
              </p>
              {(user.currentEmployee?.roles.includes('Bill Client') ||
                user.currentEmployee?.roles.length === 0 ||
                user.stacker) && (
                <button
                  className="button is-success is-small btnheight upt"
                  onClick={showBilling}
                >
                  Bill Client
                </button>
              )}
            </div>
          </div>

          <div className="content">
            <time dateTime="2016-1-1">
              {' '}
              {/* {formatDistanceToNowStrict(new Date(dob))} */}
            </time>{' '}
            {gender} {maritalstatus} {religion} {profession}
            <br />
            {bloodgroup} {genotype} <br />
            <strong> {clientTags}</strong>
            {/*  {phone} {email} */}
          </div>
        </div>
      </div>
      <div className="card mt-1">
        <div className="card-content p-1">
          {/*<div >
                             <label className="label is-size-7">Tags:</label> 
                           <strong> {clientTags}</strong>
                            </div>*/}
          <div>
            <label className="label is-size-7">Specific Instructions:</label>
            {specificDetails}
          </div>
          <div>
            <label className="label is-size-7">Allergies:</label>
            {allergies}
          </div>
          <div>
            <label className="label is-size-7">Co-morbidities:</label>
            {comorbidities}
          </div>
          <div>
            <label className="label is-size-7">Disabilities:</label>
            {disabilities}
          </div>
        </div>
      </div>
      <div className="card mt-1">
        <div className="card-content p-1">
          <div className=" is-fullwidth vscrollable-acc pr-1">
            <div>
              <button className="button is-small is-success is-inverted">
                {' '}
                <strong> Last Visit </strong>{' '}
              </button>
            </div>
            <div>
              <button className="button is-small is-success is-inverted">
                {' '}
                <strong> Drug Intolerance </strong>
              </button>
            </div>
            <div onClick={() => setMedicationModal(true)}>
              <button className="button is-small is-success is-inverted">
                {' '}
                <strong>Medications</strong>{' '}
              </button>
            </div>
            <div>
              <button className="button is-small is-success is-inverted">
                {' '}
                <strong> History </strong>{' '}
              </button>
            </div>
            <div>
              {' '}
              <button className="button is-small is-success is-inverted">
                {' '}
                <strong> Problem List </strong>{' '}
              </button>
            </div>
            <div>
              {' '}
              <button className="button is-small is-success is-inverted">
                {' '}
                <strong> Task </strong>{' '}
              </button>
            </div>

            {/*  <div>
                                    <div   >
                                            <div >
                                                <div  >
                                                    <strong>  Last Visit </strong>
                                                </div>
                                            </div>
                                            <div>
                                                <><label className="label is-size-7"></label> </>    
                                            </div>                                          
                                        </div>
                                    <div   >
                                            <div >
                                                <div  >
                                                    <strong>  Drug Intolerance  </strong>
                                                </div>
                                            </div>
                                            <div>
                                                <></>    
                                            </div>                                          
                                        </div>
                                        <div   >
                                            <div >
                                                <div  >
                                                    <strong>  Medications  </strong>
                                                </div>
                                            </div>
                                            <div className="mt-1">
                                                <PrescriptionList standalone="true"/>     
                                            </div>                                          
                                        </div>
                                        <div   >
                                            <div >
                                                <div  >
                                                    <strong>  History  </strong>
                                                </div>
                                            </div>
                                            <div>
                                                <></>    
                                            </div>                                          
                                        </div>
                                        <div   >
                                            <div >
                                                <div  >
                                                    <strong>  Problem List  </strong>
                                                </div>
                                            </div>
                                            <div>
                                                <></>    
                                            </div>                                          
                                        </div>
                                        <div   >
                                            <div >
                                                <div  >
                                                    <strong>  Task  </strong>
                                                </div>
                                            </div>
                                            <div>
                                                <></>    
                                            </div>                                          
                                        </div>
                                        
                                    </div> */}
          </div>
        </div>
      </div>
      <div></div>
      {/* <VideoConference /> */}
      <div className={`modal ${billingModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Bill Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal1}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <BillServiceCreate closeModal={handlecloseModal1} />
          </section>
          {/* <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button">Cancel</button>
                            </footer> */}
        </div>
      </div>
      <div className={`modal ${medicationModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card " style={{ width: '70%' }}>
          <header className="modal-card-head">
            <p className="modal-card-title">Client Medications</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal2}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <DrugAdminList standalone="true" />
          </section>
          {/* <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button">Cancel</button>
                            </footer> */}
        </div>
      </div>
      <div className={`modal ${taskModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Bill Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal1}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <BillServiceCreate closeModal={handlecloseModal1} />
          </section>
          {/* <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button">Cancel</button>
                            </footer> */}
        </div>
      </div>
      <div className={`modal ${problemModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Bill Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal1}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <BillServiceCreate closeModal={handlecloseModal1} />
          </section>
          {/* <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button">Cancel</button>
                            </footer> */}
        </div>
      </div>
      <div className={`modal ${historyModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card" style={{ width: '100%' }}>
          <header className="modal-card-head">
            <p className="modal-card-title">Bill Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal1}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <BillServiceCreate closeModal={handlecloseModal1} />
          </section>
          {/* <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button">Cancel</button>
                            </footer> */}
        </div>
      </div>
      <div className={`modal ${intoleranceModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Bill Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal1}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <BillServiceCreate closeModal={handlecloseModal1} />
          </section>
          {/* <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button">Cancel</button>
                            </footer> */}
        </div>
      </div>
      <div className={`modal ${visitModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Bill Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal1}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <BillServiceCreate closeModal={handlecloseModal1} />
          </section>
          {/* <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button">Cancel</button>
                            </footer> */}
        </div>
      </div>
    </div>
  );
}
