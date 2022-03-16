import React, { useContext, useEffect, useState } from 'react';
import { useObjectState, UserContext } from '../../../../context/context';
import { toast } from 'react-toastify';
import ServiceCreate from './ServiceCreate';
import ServiceDetails from './ServiceDetail';
import Servicess from './ServiceList';
import ServiceModify from './ServiceModify';
import { getFormStrings } from '../../Utils';
import client from '../../../../feathers';

const AppServices = () => {
  const { resource, setResource } = useObjectState();
  let ServicesServ = client.service('billing');
 
  const { user } = useContext(UserContext);
  const [facilities, setFacilities] = useState([]);
  const [val, setVal] = useState('');
  const [facility, setFacility] = useState([])
 
  let services = resource.servicesResource.selectedService
  
  

  const backClick = () => {
    setResource((prevState) => ({
      ...prevState,
      servicesResource: {
        ...prevState.servicesResource,
        show: 'lists',
      },
    }));
  };
  const getFacilities = () => {
    if (user.employeeData) {
      ServicesServ.find({
        query: {
          facility: user.employeeData[0].facility,

          $sort: {
            category: 1,
          },
        },
      }).then((res) => {
        const findServices = res;
        toast('Services fetched successfully')
        console.log(findServices.groupedOrder);
        
        setFacilities(findServices.groupedOrder);
      });
    } else {
      if (user.stacker) {
        toast('You do not qualify to view this');
        return;
      }
    }
  };

  const handleDelete = () => {
    ServicesServ.remove(services)
      .then((res) => {
        toast('Services deleted successfully');
        getFacilities();
        backClick();
      })
      .catch((err) => {
        toast('Error deleting Services, probable network issues or ' + err);
      });
  };

  const handleSearch1 = (val) => {
    setVal(val);
    

    if (val.length >= 3) {
      ServicesServ.find({
        query: {
          category: {
            $regex: val,
            $options: 'i',
          },

          $limit: 1000,
          $sort: {
            category: 1,
          },
        },
      })
        .then((res) => {
          setFacility(res.groupedOrder);
        })
        .catch((err) => {
          toast({
            message: 'Error searching Service category  ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } 
  };

   const handleSearch = (val) => {
     const field = 'name';
     ServicesServ.find({
       query: {
         [field]: {
           $regex: val,
           $options: 'i',
         },
         facility: user.employeeData[0].facility,
         $limit: 20,
         $sort: {
           createdAt: -1,
         },
       },
     })
       .then((res) => {
         setFacilities(res.groupedOrder);
       })
       .catch((err) => {
         console.error(err);
         toast('Error during search ' + err);
       });
   };

    const onSubmit = (data) => {
      
      const values = getFormStrings(data._id);
      if (user.currentEmployee) {
        data.facility = user.currentEmployee.facilityDetail._id;
      }
      (data._id
        ? ServicesServ.update(data._id, data)
        :ServicesServ.create(data)
      )
      
        .then(() => {
          toast(`Services ${values.message}`);
          
        })
        .catch((err) => {
          toast(`Error occurred : ${err}`);
        });
    };

    const onSubmit1 =(data)=>{
      let obj = {
        name: data.source,
        category: data.categoryname,
        facility: user.employeeData[0].facility,
        facilityname: user.employeeData[0].facility.facilityName,
        panel: data.panel,
        panelServices: data.panelList,
        contracts: data.productItem,
        createdBy: user._id,
      };

      ServicesServ.create(obj)
        .then((res) => {
          
          
          toast({
            message: 'Service created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
         
        })
        .catch((err) => {
          toast({
            message: 'Error creating Services ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });

    }

  useEffect(() => {
    
    if(!ServicesServ){

    ServicesServ = client.service('billing');
    ServicesServ.on('created', () => getFacilities());
    ServicesServ.on('updated', () => getFacilities());
    ServicesServ.on('patched', () => getFacilities());
    ServicesServ.on('removed', () => getFacilities());
    }
    user && getFacilities();
    return () => {
      ServicesServ = null;
    };
  }, [user]);
  return (
    <>
      {resource.servicesResource.show === 'lists' && (
        <Servicess
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                show: 'details',
                selectedService: row,
              },
            }));
          }}
          dataTree={facilities}
          handleSearch={handleSearch}
        />
      )}
      {resource.servicesResource.show === 'create' && (
        <ServiceCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'lists',
              },
            }))
          }
          handleSearch={handleSearch1}
          onSubmit={onSubmit1}
        />
      )}
      {resource.servicesResource.show === 'details' && (
        <ServiceDetails
          row={resource.servicesResource.selectedService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'edit',
              },
            }))
          }
          handleDelete={handleDelete}
        />
      )}
      {resource.servicesResource.show === 'edit' && (
        <ServiceModify
          row={resource.servicesResource.selectedService}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              servicesResource: {
                ...prevState.servicesResource,
                show: 'details',
              },
            }))
          }
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default AppServices;