import React from 'react';

import Button from '../../../buttons/Button';
import {
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const ClientDetails: React.FC<Props> = ({ editBtnClicked, row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Client Details</h2>
            <span>Below are your Client’s details</span>
          </div>
          <div>
            <Button
              label='Back to List'
              background='#fdfdfd'
              color='#333'
              onClick={backClick}
            />
            <Button
              label={'Delete'}
              background='#FFE9E9'
              color='#ED0423'
              showicon={true}
              icon='bi bi-pen-fill'
              onClick={editBtnClicked}
            />
            <Button
              label={'Edit Details'}
              background={'#ECF3FF'}
              color='#0364FF'
              showicon={true}
              icon='bi bi-pen-fill'
              onClick={editBtnClicked}
            />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper>
            <div>
              <label>ID</label>
              <p>{row.id}</p>
            </div>

            <div>
              <label>First Name</label>
              <p>{row.fname}</p>
            </div>

            <div>
              <label>Last Name</label>
              <p>{row.lname}</p>
            </div>
            <div>
              <label>Middle Name</label>
              <p>{row.mname}</p>
            </div>
            <div>
              <label>Age</label>
              <p>{row.age}</p>
            </div>
            <div>
              <label>Gender</label>
              <p>{row.gender}</p>
            </div>
            <div>
              <label>Phone</label>
              <p>{row.phone}</p>
            </div>
            <div>
              <label>Email</label>
              <p>{row.email}</p>
            </div>
            <div>
              <label>Marital Status</label>
              <p>{row.maritalStatus}</p>
            </div>
            <div>
              <label>Religion</label>
              <p>{row.religion}</p>
            </div>
            <div>
              <label>Medical Record</label>
              <p>{row.medicalRecord}</p>
            </div>
            <div>
              <label>Profession</label>
              <p>{row.profession}</p>
            </div>
            <div>
              <label>Country</label>
              <p>{row.country}</p>
            </div>
            <div>
              <label>State</label>
              <p>{row.state}</p>
            </div>
            <div>
              <label>Local Government Area</label>
              <p>{row.LGA}</p>
            </div>
            <div>
              <label>Town/City</label>
              <p>{row.townCity}</p>
            </div>
            <div>
              <label>Neighbourhood</label>
              <p>{row.neighborhood}</p>
            </div>
            <div>
              <label>Street Address</label>
              <p>{row.streetAddress}</p>
            </div>
            <div>
              <label>Tags</label>
              <p>{row.tags}</p>
            </div>
            <div>
              <label>Other Bio-Data</label>
              <p>{row.otherBioData}</p>
            </div>
            <div>
              <label>Next of Kin</label>
              <p>{row.nextOfKin}</p>
            </div>
            <div>
              <label>Non Hospital Identifiers</label>
              <p>{row.nonHospitalIndetifiers}</p>
            </div>
            <div>
              <label>Payment Information</label>
              <p>{row.paymentInformation}</p>
            </div>
            <div>
              <label>Assign to Care Team</label>
              <p>{row.assignToCareTeam}</p>
            </div>
            <div>
              <label>Next of Kin Full Name</label>
              <p>{row.nextOfKinFullName}</p>
            </div>
            <div>
              <label>Next of Kin Phone Number</label>
              <p>{row.nextOfKinPhone}</p>
            </div>
            <div>
              <label>Next of Kin Email</label>
              <p>{row.nextOfKinEmail}</p>
            </div>
            <div>
              <label>Next of Kin Relationship</label>
              <p>{row.nextOfKinRelationship}</p>
            </div>
            <div>
              <label>National ID</label>
              <p>{row.nationalID}</p>
            </div>
            <div>
              <label>International Passport Number</label>
              <p>{row.internationPassportNumber}</p>
            </div>
            <div>
              <label>Voter's Card Number</label>
              <p>{row.votersCardNumber}</p>
            </div>
            <div>
              <label>Drivers License Number</label>
              <p>{row.driversLicenseNumber}</p>
            </div>
            <div>
              <label>Blood Group</label>
              <p>{row.bloodGroup}</p>
            </div>
            <div>
              <label>Genotype</label>
              <p>{row.genotype}</p>
            </div>
            <div>
              <label>Disabilities</label>
              <p>{row.disabilities}</p>
            </div>
            <div>
              <label>Allergies</label>
              <p>{row.allergies}</p>
            </div>
            <div>
              <label>Co-Morbidities</label>
              <p>{row.coMobidities}</p>
            </div>
            <div>
              <label>Sepcific Details</label>
              <p>{row.specificDetails}</p>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ClientDetails;
