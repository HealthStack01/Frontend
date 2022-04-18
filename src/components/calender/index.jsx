import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

export const appointments = [
  {
    title: 'Dr Philips - Surgery',
    startDate: '2021-11-05T11:45',
    endDate: '2021-11-05T12:45',
    id: 0,
    location: 'Room 1',
  },
  {
    title: 'Dr Jon - Dentist',
    startDate: '2021-11-05T13:45',
    endDate: '2021-11-05T14:45',
    id: 0,
    location: 'Room 4',
  },
  {
    title: 'General Checkup',
    startDate: '2021-11-03T09:45',
    endDate: '2021-11-03T12:45',
    id: 0,
    location: 'Room 1',
  },
];

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
const CalendarGrid = () => {
  return (
    <Paper>
      <Scheduler data={appointments}>
        <ViewState
          defaultCurrentDate="2021-11-05"
          defaultCurrentViewName="Week"
        />
        <DayView startDayHour={9} endDayHour={19} />
        <WeekView
          startDayHour={9}
          endDayHour={19}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <MonthView startDayHour={9} endDayHour={19} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip showCloseButton showOpenButton />
        {/* <AppointmentForm /> */}
      </Scheduler>
    </Paper>
  );
};

export default CalendarGrid;
