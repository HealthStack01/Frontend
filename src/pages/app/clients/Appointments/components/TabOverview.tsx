import { useEffect, useState } from 'react';

import Button from '../../../../../components/buttons/Button';
import Input from '../../../../../components/inputs/basic/Input';
import { ButtonGroup, TableMenu } from '../../../../../ui/styled/global';
import { toDurationString, toShortDate } from '../../../DateUtils';
import { DetailsWrapper } from '../../../styles';
import DocumentViewer from './DocumentViewer';

const TabOverview = ({ documentations, onNewPrescription, onNewLabOrder }) => {
  const [filtered, setFiltered] = useState([]);

  const filterDocumentations = (text?: string) => {
    if (!text) setFiltered(documentations);
    else {
      const list = documentations.filter((documentation) => {
        const { createdAt, documentname, createdByname, location, facilityname, status } = documentation;
        const time = toDurationString(createdAt);
        const day = toShortDate(createdAt);
        const description = `${time} ${day}: ${documentname} ${createdByname}  ${location}, ${facilityname}  ${status}`;
        return description.toLowerCase().includes(text.toLowerCase());
      });
      setFiltered(list);
    }
  };
  useEffect(() => {
    filterDocumentations();
  }, []);
  return (
    <>
      <TableMenu>
        <div
          className="inner-table"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <Input
            placeholder="Search here"
            label="Search here"
            size="small"
            onChange={(e) => filterDocumentations(e.target.value)}
          />
        </div>
        <ButtonGroup>
          <Button background="#Fafafa" color="#222" showicon={true} onClick={onNewPrescription}>
            <i className="bi bi-plus-circle"></i> New Prescription
          </Button>
          <Button background="#Fafafa" color="#222" showicon={true} onClick={onNewLabOrder}>
            <i className="bi bi-plus-circle"></i> New Lab Order
          </Button>
        </ButtonGroup>
      </TableMenu>
      <div>
        {filtered.map((documentation, index) => {
          const { createdAt, documentname, createdByname, location, facilityname, status } = documentation;
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
    </>
  );
};

export default TabOverview;
