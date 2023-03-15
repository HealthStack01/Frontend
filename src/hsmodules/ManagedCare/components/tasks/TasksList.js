import {useState, useContext, useEffect} from "react";

import {UserContext, ObjectContext} from "../../../../context";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import {TableMenu} from "../../../../ui/styled/global";
import {PageWrapper} from "../../../app/styles";
//import {getTaskColumns} from "../colums/columns";
import {Box, Typography} from "@mui/material";
import client from "../../../../feathers";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import {toast} from "react-toastify";

const TasksList = ({
  openCreateModal,
  openDetailModal,
  taskState,
  taskServer,
}) => {
  const claimsServer = client.service("claims");
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    message: "",
    action: null,
  });

  useEffect(() => {
    setTasks(taskState.task || []);
  }, [taskState]);

  const handleRow = async row => {
    setState(prev => ({
      ...prev,
      TaskModule: {...prev.TaskModule, selectedTask: row},
    }));
    openDetailModal();
  };

  const handleSearch = () => {};

  const handleRemoveTask = async task => {
    showActionLoader();
    //const prevTasks = state.DealModule.selectedDeal.tasks;
    const newTasks = tasks.filter(
      item => item._id !== task._id || item.taskId !== task.taskId
    );

    //return console.log(tasks);

    const documentId = state.ClaimsModule.selectedClaim._id;
    await claimsServer
      .patch(documentId, {task: newTasks})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          ClaimsModule: {...prev.ClaimsModule, selectedClaim: res},
        }));
        setConfirmDialog(false);
        //closeModal();
        toast.success(`You have successfully Deleted Task`);
        //setSuccess(true);
        //setReset(true);
      })
      .catch(err => {
        //setReset(false);
        setConfirmDialog(false);
        hideActionLoader();
        toast.error(`Sorry, You weren't able to Delete Task!. ${err}`);
      });
  };

  const confirmDeleteTask = task => {
    setConfirmDialog({
      open: true,
      message: "You're about to delete a Task",
      action: () => handleRemoveTask(task),
      type: "danger",
    });
  };

  const closeDialog = () => {
    setConfirmDialog({
      open: false,
      type: "",
      message: "",
      action: null,
    });
  };

  //const tasksColumns = getTaskColumns(confirmDeleteTask, false);

  const tasksColumns = [
    {
      name: "SN",
      key: "sn",
      description: "Enter Date",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "50px",
    },
    {
      name: "Employee",
      key: "employee",
      description: "Enter Staff",
      selector: row => (
        <Typography
          sx={{
            fontSize: "0.8rem",
            whiteSpace: "normal",
            textTransform: "capitalize",
            color: "#1976d2",
          }}
          data-tag="allowRowEvents"
        >
          {row.employee.firstname} {row.employee.lastname}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Title",
      key: "title",
      description: "Enter Date",
      selector: row => row.title,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Status",
      style: {color: "#0364FF"},
      key: "type",
      description: "Enter Date",
      selector: row => row.status,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Priority",
      style: {color: "#0364FF"},
      key: "priority",
      description: "Enter Date",
      selector: row => row.priority,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Information",
      key: "information",
      description: "Enter Date",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.information}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
    },
    // {
    //   name: "Del",
    //   width: "50px",
    //   center: true,
    //   key: "action",
    //   description: "Enter Date",
    //   selector: row => (
    //     <IconButton
    //       onClick={() => action(row)}
    //       disabled={disableAction}
    //       color="error"
    //     >
    //       <DeleteOutline fontSize="small" />
    //     </IconButton>
    //   ),
    //   sortable: true,
    //   required: true,
    //   inputType: "NUMBER",
    // },
  ];

  return (
    <>
      <Box pl={2} pr={2}>
        <CustomConfirmationDialog
          open={confirmDialog.open}
          cancelAction={closeDialog}
          type={confirmDialog.type}
          message={confirmDialog.message}
          confirmationAction={confirmDialog.action}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={2}
        >
          <div style={{display: "flex", alignItems: "center"}}>
            <div className="inner-table">
              <FilterMenu onSearch={handleSearch} />
            </div>

            <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>Tasks</h2>
          </div>

          <GlobalCustomButton onClick={openCreateModal}>
            <AddCircleOutlineOutlined
              fontSize="small"
              sx={{marginRight: "5px"}}
            />
            Assign Task
          </GlobalCustomButton>
        </Box>
        <div style={{width: "100%", height: "600px", overflow: "auto"}}>
          <CustomTable
            title={""}
            columns={tasksColumns}
            data={tasks}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={loading}
          />
        </div>
      </Box>
    </>
  );
};

export default TasksList;
