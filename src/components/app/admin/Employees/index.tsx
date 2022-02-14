import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import { getFormStrings } from '../../Utils';
import EmployeeCreate from './EmployeeCreate';
import EmployeeDetails from './EmployeeDetail';
import Employees from './EmployeeList';
import EmployeeModify from './EmployeeModify';

function AppEmployees() {
  let EmployeeServ = client.service('employee');
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [employees, setEmployees] = useState<any>([]);
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

  const getEmployees = async () => {
    EmployeeServ.find({
      query: {
        facility: user.currentEmployee && user.currentEmployee.facilityDetail._id,
        $limit: 200,
        $sort: {
          createdAt: user.currentEmployee && -1,
          facility: user.stacker && -1,
        },
      },
    })
      .then((res) => {
        setEmployees(res.data);
        toast('Employees fetched succesfully');
      })
      .catch((error) => {
        console.error({ error });
        toast.error(error);
      });
  };

  const handleDelete = () => {
    EmployeeServ.remove(Employee)
      .then(() => {
        toast('Employee deleted successfully');
        getEmployees();
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
        setEmployees(res.data);
        toast('Employee fetched succesfully');
      })
      .catch((err) => {
        toast('Error updating Employee, probable network issues or ' + err);
      });
  };

  const onSubmit = (data) => {
    const values = getFormStrings(data._id);
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
    EmployeeServ = client.service('employee');
    EmployeeServ.on('created', (_) => getEmployees());
    EmployeeServ.on('updated', (_) => getEmployees());
    EmployeeServ.on('patched', (_) => getEmployees());
    EmployeeServ.on('removed', (_) => getEmployees());
    getEmployees();
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
          items={employees}
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
