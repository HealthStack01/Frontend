/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
// import { useParams } from "react-router-dom";
// import { Link } from 'react-router-dom';
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


export default function ClientHome({children}) {
	const clientServe = client.service('client');
	const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [transferTo, setTransferTo] = useState('');


const inputStyle = {
  height: '36px',

};
const descInputStyle = {
  height: '76px',
  width:"75%"
};


 const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      quantity,
      description,
      transferTo,
    };
  
    // Call the endpoint to create the new entry
    // ...
    
    // Close the modal and show a success toast
    setIsModalOpen(false);
    toast.success('New entry created!');
  };

  const handleFilter = (event) => {
    setFilterDate(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };


  const getClients = () => {
	clientServe
		.find()
		.then(res => {
			setClients(res.data);
		})
		.catch(err => {
			console.log(err);
		});
};

useEffect(() => {
	getClients();
}, []);

  return (
	<Box sx={{ backgroundColor: '#f9f9f9', height: '100%', padding: '10px' }}>

<ModalBox
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Create New Entry"
  actions={
    <>
      <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
      <Button onClick={handleSubmit}>Create</Button>
    </>
  }
>
<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
<Typography variant="h6">Transfer Request</Typography>
    <Button
      startIcon={<AddCircle />}
      sx={{ backgroundColor: '#ecf3ff', color: '#0364ff' }}
    >
      Add New
    </Button>
  </Box>
  {/* Modal content */}
  <div style={{ display: 'flex', flexDirection: 'row', width:"750px" }}>
    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
      <Typography variant="subtitle2" color="primary" gutterBottom>
        Product
      </Typography>
      <TextField
        placeholder="Search for product"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        InputProps={{ style: inputStyle }}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        sx={{ color: '#0364ff' }}
      />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
      <Typography variant="subtitle2" color="primary" gutterBottom>
        Quantity
      </Typography>
      <TextField
        placeholder="Enter quantity"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ style: inputStyle }}
        fullWidth
        sx={{ color: '#0364ff', height: '32px' }}
      />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', paddingRight:'8rem' }}>
      <Typography variant="subtitle2" color="primary" gutterBottom>
        Transfer To
      </Typography>
      <TextField
        select
        value={transferTo}
        onChange={(e) => setTransferTo(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ style: inputStyle }}
        fullWidth
        sx={{ color: '#0364ff', width:"200px" }}
      >
        <MenuItem value="Option 1">Abuja</MenuItem>
        <MenuItem value="Option 2">Ibadan</MenuItem>
        <MenuItem value="Option 3">Lagos</MenuItem>
      </TextField>
    </div>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem', marginTop: '2rem' }}>
    <Typography variant="subtitle2" color="primary" gutterBottom>
      Description
    </Typography>
    <TextField
      multiline
      placeholder="Type here..."
      rows={3}
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      InputProps={{ style: descInputStyle }}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      sx={{ color: '#0364ff' }}
    />
  </div>
  ...
  <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '4rem' }}>
    <Button onClick={() => setIsModalOpen(false)} sx={{ mr: 2, border: '1px solid #0364ff', pr: '12px', alignItems: 'center'}}>Cancel</Button>
    <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#0064cc', pr: '12px', alignItems: 'center' }}>Confirm</Button>

  </Box>
</ModalBox>


{/* Ismodal open 2 */}
<ModalBox
  open={isModal2Open}
  onClose={() => setIsModal2Open(false)}
  title="Create New Entry"
  actions={
    <>
      <Button onClick={() => setIsModal2Open(false)}>Cancel</Button>
      <Button onClick={handleSubmit}>Create</Button>
    </>
  }
