/* eslint-disable indent */
import React, { MouseEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useRepository from '../../../../components/hooks';
import { Models } from '../../Constants';
import { GenericTableSchema, LaboratoryOrderSchema, PrescriptionSchema } from '../../schema';
import { FullDetailsWrapper, PageWrapper } from '../../styles';
import { loadError, loadSuccess } from '../../Utils';
import Document from './components/FormBox';
import PatientProfile from './components/PatientProfile';
import TabBox from './components/TabBox';
import { queryDocumentations, queryPrescriptions } from './query';

const documentSchemas = {
  'Clinical Note': GenericTableSchema,
  'Lab Result': GenericTableSchema,
  'Doctor Note': GenericTableSchema,
  'Nursing Note': GenericTableSchema,
  'Vital Signs': GenericTableSchema,
  'Progress Note': GenericTableSchema,
  Prescription: PrescriptionSchema,
  'Lab Order': LaboratoryOrderSchema,
};

const Attend = ({ appointment, backClick: __ }) => {
  const [currentDocumentName, setCurrentDocumentName] = useState(null);
  const [openTel, setOpenTel] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openBtn = Boolean(anchorEl);
  const [client, setClient] = useState<any>({});
  const [prescriptions, setPrescriptions] = useState([]);
  const [tests, setTests] = useState([]);
  const [location, setLocation] = useState();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const { find: findClinicalDocument, submit: saveClinicalDocument, user } = useRepository(Models.CLINICAL_DOCUMENT);
  const { get: getClient } = useRepository(Models.CLIENT);
  const { find } = useRepository(Models.ORDER);
  const { find: findLocation } = useRepository(Models.LOCATION);

  const [clinicalDocuments, setClinicalDocuments] = useState([]);

  const loadClient = () => {
    getClient(appointment.clientId).then((client) => {
      setClient(client);
    });
  };

  const loadDocuments = (documentName?: string) => {
    findClinicalDocument(queryDocumentations(documentName, appointment.clientId))
      .then((res: any) => {
        setClinicalDocuments(res.data);
        toast(loadSuccess('Clinical documents'));
      })
      .catch((err) => toast.error(loadError('Clinical documents', err)));
  };

  const loadOrders = (orderType, setList) => {
    find(queryPrescriptions(appointment.clientId))
      .then((response: any) => {
        setList(response.data);
      })
      .catch((err) => toast.error(loadError(orderType, err)));
  };

  //FIXME: This should come from the global context, This is an hack, not production ready
  const loadLocation = () => {
    findLocation(undefined)
      .then((res: any) => setLocation(res.data[0]))
      .catch(() => toast.error('Location not loaded'));
  };

  useEffect(() => {
    loadClient();
    loadDocuments();
    loadOrders('Prescriptions', setPrescriptions);
    loadOrders('Laboratory tests', setTests);
    loadLocation();
  }, []);

  const changeFormSchema = (documentName: string) => {
    setCurrentDocumentName(documentName);
    handleCloseMenu();
  };

  const handleSubmit = (data) => {
    console.debug({ data });
    const { _id: clientId, firstname, middlename, lastname } = client;
    const { _id: locationId, name: locationName, locationType } = location as any;
    const { _id: userId, firstname: userFirstname, lastname: userLastname, currentEmployee } = user;

    const document = {
      facility: currentEmployee.facility,
      facilityname: currentEmployee.facilityDetail.facilityName,
      documentname: currentDocumentName,
      documentdetail: data,
      location: `${locationName} ${locationType}`,
      locationId,
      client: clientId,
      clientname: `${firstname} ${middlename} ${lastname}`,
      clientobj: client,
      createdBy: userId,
      createdByname: `${userFirstname} ${userLastname}`,
      status: 'completed',
    };
    console.debug({ document });
    saveClinicalDocument(document);
  };

  return (
    <PageWrapper className="attend-wrapper">
      <PatientProfile patient={client} />
      <FullDetailsWrapper className="attend attend-large">
        {openTel && <iframe width="100%" />}
        <TabBox
          handleClick={handleClick}
          anchorEl={anchorEl}
          openBtn={openBtn}
          handleCloseMenu={handleCloseMenu}
          handleMenuClick={() => {
            setCurrentDocumentName(null);
          }}
          onNewDocument={(docName) => changeFormSchema(docName)}
          documentTypes={Object.keys(documentSchemas)}
          documentations={clinicalDocuments}
          tests={tests}
          prescriptions={prescriptions}
          onOpenTelemedicine={() => setOpenTel(!openTel)}
        />
      </FullDetailsWrapper>
      {currentDocumentName && (
        <FullDetailsWrapper className="attend attend-medium">
          <Document
            schema={documentSchemas[currentDocumentName]}
            onCancel={() => changeFormSchema(null)}
            onSubmit={handleSubmit}
          />
        </FullDetailsWrapper>
      )}
    </PageWrapper>
  );
};

export default Attend;
