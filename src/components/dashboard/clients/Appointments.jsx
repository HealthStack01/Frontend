import { TableMenu } from '../../../styles/global';
import Button from '../../buttons/Button';
import Input from '../../inputs/basic/Input';
import { PageWrapper } from '../styles';
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { columnsAppointment, dataAppointments } from './data';
import { useNavigate } from 'react-router-dom';
import AppointmentForm from './forms/AppointmentForm';

const Appointments = () => {
  let navigate = useNavigate();
  const [newAppointment, setNewAppointments] = useState(false);

  return (
    <>
      {!newAppointment ? (
        <PageWrapper>
          <h2>Appointments</h2>
          <TableMenu>
            <div className='inner-table'>
              <Input placeholder='Search here' />
              <div>
                <span>Filer by</span>
                <i className='bi bi-chevron-down'></i>
              </div>
            </div>

            <Button label='Add new' onClick={() => setNewAppointments(true)} />
          </TableMenu>
          <div
            style={{
              width: '100%',
              height: '800px',
              overflow: 'auto',
              padding: '0 0 10rem',
            }}
          >
            <DataTable
              title='Appointment Listing'
              columns={columnsAppointment}
              data={dataAppointments}
              selectableRows
              fixedHeader
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={(row, event) => {
                navigate(`/dashboard/clients/appointments/${row.id}`);
              }}
            />
          </div>
        </PageWrapper>
      ) : (
        <AppointmentForm />
      )}
    </>
  );
};

export default Appointments;