>
<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
    <Typography variant="h6">Products Details</Typography>
  </Box>
  {/* Modal content */}
  <div style={{ display: 'flex', flexDirection: 'row', width:"700px" }}>
    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
      <Typography variant="subtitle2" color="primary" gutterBottom>
        Product
      </Typography>
      <TextField
        placeholder="Search for product"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        InputProps={{ style: inputStyle }}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        sx={{ color: '#0364ff' }}
      />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem' }}>
      <Typography variant="subtitle2" color="primary" gutterBottom>
        Requested Quantity
      </Typography>
      <TextField
        placeholder="Enter quantity"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        InputProps={{ style: inputStyle }}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        sx={{ color: '#0364ff', height: '32px' }}
      />
    </div>
    
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem', marginTop: '2rem' }}>
      <Typography variant="subtitle2" color="primary" gutterBottom>
        Approved Quantity
      </Typography>
      <TextField
        placeholder="Enter quantity"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ style: inputStyle }}
        fullWidth
        sx={{ color: '#0364ff', height: '32px' }}
      />
    </div>
  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '3rem' }}>
    <Typography variant="subtitle2" color="primary" gutterBottom>
      Description
    </Typography>
    <TextField
      multiline
      placeholder="Type here..."
      rows={3}
      value={quantity}
      InputProps={{ style: descInputStyle }}
      onChange={(e) => setQuantity(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      sx={{ color: '#0364ff' }}
    />
  </div>
  ...
  <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '4rem' }}>
    <Button onClick={() => setIsModalOpen(false)} sx={{ mr: 2, border: '1px solid #0364ff', pr: '12px', alignItems: 'center'}}>Reject</Button>
    <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#0064cc', pr: '12px', alignItems: 'center' }}>Approve</Button>

  </Box>
</ModalBox>

	<Typography weight="bold" variant="h6" style={{ textShadow: "1px 1px 2px rgb(0, 45, 92)" }}>
	  Inward Transfers
	</Typography>
	<Paper sx={{ padding: '5px', marginBottom: '10px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
	  <TextField
		value={searchTerm}
		onChange={handleSearch}
		placeholder="name, address, or registration"
		InputProps={{
		  startAdornment: <SearchIcon />,
		  style: { color: '#808080', fontSize: '16px', inputStyle },
		}}
		sx={{ width: '250px', mr: '20px', border: '1px solid #0364ff' }}
	  />
    <Box sx={{ marginLeft: 'auto' }}>
    <Button
      onClick={() => setIsModal2Open(true)}
		  variant="contained"
		  sx={{ backgroundColor: '#00b67a', color: '#fff', ml: '20px', height: '40px',borderRadius:0  }}
		>
		  Outward
		</Button>
    <Button
		  variant="contained"
		  sx={{ backgroundColor: '#fff', color: '#0364ff', ml: '20px', border: '1px solid #0364ff', height: '40px',borderRadius:0 }}
		>
		  Inward
		</Button>
    <Button
     onClick={() => setIsModalOpen(true)}
		  variant="contained"
		  startIcon={<AddIcon />}
		  sx={{ backgroundColor: '#0364ff', color: '#fff', ml: '20px', height: '40px',borderRadius:0, mr: '20px', }}
		>
		  Create
		</Button>
	  </Box>
	</Paper>

		<Paper elevation={3} sx={{ padding: '20px' }}>
		<TableContainer sx={{ maxHeight: '500px' }}>
  <Table stickyHeader>
  <TableHead>
				<TableRow>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>S/N</TableCell>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Date/Time</TableCell>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Transfer To</TableCell>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Transfer ID</TableCell>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Items</TableCell>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Amount</TableCell>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Requested By</TableCell>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Authorized By</TableCell>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Approval</TableCell>
				  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Status</TableCell>
          <TableCell>
      </TableCell>
				</TableRow>
			  </TableHead>
    <TableBody>
      {clients.map((client) => (
        <TableRow key={client?.id} sx={{ cursor: 'pointer' }} hover>
          <TableCell>{client.id}</TableCell>
          <TableCell>{client?.firstname}</TableCell>
          <TableCell>{client?.middlename}</TableCell>
          <TableCell>{client?.lastname}</TableCell>
          <TableCell>{client?.gender}</TableCell>
          <TableCell>{client?.maritalstatus}</TableCell>
          <TableCell>{client?.phone}</TableCell>
          <TableCell>{client?.email}</TableCell>
          <TableCell>{client?.city}</TableCell>
          <TableCell>{client?.city}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
		</Paper>
	  </Box>
  );
}





