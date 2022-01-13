import React, { useState } from 'react';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import Select from '../../../inputs/basic/Select';
import Textarea from '../../../inputs/basic/Textarea';
import { useParams } from 'react-router-dom';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { ClientDataRow } from '../data';

interface SingleProps {
  row: ClientDataRow;
  onClick?: () => void;
}

const SingleClient: React.FC<SingleProps> = ({ row, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValue] = useState<ClientDataRow>({
    id: row.id,
    fname: row.fname,
    mname: row.mname,
    lname: row.lname,
    age: row.age,
    gender: row.gender,
    phone: row.phone,
    email: row.email,
    maritalStatus: row.maritalStatus,
    religion: row.religion,
    medicalRecord: row.medicalRecord,
    profession: row.profession,
    country: row.country,
    state: row.state,
    LGA: row.LGA,
    townCity: row.townCity,
    neighborhood: row.neighborhood,
    streetAddress: row.streetAddress,
    tags: row.tags,
    otherBioData: row.otherBioData,
    nextOfKin: row.nextOfKin,
    nonHospitalIndetifiers: row.nonHospitalIndetifiers,
    paymentInformation: row.paymentInformation,
    assignToCareTeam: row.assignToCareTeam,
    nextOfKinFullName: row.nextOfKinFullName,
    nextOfKinPhone: row.nextOfKinPhone,
    nextOfKinEmail: row.nextOfKinEmail,
    nextOfKinRelationship: row.nextOfKinRelationship,
    nationalID: row.nationalID,
    internationPassportNumber: row.internationPassportNumber,
    votersCardNumber: row.votersCardNumber,
    driversLicenseNumber: row.driversLicenseNumber,
    bloodGroup: row.bloodGroup,
    genotype: row.genotype,
    disabilities: row.disabilities,
    allergies: row.allergies,
    coMobidities: row.coMobidities,
    specificDetails: row.specificDetails,
  });

  console.log(values);

  const { id } = useParams();

  return (
    <>
      <PageWrapper>
        <GrayWrapper>
          <HeadWrapper>
            <div>
              <h2>Client Details</h2>
              <span>Below are your client’s details</span>
            </div>
            <Button
              label={isEditing ? 'Cancel Editing' : 'Edit Details'}
              background={isEditing ? '#f2f2f2' : '#ECF3FF'}
              color={isEditing ? '#333' : '#0364FF'}
              showicon={true}
              icon='bi bi-pen-fill'
              onClick={() => setIsEditing(!isEditing)}
              // disabled={isEditing ? true : false}
            />
          </HeadWrapper>
          <DetailsWrapper title='Client Details'>
            <span onClick={onClick}>Clients</span> / {row.id}
            {isEditing ? (
              <GridWrapper>
                <Input label='ID' value={values.id} disabled />
                <Input
                  label='First name'
                  value={values.fname}
                  onChange={e => setValue({ ...values, fname: e.target.value })}
                />
                <Input
                  label='Middle name'
                  value={values.mname}
                  onChange={e => setValue({ ...values, mname: e.target.value })}
                />
                <Input
                  label='Last name'
                  value={values.lname}
                  onChange={e => setValue({ ...values, lname: e.target.value })}
                />
                <Input
                  label='Age'
                  value={values.age}
                  type='number'
                  onChange={e => setValue({ ...values, age: e.target.value })}
                />
                <Input
                  label='Gender'
                  value={values.gender}
                  onChange={e =>
                    setValue({ ...values, gender: e.target.value })
                  }
                />
                <Input
                  label='Phone Number'
                  type='tel'
                  value={values.phone}
                  onChange={e => setValue({ ...values, phone: e.target.value })}
                />
                <Input
                  label='Email address'
                  type='email'
                  value={values.email}
                  onChange={e => setValue({ ...values, email: e.target.value })}
                />
                <Input
                  label='Marital Status'
                  type='text'
                  value={values.maritalStatus}
                  onChange={e =>
                    setValue({ ...values, maritalStatus: e.target.value })
                  }
                />
                <Input
                  label='Religion'
                  type='text'
                  value={values.religion}
                  onChange={e =>
                    setValue({ ...values, religion: e.target.value })
                  }
                />
                <Input
                  label='Medical Records'
                  type='text'
                  value={values.medicalRecord}
                  onChange={e =>
                    setValue({ ...values, medicalRecord: e.target.value })
                  }
                />
                <Input
                  label='Profession'
                  type='text'
                  value={values.profession}
                  onChange={e =>
                    setValue({ ...values, profession: e.target.value })
                  }
                />
                <Input
                  label='Country'
                  type='text'
                  value={values.country}
                  onChange={e =>
                    setValue({ ...values, country: e.target.value })
                  }
                />
                <Input
                  label='State'
                  type='text'
                  value={values.state}
                  onChange={e => setValue({ ...values, state: e.target.value })}
                />
                <Input
                  label='Local Government Area'
                  type='text'
                  value={values.LGA}
                  onChange={e => setValue({ ...values, LGA: e.target.value })}
                />
                <Input
                  label='Town/City'
                  type='text'
                  value={values.townCity}
                  onChange={e =>
                    setValue({ ...values, townCity: e.target.value })
                  }
                />
                <Input
                  label='Neighbourhood'
                  type='text'
                  value={values.neighborhood}
                  onChange={e =>
                    setValue({ ...values, neighborhood: e.target.value })
                  }
                />
                <Input
                  label='Street Address'
                  type='text'
                  value={values.streetAddress}
                  onChange={e =>
                    setValue({ ...values, streetAddress: e.target.value })
                  }
                />
                <Input
                  label='Tags'
                  type='text'
                  value={values.tags}
                  onChange={e => setValue({ ...values, tags: e.target.value })}
                />
                <Input
                  label='Other Bio-data'
                  type='text'
                  value={values.otherBioData}
                  onChange={e =>
                    setValue({ ...values, otherBioData: e.target.value })
                  }
                />
                <Input
                  label='Next of Kin'
                  type='text'
                  value={values.nextOfKin}
                  onChange={e =>
                    setValue({ ...values, nextOfKin: e.target.value })
                  }
                />
                <Input
                  label='Non Hospital Idenfiers'
                  type='text'
                  value={values.nonHospitalIndetifiers}
                  onChange={e =>
                    setValue({
                      ...values,
                      nonHospitalIndetifiers: e.target.value,
                    })
                  }
                />
                <Input
                  label='Payment Information'
                  type='text'
                  value={values.paymentInformation}
                  onChange={e =>
                    setValue({ ...values, paymentInformation: e.target.value })
                  }
                />
                <Select
                  options={['True', 'False']}
                  label='Assign to Care Team'
                  value={values.assignToCareTeam ? 'true' : 'false'}
                />
                <Input
                  label='Next of Kin Full Name'
                  type='text'
                  value={values.nextOfKinFullName}
                  onChange={e =>
                    setValue({ ...values, nextOfKinFullName: e.target.value })
                  }
                />
                <Input
                  label='Next of Kin Phone Number'
                  type='text'
                  value={values.nextOfKinPhone}
                  onChange={e =>
                    setValue({ ...values, nextOfKinPhone: e.target.value })
                  }
                />
                <Input
                  label='Next of Kin Email Address'
                  type='text'
                  value={values.nextOfKinEmail}
                  onChange={e =>
                    setValue({ ...values, nextOfKinEmail: e.target.value })
                  }
                />
                <Input
                  label='Next of Kin Relationship'
                  type='text'
                  value={values.nextOfKinRelationship}
                  onChange={e =>
                    setValue({
                      ...values,
                      nextOfKinRelationship: e.target.value,
                    })
                  }
                />
                <Input
                  label='National ID'
                  type='text'
                  value={values.nationalID}
                  onChange={e =>
                    setValue({ ...values, nationalID: e.target.value })
                  }
                />
                <Input
                  label='Interbational Passport Number'
                  type='text'
                  value={values.internationPassportNumber}
                  onChange={e =>
                    setValue({
                      ...values,
                      internationPassportNumber: e.target.value,
                    })
                  }
                />
                <Input
                  label='Voters Card Number'
                  type='text'
                  value={values.votersCardNumber}
                  onChange={e =>
                    setValue({ ...values, votersCardNumber: e.target.value })
                  }
                />
                <Input
                  label='Driver License Number'
                  type='text'
                  value={values.driversLicenseNumber}
                  onChange={e =>
                    setValue({
                      ...values,
                      driversLicenseNumber: e.target.value,
                    })
                  }
                />
                <Input
                  label='Blood Group'
                  type='text'
                  value={values.bloodGroup}
                  onChange={e =>
                    setValue({ ...values, bloodGroup: e.target.value })
                  }
                />
                <Input
                  label='Genotype'
                  type='text'
                  value={values.genotype}
                  onChange={e =>
                    setValue({ ...values, genotype: e.target.value })
                  }
                />
                <Input
                  label='Disabilites'
                  type='text'
                  value={values.disabilities}
                  onChange={e =>
                    setValue({ ...values, disabilities: e.target.value })
                  }
                />
                <Input
                  label='Allergies'
                  type='text'
                  value={values.allergies}
                  onChange={e =>
                    setValue({ ...values, allergies: e.target.value })
                  }
                />
                <Input
                  label='Co Mobidities'
                  type='text'
                  value={values.coMobidities}
                  onChange={e =>
                    setValue({ ...values, coMobidities: e.target.value })
                  }
                />
                <Textarea
                  label='Specific Patient Details'
                  value={values.specificDetails}
                  onChange={e =>
                    setValue({ ...values, specificDetails: e.target.value })
                  }
                />
              </GridWrapper>
            ) : (
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
                  <label>Middle Name</label>
                  <p>{row.mname}</p>
                </div>
                <div>
                  <label>Last Name</label>
                  <p>{row.lname}</p>
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
                  <label>Phone Number</label>
                  <p>{row.phone}</p>
                </div>
                <div>
                  <label>Email address</label>
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
                  <label>Medical Records</label>
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
                  <label>Other Bio-data</label>
                  <p>{row.otherBioData}</p>
                </div>
                <div>
                  <label>Next of Kin</label>
                  <p>{row.nextOfKin}</p>
                </div>
                <div>
                  <label>Non Hospital Idenfiers</label>
                  <p>{row.nonHospitalIndetifiers}</p>
                </div>
                <div>
                  <label>Paymnet Information</label>
                  <p>{row.profession}</p>
                </div>
                <div>
                  <label>Assing To Care Team</label>
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
                  <label>Driver's License Number</label>
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
                  <label>Co Mobidities</label>
                  <p>{row.coMobidities}</p>
                </div>
                <div>
                  <label>Specific Details</label>
                  <p>{row.coMobidities}</p>
                </div>
              </GridWrapper>
            )}
          </DetailsWrapper>

          <BottomWrapper>
            <Button
              label='Delete Client'
              background='#FFE9E9'
              color='#ED0423'
            />
            <Button label='Attend to Client' />
          </BottomWrapper>
        </GrayWrapper>
      </PageWrapper>
    </>
  );
};

export default SingleClient;
