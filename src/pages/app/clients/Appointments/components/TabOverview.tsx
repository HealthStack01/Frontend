import Button from '../../../../../components/buttons/Button';
import Input from '../../../../../components/inputs/basic/Input';
import { ButtonGroup, TableMenu } from '../../../../../ui/styled/global';
import { toDurationString, toShortDate } from '../../../DateUtils';
import { DetailsWrapper } from '../../../styles';
import DocumentViewer from './DocumentViewer';

const TabOverview = ({ documentations, onNewPrescription, onNewLabOrder }) => {
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
          <Input placeholder="Search here" label="Search here" size="small" />
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
        {documentations.map((documentation, index) => {
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
