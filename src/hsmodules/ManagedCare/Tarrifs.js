import React, { useContext, useState, useEffect } from 'react';
import Button from '../../components/buttons/Button';
import { ObjectContext, UserContext } from '../../context';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../dashBoardUiComponent/core-ui/styles';
import client from '../../feathers';
import CustomTable from '../../components/customtable';
import { Box, Portal } from '@mui/material';
import ModalBox from '../../components/modal';
import ServiceSearch from '../helpers/ServiceSearch';
import { BottomWrapper, GridBox } from '../app/styles';
import ViewText from '../../components/viewtext';

const tariffSchema = [
  {
    name: 'S/N',
    key: 'sn',
    description: 'Enter Serial Number',
    selector: (row, i) => i + 1,
    sortable: true,
    required: true,
    inputType: 'HIDDEN',
  },
  {
    name: 'Description',
    key: 'description',
    description: 'Description',
    selector: row => row.name,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Categories',
    key: 'categories',
    description: 'Categories',
    selector: row => row.category,
    sortable: true,
    required: true,
    inputType: 'TEXT',
  },
  {
    name: 'Price',
    key: 'price',
    description: 'price',
    selector: (row, i) => row.contracts[0].price,
    sortable: true,
    required: true,
    inputType: 'NUMBER',
  },
];

const TarrifList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showView, setShowView] = useState(false);
  const [tariffs, setTariffs] = useState([]);
  const [tariff, setTariff] = useState();
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const ServicesServ = client.service('billing');
  const BandsServ = client.service('bands');

  useEffect(() => {
    const getTariffs = async () => {
      try {
        const findTarrifs = await ServicesServ.find();
        setTariffs(findTarrifs?.data);
      } catch (err) {}
    };

    getTariffs();
  });

  const handleRow = row => {
    setShowView(true);
    setTariff(row);
  };

  return (
    <>
      <Portal>
        <ModalBox
          open={showModal}
          onClose={() => setShowModal(false)}
          width='50vw'
        >
          <TariffCreate />
        </ModalBox>
      </Portal>
      <Portal>
        <ModalBox
          open={showView}
          onClose={() => setShowView(false)}
          width='50vw'
        >
          <TariffView tariff={tariff} />
        </ModalBox>
      </Portal>

      <PageWrapper>
        <Box sx={{ width: '100%' }}>
          <TableMenu>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                List of Tariffs
              </h2>
            </div>

            <Button
              style={{ fontSize: '14px', fontWeight: '600' }}
              label='Add new '
              onClick={() => setShowModal(true)}
              showicon={true}
            />
          </TableMenu>
          <div
            style={{
              width: '100%',
              height: 'calc(100vh - 80px)',
              overflow: 'auto',
            }}
          >
            <CustomTable
              title={''}
              columns={tariffSchema}
              data={tariffs}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
            />
          </div>
        </Box>
      </PageWrapper>
    </>
  );
};

const TariffCreate = () => {
  return (
    <Box>
      <Box py={4}>
        <h2>Create Tariff</h2>
      </Box>
      <Box>
        <ServiceSearch />
      </Box>
    </Box>
  );
};

const TariffView = tariff => {
  return (
    <Box>
      <Box py={4}>
        <h2>View Tariff</h2>
      </Box>
      <Box>
        <GridBox>
          <ViewText label='ID' text={tariff?.name} />
          <ViewText label='Catergory' text={tariff?.categories} />
          {/* <ViewText label='Price' text={tariff?.contracts[0]?.price} /> */}
        </GridBox>
        <BottomWrapper>
          <Button label='Save Form' type='submit' />
        </BottomWrapper>
      </Box>
    </Box>
  );
};

export default TarrifList;
