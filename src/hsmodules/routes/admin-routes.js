import {lazy} from "react";

const ClinicSetup = lazy(() => import("../Clinic/ClinicSetup"));
const Accessibility = lazy(() => import("../Admin/Accessibility"));
const CareTeam = lazy(() => import("../Admin/CareTeam"));
const Department = lazy(() => import("../Admin/Department"));
const DeptUnits = lazy(() => import("../Admin/DeptUnits"));
const Employee = lazy(() => import("../Admin/Employee"));
const Facility = lazy(() => import("../Admin/Facility"));
const HSModules = lazy(() => import("../Admin/HSModules"));
const Bands = lazy(() => import("../Admin/Bands"));
const Roaster = lazy(() => import("../Admin/Roaster"));
const Workspace = lazy(() => import("../Admin/Workspace"));
const Location = lazy(() => import("../Admin/Location"));

export const adminRoutes = [
  {
    path: "/app/admin/accessibility",
    Component: Accessibility,
  },
  {
    path: "/app/admin/careteam",
    Component: CareTeam,
  },
  {
    path: "/app/admin/department",
    Component: Department,
  },
  {
    path: "/app/admin/dept-unit",
    Component: DeptUnits,
  },
  {
    path: "/app/admin/employees",
    Component: Employee,
  },
  {
    path: "/app/admin/facility",
    Component: Facility,
  },
  {
    path: "/app/admin/hsmodules",
    Component: HSModules,
  },
  {
    path: "/app/admin/location",
    Component: Location,
  },
  {
    path: "/app/admin/bands",
    Component: Bands,
  },
  {
    path: "/app/admin/roaster",
    Component: Roaster,
  },
  {
    path: "/app/admin/Workspace",
    Component: Workspace,
  },
  {
    path: "/app/admin/clinicsetup",
    Component: ClinicSetup,
  },
];
