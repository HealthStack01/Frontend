import 'react-toastify/dist/ReactToastify.css';

import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';

import { UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';
import { columnHead } from './data';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (
    _row: { id: any; name: string; bandType: string; description: string },
    _event: any
  ) => void;
}

const Bands: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  let BandServ = client.service('bands');
  const { user } = useContext(UserContext);

  const [bands, setBands] = useState([]);

  const getBands = async () => {
    if (user.currentEmployee) {
      BandServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then(() => {})
        .catch((error) => {
          console.error({ error });
        });
    } else if (user.stacker) {
      BandServ.find({
        query: {
          $limit: 200,
          $sort: {
            facility: -1,
          },
        },
      })
        .then((res) => {
          setBands(res.data);
          toast('Bands fetched succesfully');
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleSearch = (e) => {
    const field = 'name';
    BandServ.find({
      query: {
        [field]: {
          $regex: e.target.value,
          $options: 'i',
        },
        facility: user?.currentEmployee?.facilityDetail?._id || '',
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setBands(res.data);
        toast({
          message: 'Band fetched succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });
      })
      .catch((err) => {
        toast({
          message: 'Error updating Band, probable network issues or ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    BandServ = client.service('bands');
    user && getBands();
    BandServ.on('created', (_) => getBands());
    BandServ.on('updated', (_) => getBands());
    BandServ.on('patched', (_) => getBands());
    BandServ.on('removed', (_) => getBands());
    return () => {};
  }, [user]);

  return (
    <PageWrapper>
      <h2>Bands</h2>

      <TableMenu>
        <div className="inner-table">
          <Input
            placeholder="Search here"
            label="Search here"
            onChange={handleSearch}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className="bi bi-chevron-down" />
          </div>
        </div>

        <Button label="Add new" onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="Bands"
          columns={columnHead}
          data={bands}
          selectableRows
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
          style={{ overflow: 'hidden' }}
        />
      </div>
      <ToastContainer />
    </PageWrapper>
  );
};

export default Bands;
