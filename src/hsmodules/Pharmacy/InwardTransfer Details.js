/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import ModalBox from "../../components/modal";
import {toast} from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AddCircle from '@mui/icons-material/AddCircle';
import client from '../../feathers';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,

} from '@mui/material';

const InwardTransferDetails = () => {
  const { id } = useParams();
  const [transfer, setTransfer] = useState(null);

  useEffect(() => {
    async function fetchTransfer() {
      try {
        const transfer = await client.service("client").get(id);
        setTransfer(transfer);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTransfer();
  }, [id]);

  if (!transfer) {
    return <div>Loading...</div>;
  }
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Inward Transfer Details
      </Typography>
      <Box>
        <Typography variant="body1">
          <strong>Transfer ID:</strong> {transfer.id}
        </Typography>
        <Typography variant="body1">
          <strong>Date/Time:</strong> {transfer.datetime}
        </Typography>
        <Typography variant="body1">
          <strong>Transfer To:</strong> {transfer.transferTo}
        </Typography>
        <Typography variant="body1">
          <strong>Items:</strong> {transfer.items}
        </Typography>
        <Typography variant="body1">
          <strong>Amount:</strong> {transfer.amount}
        </Typography>
        <Typography variant="body1">
          <strong>Requested By:</strong> {transfer.requestedBy}
        </Typography>
        <Typography variant="body1">
          <strong>Authorized By:</strong> {transfer.authorizedBy}
        </Typography>
        <Typography variant="body1">
          <strong>Approval:</strong> {transfer.approval}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {transfer.status}
        </Typography>
      </Box>
    </Box>
  );
}

export default InwardTransferDetails;
