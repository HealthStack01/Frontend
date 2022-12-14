import { useState, useEffect } from 'react';
import { Button, Grid, Box, Collapse, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { FormsHeaderText } from '../../../components/texts';
import ModalBox from '../../../components/modal';
import CustomTable from '../../../components/customtable';

import { getUploadColumns } from '../../CRM/components/colums/columns';

import ProviderUpload from './ProviderUpload';

export const UploadView = () => {
  const [uploads, setUploads] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);

  const handleAddUpload = (data) => {
    setUploads((prev) => [data, ...prev]);
  };

  const uploadColumns = getUploadColumns();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'space-between',
        }}
        pl={2}
        pr={2}
      >
        <FormsHeaderText text="Uploaded Docs" />

        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => setUploadModal(true)}
        >
          <AddCircleOutlineOutlinedIcon sx={{ mr: '5px' }} fontSize="small" />{' '}
          New Upload
        </Button>
      </Box>

      <Box mt={1} mb={1}>
        <CustomTable
          columns={uploadColumns}
          data={uploads}
          pointerOnHover
          highlightOnHover
          striped
          //onRowClicked={handleRow}
          CustomEmptyData="You haven't Uploaded any file(s) yet..."
          progressPending={false}
        />
      </Box>

      <ModalBox
        open={uploadModal}
        onClose={() => setUploadModal(false)}
        header="Upload"
      >
        <ProviderUpload
          closeModal={() => setUploadModal(false)}
          addUpload={handleAddUpload}
        />
      </ModalBox>
    </>
  );
};
