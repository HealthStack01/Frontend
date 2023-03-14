import {Avatar} from "@mui/material";
import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {ObjectContext, UserContext} from "../../context";

import MenuItem from "../menuitem";
import {Lists} from "../menuitem/style";
import {MainMenu, Sidemenu, TopSection} from "./styles";
import {facilityTypes} from "../../hsmodules/app/facility-types";

export const menuItems = [
  {
    name: "Client",
    exact: true,
    to: "/app/clients",
    iconClassName: "bi bi-people",
    subMenus: [
      {name: "Appointment", to: "/app/clients/appointments"},
      {name: "Client", to: "/app/clients/clients"},
      {name: "Dashboard", to: "/app/clients/dashboard"},
    ],
  },
  {
    name: "Clinic",
    exact: true,
    to: "/app/clinic",
    iconClassName: "bi bi-file-medical",
    subMenus: [
      {name: "Appointment", to: "/app/clinic/appointments"},
      {name: "checkin", to: "/app/clinic/checkin"},
      {name: "Dashboard", to: "/app/clinic/dashboard"},
    ],
  },

  {
    name: "Appointments",
    exact: true,
    to: "/app/appointments",
    iconClassName: "bi bi-calendar",
    // subMenus: [
    //   {name: "Blood Bank", to: "/app/appointments/blood-bank"},
    //   {name: "Clinic", to: "/app/appointments/clinic"},
    //   {name: "CRM", to: "/app/appointments/crm"},
    //   {name: "Global", to: "/app/appointments/global"},
    //   {name: "Immunization", to: "/app/appointments/immunization"},
    //   {name: "Labour Ward", to: "/app/appointments/labour-ward"},
    //   {name: "Pharmacy", to: "/app/appointments/pharmacy"},
    //   {name: "Radiology", to: "/app/appointments/radiology"},
    //   {name: "Referral", to: "/app/appointments/referral"},
    //   {name: "Theatre", to: "/app/appointments/theatre"},
    // ],
  },

  {
    name: "Appt. Workflow",
    exact: true,
    to: "/app/appointments/workflow",
    iconClassName: "bi bi-calendar",
    subMenus: [
      {name: "Blood Bank", to: "/app/appointments/workflow/blood-bank"},
      {name: "Clinic", to: "/app/appointments/workflow/clinic"},
      {name: "CRM", to: "/app/appointments/workflow/crm"},
      {name: "Global", to: "/app/appointments/workflow/global"},
      {name: "Immunization", to: "/app/appointments/workflow/immunization"},
      {name: "Labour Ward", to: "/app/appointments/workflow/labour-ward"},
      {name: "Pharmacy", to: "/app/appointments/workflow/pharmacy"},
      {name: "Radiology", to: "/app/appointments/workflow/radiology"},
      {name: "Referral", to: "/app/appointments/workflow/referral"},
      {name: "Theatre", to: "/app/appointments/workflow/theatre"},
    ],
  },

  {
    name: "Laboratory",
    exact: true,
    to: "/app/laboratory",
    iconClassName: "bi bi-binoculars",
    subMenus: [
      {name: "Bill Client", to: "/app/laboratory/billclient"},
      {name: "Bill Lab Orders", to: "/app/laboratory/billlaborders"},
      // {name: "Payment", to: "/app/laboratory/payment"},
      {name: "Lab Result", to: "/app/laboratory/labresult"},
      {name: "Dashboard", to: "/app/laboratory/dashboard"},
    ],
  },

  {
    name: "Pharmacy",
    exact: true,
    to: "/app/pharmacy",
    iconClassName: "bi bi-file-medical",
    subMenus: [
      {name: "Bill Client", to: "/app/pharmacy/billclient"},
      {name: "Bill Prescription Sent", to: "/app/pharmacy/billprescription"},
      // { name: 'Payment', to: '/app/pharmacy/payment' },
      {name: "Dispensary", to: "/app/pharmacy/dispensary"},
      {name: "Store Inventory", to: "/app/pharmacy/storeinventory"},
      {name: "Product Entry", to: "/app/pharmacy/productentry"},
      {name: "Issue Out", to: "/app/pharmacy/issueout"},
      {name: "Requisiition", to: "/app/pharmacy/requisition"},
      {name: "Transfer", to: "/app/pharmacy/transfer"},
      {name: "Dashboard", to: "/app/pharmacy/dashboard"},
    ],
  },
  {
    name: "Finance",
    exact: true,
    to: "/app/finance",
    iconClassName: "bi bi-cash",
    subMenus: [
      {name: "Bill Services", to: "/app/finance/billservices"},
      {name: "Payment", to: "/app/finance/payment"},
      {name: "Revenue", to: "/app/finance/revenue"},
      {name: "Collections", to: "/app/finance/collections"},
      {name: "Transactions", to: "/app/finance/client-transactions"},
      {name: "Services", to: "/app/finance/services"},
      {name: "HMO Authorization", to: "/app/finance/hmoauthorization"},
      {name: "Dashboard", to: "/app/finance/dashboard"},
    ],
  },
  {
    name: "Radiology",
    exact: true,
    to: "/app/radiology",
    iconClassName: "bi bi-binoculars",
    subMenus: [
      // {name: "Home", to: "/app/radiology"},
      // {name: "Radiology", to: "/app/radiology/radiology"},
      {name: "Bill Client", to: "/app/radiology/billservice"},
      {name: "Checked-In", to: "/app/radiology/checkedin"},
      {name: "Appointment", to: "/app/radiology/appointments"},
      {name: "Bill Lab Orders", to: "/app/radiology/radiology-bill"},
      // {name: "Payment", to: "/app/radiology/payment"},
      {name: "Radiology Result", to: "/app/radiology/radiology-result"},
    ],
  },
  // {
  //   name: "Managed Care",
  //   exact: true,
  //   to: "/",
  //   iconClassName: "bi bi-bezier",
  //   subMenus: [
  //     {name: "Case Definition", to: "/app/epidemiology/case-definition"},
  //     {name: "Signals", to: "/app/epidemiology/signal"},
  //   ],
  // },
  {
    name: "Admin",
    exact: true,
    to: "/app/admin",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Bands", to: "/app/admin/bands"},
      {name: "Employees", to: "/app/admin/employees"},
      {name: "Location", to: "/app/admin/location"},
      {name: "Dashboard", to: "/app/admin/dashboard"},
      {name: "Organization", to: "/app/admin/organization"},
      {name: "Configure Email", to: "/app/admin/email-configuration"},
    ],
  },
  {
    name: "Inventory",
    exact: true,
    to: "/app/inventory",
    iconClassName: "bi bi-file-medical",
    subMenus: [
      {name: "Bill Client", to: "/app/inventory/billservice"},
      {name: "Bill Prescription Sent", to: "/app/inventory/billprescription"},
      // { name: 'Payment', to: '/app/inventory/payment' },
      {name: "Dispensary", to: "/app/inventory/dispensary"},
      {name: "Store Inventory", to: "/app/inventory/storeinventory"},
      {name: "Product Entry", to: "/app/inventory/productentry"},
      {name: "Issue Out", to: "/app/inventory/issueout"},
      {name: "Requisiition", to: "/app/inventory/requisition"},
      {name: "Transfer", to: "/app/inventory/transfer"},
      {name: "Dashboard", to: "/app/inventory/dashboard"},
    ],
  },
  {
    name: "Engagement",
    exact: true,
    to: "/app/engagment",
    iconClassName: "bi bi-rss",
    subMenus: [
      {name: "Channel", to: "/app/communication/channel"},
      {name: "Questionnaires", to: "/app/communication/questionnaires"},
      {name: "Configuration", to: "/app/communication/configuration"},
      {name: "Submissions", to: "/app/communication/submissions"},
    ],
  },
  {
    name: "Epidemiology",
    exact: true,
    to: "/app/epidemiology",
    iconClassName: "bi bi-rss",
    subMenus: [
      {name: "Dashboard", to: "/app/epidemiology/dashboard"},
      {name: "Case Definition", to: "/app/epidemiology/casedefinition"},
      {name: "Signals", to: "/app/epidemiology/signal"},
      {name: "Map", to: "/app/epidemiology/map"},
    ],
  },

  {
    name: "Ward",
    exact: true,
    to: "/app/ward",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Admission List", to: "/app/ward/admissions"},
      {name: "In-Patient", to: "/app/ward/inpatients"},
      {name: "Discharge List", to: "/app/ward/discharge"},
      {name: "Dashboard", to: "/app/ward/dashboard"},
    ],
  },
  {
    name: "Theatre",
    exact: true,
    to: "/app/theatre",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Appointment", to: "/app/theatre/theatre-appointments"},
      {name: "Check In", to: "/app/theatre/theatre-checkedin"},
      {name: "Bill Client", to: "/app/theatre/billservice"},
      {name: "Bill Order Sent", to: "/app/theatre/theatre-bill"},
    ],
  },
  {
    name: "Managed Care",
    exact: true,
    to: "/app/managed-care",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Policy", to: "/app/managed-care/policy"},
      {name: "Beneficiary", to: "/app/managed-care/beneficiary"},
      {name: "Check In", to: "/app/managed-care/checkin"},
      {name: "Provider", to: "/app/managed-care/provider"},
      {name: "Corporate", to: "/app/managed-care/corporate"},
      {name: "Complaints", to: "/app/managed-care/complaints"},
      {name: "HIA", to: "/app/managed-care/HIA"},
      {name: "Premiums", to: "/app/managed-care/premiums"},
      // {
      //   name: "Organisation",
      //   to: "/app/managed-care/organisation",
      // },
      {name: "Referrals", to: "/app/managed-care/referrals"},
      {name: "Tariff", to: "/app/managed-care/tariff"},
      {name: "Claims", to: "/app/managed-care/claims"},
      {name: "Accreditation", to: "/app/managed-care/accreditation"},
      {
        name: "Fund management",
        to: "/app/managed-care/fundmanagement",
      },
      {name: "Health Plan", to: "/app/managed-care/healthplan"},
      {
        name: "Preauthorization",
        to: "/app/managed-care/preauthorization",
      },
      {
        name: "Provider payment",
        to: "/app/managed-care/providerpayment",
      },
      {name: "Report", to: "/app/managed-care/report"},
      {name: "Dashboard", to: "/app/managed-care/dashboard"},
    ],
  },
  {
    name: "CRM",
    exact: true,
    to: "/app/crm",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Lead", to: "/app/crm/lead"},
      {name: "Proposal", to: "/app/crm/proposal"},
      {name: "Invoice", to: "/app/crm/invoice"},
      {name: "SLA", to: "/app/crm/SLA"},
      {name: "Dashboard", to: "/app/crm/dashboard"},
      {name: "Appointment", to: "/app/crm/appointment"},
      {name: "Templates", to: "/app/crm/templates"},
      {name: "Deal", to: "/app/crm/deal"},
    ],
  },

  {
    name: "Corporate",
    exact: true,
    to: "/app/corporate",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Premiums", to: "/app/corporate/premiums"},
      {name: "Beneficiary", to: "/app/corporate/beneficiary"},
      {name: "Claims", to: "/app/corporate/claims"},
      {name: "Policy", to: "/app/corporate/policy"},
      {name: "Health Plan", to: "/app/corporate/healthplan"},
      {name: "Check In", to: "/app/corporate/Checkin"},
      {name: "Dashboard", to: "/app/corporate/dashboard"},
    ],
  },

  {
    name: "Complaints",
    exact: true,
    to: "/app/complaints",
    iconClassName: "bi bi-person",
    //subMenus: [{name: "Complaints", to: "/app/complaints"}],
  },
  {
    name: "Referral",
    exact: true,
    to: "/app/referral",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Incoming", to: "/app/referral/incoming"},
      {
        name: "Referral account",
        to: "/app/referral/account",
      },
      {name: "Setting", to: "/app/referral/setting"},
    ],
  },
  {
    name: "Communication",
    exact: true,
    to: "/app/communication",
    iconClassName: "bi bi-person",
    subMenus: [
      //{name: "Whatsapp", to: "/app/communication/whatsapp"},
      {name: "SMS", to: "/app/communication/sms"},
      // {name: "USSD", to: "/app/communication/ussd"},
      {name: "Email", to: "/app/communication/email"},
      // {name: "IVR", to: "/app/communication/ivr"},
      {name: "Chats", to: "/app/communication/chats"},
      {name: "Notifications", to: "/app/communication/notifications"},
    ],
  },
  {
    name: "Patient Portal",
    exact: true,
    to: "/app/patient-portal/profile",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Profile", to: "/app/patient-portal/profile"},
      {name: "View", to: "/app/patient-portal/view"},
      {name: "Buy", to: "/app/patient-portal/buy"},
      {name: "Search", to: "/app/patient-portal/search"},
      {name: "Read", to: "/app/patient-portal/read"},
      {name: "Chat", to: "/app/patient-portal/chat"},
    ],
  },
  {
    name: "Organizations",
    exact: true,
    to: "/app/organizations",
    iconClassName: "bi bi-person",
    // subMenus: [
    //   {name: "Profile", to: "/app/patient-portal/profile"},
    //   {name: "View", to: "/app/patient-portal/view"},
    //   {name: "Buy", to: "/app/patient-portal/buy"},
    //   {name: "Search", to: "/app/patient-portal/search"},
    //   {name: "Read", to: "/app/patient-portal/read"},
    //   {name: "Chat", to: "/app/patient-portal/chat"},
    // ],
  },
  {
    name: "Market Place",
    exact: true,
    to: "/app/market-place",
    iconClassName: "bi bi-house-door",
  },
  {
    name: "Accounting",
    exact: true,
    to: "/app/accounting",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Chart of accounts", to: "/app/accounting/chart-of-account"},
      {name: "Account", to: "/app/accounting/account"},
      {name: "Payment", to: "/app/accounting/payment"},
      {name: "Expenses", to: "/app/accounting/expenses"},
      {name: "Journal", to: "/app/accounting/journal"},
      {name: "Report", to: "/app/accounting/report"},
    ],
  },
  {
    name: "Immunization",
    exact: true,
    to: "/app/immunization",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Vaccine profile", to: "/app/immunization/vaccineprofile"},
      {name: "Immunization schedule", to: "/app/immunization/schedule"},
      {name: "Inventory", to: "/app/immunization/inventory"},
      {name: "Appointment", to: "/app/immunization/appointment"},
      {name: "Checkin/out", to: "/app/immunization/checkin-out"},
      {name: "Report", to: "/app/immunization/report"},
    ],
  },
  {
    name: "Blood Bank",
    exact: true,
    to: "/app/blood-bank",
    iconClassName: "bi bi-person",
    subMenus: [
      {name: "Inventory", to: "/app/blood-bank/inventory"},
      {name: "Appointment", to: "/app/blood-bank/appointment"},
      {name: "Lab", to: "/app/blood-bank/lab"},
    ],
  },
];

