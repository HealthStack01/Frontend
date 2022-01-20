import React, { useContext, useEffect, useState } from 'react';
import client from '../../../../feathers'

import DataTable from 'react-data-table-component';
import { TableMenu } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { PageWrapper } from '../../styles';
import { columnHead, rowData } from './data';
import { UserContext } from '../../../../context/context';


interface Props {
  handleCreate?: () => void;
  onRowClicked?: (
    row: { id: any; name: string; bandType: string; description: string },
    event: any
  ) => void;
}




const Bands: React.FC<Props> = ({ handleCreate, onRowClicked }) => {
  let  BandServ = client.service('bands');
  const {user} = useContext(UserContext)

  const [details, setDetails] = useState();
  const [bands, setBands]= useState([]);


const getBands = async () => {
 if (user.currentEmployee) {
  BandServ.find({
   query: {
    facility: user.currentEmployee.facilityDetail._id,
    $limit: 200,
    $sort: {
     createdAt: -1,
    },
   },
  }).then(_ => {
  }).catch(error  => {
   console.error({error})
  })
  
  //setBands(findBand.data);
 } else {
  if (user.stacker) {
   BandServ.find({
    query: {
     $limit: 200,
     $sort: {
      facility: -1,
     },
    },
   }).then(res => {
    setBands(res.data);
   }).catch(error  => {
    console.error({error})
   });

  }
 }
};


const handleSearch=(e)=>{
 const field='name'
 BandServ.find({query: {
          [field]: {
              $regex:e.target.value,
              $options:'i'
             
          },
         facility:user?.currentEmployee?.facilityDetail?._id || "",
          $limit:100,
          $sort: {
              createdAt: -1
            }
              }}).then((res)=>{
               console.log({res});
               setBands(res.data);
          //TODO:
        
         //  setMessage(" Band  fetched successfully")
         //  setSuccess(true) 
      })
      .catch((err)=>{
           console.error(err)
           //TODO:
          // setMessage("Error fetching Band, probable network issues "+ err )
          // setError(true)
      })
  }


useEffect(() => {           
 BandServ = client.service('bands');
 user && getBands()
 BandServ.on('created', _ => getBands())
 BandServ.on('updated', _ => getBands())
 BandServ.on('patched', _ => getBands())
 BandServ.on('removed', _ => getBands())
 return () => { };
},[user])

  return (
    <PageWrapper>
      <h2>Bands</h2>

      <TableMenu>
        <div className='inner-table'>
          <Input placeholder='Search here' label='Search here' onChange={handleSearch} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Filer by</span>
            <i className='bi bi-chevron-down'></i>
          </div>
        </div>

        <Button label='Add new' onClick={handleCreate} />
      </TableMenu>

      <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
        <DataTable
          title='Bands'
          columns={columnHead}
          data={bands}
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

export default Bands;
