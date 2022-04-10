import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import RadioButton from '../../../../components/inputs/basic/Radio';
import { InputType, PaymentLineSchema } from '../../schema';
import { GridWrapper } from '../../styles';
import AmountLabel from './AmountLabel';

const FULL = 'Full';
const PART = 'Part';

const PaymentLine = ({ payment, draftPayment }) => {
  const [isFullPayment, setIsFullPayment] = useState(true);
  const [amountDue, setAmountDue] = useState(payment.paymentInfo.balance);
  const [amountPaying, setAmountPaying] = useState(payment.paymentInfo.balance);
  const [balanceDue, setBalanceDue] = useState(0);

  const checkAndSetAmountEntered = (e) => {
    setAmountPaying(+e.target.value);
  };

  const handleUpdate = () => {
    if (!amountPaying) {
      toast.info('Please enter an amount as part payment');
      return;
    }

    draftPayment(payment, isFullPayment, amountPaying);
    setBalanceDue(amountDue - amountPaying);
    toast.success('Part payment updated successfully');
  };

  useEffect(() => {
    draftPayment(payment, true, payment.paymentInfo.balance);
    setAmountDue(payment.paymentInfo.balance);
    setAmountPaying(payment.paymentInfo.balance);
    setBalanceDue(0);
  }, []);

  return (
    <GridWrapper>
      {PaymentLineSchema.filter((obj) => obj.inputType !== InputType.HIDDEN).map((schema, i) => (
        <div key={i}>
          <label>{schema.name}</label>
          <p>{schema.selector(payment)}</p>
        </div>
      ))}
      <div>
        <RadioButton
          title="Type"
          options={[FULL, PART]}
          onChange={(e) => {
            setIsFullPayment(e.target.value === FULL);
            if (e.target.value === FULL) {
              setAmountPaying(payment.paymentInfo.balance);
            }
          }}
          defaultValue={isFullPayment ? FULL : PART}
        />
        {!isFullPayment && (
          <>
            <div>
              <Input type="number" defaultValue={amountPaying} onChange={checkAndSetAmountEntered} />
            </div>
            <div>
              <AmountLabel>paid up {amountPaying}</AmountLabel>
            </div>
            <div>
              <AmountLabel>Balance Due {balanceDue}</AmountLabel>
            </div>
          </>
        )}
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </GridWrapper>
  );
};

export default PaymentLine;
