import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import EmployeeCreate from './EmployeeCreate';
import { getFormStrings } from '../../Utils';
import EmployeeDetails from './EmployeeDetail';
import Employees from './EmployeeList';
import EmployeeModify from './EmployeeModify';

function AppEmployees() {
  let EmployeeServ = client.service('employee');
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [employee, setEmployee] = useState([]);
  let Employee = resource.employeeResource.selectedEmployee;

  const backClick = () => {
    setResource((prevState) => ({
      ...prevState,
      employeeResource: {
        ...prevState.employeeResource,
        show: 'lists',
      },
    }));
  };

  const getEmployee = async () => {
    if (user.currentEmployee) {
      EmployeeServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then(() => {})
        .catch((error) => {
          console.error({ error });
        });
    } else if (user.stacker) {
      EmployeeServ.find({
        query: {
          $limit: 200,
          $sort: {
            facility: -1,
          },
        },
      })
        .then((res) => {
          setEmployee(res.data);
          console.log(res.data);
          
          toast('Employees fetched succesfully');
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleDelete = () => {
     EmployeeServ.remove(Employee)
      .then((res) => {
        toast('Employee deleted successfully');
        getEmployee();
        backClick();
      })
      .catch((err) => {
        toast('Error deleting Employee, probable network issues or ' + err);
      });
  };

  const handleSearch = (text) => {
    EmployeeServ.find({
      query: {
        name: {
          $regex: text,
          $options: 'i',
        },
        facility: user?.currentEmployee?.facilityDetail?._id || '',
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setEmployee(res.data);
        toast('Employee fetched succesfully');
      })
      .catch((err) => {
        toast('Error updating Employee, probable network issues or ' + err);
      });
  };

  const onSubmit = (data) => {
    const values = getFormStrings(data._id);
    // if (data.bandType === '') {
    //   alert('Kindly choose band type');
    //   return;
    // }

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id;
    }
    (data._id ? EmployeeServ.update(data._id, data) : EmployeeServ.create(data))
      .then(() => {
        toast(`Employee ${values.message}`);
        backClick();
      })
      .catch((err) => {
        toast(`Error occurred : ${err}`);
      });
  };

  useEffect(() => {
    if (!EmployeeServ) {
      EmployeeServ = client.service('employee');
      EmployeeServ.on('created', (_) => getEmployee());
      EmployeeServ.on('updated', (_) => getEmployee());
      EmployeeServ.on('patched', (_) => getEmployee());
      EmployeeServ.on('removed', (_) => getEmployee());
    }
    user && getEmployee();
    return () => {
      EmployeeServ = null;
    };
  }, [user]);

  return (
    <>
      {resource.employeeResource.show === 'lists' && (
        <Employees
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, _) => {
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                show: 'details',
                selectedEmployee: row,
              },
            }));
          }}
          items={employee}
          handleSearch={handleSearch}
        />
      )}
      {resource.employeeResource.show === 'create' && (
        <EmployeeCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
          onSubmit={onSubmit}
        />
      )}
      {resource.employeeResource.show === 'details' && (
        <EmployeeDetails
          row={resource.employeeResource.selectedEmployee}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'edit',
              },
            }))
          }
          handleDelete={handleDelete}
        />
      )}
      {resource.employeeResource.show === 'edit' && (
        <EmployeeModify
          row={resource.employeeResource.selectedEmployee}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'details',
              },
            }))
          }
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}

export default AppEmployees;
