/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useRepository from '../../../../components/hooks/repository';
import {
  DocumentationSchemas,
  GenericTableSchema,
  LaboratoryOrderSchema,
  PrescriptionOrderSchema,
  RadiologyOrderSchema,
} from '../../clinic/schema';
import { Models } from '../../Constants';
import FormRowsView from '../../generic/FormRowsView';
import { FormType } from '../../schema/util';
import { FullDetailsWrapper, PageWrapper } from '../../styles';
import { loadError, loadSuccess } from '../../Utils';
import PatientProfile from './components/PatientProfile';
import TabBox from './components/TabBox';
import VideoConference from './components/VideoConference';
import { queryDocumentations, queryOrders } from './query';

const documentSchemas = {
  Prescription: PrescriptionOrderSchema,
  'Lab Orders': LaboratoryOrderSchema,
  'Radiology Orders': RadiologyOrderSchema,
};
DocumentationSchemas.forEach(({ name, schema }) => {
  documentSchemas[name] = schema;
});

const bulkCreateSchemas = ['Prescription', 'Lab Order', 'Radiology Order'];

const Attend = ({ appointment, backClick }) => {
  const [currentDocumentName, setCurrentDocumentName] = useState(null);
  const [openTel, setOpenTel] = useState(false);
  const [client, setClient] = useState < any > {};
  const [prescriptions, setPrescriptions] = useState([]);
  const [laboratoryTests, setLaboratoryTests] = useState([]);
  const [radiologyTests, setRadiologyTests] = useState([]);

  const {
    find: findClinicalDocument,
    submit,
    user,
  } = useRepository(Models.CLINICAL_DOCUMENT);
  const [, setDocumentTypes] = useState([]);
  const { get: getClient } = useRepository(Models.CLIENT);
  const { find, location } = useRepository(Models.ORDER);
  const { find: findDocumentTypes } = useRepository(Models.DOCUMENT_TYPES);

  const [clinicalDocuments, setClinicalDocuments] = useState([]);

  const loadClient = () => {
    getClient(appointment.clientId).then((client) => {
      setClient(client);
    });
  };

  const loadDocumentTypes = () => {
    findDocumentTypes({
      query: {
        /* locationType:"DocumentClass",*/
        facility: user.currentEmployee.facilityDetail._id,
        $limit: 100,
        $sort: {
          name: 1,
        },
      },
    }).then((res: any) => {
      setDocumentTypes(res.data);
    });
  };

  const loadDocuments = (documentName?: string) => {
    findClinicalDocument(
      queryDocumentations(documentName, appointment.clientId)
    )
      .then((res: any) => {
        setClinicalDocuments(
          res.data.filter((obj) => obj.documentname !== 'Lab Orders')
        );
        toast(loadSuccess('Clinical documents'));
      })
      .catch((err) => toast.error(loadError('Clinical documents', err)));
  };

  const loadOrders = (orderType, setList) => {
    find(queryOrders(orderType, appointment.clientId))
      .then((response: any) => {
        setList(
          response.data.filter((obj) => obj.documentname !== 'Lab Orders')
        );
      })
      .catch((err) => toast.error(loadError(orderType, err)));
  };

  useEffect(() => {
    loadClient();
    loadDocuments();
    loadOrders('Prescription', setPrescriptions);
    loadOrders('Lab Order', setLaboratoryTests);
    loadOrders('Radiology Order', setRadiologyTests);
    loadDocumentTypes();
  }, []);

  const changeFormSchema = (documentName: string) => {
    setCurrentDocumentName(documentName);
  };

  const handleSubmit = (data) => {
    const { _id: clientId, firstname, middlename = '', lastname } = client;
    const { _id: locationId, name: locationName, locationType } = location;
    const {
      _id: userId,
      firstname: userFirstname,
      lastname: userLastname,
      currentEmployee,
    } = user;

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
    submit(document);
  };

  return (
    <PageWrapper className="attend-wrapper">
      <PatientProfile patient={client} />
      <FullDetailsWrapper className="attend attend-large">
        {openTel && (
          <VideoConference
            clientName={client.firstname}
            roomId={user._id}
            onClose={() => setOpenTel(false)}
          />
        )}
        <TabBox
          onNewDocument={(docName) => changeFormSchema(docName)}
          documentTypes={Object.keys(documentSchemas)}
          documentations={clinicalDocuments}
          laboratoryTests={laboratoryTests}
          radiologyTests={radiologyTests}
          prescriptions={prescriptions}
          onOpenTelemedicine={() => setOpenTel(!openTel)}
          onEndEncounter={backClick}
        />
      </FullDetailsWrapper>
      {currentDocumentName && (
        <FullDetailsWrapper className="attend attend-medium">
          <FormRowsView
            title={currentDocumentName}
            formType={
              bulkCreateSchemas.includes(currentDocumentName)
                ? FormType.BULK_CREATE
                : FormType.CREATE
            }
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
