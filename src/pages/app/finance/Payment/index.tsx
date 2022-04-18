import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../context/feathers';
import { FormType } from '../../schema/util';
import PaymentDetails from './PaymentDetail';
import Payments from './PaymentList';
const AppPayments = () => {
  let BillServ = client.service('bills');
  let SubwalletServ = client.service('subwallet');
  const SubwalletTxServ = client.service('subwallettransactions');
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [medication, setMedication] = useState(null);

  const [facility, setFacility] = useState([]);
  const [balance, setBalance] = useState(0);

  const handleAccept = (data) => {
    getFacilities();

    if (medication) {
      if (data.paymentmode === '' || data.amount === 0) {
        toast('Kindly choose payment mode or enter amount');
        return;
      }
      let obj = {
        client: medication.participantInfo.client._id,
        organization: user.employeeData[0].facilityDetail._id,
        category: 'credit',
        amount: data.amount,
        paymentmode: data.paymentmode,
        description: data.description,
        toName: user.employeeData[0].facilityDetail.facilityName,
        fromName:
          medication.participantInfo.client.firstname +
          ' ' +
          medication.participantInfo.client.lastname,
        createdby: user._id,

        facility: user.employeeData[0].facilityDetail._id,
        type: 'Deposit',
      };

      if (confirm) {
        SubwalletTxServ.create(obj)
          .then((_resp) => {
            toast('Deposit accepted succesfully');
          })
          .catch((err) => {
            toast('Error accepting deposit ' + err);
            console.error(err);
          });
      }
    }
  };

  const handleSearch = (val) => {
    BillServ.find({
      query: {
        'participantInfo.paymentmode.detail.principalName': {
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
        'participantInfo.billingFacility':
          user.currentEmployee.facilityDetail._id,
        billing_status: {
          $ne: 'Fully Paid',
        },
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        let findProductEntry = res.groupedOrder;
        setFacility(findProductEntry);
        toast(' ProductEntry  fetched successfully');
      })
      .catch((err) => {
        toast('Error fetching ProductEntry, probable network issues ' + err);
      });
  };

  const getFacilities = () => {
    SubwalletServ.find({
      query: {
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    }).then((res) => {
      let findProductEntry = res;
      if (findProductEntry.data.length > 0) {
        setBalance(findProductEntry.data[0].amount);
      } else {
        setBalance(0);
      }
    });
  };

  const getPayments = () => {
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
        billing_status: {
          $ne: 'Fully Paid',
        },
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        let findProductEntry = res.groupedOrder;
        setFacility(findProductEntry);
        toast(' ProductEntry  fetched successfully');
      })
      .catch((err) => {
        toast('Error fetching ProductEntry, probable network issues ' + err);
      });
  };

  useEffect(() => {
    getFacilities();
    if (resource.paymentsResource) {
      setMedication(resource.paymentsResource);
    }
    if (!BillServ) {
      BillServ = client.service('bills');
      BillServ.on('created', (_) => getPayments());
      BillServ.on('updated', (_) => getPayments());
      BillServ.on('patched', (_) => getPayments());
      BillServ.on('removed', (_) => getPayments());
    }
    user && getPayments();
    return () => {
      BillServ = null;
    };
  }, [user, resource.paymentsResource]);

  return (
    <>
      {resource.paymentsResource.show === 'lists' && (
        <Payments
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                show: 'details',
                selectedPayment: row,
              },
            }));
          }}
          dataTree={facility}
          handleSearch={handleSearch}
        />
      )}

      {resource.paymentsResource.show === FormType.DETAIL && (
        <PaymentDetails
          row={resource.paymentsResource.selectedPayment}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: 'edit',
              },
            }))
          }
          handleAccept={handleAccept}
          amountBalance={balance}
        />
      )}
    </>
  );
};

export default AppPayments;
