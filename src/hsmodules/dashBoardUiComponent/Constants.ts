const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/app',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '/app/profile',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '/app/settings',
  },
];
const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const APP_OPTIONS = [
  'Active Learning',
  'Management System',
  'Information System',
  'Tution Management',
];
const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
  role: 'Instructor',
};

const FILTER_OPTIONS = [
  { label: 'None' },
  { label: 'Description' },
  { label: 'Date' },
];

export {
  MENU_OPTIONS,
  DRAWER_WIDTH,
  APPBAR_MOBILE,
  APPBAR_DESKTOP,
  APP_OPTIONS,
  account,
  FILTER_OPTIONS,
};
