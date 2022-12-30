import { useState, useEffect, useContext } from 'react';
import { Button, Grid, Box, Collapse, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { FormsHeaderText } from '../../../components/texts';
import ModalBox from '../../../components/modal';
import CustomTable from '../../../components/customtable';
import client from '../../../feathers';
import { ObjectContext, UserContext } from '../../../context';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FileUploader } from 'react-drag-drop-files';
import GlobalCustomButton from '../../../components/buttons/CustomButton';
import { getUploadColumns } from '../../CRM/components/colums/columns';
import { getBase64 } from '../../helpers/getBase64';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import ProviderUpload from './ProviderUpload';
import Textarea from '../../../components/inputs/basic/Textarea';

export const UploadView = () => {
  const { state, setState } = useContext(ObjectContext);
  const [uploads, setUploads] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const facility = state.facilityModule.selectedFacility;
  const handleAddUpload = (data) => {
    setUploads((prev) => [data, ...prev]);
  };

  const uploadColumns = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
      width: '50px',
    },
    {
      name: 'File Name',
      key: 'fileName',
      description: 'File Name',
      selector: (row) => row?.filename,
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'File Type',
      key: 'fileType',
      description: 'File Type',
      selector: (row) => row?.filename?.split('.').pop(),
      sortable: true,
      inputType: 'TEXT',
    },
    {
      name: 'Comment',
      key: 'comment',
      description: 'Comment',
      selector: (row) => row?.comment,
      sortable: true,
      inputType: 'TEXT',
    },
  ];

  const handleRow = (row) => {
    window.open(`${row.upload}`, '_blank').focus();
  };
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
          data={facility?.uploads}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          CustomEmptyData="You haven't Uploaded any file(s) yet..."
          progressPending={false}
        />
      </Box>

      <ModalBox
        open={uploadModal}
        onClose={() => setUploadModal(false)}
        header="Upload"
      >
        <OrganaizationUpload closeModal={() => setUploadModal(false)} />
      </ModalBox>
    </>
  );
};

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: '1px dashed gray',
        cursor: 'pointer',
        borderRadius: '7.5px',
      }}
    >
      <FileUploadOutlinedIcon />
      <Typography>Select Document or Drag and Drop here</Typography>
    </Box>
  );
};

export const OrganaizationUpload = ({ closeModal }) => {
  const facilityServer = client.service('organizationclient');
  const { state, setState, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const { user, setUser } = useContext(UserContext);
  const { register, reset, handleSubmit } = useForm();
  const [file, setFile] = useState('');
  const [fileNames, setFileNames] = useState('');
  const facility = state.facilityModule.selectedFacility;
  const handleChange = (file) => {
    console.log(file?.name);
    setFileNames(file?.name);
    //setFile(file);

    getBase64(file)
      .then((res) => {
        //console.log(res);
        setFile(res);
        //navigator.clipboard.writeText(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUploadDoc = async (data) => {
    const userId = state.facilityModule.selectedFacility._id;
    showActionLoader();
    const token = localStorage.getItem('feathers-jwt');
    axios
      .post(
        'https://healthstack-backend.herokuapp.com/upload',
        { uri: file },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(async (res) => {
        //return console.log(res);
        const docUrl = res.data.url;
        const newOrgDetail = {
          uploads: [
            ...facility.uploads,
            { upload: docUrl, comment: data.comment, filename: fileNames },
          ],
          facility: facility.facilityDetail,
          organization: facility.organizationDetail,
          relationshiptype: 'managedcare',
          band: facility?.band,
        };

        //return console.log(newOrgDetail);

        await facilityServer
          .patch(userId, newOrgDetail)
          .then((resp) => {
            hideActionLoader();
            setState((prev) => ({
              ...prev,
              facilityModule: {
                ...prev.facilityModule,
                selectedFacility: resp,
              },
            }));
            closeModal();
            toast.success("You've succesfully uploaded a document");
          })
          .catch((error) => {
            hideActionLoader();
            toast.error(`An error occured whilst uploading Document ${error}`);
            console.error(error);
          });
      })
      .catch((error) => {
        hideActionLoader();
        toast.error(`An error occured whilst uploading Document ${error}`);
        console.log(error);
      });
  };
  return (
    <Box sx={{ width: '400px', maxHeight: '80vw' }}>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="upload"
        types={['doc', 'docx', 'pdf', 'jpg', 'png', 'jpeg']}
        children={<UploadComponent />}
      />
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        mt={2}
      >
        <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
          {file ? `File name: ${fileNames}` : "You haven't selected any file"}
        </Typography>
      </Box>

      <Box mt={2}>
        <Textarea
          label="Comments"
          placeholder="write here...."
          register={register('comment')}
        />
      </Box>

      <Box sx={{ display: 'flex' }} gap={2} mt={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleSubmit(handleUploadDoc)}>
          Upload
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
