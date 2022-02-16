/* eslint-disable prettier/prettier */
import { Menu, MenuItem } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ObjectContext } from '../../../../context/context';
import Button from '../../../buttons/Button';
import useRepository from '../../../hooks';
import { Models } from '../../Constants';
import { toDurationString, toShortDate } from '../../DateUtils';
import {
  DetailsWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  PageWrapper,
} from '../../styles';
import DocumentViewer from './components/DocumentViewer';
import LaboratoryOrder from './components/LaboratoryOrder';
import PatientProfile from './components/PatientProfile';
import PrescriptionOrder from './components/PrescriptionOrder';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const tabs = [
  'Last Visit',
  'Drug Tolerance',
  'Medications',
  'History',
  'Problem List',
  'Task',
];
const documents = [
  'Clinical Note',
  'Lab Result',
  'Doctor Note',
  'Nursing Note',
  'Vital Signs',
  'Progress Note',
];

const Attend: React.FC<Props> = () => {
  const [state, setState] = useState('all');
  const { find: findClinicalDocument } = useRepository(
    Models.CLINICAL_DOCUMENT
  );
  const {
    resource: {
      clientResource: { selectedClient },
    },
  } = useContext(ObjectContext);
  const [clinicalDocuments, setClinicalDocuments] = useState([]);

  const loadDocuments = (documentName?: string) => {
    findClinicalDocument({
      query: {
        documentname:
          typeof documentName === 'string'
            ? {
              ['$regex']: documentName,
              ['$options']: 'i',
            }
            : undefined,
        client: selectedClient['_id'],
        $limit: 50,
        $sort: {
          name: 1,
        },
      },
    })
      .then((res: any) => {
        setClinicalDocuments(res.data);
        toast(' Clinical documents fetched successfully');
      })
      .catch((err) => {
        toast(
          'Error Cliical fetching documents, probable network issues ' + err
        );
      });
  };

  const [, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openBtn = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    loadDocuments();
  }, []);


  return (
    <PageWrapper>
      <GrayWrapper>
        <PatientProfile />
        <GrayWrapper
          className="grid"
          style={{
            paddingBottom: '6rem',
          }}
        >
          <FullDetailsWrapper>
            <div>
              <h2>Specific Information:</h2>
            </div>
            <div>
              <h2>Allergies:</h2>
            </div>
            <div>
              <h2>Moridities:</h2>
            </div>
            <div>
              <h2>Disabilities:</h2>
            </div>
            <>
              {tabs.map((tab, i) => (
                <DetailsWrapper key={i} title={tab}>
                  {tab}
                </DetailsWrapper>
              ))}
            </>
          </FullDetailsWrapper>

          <FullDetailsWrapper>
            <GridWrapper className="four-columns">
              <Button
                label={'History'}
                color="#fefffb"
                background="#04ed6d"
                showicon={true}
                onClick={() => setState('all')}
              />
              <Button
                label="Lab Orders"
                background="#fdfdfd"
                color="#333"
                onClick={() => setState('lab')}
              />
              <Button
                label={'Prescription'}
                background={'#ECF3FF'}
                color="#0364FF"
                showicon={true}
                onClick={() => setState('prescription')}
              />
              <div>
                <Button
                  label={'New Document'}
                  background="#FFE9E9"
                  color="#ED0423"
                  showicon={true}
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  aria-haspopup="true"
                  aria-expanded={openBtn ? 'true' : undefined}
                  open={openBtn}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{ boxShadow: '10px 10px 0 rgba(0,0,0,0.08)' }}
                >
                  {documents.map((doc, i) => (
                    <MenuItem onClick={() => setOpen(true)} key={i}>
                      {doc}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </GridWrapper>
            {state === 'all' && (
              <div>
                {clinicalDocuments.map((documentation, index) => {
                  const {
                    createdAt,
                    documentname,
                    createdByname,
                    location,
                    facilityname,
                    status,
                  } = documentation;
                  const time = toDurationString(createdAt);
                  const day = toShortDate(createdAt);
                  const description = `${time} on ${day}: ${documentname} by ${createdByname}  ${location}, ${facilityname}  ${status}`;
                  return (
                    <DetailsWrapper title={description} key={index}>
                      <DocumentViewer document={documentation} />
                    </DetailsWrapper>
                  );
                })}
              </div>
            )}

            {state === 'lab' && <LaboratoryOrder />}
            {state === 'prescription' && <PrescriptionOrder />}
          </FullDetailsWrapper>
        </GrayWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default Attend;
