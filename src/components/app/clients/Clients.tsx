import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

import { TableMenu } from '../../../styles/global';
import Button from '../../buttons/Button';
import Input from '../../inputs/basic/Input';
import { PageWrapper } from '../styles';
import { ClientDataRow, columnsClient, dataClient } from './data';
import ClientQuickForm from './forms/ClientQuickForm';

function Clients() {
  const navigate = useNavigate();

  const [createClient, setCreateClient] = useState(false);
  const [, setShowSingleClient] = useState(false);
  const [, setSingleClient] = useState<ClientDataRow>({
    id: 0,
    fname: '',
    lname: '',
    mname: '',
    age: 0,
    gender: '',
    phone: '',
    email: '',
    maritalStatus: '',
    religion: '',
    medicalRecord: '',
    profession: '',
    country: '',
    state: '',
    LGA: '',
    townCity: '',
    neighborhood: '',
    streetAddress: '',
    tags: '',
    otherBioData: '',
    nextOfKin: '',
    nonHospitalIndetifiers: '',
    paymentInformation: '',
    assignToCareTeam: false,
    nextOfKinFullName: '',
    nextOfKinPhone: '',
    nextOfKinEmail: '',
    nextOfKinRelationship: '',
    nationalID: '',
    internationPassportNumber: '',
    votersCardNumber: '',
    driversLicenseNumber: '',
    bloodGroup: '',
    genotype: '',
    disabilities: '',
    allergies: '',
    coMobidities: '',
    specificDetails: '',
  });
  return (
    <>
      {!createClient ? (
        <PageWrapper>
          <h2>Client</h2>
          <TableMenu>
            <div className="inner-table">
              <Input placeholder="Search here" label="Search here" />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Filer by</span>
                <i className="bi bi-chevron-down" />
              </div>
            </div>

            <Button label="Add new" onClick={() => setCreateClient(true)} />
          </TableMenu>
          <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
            <DataTable
              title="Clients"
              columns={columnsClient}
              data={dataClient}
              selectableRows
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={(row) => {
                setSingleClient(row);
                setShowSingleClient(true);
                navigate(`/dashboard/clients/${row.id}`);
              }}
              style={{ overflow: 'hidden' }}
            />
          </div>
        </PageWrapper>
      ) : (
        <ClientQuickForm />
      )}
    </>
  );
}

export default Clients;
