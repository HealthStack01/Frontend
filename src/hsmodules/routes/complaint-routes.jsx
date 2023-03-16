import {lazy} from "react";

const Complaint = lazy(() => import("./Complaints/Complaint"));
const NewComplaints = lazy(() => import("./Complaints/new-complaints"));

const DetailComplaint = lazy(() => import("./Complaints/DetailComplaints"));

export const complaintRoutes = [
  {
    path: "/app/complaints",
    Component: NewComplaints,
  },
  {
    path: "/app/complaints/detailComplaints",
    Component: DetailComplaint,
  },
];
