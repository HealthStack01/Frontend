import React from 'react';
import DataTable from 'react-data-table-component';
import { DebounceInput } from 'react-debounce-input';
import { ToastContainer } from 'react-toastify';
import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { CollectionSchema } from '../../ModelSchema';
import { PageWrapper } from '../../styles'

interface Props {
  handleCreate?: () => void;
  handleSearch: (_event) => void;
  onRowClicked?: (
    _row: { id: any; description: string; client: string; amount: number; mode: string },
    _event: any
  ) => void;
  items: any[];
}

const Collections: React.FC<Props> = ({
  handleSearch,
  onRowClicked,
  items,
}) => {
  return (
    <PageWrapper>
      <h2>Collections</h2>

      <TableMenu>
      <div className="inner-table">
          <Input
            placeholder="Search here"
            label="Search here"
            onChange={handleSearch}
          />
          <DebounceInput
            className="input is-small "
            type="text"
            placeholder="Search Collections"
            minLength={1}
            debounceTimeout={400}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filter by</span>
            <i className="bi bi-chevron-down" />
          </div>
        </div>

      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title="Collections"
          columns={CollectionSchema}
          data={items}
          selectableRows
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
          style={{ overflow: 'hidden' }}
        />
      </div>
    </PageWrapper>
  );
};

export default Collections;
