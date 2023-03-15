import {lazy} from "react";

const Bloodbank = lazy(() => import("../Appointment/bloodBankAppointment"));
const Clinic = lazy(() => import("../Appointment/clinicAppointments"));
//const CRM = lazy(() => import("../Appointment/crmAppointment"));
const GlobalAppointment = lazy(() =>
  import("../Appointment/generalAppointment")
);
const Immunization = lazy(() =>
  import("../Appointment/immunizationAppoinment")
);
const Labour = lazy(() => import("../Appointment/labourWardAppointment"));
const Pharmacy = lazy(() => import("../Appointment/pharmacyAppointment"));
const Radiology = lazy(() => import("../Appointment/RadAppointments"));
const Referral = lazy(() => import("../Appointment/referralAppointment"));
const Theatre = lazy(() => import("../Appointment/TheatreAppointments"));
const BloodbankWorkFlow = lazy(() =>
  import("../Appointment/bloodBankWorkflow")
);
const ClinicWorkFlow = lazy(() => import("../Appointment/ClinicWorkflow"));
//const CRMWorkFlow = lazy(() => import("../Appointment/crmWorkflow"));
const GlobalWorkFlow = lazy(() => import("../Appointment/generalWorkflow"));
const ImmunizationWorkFlow = lazy(() =>
  import("../Appointment/immunizationWorkflow")
);
const LabourWorkFlow = lazy(() => import("../Appointment/labourWardWorkflow"));
const PharmacyWorkFlow = lazy(() => import("../Appointment/pharmacyWorkflow"));
const RadiologyWorkFlow = lazy(() => import("../Appointment/Radworkflow"));
const ReferralWorkFlow = lazy(() => import("../Appointment/referralWorkflow"));
const TheatreWorkFlow = lazy(() => import("../Appointment/TheatreWorkflow"));

export const AppointmentRoutes = [
  {
    path: "/app/appointments/blood-bank",
    Component: Bloodbank,
  },
  {
    path: "/app/appointments/clinic",
    Component: Clinic,
  },
  // {
  //   path: '/app/appointments/crm',
  //   Component: CRM,
  // },
  {
    path: "/app/appointments",
    Component: GlobalAppointment,
  },
  {
    path: "/app/appointments/immunization",
    Component: Immunization,
  },
  {
    path: "/app/appointments/labour-ward",
    Component: Labour,
  },
  {
    path: "/app/appointments/pharmacy",
    Component: Pharmacy,
  },
  {
    path: "/app/appointments/radiology",
    Component: Radiology,
  },
  {
    path: "/app/appointments/referral",
    Component: Referral,
  },
  {
    path: "/app/appointments/theatre",
    Component: Theatre,
  },
];

export const WorkFlowRoutes = [
  {
    path: "/app/appointments/workflow/blood-bank",
    Component: BloodbankWorkFlow,
  },
  {
    path: "/app/appointments/workflow/clinic",
    Component: ClinicWorkFlow,
  },
  // {
  //   path: '/app/appointments/workflow/crm',
  //   Component: CRMWorkFlow,
  // },
  {
    path: "/app/appointments/workflow/global",
    Component: GlobalWorkFlow,
  },
  {
    path: "/app/appointments/workflow/immunization",
    Component: ImmunizationWorkFlow,
  },
  {
    path: "/app/appointments/workflow/labour-ward",
    Component: LabourWorkFlow,
  },
  {
    path: "/app/appointments/workflow/pharmacy",
    Component: PharmacyWorkFlow,
  },
  {
    path: "/app/appointments/workflow/radiology",
    Component: RadiologyWorkFlow,
  },
  {
    path: "/app/appointments/workflow/referral",
    Component: ReferralWorkFlow,
  },
  {
    path: "/app/appointments/workflow/theatre",
    Component: TheatreWorkFlow,
  },
];
