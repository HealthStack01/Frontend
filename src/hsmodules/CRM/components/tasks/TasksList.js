import {useState, useContext, useEffect} from "react";

import {UserContext, ObjectContext} from "../../../../context";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import {TableMenu} from "../../../../ui/styled/global";
import {PageWrapper} from "../../../app/styles";
import {getTaskColumns} from "../colums/columns";
import {Box} from "@mui/material";
import client from "../../../../feathers";
import CustomConfirmationDialog from "../../../../components/confirm-dialog/confirm-dialog";
import {toast} from "react-toastify";

const TasksList = ({openCreateModal, openDetailModal}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
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
    setTasks(state.DealModule.selectedDeal.tasks);
  }, [state.DealModule]);

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

    const documentId = state.DealModule.selectedDeal._id;
    await dealServer
      .patch(documentId, {tasks: newTasks})
      .then(res => {
        hideActionLoader();
        //setContacts(res.contacts);
        setState(prev => ({
          ...prev,
          DealModule: {...prev.DealModule, selectedDeal: res},
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

  const tasksColumns = getTaskColumns(confirmDeleteTask, false);

  console.log(user);

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

          {(user?.currentEmployee?.roles?.includes("Admin") ||
            user?.currentEmployee?.roles?.includes("CRM Assign Task")) && (
            <GlobalCustomButton onClick={openCreateModal}>
              <AddCircleOutlineOutlined
                fontSize="small"
                sx={{marginRight: "5px"}}
              />
              Assign Task
            </GlobalCustomButton>
          )}
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
