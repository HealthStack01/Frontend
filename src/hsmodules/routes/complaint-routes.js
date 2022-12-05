import {lazy} from "react";

const Complaint = lazy(() => import("./Complaints/Complaint"));

const DetailComplaint = lazy(() => import("./Complaints/DetailComplaints"));

export const complaintRoutes = [
  {
    path: "/app/complaints",
    Component: Complaint,
  },
  {
    path: "/app/complaints/detailComplaints",
    Component: DetailComplaint,
  },
];
