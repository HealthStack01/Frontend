import {useState, useEffect, useCallback, useContext} from "react";
import {Box, Grid, Typography} from "@mui/material";
import client from "../../../feathers";
import {ObjectContext, UserContext} from "../../../context";
import FilterMenu from "../../../components/utilities/FilterMenu";
import {FormsHeaderText} from "../../../components/texts";
import CustomTable from "../../../components/customtable";
import dayjs from "dayjs";
import {TableMenu} from "../../../ui/styled/global";
import {useForm} from "react-hook-form";
import CustomSelect from "../../../components/inputs/basic/Select";

const NotificationsListComponent = ({showDetail}) => {
  const notificationsServer = client.service("notification");
  const {control, watch} = useForm({
    defaultValues: {
      status: "All",
      priority: "All",
    },
  });
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const notification_status = watch("status");
  const notification_priority = watch("priority");

  const getNotifications = useCallback(async () => {
    const userId = user.currentEmployee._id;
    //console.log(userId);
    setLoading(true);

    let query = {
      facilityId: user.currentEmployee.facilityDetail._id,
      $limit: 200,
      senderId: {
        $ne: userId,
      },
      $sort: {
        createdAt: -1,
      },
    };

    if (notification_priority !== "All") {
      query.priority = notification_priority.toLowerCase();
    }

    if (notification_status === "Seen") {
      query.isRead = {$in: [userId]};
    }

    if (notification_status === "Unseen") {
      query.isRead = {$nin: [userId]};
    }

    const response = await notificationsServer.find({
      query: query,
    });

    setNotifications(response.data);
    console.log(response.data);

    setLoading(false);
  }, [notification_status, notification_priority]);

  const handleSearch = val => {};

  const handleRow = item => {
    setState(prev => ({
      ...prev,
      NotificationModule: {
        ...prev.NotificationModule,
        selectedNotification: item,
      },
    }));
    showDetail();
  };

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const notificationColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "Enter name of location",
      sortable: true,
      selector: (row, i) => i + 1,
      inputType: "HIDDEN",
      width: "60px",
    },

    {
      name: "Sender",
      key: "sn",
      width: "120px",
      description: "Enter name of location",
      sortable: true,
      selector: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.sender}
        </Typography>
      ),
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
        color: "#0064CC",
      },
    },
    {
      name: "Date",
      key: "sn",
      width: "120px",
      description: "Enter name of location",
      sortable: true,
      selector: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {dayjs(row.createdAt).format("DD/MM/YYYY HH:ss")}
        </Typography>
      ),
      //selector: row => dayjs(row.createdAt).format("DD/MM/YYYY HH:ss"),
      inputType: "HIDDEN",
    },
    {
      name: "Title",
      key: "sn",
      width: "120px",
      description: "Enter name of location",
      sortable: true,
      selector: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.title}
        </Typography>
      ),
      inputType: "HIDDEN",
    },

    {
      name: "Priority",
      key: "sn",
      width: "120px",
      description: "Enter name of location",
      sortable: true,
      selector: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.priority}
        </Typography>
      ),
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Seen",
      key: "sn",
      width: "120px",
      description: "Enter name of location",
      sortable: true,
      selector: row =>
        row.isRead.includes(user.currentEmployee._id) ? "Seen" : "Unseen",
      inputType: "HIDDEN",
    },
    {
      name: "Description",
      key: "sn",
      description: "Enter name of location",
      sortable: true,
      selector: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.description}
        </Typography>
      ),
      inputType: "HIDDEN",
    },
  ];

  return (
    <Box>
      <TableMenu>
        <div style={{display: "flex", alignItems: "center"}}>
          {handleSearch && (
            <div className="inner-table">
              <FilterMenu onSearch={handleSearch} />
            </div>
          )}
          <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>Notifications</h2>
        </div>

        <Box
          sx={{
            width: "300px",
            display: "flex",
            gap: 1.5,
          }}
        >
          <CustomSelect
            label="Status"
            control={control}
            options={["All", "Seen", "Unseen"]}
            name="status"
          />

          <CustomSelect
            label="Priority"
            control={control}
            options={["All", "Normal", "Urgent"]}
            name="priority"
          />
        </Box>
      </TableMenu>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 170px)",
          overflowY: "scroll",
        }}
      >
        <CustomTable
          title={""}
          columns={notificationColumns}
          data={notifications}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
          //conditionalRowStyles={conditionalRowStyles}
        />
      </Box>
    </Box>
  );
};

export default NotificationsListComponent;
