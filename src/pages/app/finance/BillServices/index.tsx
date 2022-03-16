import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../context/feathers';
import { getFormStrings } from '../../Utils';
import BillCreate from './BillCreate';
import BillDetails from './BillDetail';
import Bills from './BillList';
import BillModify from './BillModify';

const AppBills = () => {
  let BillCreateServ = client.service('createbilldirect');
  let BillServ = client.service('bills');
  const { user } = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);
  const { resource, setResource } = useObjectState();
  const [, setPatient] = useState('');
  const [, setSource] = useState('');
  const [documentNo] = useState('');

  const getSearchFacility1 = (person) => {
    if (!person) {
      setPatient('');
      setSource('');
      return;
    }
    setPatient(person);
    setSource(person.firstname + ' ' + person.lastname);
  };
  const getFacilities = () => {
    BillServ.find({
      query: {
        $or: [
          {
            'participantInfo.paymentmode.type': 'Cash',
          },
          {
            'participantInfo.paymentmode.type': 'Family Cover',
          },
        ],

        'participantInfo.billingFacility': user.employeeData[0].facility,
        billing_status: 'Unpaid',
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    }).then((res) => {
      let findProductEntry = res;

      setFacilities(findProductEntry.groupedOrder);
    });
  };

  const handleSearch = (val) => {
    const field = 'name';
    BillServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: 'i',
        },

        $or: [
          {
            'participantInfo.paymentmode.type': 'Cash',
          },
          {
            'participantInfo.paymentmode.type': 'Family Cover',
          },
        ],

        'participantInfo.billingFacility': user.currentEmployee.facilityDetail._id,
        billing_status: 'Unpaid',
        $limit: 30,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setFacilities(res.groupedOrder);
        toast(' ProductEntry  fetched successfully');
      })
      .catch((err) => {
        toast('Error fetching ProductEntry, probable network issues ' + err);
      });
  };

  const onSubmit = (data) => {
    const values = getFormStrings(data._id);
    if (user.employeeData) {
      data.facility = user.employeeData[0].facility;
    }
    (data._id ? BillCreateServ.update(data._id, data) : BillCreateServ.create(data))
      .then(() => {
        toast(`Location ${values.message}`);
      })
      .catch((err) => {
        toast.error(`Error occurred : ${err}`);
        console.error(err);
      });
  };

  useEffect(() => {
    getSearchFacility1(resource.billServicesResource.selectedBillService);

    return () => {};
  }, [resource.billServicesResource.selectedBillService]);

  useEffect(() => {
    let isMounted = true;
    if (!BillServ) {
      BillServ = client.service('bills');
      BillServ.on('created', () => getFacilities());
      BillServ.on('updated', () => getFacilities());
      BillServ.on('patched', () => getFacilities());
      BillServ.on('removed', () => getFacilities());
    }
    if (isMounted) {
      user && getFacilities();
    }
    return () => {
      BillServ = null;
      isMounted = false;
    };
  }, [user]);

  return (
    <>
      {resource.billServicesResource.show === 'lists' && (
        <Bills
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                show: 'details',
                selectedBillService: row,
              },
            }));
          }}
          dataTree={facilities}
          handleSearch={handleSearch}
        />
      )}

      {resource.billServicesResource.show === 'create' && (
        <BillCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'lists',
              },
            }))
          }
          onSubmit={onSubmit}
          invoice={documentNo}
        />
      )}
      {resource.billServicesResource.show === 'details' && (
        <BillDetails
          row={resource.billServicesResource.selectedBillService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.billServicesResource.show === 'edit' && (
        <BillModify
          row={resource.billServicesResource.selectedBillService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppBills;
