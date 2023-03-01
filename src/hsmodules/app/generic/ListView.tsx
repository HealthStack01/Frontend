import React from 'react';

import Button from '../../../components/buttons/Button';
import CustomTable from '../../../components/customtable';
import FilterMenu from '../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../ui/styled/global';
import { PageWrapper } from '../styles';

interface Props {
  title: string;
  handleCreate?: () => void;
  onRowClicked?: (row: any, event: any) => void;
  schema: any[];
  items: any[];
  handleSearch?: (_text) => void;
  loading?: false;
}

const ListView: React.FC<Props> = ({
  title,
  schema,
  handleCreate,
  handleSearch,
  onRowClicked,
  items,
  loading,
}) => {
  return (
    <PageWrapper>
      <h2>{title}</h2>

      <TableMenu>
        {handleSearch && (
          <div className="inner-table">
            <FilterMenu onSearch={handleSearch} />
          </div>
        )}

        {handleCreate && <Button label="Add new" onClick={handleCreate} />}
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <CustomTable
          title={''}
          columns={schema}
          data={items}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={onRowClicked}
          progressPending={loading}
        />
      </div>
    </PageWrapper>
  );
};

export default ListView;
