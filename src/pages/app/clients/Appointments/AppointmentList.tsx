// import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
// import CalenderGrid from '../../../../components/calender';
import CustomTable from '../../../../components/customtable';
// import SwitchButton from '../../../../components/switch';
import FilterMenu from '../../../../components/utilities/FilterMenu';
import { TableMenu } from '../../../../ui/styled/global';
import { PageWrapper } from '../../styles';

const Appointments = ({
  schema,
  handleCreate,
  onRowClicked,
  onSearch,
  items,
}) => {
  // const [listView, setListView] = useState(true);

  return (
    <>
      <PageWrapper>
        <h2>Appointments </h2>
        <TableMenu>
          <div className="inner-table">
            <FilterMenu schema={schema.flat()} onSearch={onSearch} />
            {/* <SwitchButton onClick={() => setListView(!listView)} /> */}
          </div>

          <Button onClick={handleCreate}>
            <i className="bi bi-plus-circle"></i> Add new
          </Button>
        </TableMenu>

        <div
          style={{
            width: '100%',
            height: 'calc(100vh - 200px)',
            overflow: 'auto',
          }}
        >
          {/* {listView ? ( */}
          <CustomTable
            columns={schema.flat()}
            data={items}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={onRowClicked}
          />
          {/* ) : (
            <CalenderGrid  />
          )} */}
        </div>
      </PageWrapper>
    </>
  );
};

export default Appointments;
