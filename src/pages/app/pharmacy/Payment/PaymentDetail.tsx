import sumBy from 'lodash/sumBy';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import useRepository from '../../../../components/hooks/repository';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { PlacementWrapper } from '../../../../ui/styled/global';
import { Models } from '../../Constants';
import { PaymentLineSchema, PaymentWalletSchema } from '../../schema';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';
import AmountLabel from './AmountLabel';
import PaymentLine from './PaymentLine';
import { subwalletQuery } from './query';

const flattenAndAddCategory = (row) => {
  row.bills.forEach((obj) => {
    obj.order.forEach((orderObj) => {
      orderObj.category = obj.catName;
    });
  });
  return row.bills.map((obj) => obj.order).flat();
};

const getAmt = (obj) =>
  obj.isFullPayment ? obj.partPay : obj.billing_status === 'Unpaid' ? obj.serviceInfo.amount : obj.paymentInfo.balance;

const PaymentDetails = ({ row, onBackClick }) => {
  const { find: querySubwallet, user } = useRepository(Models.SUBWALLET);
  const { submit: submitPayment } = useRepository(Models.SUBWALLETTX);
  const { submit: payForService } = useRepository(Models.INVOICE);
  const [walletBalance, setWalletBalance] = useState(0.0);
  const [totalAmountDue, setTotalAmountDue] = useState(0);
  const [totalAmountPaying, setTotalAmountPaying] = useState(0);
  const { handleSubmit, control } = useForm();
  const [paymentItems, setPaymentItems] = useState([...flattenAndAddCategory(row)]);
  const [selectedPaymentItems, setSelectedPaymentItems] = useState([]);
  const [paying, setPaying] = useState(false);
  const participantInfo = row.bills[0].order[0].participantInfo;

  const draftAllPayments = () => {
    const fullPayments = paymentItems.map((paying) => {
      const payObj = {
        amount: paying.paymentInfo.balance,
        mode: 'Full',
        date: new Date().toLocaleString(),
      };
      paying.proposedpayment = {
        balance: +paying.paymentInfo.balance - +payObj.amount,
        paidup: +paying.paymentInfo.paidup + +payObj.amount,
        amount: payObj.amount,
      };
      paying.paymentInfo.paymentDetails.push(payObj);
      return paying;
    });
    setPaymentItems(fullPayments);
    setTotalAmountPaying(sumBy(fullPayments, getAmt));
  };

  const draftPayment = (payment: any, isFullPayment: boolean, amountPaying: number) => {
    const paying = { ...payment };
    const payObj = {
      amount: isFullPayment ? paying.paymentInfo.balance : amountPaying,
      mode: isFullPayment ? 'Full' : 'Part',
      date: new Date().toLocaleString(),
    };
    paying.proposedpayment = {
      balance: +paying.paymentInfo.balance - +payObj.amount,
      paidup: +paying.paymentInfo.paidup + +payObj.amount,
      amount: payObj.amount,
    };
    paying.paymentInfo.paymentDetails.push(payObj);
    const newPaymentItems = [...selectedPaymentItems.filter((obj) => obj._id !== payment._id), paying];
    setSelectedPaymentItems(newPaymentItems);
    setTotalAmountPaying(sumBy(newPaymentItems, getAmt));
    return paying;
  };

  const submitServicePayment = () => {
    const payments = selectedPaymentItems.length ? selectedPaymentItems : paymentItems;
    const remBalance = walletBalance - totalAmountPaying;

    if (totalAmountPaying > walletBalance) {
      toast.error(
        'Total amount due greater than money received. Kindly top up account or reduce number of bills to be paid'
      );
      return;
    }

    if (payments.find((value) => value <= 0)) {
      toast.error('one or more bills do not have a payment method selected');
      return;
    }

    payments.forEach((obj) => {
      if (obj.isFullPayment) {
        const payObj = {
          amount: obj.proposedpayment.amount,
          mode: 'Full',
          date: new Date().toLocaleString(),
        };
        obj.paymentInfo.paymentDetails.push(payObj);
      } else {
        const payObj = {
          amount: obj.proposedpayment.amount,
          mode: 'Part',
          date: new Date().toLocaleString(),
        };
        obj.paymentInfo.paymentDetails.push(payObj);
      }
    });

    payments.forEach((obj) => {
      obj.paymentInfo.balance = obj.proposedpayment.balance;
      obj.paymentInfo.paidup = obj.proposedpayment.paidup;
      obj.paymentInfo.amountpaid = obj.proposedpayment.amount;

      if (obj.paymentInfo.balance === 0) {
        obj.billing_status = 'Fully Paid';
      } else {
        obj.billing_status = 'Part Payment';
      }
      obj.checked = false;
      delete obj.proposedpayment;
      delete obj.partPay;
    });

    const paymentObj = {
      clientId: participantInfo.clientId,
      clientName: row.clientname,
      client: participantInfo.client,
      facilityId: user.currentEmployee.facilityDetail._id,
      totalamount: totalAmountPaying,
      createdby: user._id,
      status: totalAmountDue === totalAmountPaying ? 'Fully Paid' : 'Part Payment',
      balance: remBalance,
      bills: payments,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
    };
    setPaying(true);
    payForService(paymentObj)
      .then(() => {
        setPaying(false);
        onBackClick();
      })
      .then(() => {
        setWalletBalance(remBalance);
      })
      .catch(console.error);
  };

  const acceptPayment = (data) => {
    let confirm = window.confirm(`Are you sure you want to accept N ${data.amount} from ${row.clientname}`);
    if (!confirm) return;
    const amountPaid = +data.amount;

    const paymentObject = {
      client: participantInfo.clientId,
      organization: user.currentEmployee.facilityDetail._id,
      amount: amountPaid,
      toName: user.currentEmployee.facilityDetail.facilityName,
      fromName: row.clientname,
      description: data.description,
      category: 'credit',
      createdby: user._id,
      paymentmode: data.paymentmode,
      facility: user.currentEmployee.facilityDetail._id,
      type: 'Deposit',
    };
    submitPayment(paymentObject);
  };

  const recalculateTotals = (payments) => {
    setTotalAmountPaying(sumBy(payments, (obj: any) => obj.paymentInfo.amountDue));
    setTotalAmountDue(sumBy(paymentItems, (obj: any) => obj.paymentInfo.amountDue));
  };

  const handlePaymentsChanged = (payments) => {
    setSelectedPaymentItems([...payments]);
    recalculateTotals(payments);
  };

  useEffect(() => {
    querySubwallet(subwalletQuery(user.currentEmployee.facility, participantInfo.clientId))
      .then((res: any) => {
        if (res.data.length > 0) {
          setWalletBalance(res.data[0].amount);
          draftAllPayments();
          recalculateTotals(paymentItems);
        }
      })
      .catch(console.error);
  }, [row]);
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Payment Details</h2>
            <span>Below are your payment’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={onBackClick} />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <HeadWrapper>
            <div>
              <h2>Make deposit for {row.clientname}</h2>
            </div>
            <div>
              <AmountLabel>Wallet Balance: {walletBalance}</AmountLabel>
            </div>
          </HeadWrapper>
          <form onSubmit={handleSubmit(acceptPayment)}>
            <GridWrapper>
              {PaymentWalletSchema.map((client, index) => (
                <DynamicInput
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
                  options={client.options}
                />
              ))}
            </GridWrapper>
            <BottomWrapper>
              <Button label="Accept Payment" type="submit" />
            </BottomWrapper>
          </form>
        </FullDetailsWrapper>

        <FullDetailsWrapper>
          <CustomTable
            title={row.title}
            columns={PaymentLineSchema}
            data={paymentItems}
            pointerOnHover
            highlightOnHover
            onRowClicked={(data) => handlePaymentsChanged([data])}
            striped
            // selectable
            // onSelectedRowsChange={({ selectedRows }) => setSelectedPaymentItems([...selectedRows])}
            // progressPending={progressPending}
          />
        </FullDetailsWrapper>
        <FullDetailsWrapper>
          <PlacementWrapper>
            <HeadWrapper>
              <div>
                <h2>
                  Pay {selectedPaymentItems.length ? 'some' : 'all'} bills for {row.clientname}
                </h2>
              </div>
              <div>
                <AmountLabel>Total Amount Due {totalAmountDue}</AmountLabel>
              </div>
              <div>
                <AmountLabel>Total Amount Paying {totalAmountPaying}</AmountLabel>
              </div>
            </HeadWrapper>
            {selectedPaymentItems.map((payment, i) => (
              <PaymentLine key={i} payment={payment} draftPayment={draftPayment} />
            ))}
            {totalAmountPaying && (
              <BottomWrapper>
                <Button
                  label={selectedPaymentItems.length === 0 ? 'Pay for all' : 'Pay for some'}
                  type="submit"
                  onClick={() => {
                    submitServicePayment();
                  }}
                  disabled={paying}
                />
              </BottomWrapper>
            )}
          </PlacementWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentDetails;
