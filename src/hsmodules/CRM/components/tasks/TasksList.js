import {useState, useContext} from "react";

import {UserContext, ObjectContext} from "../../../../context";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CustomTable from "../../../../components/customtable";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import {TableMenu} from "../../../../ui/styled/global";
import {PageWrapper} from "../../../app/styles";
import {getTaskColumns} from "../colums/columns";
import {Box} from "@mui/material";

const dummyData = [
  {
    employee: "Pascal Grobbs",
    type: "Contract",
    title: "Nurse",
    priority: "Patients",
    information:
      "quo laudantium quis et placeat numquam non culpa voluptatem cum ipsam rerum",
  },
  {
    employee: "Mighty Mike",
    type: "Contract",
    title: "Nure",
    priority: "Patients",
    information:
      "quo laudantium quis et placeat numquam non culpa voluptatem cum ipsam rerum",
  },
  {
    employee: "Dr. Grobbs Simons",
    type: "Full Time",
    title: "Doctor",
    priority: "Patients",
    information:
      "quo laudantium quis et placeat numquam non culpa voluptatem cum ipsam rerum",
  },
  {
    employee: "Port Follow",
    type: "Contract",
    title: "Doctor",
    priority: "Patients",
    information:
      "quo laudantium quis et placeat numquam non culpa voluptatem cum ipsam rerum",
  },
];

const TasksList = ({openCreateModal, openDetailModal}) => {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleRow = async Client => {
    openDetailModal();
  };

  const handleSearch = () => {};

  const handleAddTask = task => {
    if (!task.title) return;
    setTasks(prev => [task, ...prev]);
  };

  const handleRemoveTask = task => {
    setTasks(prev => prev.filter(item => item.title !== task.title));
  };

  const tasksColumns = getTaskColumns(handleRemoveTask, false);

  return (
    <>
      <Box pl={2} pr={2}>
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
            data={dummyData}
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
