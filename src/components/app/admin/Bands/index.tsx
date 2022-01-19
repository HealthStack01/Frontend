import React, { useState, useContext, useEffect } from 'react';
import { useObjectState } from '../../../../context/context';
import BandCreate from './BandCreate';
import BandDetails from './BandDetail';
import Bands from './BandList';
import BandModify from './BandModify';

import client from '../../../../feathers'

const AppBands = () => {
  const { resource, setResource } = useObjectState();
  const [bands, setBands]=useState([]);
  let bandServ = null;

  const handleSearch=async(val)=>{
        
   const field='bandName'
  
   if (val.length>=3){
    bandServ.find({query: {    
            [field]: {
                $regex:val,
                $options:'i'
               
            },
            $limit:10,
            $sort: {
                createdAt: -1
              }
                }}).then(({data})=>{
           setBands(data)
           console.log({data});
            //TODO: setSearchMessage(" facility  fetched successfully")
            //TODO: setShowPanel(true)
        })
        .catch((err)=>{
            console.log(err)
            //TODO: setSearchMessage("Error searching facility, probable network issues "+ err )
            //TODO: setSearchError(true)
        })
    }
   else{
       //TODO: setShowPanel(false)
       setBands([])
   }
}

useEffect(() =>  {
 bandServ = client.service('facility')
 return ()  => { bandServ = null; };
}, []);

  return (
    <>
      {resource.bandResource.show === 'lists' && (
        <Bands
          handleCreate={() =>
            setResource(prevState => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, event) => {
            // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object

            setResource(prevState => ({
              ...prevState,
              bandResource: {
                show: 'details',
                selectedBand: row,
              },
            }));
          }}
        />
      )}
      {resource.bandResource.show === 'create' && (
        <BandCreate
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.bandResource.show === 'details' && (
        <BandDetails
          row={resource.bandResource.selectedBand}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource(prevState => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.bandResource.show === 'edit' && (
        <BandModify
          row={resource.bandResource.selectedBand}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource(prevState => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppBands;
