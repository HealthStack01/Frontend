import {useState, useEffect, useCallback, useContext} from "react";
import {Box, Grid} from "@mui/material";
import client from "../../../feathers";
import {ObjectContext, UserContext} from "../../../context";
import FilterMenu from "../../../components/utilities/FilterMenu";
import {FormsHeaderText} from "../../../components/texts";
import ModalBox from "../../../components/modal";
import CustomTable from "../../../components/customtable";
import dayjs from "dayjs";
import {useForm} from "react-hook-form";
import Input from "../../../components/inputs/basic/Input";
import Textarea from "../../../components/inputs/basic/Textarea";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import CustomSelect from "../../../components/inputs/basic/Select";
import NotificationsListComponent from "./Lists";

const Notifications = () => {
  const [detailModal, setDetailModal] = useState(false);

  return (
    <Box p={2}>
      <Box>
        <NotificationsListComponent showDetail={() => setDetailModal(true)} />
      </Box>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Notification in Details"
      >
        <NotificationDetail closeModal={() => setDetailModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default Notifications;

const NotificationsList = ({showDetail}) => {
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
      description: "Enter name of location",
      sortable: true,
      selector: row => row.sender,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
        color: "#0064CC",
      },
    },
    {
      name: "Date",
      key: "sn",
      description: "Enter name of location",
      sortable: true,
      selector: row => dayjs(row.createdAt).format("DD/MM/YYYY HH:ss"),
      inputType: "HIDDEN",
    },
    {
      name: "Title",
      key: "sn",
      description: "Enter name of location",
      sortable: true,
      selector: row => row.title,
      inputType: "HIDDEN",
    },

    {
      name: "Priority",
      key: "sn",
      description: "Enter name of location",
      sortable: true,
      selector: row => row.priority,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Seen",
      key: "sn",
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
      selector: row => row.description,
      inputType: "HIDDEN",
    },
  ];

  return (
    <Box>
      <Box
        mb={2}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <FilterMenu onSearch={handleSearch} />
          <FormsHeaderText text="List of All Your Notifications" />
        </Box>
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
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 150px)",
          overflowY: "auto",
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

const NotificationDetail = () => {
  const notificationsServer = client.service("notification");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const {register, reset} = useForm();

  const navigate = useNavigate();

  const notification = state.NotificationModule.selectedNotification;

  useEffect(() => {
    const data = {
      ...notification,
      date: dayjs(notification.createdAt).format("DD/MM/YYYY HH:ss"),
    };

    reset(data);
  }, []);

  const handleMarkAsRead = async () => {
    const prevReads = notification.isRead;
    const documentId = notification._id;
    const userId = user.currentEmployee._id;
    showActionLoader();

    const newReads = [userId, ...prevReads];

    await notificationsServer
      .patch(documentId, {isRead: newReads})
      .then(res => {
        setState(prev => ({
          ...prev,
          NotificationModule: {
            ...prev.NotificationModule,
            selectedNotification: res,
          },
        }));
        hideActionLoader();
        handleCloseOptions();
        toast.success("Notification successfully marked as read");
      })
      .catch(err => {
        console.log(err);
        hideActionLoader();
        toast.error(`Failed to mark notification as read ${err}`);
      });
  };

  const handleViewNotification = async () => {
    const notificationPath = notification.pageUrl || "/app";

    if (notification.isRead.includes(user.currentEmployee._id))
      return navigate(notificationPath);

    const prevReads = notification.isRead;
    const documentId = notification._id;
    const userId = user.currentEmployee._id;
    showActionLoader();

    const newReads = [userId, ...prevReads];

    await notificationsServer
      .patch(documentId, {isRead: newReads})
      .then(res => {
        setState(prev => ({
          ...prev,
          NotificationModule: {
            ...prev.NotificationModule,
            selectedNotification: res,
          },
        }));
        hideActionLoader();
        handleCloseOptions();
        navigate(notificationPath);
        closeDrawer();
        //toast.success('Notification successfully marked as read');
      });

    // console.log(location.pathname);
  };

  return (
    <Box
      sx={{
        width: "60vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        mb={2}
        gap={2}
      >
        {!notification.isRead.includes(user.currentEmployee._id) && (
          <GlobalCustomButton color="success" onClick={handleMarkAsRead}>
            Mark as Read
          </GlobalCustomButton>
        )}
        <GlobalCustomButton color="info" onClick={handleViewNotification}>
          View Notification
        </GlobalCustomButton>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={6} md={4} sm={6} xs={12}>
            <Input label="Sender" register={register("sender")} />
          </Grid>

          <Grid item lg={6} md={4} sm={6} xs={12}>
            <Input label="Title" register={register("title")} />
          </Grid>

          <Grid item lg={6} md={4} sm={6} xs={12}>
            <Input label="Date/Time" register={register("date")} />
          </Grid>

          <Grid item lg={6} md={4} sm={6} xs={12}>
            <Input label="Priority" register={register("priority")} />
          </Grid>

          <Grid item xs={12}>
            <Textarea label="Description" register={register("description")} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