function SideMenu({isOpen}) {
  const [inactive, setInactive] = useState(false);
  const {state} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [currOption, setCurrOption] = useState("");
  const navigate = useNavigate();

  // console.log(
  //   "this is the user account ohhhhh",
  //   user.currentEmployee.facilityDetail
  // );

  useEffect(() => {
    if (inactive) {
      document.querySelectorAll(".sub-menu");
    }
  }, [inactive]);

  const removeActiveClassFromSubMenu = () => {};

  //console.log("is menu open", isOpen);

  const sortedMenuItems = menuItems.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  //const orgModules = state.facilityDetail

  //const organitionMenuItems = orgModules.filter(item => orgModules.includes(item.name) )

  const roles = user?.currentEmployee?.roles || [];

  //console.log(user.currentEmployee.facilityDetail.facilityModules);

  const isOrgAdmin = roles?.includes("Admin");

  const facilityModules =
    user?.currentEmployee?.facilityDetail?.facilityModules || [];

  const facilitySortedMenuItems =
    // facilityModules &&
    // facilityModules.legnth > 0 &&
    sortedMenuItems.filter(item => facilityModules.includes(item.name));

  //console.log(facilitySortedMenuItems);

  const getFacilitySortedMenuItems =
    facilitySortedMenuItems ||
    sortedMenuItems.filter(item => item.name === "Admin");

  const rolesMenuList = isOrgAdmin
    ? getFacilitySortedMenuItems
    : getFacilitySortedMenuItems.filter(item => roles.includes(item.name));

  useEffect(() => {
    const itemsQuery = document.querySelectorAll(".menu-item");

    itemsQuery.forEach(el => {
      el.addEventListener("click", () => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        itemsQuery.forEach(el => el.classList.remove("active"));
        el.classList.toggle("active");

        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  const finalModules = user.stacker ? sortedMenuItems : rolesMenuList;

  return (
    <Sidemenu className={`side-menu ${isOpen ? "" : "hide"}`}>
      <TopSection>
        <Avatar
          src={user?.currentEmployee?.facilityDetail?.facilitylogo}
          sx={{marginRight: "15px"}}
        >
          L
        </Avatar>
        <h4>{user?.currentEmployee?.facilityDetail?.facilityName}</h4>
      </TopSection>
      <MainMenu className="main-menu">
        <Lists>
          <MenuItem
            name="Home"
            subMenus={[{name: "Dashboard", to: "/app/overview/dashboard"}]}
            to="/app"
            iconClassName="bi bi-house-door"
          />
          {finalModules.map((menuItem, index) => (
            <>
              <MenuItem
                key={menuItem.name}
                name={menuItem.name}
                to={menuItem.to}
                subMenus={menuItem.subMenus || []}
                iconClassName={menuItem.iconClassName}
                onClick={() => {
                  // if (menuItem.action) {
                  //   menuItem.action();
                  //   navigate(menuItem.to);
                  // }
                  if (menuItem.to && !menuItem.subMenus) {
                    navigate(menuItem.to);
                  }
                  if (inactive) {
                    setInactive(false);
                  }
                }}
              />
            </>
          ))}
          <MenuItem
            name="Logout"
            to="/"
            iconClassName="bi bi-house-door"
            subMenus={[]}
            onClick={() => {
              localStorage.setItem("user", "");
            }}
          />
        </Lists>
      </MainMenu>
    </Sidemenu>
  );
}

export default SideMenu;
