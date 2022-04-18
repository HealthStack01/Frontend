import React from 'react';

import Button from '../../../../components/buttons/Button';
import CollapsableGrid from '../../../../components/datagrids/CollapsableGrid';
import Input from '../../../../components/inputs/basic/Input';
import SwitchButton from '../../../../components/switch';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../styles';
import { ServicesSchema } from '../schema';

interface Props {
  handleCreate?: () => void;
  onRowClicked?: (
    row: { id: any; name: string; panel: string; amount: string },
    event: any,
  ) => void;
  handleSearch: (_event) => void;
  dataTree: any[];
}

const Servicess: React.FC<Props> = ({
  handleCreate,
  onRowClicked,
  handleSearch,
  dataTree,
}) => {
  return (
    <PageWrapper>
      <h2>Services </h2>

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
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FilterMenu />
          <SwitchButton />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        {dataTree.map((data, index) => {
          return (
            <CollapsableGrid
              key={index}
              columnHead={ServicesSchema}
              description={data.title}
              title={data.categoryname}
              rowData={data.services}
              onRowClicked={onRowClicked}
            />
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default Servicess;
