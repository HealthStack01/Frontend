import React from 'react';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { LocationSchema } from '../../schema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  handleSearch: (_event) => void;
  onRowClicked?: (_row: { id: any; name: string; locationType: string }, _: any) => void;
  items: any[];
}

const Locations: React.FC<Props> = ({ handleCreate, handleSearch, onRowClicked, items }) => {
  return (
    <PageWrapper>
      <h2>Locations</h2>
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
            onChange={(e) => handleSearch(e.target.value)}
            size="small"
          />
          {/* <DebouncedInput
            className="input is-small "
            type="text"
            placeholder="Search Locations"
            minLength={1}
            debounceTimeout={400}
            onChange={(e) => handleSearch(e.target.value)}
          /> */}

          <FilterMenu />
        </div>

        <Button onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Add new
        </Button>
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title="Locations"
          columns={LocationSchema}
          data={items}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
        />
      </div>
    </PageWrapper>
  );
};

export default Locations;
