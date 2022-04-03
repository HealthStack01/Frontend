/* eslint-disable indent */
import React, { MouseEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useRepository from '../../../../components/hooks/repository';
import { ClinicalDocuments, Models } from '../../Constants';
import { GenericTableSchema, LaboratoryOrderSchema, PrescriptionOrderSchema } from '../../schema';
import { FullDetailsWrapper, PageWrapper } from '../../styles';
import { loadError, loadSuccess } from '../../Utils';
import QuickForm from './components/FormBox';
import PatientProfile from './components/PatientProfile';
import TabBox from './components/TabBox';
import { queryDocumentations, queryOrders } from './query';

const documentSchemas = {
  Prescription: PrescriptionOrderSchema,
  'Lab Order': LaboratoryOrderSchema,
};

const Attend = ({ appointment, backClick }) => {
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

  const { find: findClinicalDocument, submit, user } = useRepository(Models.CLINICAL_DOCUMENT);
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
        setClinicalDocuments(res.data.filter((obj) => obj.documentname !== 'Lab Order'));
        toast(loadSuccess('Clinical documents'));
      })
      .catch((err) => toast.error(loadError('Clinical documents', err)));
  };

  const loadOrders = (orderType, setList) => {
    find(queryOrders(orderType, appointment.clientId))
      .then((response: any) => {
        console.debug({ data: response.data });
        setList(response.data.filter((obj) => obj.documentname !== 'Lab Order'));
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
    loadOrders('Prescription', setPrescriptions);
    loadOrders('Lab Order', setTests);
    loadLocation();
  }, []);

  const changeFormSchema = (documentName: string) => {
    handleCloseMenu();
    setCurrentDocumentName(documentName);
    console.debug({ documentName, documentSchemas, documentSchema: documentSchemas[documentName] });
  };

  const handleSubmit = (data) => {
    const { _id: clientId, firstname, middlename, lastname } = client;
    const { _id: locationId, name: locationName, locationType } = location as any;
    const { _id: userId, firstname: userFirstname, lastname: userLastname, currentEmployee } = user;

    const document = {
      facility: currentEmployee.facility,
      facilityname: currentEmployee.facilityDetail.facilityName,
      documentname: currentDocumentName === 'Lab Order' ? 'Lab Orders' : currentDocumentName,
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
    submit(document);
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
          handleMenuClick={() => {}}
          onNewDocument={(docName) => changeFormSchema(docName)}
          documentTypes={Object.values(ClinicalDocuments)}
          documentations={clinicalDocuments}
          tests={tests}
          prescriptions={prescriptions}
          onOpenTelemedicine={() => setOpenTel(!openTel)}
          onEndEncounter={backClick}
        />
      </FullDetailsWrapper>
      {currentDocumentName && (
        <FullDetailsWrapper className="attend attend-medium">
          <QuickForm
            schema={documentSchemas[currentDocumentName] || GenericTableSchema}
            onCancel={() => changeFormSchema(null)}
            onSubmit={handleSubmit}
          />
        </FullDetailsWrapper>
      )}
    </PageWrapper>
  );
};

export default Attend;
