import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { useContext } from 'react';

import { ObjectContext } from '../../../../../context/context';
import { FlexBox, ImageBox } from '../../../../../styles/global';
import { FullDetailsWrapper } from '../../../styles';

const PatientProfile = () => {
  const {
    resource: {
      clientResource: { selectedClient },
    },
  } = useContext(ObjectContext);

  console.log({ selectedClient });

  const {
    firstname,
    middlename,
    lastname,
    dob,
    gender,
    maritalstatus,
    religion,
    phone,
    email,
    profession,
    bloodgroup,
    genotype,
    clientTags,
    paymentinfo,
  } = selectedClient as any;
  return (
    <FullDetailsWrapper>
      <FlexBox>
        <ImageBox src="https://via.placeholder.com/150" />

        <div>
          <h1>
            {firstname} {middlename} {lastname}
          </h1>
          {paymentinfo.map((obj) => (
            <>
              {' '}
              <p>
                {obj.paymentmode} {obj.paymentmode === 'Cash' ? '' : ':'}{' '}
              </p>
              <p>HMO: {obj.organizationName}</p>
            </>
          ))}
        </div>

        <div>
          <p>
            Description: {dob ? formatDistanceToNowStrict(parseISO(dob)) : ''} {gender} {maritalstatus} {religion} {profession}
          </p>
          <p>Geneotype: {genotype}</p>
          <p>Blood Group: {bloodgroup}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <p>Client Tags: {clientTags}</p>
        </div>
      </FlexBox>
    </FullDetailsWrapper>
  );
};

export default PatientProfile;
