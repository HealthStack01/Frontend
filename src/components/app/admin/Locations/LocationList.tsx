import React from 'react';
import DataTable from 'react-data-table-component';
import { DebounceInput } from 'react-debounce-input';
import { ToastContainer } from 'react-toastify';

import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import CustomTable from '../../../customtable';
import Input from '../../../inputs/basic/Input';
import SwitchButton from '../../../switch';
import { LocationSchema } from '../../schema';
import { PageWrapper } from '../../styles';

interface Props {
  handleCreate?: () => void;
  handleSearch: (_event) => void;
  onRowClicked?: (
    _row: { id: any; name: string; locationType: string },
    _: any
  ) => void;
  items: any[];
}

const Locations: React.FC<Props> = ({
  handleCreate,
  handleSearch,
  onRowClicked,
  items,
}) => {
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
          <Input placeholder="Search here" label="Search here" size="small" />
          {/* <DebounceInput
            className="input is-small "
            type="text"
            placeholder="Search Locations"
            minLength={1}
            debounceTimeout={400}
            onChange={(e) => handleSearch(e.target.value)}
          /> */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'nowrap',
            }}
          >
            <span>Filer by</span>
            <i className="bi bi-chevron-down"></i>
          </div>
          <SwitchButton />
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
      <ToastContainer />
    </PageWrapper>
  );
};

export default Locations;
