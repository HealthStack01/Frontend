function randomDate(start, end) {
  start = Date.parse(start);
  end = Date.parse(end);

  return new Date(Math.floor(Math.random() * (end - start + 1) + start));
}

export const dummyNotifications = [
  {
    type: "message",
    time: randomDate("01/01/2023", "01/12/2023"),
    seen: false,
    title: "New Message from Matt Matty",
    description: "Matt dropped a message in the Deal for Test Organization",
  },
  {
    type: "message",
    time: randomDate("01/01/2023", "01/12/2023"),
    seen: false,
    title: "New Message from Ada Nwanfor",
    description: "Ada has a message for you in communications",
  },
  {
    type: "action",
    time: randomDate("01/01/2023", "01/12/2023"),
    seen: true,
    title: "Dr Joe Doe Gave you a task",
    description: "Dr Joe wants you to lead the appointment with Frank",
  },
  {
    type: "action",
    time: randomDate("01/01/2023", "01/12/2023"),
    seen: false,
    title: "Dr Joe gave you a task",
    description: "Delete client with name of John Doe",
  },
  {
    type: "action",
    time: randomDate("01/01/2023", "01/12/2023"),
    seen: true,
    title: "Assigned to Deal",
    description:
      "You've been assigned as a staff to deal with Microservices LTD.",
  },
  {
    type: "message",
    time: randomDate("01/01/2023", "01/12/2023"),
    seen: false,
    title: "New Message from David Jones",
    description: "Matt dropped a message in the Deal for Test Organization",
  },
  {
    type: "action",
    time: randomDate("01/01/2023", "01/12/2023"),
    seen: false,
    title: "Teleconsultation Call",
    description: "Organize a call with client John Doe",
  },
  {
    type: "action",
    time: randomDate("01/01/2023", "01/12/2023"),
    seen: false,
    title: "Secheduled Appointment",
    description: "An appointment has been scheduled for you and John Doe",
  },
  {
    type: "message",
    time: randomDate("01/01/2023", "01/12/2023"),
    seen: false,
    title: "New Message from Abraham Lucasio",
    description: "Matt dropped a message in the Deal for Test Organization",
  },
  // {
  //   type: "",
  //   time: randomDate("01/01/2023", "01/12/2023"),
  //   seen: "",
  //   title: "",
  //   description: "",
  // },
  // {
  //   type: "",
  //   time: randomDate("01/01/2023", "01/12/2023"),
  //   seen: "",
  //   title: "",
  //   description: "",
  // },
  // {
  //   type: "",
  //   time: randomDate("01/01/2023", "01/12/2023"),
  //   seen: "",
  //   title: "",
  //   description: "",
  // },
  // {
  //   type: "",
  //   time: randomDate("01/01/2023", "01/12/2023"),
  //   seen: "",
  //   title: "",
  //   description: "",
  // },
];
