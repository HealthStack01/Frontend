import React, { useContext, useState, useEffect } from 'react';
import Button from '../../components/buttons/Button';
import { ObjectContext, UserContext } from '../../context';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../dashBoardUiComponent/core-ui/styles';
import client from '../../feathers';
import CustomTable from '../../components/customtable';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Portal,
  Radio,
  RadioGroup,
} from '@mui/material';
import ModalBox from '../../components/modal';
import ServiceSearch from '../helpers/ServiceSearch';
import { BottomWrapper, GridBox } from '../app/styles';
import ViewText from '../../components/viewtext';
import { useForm } from 'react-hook-form';
import Input from '../../components/inputs/basic/Input';
import Textarea from '../../components/inputs/basic/Textarea';
import CustomSelect from '../../components/inputs/basic/Select';

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
    selector: (row, i) => `₦${row.contracts[0].price} `,
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
              height: 'calc(100vh - 120px)',
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
              onRowClicked={row => handleRow(row)}
            />
          </div>
        </Box>
      </PageWrapper>
    </>
  );
};

const TariffCreate = () => {
  const [state, setState] = useState({
    bronze: false,
    gold: false,
    silver: false,
    platinium: false,
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ overflowY: 'auto', height: '800px' }}>
      <Box py={4}>
        <h2>Create Tariff</h2>
      </Box>
      <Box>
        <ServiceSearch />
        <ServiceSearch />
        <Textarea label='Comments' />
        {/* <CustomSelect label='Company Band' /> */}
        <Input label='Price' />

        <Box>
          <h2>Benefiting Plans</h2>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label='Bronze'
              name='bronze'
            />
            {state.bronze && (
              <Box>
                <Input placeholder='Co-pay payout' />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='capitation'
                    name='radio-buttons-group'
                    sx={{
                      display: 'flex !important',
                      justifyContent: 'space-between',
                      flexDirection: 'row !important',
                    }}
                  >
                    <FormControlLabel
                      value='capitation'
                      control={<Radio />}
                      label='Capitation'
                    />
                    <FormControlLabel
                      value='feeForService'
                      control={<Radio />}
                      label='Fee for Service'
                    />
                  </RadioGroup>

                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label='Requires Pre-Authorization Code'
                  />
                </Box>
              </Box>
            )}
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label='Gold'
              name='gold'
            />
            {state.gold && (
              <Box>
                <Input placeholder='Co-pay payout' />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='capitation'
                    name='radio-buttons-group'
                    sx={{
                      display: 'flex !important',
                      justifyContent: 'space-between',
                      flexDirection: 'row !important',
                    }}
                  >
                    <FormControlLabel
                      value='capitation'
                      control={<Radio />}
                      label='Capitation'
                    />
                    <FormControlLabel
                      value='feeForService'
                      control={<Radio />}
                      label='Fee for Service'
                    />
                  </RadioGroup>

                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label='Requires Pre-Authorization Code'
                  />
                </Box>
              </Box>
            )}
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label='Silver'
              name='silver'
            />
            {state.silver && (
              <Box>
                <Input placeholder='Co-pay payout' />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='capitation'
                    name='radio-buttons-group'
                    sx={{
                      display: 'flex !important',
                      justifyContent: 'space-between',
                      flexDirection: 'row !important',
                    }}
                  >
                    <FormControlLabel
                      value='capitation'
                      control={<Radio />}
                      label='Capitation'
                    />
                    <FormControlLabel
                      value='feeForService'
                      control={<Radio />}
                      label='Fee for Service'
                    />
                  </RadioGroup>

                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label='Requires Pre-Authorization Code'
                  />
                </Box>
              </Box>
            )}
            <FormControlLabel
              control={<Checkbox onChange={handleChange} />}
              label='Platinium'
              name='platinium'
            />
            {state.platinium && (
              <Box>
                <Input placeholder='Co-pay payout' />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='capitation'
                    name='radio-buttons-group'
                    sx={{
                      display: 'flex !important',
                      justifyContent: 'space-between',
                      flexDirection: 'row !important',
                    }}
                  >
                    <FormControlLabel
                      value='capitation'
                      control={<Radio />}
                      label='Capitation'
                    />
                    <FormControlLabel
                      value='feeForService'
                      control={<Radio />}
                      label='Fee for Service'
                    />
                  </RadioGroup>

                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label='Requires Pre-Authorization Code'
                  />
                </Box>
              </Box>
            )}
          </FormGroup>
        </Box>
        <BottomWrapper>
          <Button label='Create Tariff' type='submit' />
        </BottomWrapper>
      </Box>
    </Box>
  );
};

const TariffView = tariff => {
  const [editing, setEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: tariff?.tariff?.name,
      category: tariff.tariff.category,
    },
  });
  return (
    <Box>
      <Box py={4}>
        <h2>Tariff {tariff?.tariff?.name}</h2>
      </Box>
      <Box>
        <GridBox>
          {!editing ? (
            <ViewText label='Name' text={tariff?.tariff?.name} />
          ) : (
            <Input label='Name' register={register('name')} />
          )}
          {!editing ? (
            <ViewText label='Category' text={tariff.tariff.category} />
          ) : (
            <Input label='Name' register={register('category')} />
          )}
          <ViewText label='Facility Name' text={tariff?.tariff?.facilityname} />
          <ViewText
            label='Price'
            text={`₦${tariff?.tariff?.contracts[0]?.price}`}
          />
        </GridBox>
        <BottomWrapper>
          <Button label='Save Form' type='submit' />
        </BottomWrapper>
      </Box>
    </Box>
  );
};

export default TarrifList;
