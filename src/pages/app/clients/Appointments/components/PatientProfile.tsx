import { formatDistanceToNowStrict, parseISO } from 'date-fns';

import { FlexBox, ImageBox } from '../../../../../ui/styled/global';
import { FullDetailsWrapper } from '../../../styles';
import InfoBox from './InfoBox';
import MiscBox from './MiscBox';

const PatientProfile = ({ patient }) => {
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
  } = patient;
  return (
    <FullDetailsWrapper className="attend attend-small">
      <FlexBox>
        <ImageBox src="https://via.placeholder.com/150" />

        <div>
          <h1>
            {firstname} {middlename} {lastname}
          </h1>
          {paymentinfo &&
            paymentinfo.map((obj, i) => (
              <div key={i}>
                {' '}
                <p>
                  {obj.paymentmode} {obj.paymentmode === 'Cash' ? '' : ':'}{' '}
                </p>
                <p>HMO: {obj.organizationName}</p>
              </div>
            ))}
        </div>

        <div>
          <p>
            Description: {dob ? formatDistanceToNowStrict(parseISO(dob)) : ''} {gender} {maritalstatus} {religion}{' '}
            {profession}
          </p>
          <p>Geneotype: {genotype}</p>
          <p>Blood Group: {bloodgroup}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <p>Client Tags: {clientTags}</p>
        </div>
      </FlexBox>
      <InfoBox />
      <MiscBox />
    </FullDetailsWrapper>
  );
};

export default PatientProfile;
