import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  AppointmentTooltip,
  AllDayPanel,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
  AppointmentForm,
  DragDropProvider,
  Resources,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

// export const appointments = [
//   {
//     title: 'Dr Philips - Surgery',
//     startDate: '2021-11-05T11:45',
//     endDate: '2021-11-05T12:45',
//     id: 0,
//     location: 'Room 1',
//   },
//   {
//     title: 'Dr Jon - Dentist',
//     startDate: '2021-11-05T13:45',
//     endDate: '2021-11-05T14:45',
//     id: 0,
//     location: 'Room 4',
//   },
//   {
//     title: 'General Checkup',
//     startDate: '2021-11-03T09:45',
//     endDate: '2021-11-03T12:45',
//     id: 0,
//     location: 'Room 1',
//   },
// ];

const useStyles = makeStyles(() => ({}));

const TimeTableCell = (props) => {
  const classes = useStyles();
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...props} className={classes.todayCell} />;
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <WeekView.TimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <WeekView.TimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  const classes = useStyles();
  const { startDate, today } = props;

  if (today) {
    return <WeekView.DayScaleCell {...props} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
  }
  return <WeekView.DayScaleCell {...props} />;
};

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#0364FF',
      borderRadius: '4px',
    }}
  >
    {children}
  </Appointments.Appointment>
);
const Layout = ({ children, style, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} style={{}}>
    {children}
  </AppointmentTooltip.Content>
);
const CalendarGrid = ({ appointments }) => {
  console.log('Grid View', appointments);

  // const resources = [
  //   {
  //     fieldName: 'clientId',
  //     title: 'Client',
  //     instances: details,
  //   },
  // ];

  return (
    <Paper>
      <Scheduler data={appointments}>
        <ViewState
          defaultCurrentDate={new Date()}
          defaultCurrentViewName="Week"
        />
        {/* <EditingState onCommitChanges={() => console.log('commit')} /> */}
        <DayView startDayHour={0} endDayHour={24} />
        <WeekView
          startDayHour={0}
          endDayHour={24}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />

        {/* <MonthView startDayHour={0} endDayHour={24} /> */}
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <Appointments appointmentComponent={Appointment} />
        {/* <Resources data={resources} /> */}
        {/* <EditRecurrenceMenu /> */}
        <AppointmentTooltip showCloseButton contentComponent={Layout} />
        <AppointmentForm />
        {/* <DragDropProvider /> */}
      </Scheduler>
    </Paper>
  );
};

export default CalendarGrid;
